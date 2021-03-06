var tileSize = 64;
var boardSize = 11;
var borderSize = 75;
var consoleSize = 700;

var cellH = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
var cellV = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

var attackTeam = "A";
var defendTeam = "D";
var emptyCell = "-";
var hostileCell = "H";

var normalPiece = "normal";
var kingPiece = "king";
var board;

var textLog;

var locked;
var selectedPiece;
var possibleCells;

var throne = [Math.floor(boardSize/2), Math.floor(boardSize/2)]

var currentTurn;

var bot;

var animationVel = 1/2;

var attackPieceImg;
var defenPieceImg;
var kingImg;

function preload() {
  attackPieceImg = loadImage("./assets/soldier-v1.png");
  defendPieceImg = loadImage("./assets/soldier-v2.png");
  kingImg = loadImage("./assets/king-v2.png");
}

function setup() {
  canvas = createCanvas(tileSize * boardSize + 2 * borderSize + consoleSize, tileSize * boardSize + 2 * borderSize);
  console.log(canvas);

  canvas.parent('sketch-holder');

  resetBoard();

  var button = createButton('Reset Game');
  button.parent('sketch-holder');
  button.position(textLog.position[0], borderSize/2);
  button.mousePressed(resetBoard);
}

function resetBoard() {
  currentTurn = attackTeam;

  board = new Board();
  textLog = new TextLog();
  locked = false;
  selectedPiece = null;
  possibleCells = [];

  // bot = new Bot(attackTeam);
}

function draw() {
  drawBoard();
  board.show();
  textLog.show();
  // moveBot()
}

function endGame() {
  currentTurn = "END"
}


function drawBoard() {
  background(255, 204, 0);

  for (var i = 0; i < cellH.length; i++) {
    textSize(15)
    textAlign(CENTER, BOTTOM)
    fill(0)
    text(cellH[i], borderSize + tileSize/2 + tileSize*i, borderSize-5)
  }

  for (var i = 0; i < cellV.length; i++) {
    textSize(15)
    textAlign(RIGHT, CENTER)
    fill(0)
    text(cellV[i], borderSize-5, borderSize + tileSize/2 + tileSize*i)
  }

  for (var i = 0; i < boardSize; i++) {
    for (var j = 0; j < boardSize; j++) {
      if (throne[0] == i && throne[1] == j) {
        fill(220, 103, 185);
      }
      else {
        fill(220, 185, 103);
      }
      rect(i * tileSize + borderSize, j * tileSize + borderSize, tileSize, tileSize);
      if (board.board[i][j] == hostileCell) {
        textAlign(CENTER, CENTER)
        textSize(25);
        fill(255);
        text("H", i * tileSize + borderSize + tileSize/2, j * tileSize + borderSize + tileSize/2);
      }

    }
  }

  for (var i = 0; i < possibleCells.length; i++) {
    fill(150, 238, 96);
    rect(possibleCells[i][0] * tileSize + borderSize, possibleCells[i][1] * tileSize + borderSize, tileSize, tileSize);
  }

  var turn;

  if (currentTurn == attackTeam) {
    turn = "Attack Team"
    fill(0);
    textSize(25);
    text("Turn: " + turn, textLog.position[0] + 300, borderSize/2);
  }
  else if (currentTurn == defendTeam) {
    turn = "Defend Team"
    fill(0);
    textSize(25);
    text("Turn: " + turn, textLog.position[0] + 300, borderSize/2);
  }
  else {
    fill(0);
    textSize(25);
    text("Game Finished", textLog.position[0] + 300, borderSize/2);
  }
}


function mousePressed() {
  var x_pos = floor((mouseX - borderSize) / tileSize);
  var y_pos = floor((mouseY - borderSize) / tileSize);

  var piece = grabPiece(x_pos, y_pos, currentTurn);

  if (piece != null) {
    possibleCells = piece.getPossibleCells();
  }
}

function grabPiece(x, y, team) {
  if (team == attackTeam) {
    for (var i = 0; i < board.attackPieces.length; i++) {
      if (board.attackPieces[i].pos_x == x && board.attackPieces[i].pos_y == y) {
        locked = true;
        selectedPiece = board.attackPieces[i];
        return selectedPiece;
      }
    }
  }
  else if (team == defendTeam) {
    for (var i = 0; i < board.defendPieces.length; i++) {
      if (board.defendPieces[i].pos_x == x && board.defendPieces[i].pos_y == y) {
        locked = true;
        selectedPiece = board.defendPieces[i];
        return selectedPiece;
      }
    }
  }
  return null;
}

function mouseDragged() {
  if (locked) {
    var x_pos = (mouseX - borderSize) / tileSize - 0.5;
    var y_pos = (mouseY - borderSize) / tileSize - 0.5;

    selectedPiece.pos_x = x_pos
    selectedPiece.pos_y = y_pos
  }
}

function mouseReleased() {
  if (locked) {
    var x_pos = floor((mouseX - borderSize) / tileSize);
    var y_pos = floor((mouseY - borderSize) / tileSize);

    if (x_pos >= boardSize || y_pos >= boardSize || x_pos < 0 || y_pos < 0) {
      selectedPiece.pos_x = selectedPiece.previous_pos_x;
      selectedPiece.pos_y = selectedPiece.previous_pos_y;

    }
    else {
      var canPlace = false;
      for (var i = 0; i < possibleCells.length; i++) {
        if (x_pos == possibleCells[i][0] && y_pos == possibleCells[i][1]) {
          canPlace = true;
        }
      }
      // if (canPlace && currentTurn != bot.team) {
      if (canPlace) {
        var previousPosition = [selectedPiece.previous_pos_x, selectedPiece.previous_pos_y];

        var newPosition = [x_pos, y_pos];

        selectedPiece.pos_x = x_pos
        selectedPiece.pos_y = y_pos

        board.updatePosition([selectedPiece.previous_pos_x, selectedPiece.previous_pos_y], [selectedPiece.pos_x, selectedPiece.pos_y], selectedPiece.team)

        selectedPiece.previous_pos_x = x_pos;
        selectedPiece.previous_pos_y = y_pos;

        var captures = selectedPiece.checkCapture();
        board.checkKing()

        newLog(previousPosition, newPosition, selectedPiece.team, captures);


        if (currentTurn != "END") {
          changeTurn();
        }
      }
      else {
        selectedPiece.pos_x = selectedPiece.previous_pos_x;
        selectedPiece.pos_y = selectedPiece.previous_pos_y;
      }
    }
  }

  locked = false;
  selectedPiece = null;
  possibleCells = [];
}

function changeTurn() {
  if (currentTurn == attackTeam) {
    currentTurn = defendTeam;
  }
  else {
    currentTurn = attackTeam;
  }
}

function newLog(previousPosition, newPosition, team, captures) {

  message = team + ": (" + cellH[previousPosition[0]] + ", " + cellV[previousPosition[1]] + ") -> (" + cellH[newPosition[0]] + ", " + cellV[newPosition[1]] + ")."

  if (captures.length > 0) {
    message += " Captures: "
  }

  for (var i = 0; i < captures.length; i++) {
    message += "(" + cellH[captures[i][0]] + ", " + cellV[captures[i][1]] + ")"

    if (i < captures.length - 1) {
      message += ", ";
    }
  }

  textLog.log.push(message)
}


function moveBot() {
  if (currentTurn == bot.team) {
    bot.movePiece()
  }
}

function oppositeTeam(team) {
  if (team == attackTeam) {
    return defendTeam;
  }
  else if (team == defendTeam) {
    return attackTeam;
  }
}
