let _ = require("lodash");

let sessions = {}; // hash from sessionId -> Session object
console.log(sessions, "sessions");
class Session {
  constructor(sessionId, io) {
    this.sessionId = sessionId;
    this.members = {};
    this.io = io;
    this.sessionIdCounter = 0;
  }

  // gives list of member sessionIds
  getMembers() {
    return _.keys(this.members);
  }

  hasMembers() {
    return !_.isEmpty(this.members);
  }

  // Cleans up internal hash by removing this member's entry
  removeMember(memberName) {
    if (_.has(this.members, memberName)) {
      let memberSocket = this.members[memberName];
      memberSocket.leave(this.sessionId);
      delete this.members[memberName];
    }
  }

  // given membersessionId and socket to the member,
  // will initialize socket for member and add them to room
  addMember(memberName, socket) {
    socket.join(this.sessionId);
    socket.on("disconnect", () => {
      this.removeMember(memberName);

      if (this.hasMembers()) {
        // Alert other members of this member's departure
        // if (this.io.to(this.sessionId) !== null) {
        //     this.io.to(this.sessionId).emit("departure", {
        //         sessionId: memberName,
        //     });
        // }
        console.log("A user has left the call.");
      } else {
        // if room is empty, remove it from the internal hash.
        // since thats the only reference to it, this Session object will be garbage collected
        delete sessions[this.sessionId];
      }
    });

    this.members[memberName] = socket;
    this.setupNewMember(memberName, socket);
  }

  setupNewMember(memberName, socket) {
    socket.emit("yourID", memberName);
    socket.emit("allUsers", this.getMembers());
    socket.on("callUser", (data) => {
      // TODO: Find a bettter event name than "hey"
      this.io.to(this.getSocketIdForMember(data.userToCall)).emit("hey", {
        signal: data.signalData,
        from: data.from,
      });
      console.log("User call initiated.");
    });

    socket.on("acceptCall", (data) => {
      this.io
        .to(this.getSocketIdForMember(data.to))
        .emit("callAccepted", data.signal);
    });
  }

  getSocketIdForMember(memberName) {
    return this.members[memberName].id;
  }

  generateMemberName() {
    return `Guest-${this.sessionIdCounter++}`;
  }
}

exports.getSession = function (sessionId, io) {
  sessions[sessionId] = sessions[sessionId] || new Session(sessionId, io);
  return sessions[sessionId];
};
