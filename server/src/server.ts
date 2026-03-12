import express from "express"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"
import dotenv from "dotenv"

import { connectDB } from "./config/db"
import { setupSocket } from "./sockets/documentSocket"

dotenv.config()

const app = express()

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  })
)

const server = http.createServer(app)

async function startServer() {
  await connectDB()

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  })

  setupSocket(io)

  server.listen(3001, () => {
    console.log("Server running on port 3001")
  })
}

void startServer()