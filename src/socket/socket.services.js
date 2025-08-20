const { Server } = require("socket.io");

function createSocketServer(httpServer) {
    const io = new Server(httpServer, {});

    io.on("connection", (socket) => {
        console.log('Socket server connected')
    });
}

module.exports = createSocketServer