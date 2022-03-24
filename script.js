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
  _player1.changePlayerSign("x");
  _player2.changePlayerSign("o");
  let _currentPlayer = _player1.getSign();
  const getCurrentPlayer = () => {
    return _currentPlayer;
  };
  const changeCurrentPlayer = () => {
    if (_currentPlayer == "x") _currentPlayer = "o";
    else _currentPlayer = "x";
  };
  const checkWinner = () => {
    let boardState = gameBoard.showBoardState();
    let currentPlayer = gameMaster.getCurrentPlayer();
    if (
      (boardState[0] == currentPlayer &&
        boardState[1] == currentPlayer &&
        boardState[2] == currentPlayer) ||
      (boardState[3] == currentPlayer &&
        boardState[4] == currentPlayer &&
        boardState[5] == currentPlayer) ||
      (boardState[6] == currentPlayer &&
        boardState[7] == currentPlayer &&
        boardState[8] == currentPlayer) ||
      (boardState[0] == currentPlayer &&
        boardState[3] == currentPlayer &&
        boardState[6] == currentPlayer) ||
      (boardState[1] == currentPlayer &&
        boardState[4] == currentPlayer &&
        boardState[7] == currentPlayer) ||
      (boardState[2] == currentPlayer &&
        boardState[5] == currentPlayer &&
        boardState[8] == currentPlayer) ||
      (boardState[0] == currentPlayer &&
        boardState[4] == currentPlayer &&
        boardState[8] == currentPlayer) ||
      (boardState[2] == currentPlayer &&
        boardState[4] == currentPlayer &&
        boardState[6] == currentPlayer)
    ) {
      // console.log(`${getCurrentPlayer()} wins`);
      const winnerAnnouncement = document.querySelector(
        ".winner-announcement-container"
      );
      winnerAnnouncement.textContent = `${getCurrentPlayer()} wins`;
    }
  };
  return { getCurrentPlayer, changeCurrentPlayer, checkWinner };
})();

// control everything on display
const displayController = (() => {
  const boardTiles = Array.from(document.querySelectorAll(".tile"));
  const clickTile = (e) => {
    console.log(boardTiles.indexOf(e.target));
  };
  // eventListener for each tiles
  const tilesEventListener = () => {
    boardTiles.forEach((tile) => {
      tile.addEventListener("click", clickTile, { once: true });
    });
  };

  return { tilesEventListener };
})();

displayController.tilesEventListener();
