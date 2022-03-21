// need a gameboard module
// - need an actual board can be done with an array
// - send board state to render
const gameBoard = (() => {
  let _board = ["", "", "", "", "", "", "", "", ""]; //board
  // show current board state
  const showBoardState = () => {
    let currentBoardState = _board;
    return currentBoardState;
  };
  // - update the board
  const updateBoardState = (index, sign) => {
    _board[index] = `${sign}`;
  };
  return { showBoardState, updateBoardState };
})();

// 2 player factories
// - have a name
// - will be assigned either x or o
const Player = () => {
  let _playerName = "N0tAdm1n";
  let _playerSign = "x";
  const changePlayerName = (name) => {
    _playerName = name;
  };
  const changePlayerSign = (sign) => {
    _playerSign = sign;
  };
  const getName = () => _playerName;
  const getSign = () => _playerSign;
  return { getName, getSign, changePlayerName, changePlayerSign };
};

// a module to render the game
// - need to show the state of board

// gamemaster - will act as gamemaster
// - let player go turn by turn
// - tell who won the game or if it is a draw
