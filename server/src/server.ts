import express from "express"
import { Server, Socket } from "socket.io"
import cors from "cors"
import connectToMongo from "./utils/db"

const app = express()
app.use(cors())

async function main() {
  try {
    await connectToMongo()

    const io = new Server(3001, {
      cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
    })

    io.on("connection", (socket: Socket) => {
      console.log("User connected")

      socket.on("get-document", (documentId: string) => {
        const data = ""
        socket.join(documentId)
        socket.emit("load-document", data)

        socket.on("send-changes", (delta) => {
          socket.broadcast.to(documentId).emit("receive-changes", delta)
        })
      })
    })

    console.log("Socket.IO server listening on port 3001")
  } catch (err) {
    console.error("Failed to start server:", err)
    process.exit(1)
  }
}

void main()
