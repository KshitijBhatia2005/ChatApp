const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("chatMessage", (data) => {
        socket.broadcast.emit("chatMessage", data); // Send message to others only
    });

    socket.on("typing", () => {
        socket.broadcast.emit("typing");
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
