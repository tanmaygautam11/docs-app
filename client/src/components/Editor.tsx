"use client"

import { useCallback, useEffect, useState, useRef } from "react"
import "quill/dist/quill.snow.css"
import { io, type Socket } from "socket.io-client"

type QuillModule = typeof import("quill")
type QuillInstance = InstanceType<QuillModule["default"]>
type Delta = Parameters<QuillInstance["updateContents"]>[0]

const SAVE_INTERVAL_MS = 2000
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
]

interface EditorProps {
  documentId: string
}

export default function Editor({ documentId }: EditorProps) {
  const socketRef = useRef<Socket | null>(null)
  const [quill, setQuill] = useState<QuillInstance | null>(null)

  useEffect(() => {
    const s = io("http://localhost:3001")
    socketRef.current = s

    return () => {
      s.disconnect()
      socketRef.current = null
    }
  }, [])

  useEffect(() => {
    const socket = socketRef.current
    if (socket == null || quill == null) return

    socket.once("load-document", (document: Delta) => {
      quill.setContents(document)
      quill.enable()
    })

    socket.emit("get-document", documentId)
  }, [quill, documentId])

  useEffect(() => {
    const socket = socketRef.current
    if (socket == null || quill == null) return

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents())
    }, SAVE_INTERVAL_MS)

    return () => {
      clearInterval(interval)
    }
  }, [quill])

  useEffect(() => {
    const socket = socketRef.current
    if (socket == null || quill == null) return

    const handler = (delta: Delta) => {
      // apply incoming delta to the editor
      quill.updateContents(delta)
    }
    socket.on("receive-changes", handler)

    return () => {
      socket.off("receive-changes", handler)
    }
  }, [quill])

  useEffect(() => {
    const socket = socketRef.current
    if (socket == null || quill == null) return

    const handler = (delta: Delta, oldDelta: Delta, source: "user" | "api" | "silent") => {
      if (source !== "user") return
      socket.emit("send-changes", delta)
    }
    quill.on("text-change", handler)

    return () => {
      quill.off("text-change", handler)
    }
  }, [quill])

  const wrapperRef = useCallback((wrapper: HTMLDivElement | null) => {
    if (wrapper == null) return

    wrapper.innerHTML = ""

    const editor = document.createElement("div")
    wrapper.append(editor)

    void (async () => {
      const { default: Quill } = await import("quill")

      const q = new Quill(editor, {
        theme: "snow",
        modules: {
          toolbar: TOOLBAR_OPTIONS,
        },
      })
      q.disable()
      q.setText("Loading...")
      setQuill(q)
    })()

  }, [])

  return (
    <div className="editor-wrapper" ref={wrapperRef}></div>
  )
}