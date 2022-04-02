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
  // reset board state
  const resetBoard = () => {
    _board = ["", "", "", "", "", "", "", "", ""];
  };
  return { showBoardState, updateBoardState, resetBoard };
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
  const _AI = Player();
  let _mode = "vsPlayer";
  _player1.changePlayerName("Unga");
  _player1.changePlayerSign("x");
  _player2.changePlayerSign("o");
  _AI.changePlayerName("AI");
  _AI.changePlayerSign("o");
  let _currentPlayer = _player1;
  const getCurrentPlayer = () => {
    return _currentPlayer;
  };
  const setPlayersName = () => {
    const _player1Input = document.querySelector("#player1");
    const _player2Input = document.querySelector("#player2");
    _player1.changePlayerName(_player1Input.value);
    _player2.changePlayerName(_player2Input.value);
  };
  const changeCurrentPlayer = () => {
    if (_mode == "vsPlayer") {
      if (_currentPlayer == _player1) _currentPlayer = _player2;
      else _currentPlayer = _player1;
    } else {
      if (_currentPlayer == _player1) _currentPlayer = _AI;
      else _currentPlayer = _player1;
    }
  };
  const changeMode = (newMode) => {
    _mode = newMode;
  };
  const getMode = () => {
    return _mode;
  };
  const checkWinner = () => {
    let boardState = gameBoard.showBoardState();
    let currentPlayer = _currentPlayer.getSign();
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
      const winnerAnnouncement = document.querySelector(
        ".winner-announcement-container"
      );
      winnerAnnouncement.textContent = `${getCurrentPlayer().getName()} wins`;
      displayController.removeTilesEventListener();
    }
  };

  const checkTie = () => {
    const boardState = gameBoard.showBoardState();
    const winnerAnnouncement = document.querySelector(
      ".winner-announcement-container"
    );
    if (
      winnerAnnouncement.textContent == "" &&
      boardState.every((element) => element == "x" || element == "o")
    ) {
      winnerAnnouncement.textContent = "Tie";
    }
  };

  // AI
  const playAI = () => {
    let emptyTiles = [];
    for (let i = 0; i < 9; i++) {
      if (gameBoard.showBoardState()[i] == "") {
        emptyTiles.push(i);
      }
    }
    return emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
  };
  return {
    setPlayersName,
    getCurrentPlayer,
    changeCurrentPlayer,
    checkWinner,
    checkTie,
    playAI,
    changeMode,
    getMode,
  };
})();

// control everything on display
const displayController = (() => {
  const _startButton = document.querySelector(".start");
  const _restartButton = document.querySelector(".restart");
  const _boardTiles = Array.from(document.querySelectorAll(".tile"));
  const _modeOption = document.querySelectorAll("input[name='mode']");

  // function to select mode
  const _selectMode = () => {
    for (let option of _modeOption) {
      if (option.checked) {
        gameMaster.changeMode(option.value);
        break;
      }
    }
  };

  // function for start button event listener
  const _clickStart = () => {
    gameMaster.setPlayersName();
    _selectMode();
    tilesEventListener();
    restartButtonEventListener();
  };

  // function for restart button event listener
  const _clickRestart = () => {
    gameBoard.resetBoard();
    resetTiles();
    if (gameMaster.getCurrentPlayer().getSign() == "o") {
      gameMaster.changeCurrentPlayer();
    }
    const winnerAnnouncement = document.querySelector(
      ".winner-announcement-container"
    );
    winnerAnnouncement.textContent = ``;
    gameMaster.setPlayersName();
    tilesEventListener();
  };
  // function for tile eventListener
  const _clickTile = (e) => {
    gameBoard.updateBoardState(
      _boardTiles.indexOf(e.target),
      gameMaster.getCurrentPlayer().getSign()
    );
    e.target.textContent = `${gameMaster.getCurrentPlayer().getSign()}`;
    gameMaster.checkWinner();
    gameMaster.checkTie();
    gameMaster.changeCurrentPlayer();
    if (gameMaster.getMode() == "vsAI") {
      let AIMove = gameMaster.playAI();
      gameBoard.updateBoardState(
        AIMove,
        gameMaster.getCurrentPlayer().getSign()
      );
      _boardTiles[AIMove].textContent = gameMaster.getCurrentPlayer().getSign();
      _boardTiles[AIMove].removeEventListener("click", _clickTile);
      gameMaster.changeCurrentPlayer();
    }
  };
  // eventListener for each tiles
  const tilesEventListener = () => {
    _boardTiles.forEach((tile) => {
      tile.addEventListener("click", _clickTile, { once: true });
    });
  };
  // remove eventListener from each tiles
  const removeTilesEventListener = () => {
    _boardTiles.forEach((tile) =>
      tile.removeEventListener("click", _clickTile)
    );
  };
  // start button event listener
  const startButtonEventListener = () => {
    _startButton.addEventListener("click", _clickStart, { once: true });
  };
  // restart button event listener
  const restartButtonEventListener = () => {
    _restartButton.addEventListener("click", _clickRestart);
  };
  //reset tiles
  const resetTiles = () => {
    _boardTiles.forEach((tile) => {
      tile.textContent = "";
    });
  };
  return {
    tilesEventListener,
    removeTilesEventListener,
    restartButtonEventListener,
    startButtonEventListener,
  };
})();

displayController.startButtonEventListener();
