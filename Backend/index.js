// const { createServer } = require("http");
// const { Server } = require("socket.io");

// const httpServer = createServer();
// const io = new Server(httpServer, {
//   cors: "http://localhost:5173",
// });

// const allUsers = {};

// io.on("connection", (socket) => {
//   // console.log(socket);
//   allUsers[socket.id] = {
//     socket: socket,
//     online: true,
//   };

//   socket.on("request_to_play", (data) => {
//     const currentUser = allUsers[socket.id];
//     currentUser.playerName = data.playerName;

//     let opponentPlayer;

//     for (const key in allUsers) {
//       const user = allUsers[key];
//       if (user.online && !user.playing && socket.id !== key) {
//         opponentPlayer = user;
//         break;
//       }
//     }
//     if (opponentPlayer) {
//       currentUser.socket.emit("OpponentFound", {
//         opponentName: opponentPlayer.playerName,
//         playingAs: "circle",
//       });
//       opponentPlayer.socket.emit("OpponentFound", {
//         opponentName: currentUser.playerName,
//         playingAs: "cross",
//       });
//       currentUser.socket.on("playerMoveFromClient", (data) => {
//         opponentPlayer.socket.emit("playerMoveFromServer", {
//         ...data,
//         });
//       });
//       opponentPlayer.socket.on("playerMoveFromClient", (data) => {
//         currentUser.socket.emit("playerMoveFromServer", {
//           ...data,
//         });
//       });
//     } else {
//       currentUser.socket.emit("OpponentNotFound");
//     }
//   });

//   socket.on("disconnect", function () {
//     // allUsers[socket.id] = {
//     //   socket: { ...socket, online: false },
//     //   online: true,
//     // };
//     const currentUser = allUsers[socket.id];
//     currentUser.online = false;
//   });
// });

// httpServer.listen(3000,()=> {
//   console.log(`Socket run in 3000`) 
// });
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();

// ✅ FIX 1: Proper CORS object
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // later replace with your frontend URL
    methods: ["GET", "POST"]
  }
});

const allUsers = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  allUsers[socket.id] = {
    socket: socket,
    online: true,
    playing: false,
  };

  socket.on("request_to_play", (data) => {
    const currentUser = allUsers[socket.id];
    currentUser.playerName = data.playerName;

    let opponentPlayer;

    for (const key in allUsers) {
      const user = allUsers[key];
      if (user.online && !user.playing && socket.id !== key) {
        opponentPlayer = user;
        break;
      }
    }

    if (opponentPlayer) {
      currentUser.playing = true;
      opponentPlayer.playing = true;

      currentUser.socket.emit("OpponentFound", {
        opponentName: opponentPlayer.playerName,
        playingAs: "circle",
      });

      opponentPlayer.socket.emit("OpponentFound", {
        opponentName: currentUser.playerName,
        playingAs: "cross",
      });

      currentUser.socket.on("playerMoveFromClient", (data) => {
        opponentPlayer.socket.emit("playerMoveFromServer", data);
      });

      opponentPlayer.socket.on("playerMoveFromClient", (data) => {
        currentUser.socket.emit("playerMoveFromServer", data);
      });

    } else {
      currentUser.socket.emit("OpponentNotFound");
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    if (allUsers[socket.id]) {
      allUsers[socket.id].online = false;
      allUsers[socket.id].playing = false;
    }
  });
});

// ✅ FIX 2: Use Render PORT
const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`Socket server running on port ${PORT}`);
});
