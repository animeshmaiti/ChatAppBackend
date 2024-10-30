import express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import mongoConnect from "./db/mongoConnect.js";
import { app, server } from "./socket/socket.js";

configDotenv();
// const app = express();
const port = process.env.PORT || 5000;
const frontendURL = process.env.FRONTEND_URL;
// const localUrl = 'http://localhost:5173'; for testing

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use(cors({
    // origin: [frontendURL, localUrl], // Multiple allowed origins
    origin: [frontendURL], // Multiple allowed origins
    methods: ['GET', 'POST'],
    credentials: true // Enable cookies
}));


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(port, () => {
    mongoConnect();
    console.log(`Server is running on port http://localhost:${port}/`);
});