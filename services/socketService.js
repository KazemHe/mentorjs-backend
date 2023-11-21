module.exports = function (io) {
  const rooms = {};

  io.on("connection", (socket) => {
    socket.on("join room", (room) => {
      socket.join(room);
      rooms[room] = rooms[room] ? rooms[room] + 1 : 1;
      console.log(`User joined room: ${room}. Users in room: ${rooms[room]}`);

      if (rooms[room] === 1) {
        socket.emit("is mentor", true);
      } else {
        socket.emit("is mentor", false);
      }
    });

    socket.on("code editing", ( codeBlock) => {
      Object.keys(rooms).forEach((roomId) => {
        if (roomId !== "") {
          socket.to(roomId).emit("other code editing", codeBlock);
        }
      });
    });

    socket.on("leave room", (room) => {
      socket.leave(room);
      rooms[room]--;
      console.log(`User left room: ${room}. Users in room: ${rooms[room]}`);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
