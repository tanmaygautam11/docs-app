import express from "express"
import { Server, Socket } from "socket.io"
import cors from "cors"

const app = express()
app.use(cors())

const io = new Server(3001, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
})

io.on("connection", (socket: Socket) => {
  console.log("User connected")

  socket.on("send-changes", (delta) => {
    socket.broadcast.emit("receive-changes", delta)
  })
})
