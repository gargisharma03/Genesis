import "dotenv/config";
import { createServer } from "http";
import { Server } from "socket.io";

import connectDB from "./db/index.js";
import { app } from "./app.js";
import { setupSocketHandlers } from "./utils/socketHandler.js";

// ✅ Changed default fallback port to 5000
const PORT = process.env.PORT || 5000;

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

setupSocketHandlers(io);

connectDB()
    .then(() => {
        httpServer.listen(PORT, () => {
            console.log(`⚙️  Server & Sockets running on port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed:", err);
        process.exit(1);
    });