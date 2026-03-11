import express from "express"
import http from "http"
import { Server } from "socket.io"
import cors from "cors"

const app = express()
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: { origin: "*" }
})

io.on("connection", (socket) => {
  console.log("User connected")

  socket.on("join-document", (docId: string) => {
    socket.join(docId)
  })

  socket.on("send-changes", (data) => {
    socket.broadcast.emit("receive-changes", data)
  })
})

server.listen(5000, () => {
  console.log("Server running on port 5000")
})