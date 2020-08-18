// to store game status
const statusDisplay = document.querySelector(".game--status");

/***variables to track the game state***/

//We will use gameActive to pause the game in case of an end scenario
let gameActive = true;

//Current player
let currentPlayer = "X";

//current game state
let gameState = ["", "", "", "", "", "", "", "", ""];

//Messages that'll be displayed to the user during the game.
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

//inital message to let the players know whose turn it is
statusDisplay.innerHTML = currentPlayerTurn();

/*****************************************************************************/
/************************** FUNCTIONALITIES **********************************/
/*****************************************************************************/

//to update internal game state and update user interface
function handleCellPlayed(clickedCell, clickedCellIndex) {
  //updating state
  gameState[clickedCellIndex] = currentPlayer;
  //updating interface
  clickedCell.innerHTML = currentPlayer;
}
/*****************************************************************************/

//initialize X --current player, switch in each click
function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  //updating interface
  statusDisplay.innerHTML = currentPlayerTurn();
}
/*****************************************************************************/

//winning algorithims
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//Result validation
function handleResultValidation() {
  //initialize winning status to false
  let roundWon = false;

  //itterate in winning condition array
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    //in case of winning algorithim
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }
  //as long as there are table cells that are not populated with a players signs
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }
  //if no one won --no algorithims match
  handlePlayerChange();
}

/*****************************************************************************/
//when player click on the cell
function handleCellClick(clickedCellEvent) {
  //clicked html saved in a variable
  const clickedCell = clickedCellEvent.target;

  //grabbing 'data-cell-index' attribute from the clicked cell to identify where that cell is in our table.
  //**getAttribute will return a string value.We will parse it to an integer(number)
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );

  //to ignore the click if cell has been clicked and game is paused
  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }
  //to proceed with the game
  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

/*****************************************************************************/

function handleRestartGame() {
  // give the initial values again
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  //itteerate to give an initial value to the cells
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
}

/*****************************************************************************/

// Event listeners to the actual game cells, as well as restart button
document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));
document
  .querySelector(".game--restart")
  .addEventListener("click", handleRestartGame);
