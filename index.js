const app = require('./src/app')
const { createServer } = require("http");
const httpServer = createServer(app);
const dataBaseConfig = require('./src/db/databaseConfig');
const socketServer = require('./src/socket/socket.services');

dataBaseConfig()

socketServer(httpServer)


httpServer.listen(3000, () => {
    console.log('server connected')
})