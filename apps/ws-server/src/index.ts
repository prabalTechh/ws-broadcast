import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({
  port: 4040,
});

const broadcast: WebSocket[] = [];

let user = 0;
wss.on("connection", (socket) => {
  broadcast.push(socket);
  user = user + 1;

  console.log("user connected to server #" + user);

  socket.on("message", (message) => {
    broadcast.forEach((s) => {
        if (s !== socket) { // Skip the sender
          s.send(message.toString()); // Forward the message to others
        }
      });
    // console.log("the Message sent is :" + message.toString());
  });

  socket.on("disconnect", () => {
    broadcast.filter((x) => x != socket);
  });
});
