import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import redisClient from "./config/redisClient.js";
import { socketAuth } from "./middlewares/socketAuth.js";
import socketHandler from "./socket/socketHandler.js";

import { createAdapter } from "@socket.io/redis-adapter";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);

// Socket.io init
const io = new Server(httpServer, {
  cors: { origin: "*" },
});

// Redis adapter for scaling
const sub = redisClient.duplicate();
await sub.connect();

io.adapter(createAdapter(redisClient, sub));

io.use(socketAuth);       // Authenticate socket
socketHandler(io);        // Main events

app.get("/", (req, res) => res.send("Chat Service Running"));

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () =>
  console.log(`Chat service running on port ${PORT}`)
);
