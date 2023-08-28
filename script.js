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

// Create game logic with a module
const gameController = () => {
  // Create players
  const playerX = PlayerFactory("X");
  const playerO = PlayerFactory("O");
  let round = 1;
  let isOver = false;

  const playRound = (index) => {};
};
