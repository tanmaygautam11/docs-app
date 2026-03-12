"use client"

import { useParams } from "next/navigation"
import Editor from "@/src/components/Editor"

export default function DocumentPage() {
  const params = useParams()
  const id = params?.id as string

  return (
    <div>
      <Editor documentId={id} />
    </div>
  )
}