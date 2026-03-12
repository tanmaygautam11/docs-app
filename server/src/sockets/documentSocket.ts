import { Server, Socket } from "socket.io"
import { findOrCreateDocument } from "../utils/findOrCreateDocument"
import Document from "../models/Document"

export const setupSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("User connected")

    socket.on("get-document", async (documentId: string) => {
      const document = await findOrCreateDocument(documentId)

      socket.join(documentId)

      if (!document) {
        // If document couldn't be found/created, send empty data
        socket.emit("load-document", "")
        return
      }

      socket.emit("load-document", document.data)

      socket.on("send-changes", (delta) => {
        socket.broadcast.to(documentId).emit("receive-changes", delta)
      })

      socket.on("save-document", async (data) => {
        await Document.findByIdAndUpdate(documentId, { data })
      })
    })
  })
}