// import React, { useEffect, useState } from "react";
// import "./App.css";
// import Square from "./square/Square";
// import io from "socket.io-client";
// import Swal from "sweetalert2";
// const renderFrom = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ];

// const App = () => {
//   const [gameState, setGameState] = useState(renderFrom);
//   const [currentPlayer, setCurrentPlayer] = useState("circle");
//   const [finishedState, setFinishedState] = useState(false);
//   const [finishedArrayState, setFinishedArrayState] = useState([]);
//   const [playOnline, setPlayOnline] = useState(false);
//   const [socket, setSocket] = useState(null);
//   const [playerName, setPlayerName] = useState("");
//   const [opponentName, setOpponentName] = useState(null);
//   const [playingAs, setPlayingAs] = useState(null);

//   const checkWinner = () => {
//     //row dynmic
//     for (let row = 0; row < gameState.length; row++) {
//       if (
//         gameState[row][0] === gameState[row][1] &&
//         gameState[row][1] === gameState[row][2]
//       ) {
//         setFinishedArrayState([row * 3 + 0, row * 3 + 1, row * 3 + 2]);
//         return gameState[row][0];
//       }
//     }

//     //column dynmic
//     for (let col = 0; col < gameState.length; col++) {
//       if (
//         gameState[0][col] === gameState[1][col] &&
//         gameState[1][col] === gameState[2][col]
//       ) {
//         setFinishedArrayState([0 * 3 + col, 1 * 3 + col, 2 * 3 + col]);
//         return gameState[0][col];
//       }

//       if (
//         gameState[0][0] === gameState[1][1] &&
//         gameState[1][1] === gameState[2][2]
//       ) {
//         return gameState[0][0];
//       }

//       if (
//         gameState[0][2] === gameState[1][1] &&
//         gameState[1][1] === gameState[2][0]
//       ) {
//         return gameState[0][2];
//       }
//       const isDrawMatch = gameState.flat().every((e) => {
//         if (e === "circle" || e === "cross") return true;
//         return false;
//       });
//       if (isDrawMatch) return "draw";
//     }
//     return null;
//   };

//   useEffect(() => {
//     const winner = checkWinner();
//     console.log(winner);
//     if (winner) {
//       setFinishedState(winner);
//     }
//   }, [gameState]);

//   const takePlayerName = async () => {
//     const result = await Swal.fire({
//       title: "Enter your name",
//       input: "text",
//       showCancelButton: true,
//       inputValidator: (value) => {
//         if (!value) {
//           return "You need to write something!";
//         }
//       },
//     });
//     return result;
//   };

//   socket?.on("playerMoveFromServer", (data) => {
//     const id=data.state.id;
//     setGameState((prevState) => {
//       let newState = [...prevState];
//       const rowIndex = Math.floor(id / 3);
//       const colIndex = id % 3;
//       newState[rowIndex][colIndex] = data.state.sign;
//       return newState;
//     });
//         setCurrentPlayer(data.state.sign === "circle" ? "cross" : "circle");

//   });

//   socket?.on("connect", function () {
//     setPlayOnline(true);
//   });

//   socket?.on("OpponentNotFound", function () {
//     setOpponentName(false);
//   });
//   socket?.on("OpponentFound", function (data) {
//     setPlayingAs(data.playingAs);
//     setOpponentName(data.opponentName);
//   });

//   async function playOnlineClick() {
//     const result = await takePlayerName();
//     console.log(result);

//     if (!result.isConfirmed) {
//       return;
//     }

//     const username = result.value;
//     setPlayerName(username);

//     // const newSocket = io("http://localhost:3000", {
//     //   autoConnect: true,
//     // });
    
// const newSocket = io("https://tic-tac-toe-4-wsoc.onrender.com", {
//   transports: ["websocket"],
// });

//     newSocket?.emit("request_to_play", {
//       playerName: username,
//     });

//     setSocket(newSocket);
//   }

//   if (!playOnline) {
//     return (
//       <div className="main-div">
//         <button onClick={playOnlineClick} className="playOnline">
//           Play Online
//         </button>
//       </div>
//     );
//   }

//   if (playOnline && !opponentName) {
//     return (
//       <div className="waiting">
//         <p>Waiting for opponent</p>
//       </div>
//     );
//   }

//   return (
//     <div className="main-div">
//       <div className="move-detection">
//         <div
//           className={`left ${
//             currentPlayer === playingAs ? "current-move-" + currentPlayer : ""
//           }`}
//         >
//           {playerName}
//         </div>
//         <div
//           className={`right ${
//             currentPlayer !== playingAs ? "current-move-" + currentPlayer : ""
//           }`}
//         >
//           {opponentName}
//         </div>
//       </div>

//       <div>
//         <h1 className="  game-heading water-background">Tic Tac Toe</h1>
//         <div className="square-wrapper">
//           {gameState.map((arr, rowIndex) =>
//             arr.map((e, colIndex) => {
//               return (
//                 <Square
//                   socket={socket}
//                   playingAs={playingAs}
//                   gameState={gameState}
//                   finishedArrayState={finishedArrayState}
//                   finishedState={finishedState}
//                   currentPlayer={currentPlayer}
//                   setCurrentPlayer={setCurrentPlayer}
//                   setGameState={setGameState}
//                   id={rowIndex * 3 + colIndex}
//                   key={rowIndex * 3 + colIndex}
//                   currentElement={e}
//                 />
//               );
//             })
//           )}
//         </div>
//         {finishedState && finishedState !== "won" && (
//           <h3 className="finished-state">{finishedState} won the game</h3>
//         )}
//         {finishedState && finishedState === "draw" && (
//           <h3 className="finished-state">It's Draw Match</h3>
//         )}
//       </div>
//       {!finishedState && opponentName && (
//         <h2>Your are playing against {opponentName} </h2>
//       )}
//     </div>
//   );
// };

// export default App;
import React, { useEffect, useState } from "react";
import "./App.css";
import Square from "./square/Square";
import io from "socket.io-client";
import Swal from "sweetalert2";

const renderFrom = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const BACKEND_URL = "https://tic-tac-toe-4-wsoc.onrender.com";

const App = () => {
  const [gameState, setGameState] = useState(renderFrom);
  const [currentPlayer, setCurrentPlayer] = useState("circle");
  const [finishedState, setFinishedState] = useState(false);
  const [finishedArrayState, setFinishedArrayState] = useState([]);
  const [playOnline, setPlayOnline] = useState(false);

  const [socket, setSocket] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [opponentName, setOpponentName] = useState(null);
  const [playingAs, setPlayingAs] = useState(null);

  // ---------------- CHECK WINNER ----------------
  const checkWinner = () => {
    for (let i = 0; i < 3; i++) {
      if (
        gameState[i][0] === gameState[i][1] &&
        gameState[i][1] === gameState[i][2]
      ) {
        setFinishedArrayState([i * 3, i * 3 + 1, i * 3 + 2]);
        return gameState[i][0];
      }

      if (
        gameState[0][i] === gameState[1][i] &&
        gameState[1][i] === gameState[2][i]
      ) {
        setFinishedArrayState([i, i + 3, i + 6]);
        return gameState[0][i];
      }
    }

    if (
      gameState[0][0] === gameState[1][1] &&
      gameState[1][1] === gameState[2][2]
    ) {
      setFinishedArrayState([0, 4, 8]);
      return gameState[0][0];
    }

    if (
      gameState[0][2] === gameState[1][1] &&
      gameState[1][1] === gameState[2][0]
    ) {
      setFinishedArrayState([2, 4, 6]);
      return gameState[0][2];
    }

    const isDraw = gameState.flat().every(
      (e) => e === "circle" || e === "cross"
    );
    if (isDraw) return "draw";

    return null;
  };

  useEffect(() => {
    const winner = checkWinner();
    if (winner) setFinishedState(winner);
  }, [gameState]);

  // ---------------- SOCKET LISTENERS ----------------
  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      setPlayOnline(true);
    });

    socket.on("OpponentNotFound", () => {
      setOpponentName(false);
    });

    socket.on("OpponentFound", (data) => {
      setPlayingAs(data.playingAs);
      setOpponentName(data.opponentName);
    });

    socket.on("playerMoveFromServer", (data) => {
      const id = data.state.id;

      setGameState((prev) => {
        const newState = prev.map((row) => [...row]);
        const rowIndex = Math.floor(id / 3);
        const colIndex = id % 3;
        newState[rowIndex][colIndex] = data.state.sign;
        return newState;
      });

      setCurrentPlayer(data.state.sign === "circle" ? "cross" : "circle");
    });

    return () => {
      socket.off();
    };
  }, [socket]);

  // ---------------- PLAYER NAME ----------------
  const takePlayerName = async () => {
    return Swal.fire({
      title: "Enter your name",
      input: "text",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) return "Name is required!";
      },
    });
  };

  // ---------------- PLAY ONLINE ----------------
  const playOnlineClick = async () => {
    const result = await takePlayerName();
    if (!result.isConfirmed) return;

    const username = result.value;
    setPlayerName(username);

    const newSocket = io(BACKEND_URL, {
      transports: ["websocket"],
    });

    setSocket(newSocket);

    newSocket.emit("request_to_play", { playerName: username });
  };

  // ---------------- UI STATES ----------------
  if (!playOnline) {
    return (
      <div className="main-div">
        <button onClick={playOnlineClick} className="playOnline">
          Play Online
        </button>
      </div>
    );
  }

  if (playOnline && !opponentName) {
    return (
      <div className="waiting">
        <p>Waiting for opponent...</p>
      </div>
    );
  }

  return (
    <div className="main-div">
      <div className="move-detection">
        <div
          className={`left ${
            currentPlayer === playingAs ? "current-move-" + currentPlayer : ""
          }`}
        >
          {playerName}
        </div>
        <div
          className={`right ${
            currentPlayer !== playingAs ? "current-move-" + currentPlayer : ""
          }`}
        >
          {opponentName}
        </div>
      </div>

      <h1 className="game-heading water-background">Tic Tac Toe</h1>

      <div className="square-wrapper">
        {gameState.map((row, r) =>
          row.map((cell, c) => (
            <Square
              key={r * 3 + c}
              id={r * 3 + c}
              socket={socket}
              playingAs={playingAs}
              gameState={gameState}
              setGameState={setGameState}
              currentPlayer={currentPlayer}
              setCurrentPlayer={setCurrentPlayer}
              finishedState={finishedState}
              finishedArrayState={finishedArrayState}
              currentElement={cell}
            />
          ))
        )}
      </div>

      {finishedState && finishedState !== "draw" && (
        <h3 className="finished-state">{finishedState} won the game</h3>
      )}

      {finishedState === "draw" && (
        <h3 className="finished-state">It's a Draw!</h3>
      )}
    </div>
  );
};

export default App;
