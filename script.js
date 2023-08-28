// Use module to create GameBoard
const GameBoard = (() => {
  // Represent board with array of empty strings
  const board = ["", "", "", "", "", "", "", "", ""];

  const setField = (index, sign) => {
    if (index > board.length) return;
    board[index] = sign;
  };

  const getField = (index) => {
    if (index > board.length) return;
    return board[index];
  };

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  return { setField, getField, reset };
})();

// Use PlayerFactory to create players
const PlayerFactory = (sign) => {
  this.sign = sign;

  const getSign = () => {
    return sign;
  };

  return { getSign };
};

const displayController = (() => {
  // Select attributes we need
  const fields = document.querySelectorAll(".field");
  const messageCont = document.querySelector(".message");
  const restartBtn = document.querySelector(".btn-restart");

  fields.forEach((field) =>
    field.addEventListener("click", (e) => {
      console.log(e);
      console.log(e.target.attributes["data-index"].nodeValue);
      if (gameController.getIsOver() || e.target.textContent !== "") return;
      gameController.playRound(
        parseInt(e.target.attributes["data-index"].nodeValue)
      );
      updateGameBoard();
    })
  );

  restartBtn.addEventListener("click", (e) => {
    GameBoard.reset();
    gameController.reset();
    updateGameBoard();
    setMessage("Player X's Turn");
  });

  const updateGameBoard = () => {
    for (let i = 0; i < fields.length; i++) {
      fields[i].textContent = GameBoard.getField(i);
    }
  };

  const setResultMess = (winner) => {
    if (winner === "Draw") {
      setMessage("It's a draw!");
    } else {
      setMessage(`Player ${winner} has won!`);
    }
  };

  const setMessage = (message) => {
    messageCont.textContent = message;
  };

  return { setMessage, setResultMess };
})();

// Create game logic with a module
const gameController = (() => {
  // Create players
  const playerX = PlayerFactory("X");
  const playerO = PlayerFactory("O");
  let round = 1;
  let isOver = false;

  const getCurrPlayer = () => {
    return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
  };

  const checkWinner = (index) => {
    const winCond = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let check = winCond
      .filter((condition) => condition.includes(index))
      .some((combination) =>
        combination.every(
          (index) => GameBoard.getField(index) === getCurrPlayer()
        )
      );

    // True if winCond satisfied
    return check;
  };

  const playRound = (index) => {
    GameBoard.setField(index, getCurrPlayer());

    if (checkWinner(index)) {
      displayController.setResultMess(getCurrPlayer());
      isOver = true;
      return;
    }
    if (round === 9) {
      displayController.setResultMess("Draw");

      isOver = true;
      return;
    }

    round++;
    displayController.setMessage(`Player ${getCurrPlayer()}'s turn`);
  };

  const getIsOver = () => {
    return isOver;
  };

  const reset = () => {
    round = 1;
    isOver = false;
  };

  return { playRound, getIsOver, reset };
})();
