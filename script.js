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

// gamemaster - will act as gamemaster
// - let player go turn by turn
// - tell who won the game or if it is a draw
const gameMaster = (() => {
  const _player1 = Player();
  const _player2 = Player();
  _player1.changePlayerName("Unga");
  _player1.changePlayerSign("o");
  let _currentPlayer = _player1.getSign();
  const getCurrentPlayer = () => {
    return _currentPlayer;
  };
  const changeCurrentPlayer = () => {
    if (_currentPlayer == "x") _currentPlayer = "o";
    else _currentPlayer = "x";
  };
  return { getCurrentPlayer, changeCurrentPlayer };
})();

// control everything on display
const displayController = (() => {
  const boardTiles = Array.from(document.querySelectorAll(".tile"));
  //eventListener for each tiles
  const tilesEventListener = () => {
    for (let i = 0; i < 9; i++) {
      boardTiles[i].addEventListener(
        "click",
        () => {
          gameBoard.updateBoardState(i, gameMaster.getCurrentPlayer());
          boardTiles[i].textContent = `${gameMaster.getCurrentPlayer()}`;
          gameMaster.changeCurrentPlayer();
        },
        { once: true }
      );
    }
  };

  return { tilesEventListener };
})();

displayController.tilesEventListener();
