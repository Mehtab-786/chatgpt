const app = require('./src/app')
const databaseConfig = require('./src/db/databaseConfig')
const { createServer } = require("http");
const {socketServer} = require('./src/socket/socket.services')
const httpServer = createServer(app);


databaseConfig()

socketServer(httpServer)

httpServer.listen(3000, () => {
    console.log('Server is running on 3000')
})