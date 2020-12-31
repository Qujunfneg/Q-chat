var socketio = require("socket.io");
var clients = []
socketio.connect = function (server) {
  var io = socketio(server, {
    cors: {
      origin: "http://localhost:8080",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  io.on("connection", function (socket) {
    clients.push(socket)
    socket.on('online',msg=>{
        socket.username = msg
        socket.broadcast.emit("broadcast", "hello friends!")
    })
  });
  
};
module.exports = socketio;
