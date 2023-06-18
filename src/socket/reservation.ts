import { Server } from "socket.io"
export function reservationsHandler(server: Server) {
  server.on("connection", (socket) => {
    socket.on("join", (room) => {
      socket.join(room);
    });
    socket.on("leave", (room) => {
      socket.leave(room);
    });
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("seat:click", (data) => {
      console.log(data);
      server.emit("seat:click", data);
    })

    socket.on("test", (data) => {
      console.log(data);
      server.emit("test", data);
    })
  });
}