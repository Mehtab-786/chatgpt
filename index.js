const app = require('./src/app')
const { createServer } = require("http");
const database = require('./src/db/dbConfig')
const socketServer = require("./src/socket/socket.services")

const httpServer = createServer(app);


database()

socketServer(httpServer)

httpServer.listen(3000, () => {
    console.log('Server is running on port 3000')
})