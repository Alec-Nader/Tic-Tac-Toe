// Use strict

// Get a reference to our canvas element through the DOM API
const canvas = document.getElementById("canvas");

// From our selected canvas element, get a 2d drawing context
const ctx = canvas.getContext("2d");

const playerX = "X";
const playerO = "O";

const boardState = [
  [null, null, null], // Row 1
  [null, null, null], // Row 2
  [null, null, null] // Row 3
];

let playerTurn = "X";

function drawEmptyBoard() {
  playerTurn = playerX;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  boardState.forEach(row => {
    row.forEach(cell => {
      cell = null; // Reset each value to null
    });
  });

  // Vertical 1
  ctx.beginPath();
  ctx.moveTo(200, 0);
  ctx.lineTo(200, 600);
  ctx.stroke();

  // Vertical 2
  ctx.beginPath();
  ctx.moveTo(400, 0);
  ctx.lineTo(400, 600);
  ctx.stroke();

  // Horizontal 1
  ctx.beginPath();
  ctx.moveTo(0, 200);
  ctx.lineTo(600, 200);
  ctx.stroke();

  // Horizontal 2
  ctx.beginPath();
  ctx.moveTo(0, 400);
  ctx.lineTo(600, 400);
  ctx.stroke();
}

// Origin: https://stackoverflow.com/a/15137553/2281093
function between(min, p, max) {
  let result = false;

  if (min < max) {
    if (p > min && p < max) {
      result = true;
    }
  }

  if (min > max) {
    if (p > max && p < min) {
      result = true;
    }
  }

  if (p == min || p == max) {
    result = true;
  }

  return result;
}

function getClickedSquare(x, y) {
  /**
   * In this implementation of the game we are indexing
   * the squares starting with 0 and ending with 8, like so:
   * 0 | 1 | 2
   * ---------
   * 3 | 4 | 5
   * ---------
   * 6 | 7 | 8
   */

   //following the basic structure that was outlined for the remaining squares 1-8
  if (between(0, x, 200) && between(0, y, 200)) {
    return 0;
  }

  if (between(200, x, 400) && between(0, y, 200)) {
    return 1;
  }

  if (between(400, x, 600) && between(0, y, 200)) {
    return 2;
  }

  if (between(0, x, 200) && between(200, y, 400)) {
    return 3;
  }

  if (between(200, x, 400) && between(200, y, 400)) {
    return 4;
  }

  if (between(400, x, 600) && between(200, y, 400)) {
    return 5;
  }

  if (between(0, x, 200) && between(400, y, 600)) {
    return 6;
  }

  if (between(200, x, 400) && between(400, y, 600)) {
    return 7;
  }

  if (between(400, x, 600) && between(400, y, 600)) {
    return 8;
  }

  return -1;
}

function updatePlayerTurn() {
  if (playerTurn === playerX) {
    return (playerTurn = playerO);
  }

  playerTurn = playerX;
}

function drawPlayOnSquare(squareIdx) {
  // TODO: Implement drawing function
  /**
   * You'll need to have either have conditions for each of the possible
   * conditions or come up with a way to calculate the coords fro the squareIdx.
   *
   * TIP: You can use the "playerTurn" variable to write out the current players
   * game piece
   * */
   //Instead of using if/else we can use switch statement for each square on the canvas. 1-8 same as above. After each interaction the switch will break for the next turn.
   switch (squareIdx) {
  case 0:
    ctx.fillText(playerTurn, 100, 100);
    break;

  case 1:
    ctx.fillText(playerTurn, 300, 100);
    break;

  case 2:
    ctx.fillText(playerTurn, 500, 100);
    break;

  case 3:
    ctx.fillText(playerTurn, 100, 300);
    break;

  case 4:
    ctx.fillText(playerTurn, 300, 300);
    break;

  case 5:
    ctx.fillText(playerTurn, 500, 300);
    break;

  case 6:
    ctx.fillText(playerTurn, 100, 500);
    break;

  case 7:
    ctx.fillText(playerTurn, 300, 500);
    break;

  case 8:
    ctx.fillText(playerTurn, 500, 500);
    break;

  default:
    break;
}
}

function boardHasWinner() {
  // TODO: Implement this function to return boolean if winner exists
  //We will want to have an array of arrays which contains the winning combinations
  var winner = false; //Flag for winner or not
  var currentPlay =[]; //For checking moves
  var winSets = [
    [0, 1, 2], // top
    [3, 4, 5], // mid horiztontal
    [6, 7, 8], // Bottom
    [0, 3, 6], // Left
    [1, 4, 7], // mid col
    [2, 5, 8], // right col
    [0, 4, 8], // diagonal
    [2, 4, 6] // diagonal
  ];
  boardState.forEach((row, rowIdx) => { //Nested for each, checking every possible box in the canvas
  row.forEach((cell, cellIdx) => {
    if (cell === playerTurn) {
      //Adjusting for row discrepency ... adding +3 to the cellIdx
      currentPlay.push(cellIdx + 3 * rowIdx);
    }
  });
});

for(let win of winSets){
    if(win.every(val => currentPlay.includes(val))) {   //I found this loop very interesting. The ability to set win of winsets and then check if it contains every value from the current play.
        winner = true;                                //If it finds all values, then it is a winner
        break;
      }
    }
  return winner;
}

function isBoardFilled() {
  // TODO: Implement this function to return boolean game board is filled

  /* NOTE: This function assumes it will only be called after boardHasWinner(),
   * so we are not checking the win conditions again, we are just saying if the
   * board is filled and since there are no winners, then we can determine the game
   * is tied.
   */
   return boardState.every(row => { //Nested loop for checking every square to see if the cell is not null .every is very useful in javascript I have discovered
       return row.every(cell => cell !== null);
     });
}
canvas.addEventListener("click", function(event) {
  // Extract the x,y coordinates from the click event on the canvas
  const { x, y } = event;

  console.log(x, y);

  // Figure out which square was clicked
  const clickedSquareIdx = getClickedSquare(x, y);

  console.log(`Clicked square ${clickedSquareIdx}`);

  if (clickedSquareIdx === -1) {
    return; // -1 means an area of the canvas was click which we are not tracking
  }

  // TODO: Check boardState to make sure the play is possible (the space is not already occupied)
  function checkSpace(squareIdx) {
    //need to create a function for error checking the board.
    var row = 0;
    var cell = 0;

    if (squareIdx > 2 && squareIdx < 6) {
      row = 1;
    }

    if (squareIdx >= 6) {
      row = 2;
    }

    if ([1, 4, 7].includes(squareIdx)) {
      cell = 1;
    }

    if ([2, 5, 8].includes(squareIdx)) {
      cell = 2;
    }
    return boardState[row][cell] !== null;
  }

if(checkSpace(clickedSquareIdx)){
  return alert("This spot is already in use. Please select a different space on the board.");
}
  // TODO: If valid play, update the boardState
  function update(squareIdx) {
    var row = 0;
    var cell = 0;

    if (squareIdx > 2 && squareIdx < 6) {
      row = 1;
    }

    if (squareIdx >= 6) {
      row = 2;
    }

    if ([1, 4, 7].includes(squareIdx)) {
      cell = 1;
    }

    if ([2, 5, 8].includes(squareIdx)) {
      cell = 2;
    }

    boardState[row][cell] = playerTurn;
  }
  update(clickedSquareIdx);
  // TODO: Draw player's move on canvas in the square
  drawPlayOnSquare(clickedSquareIdx);

  /* TODO: Check if latest play triggers a win condition. If so, alert the players who won
   * and provide option to restart the game
   */
  if (boardHasWinner()) {
    return alert(`Player ${playerTurn} won!`);;
  }

  // TODO: Check for tie. If there is tie, follow same proceedure from win condition
  if (isBoardFilled()) {
    return alert("Tie Game, play again!");
  }

  // If there is no winner, update the playerTurn and continue on
  updatePlayerTurn();
});

// When the page loads, draw our empty board
window.addEventListener("load", drawEmptyBoard);
