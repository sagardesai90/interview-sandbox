const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const PORT = process.env.PORT || 8000;
const sessions = require("./sessions");

io.on("connection", (socket) => {
  var sessionid = socket.handshake["query"]["sessionid"];
  const session = sessions.getSession(sessionid, io);
  if (Object.keys(session.members).length < 2) {
    const memberName = session.generateMemberName();
    session.addMember(memberName, socket);
  }
  console.log(session, "session members");
});

const port = PORT || 8000;
server.listen(port, () => console.log(`server is running on port ${port}`));
