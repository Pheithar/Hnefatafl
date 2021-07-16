var tileSize = 50
var boardSize = 13
var borderSize = 50

var attackTeam = "A";
var defendTeam= "D";

var board;

var locked;
var selectedPiece;
var possibleCells;

function setup() {
  createCanvas(tileSize * boardSize + 2 * borderSize, tileSize * boardSize + 2 * borderSize);
  board = new Board();
  locked = false;
  selectedPiece = null;
  possibleCells = [];
}

function draw() {
  drawBoard();
  board.show();
}


function drawBoard() {
  background(255, 204, 0);
  for (var i = 0; i < boardSize; i++) {
    for (var j = 0; j < boardSize; j++) {
      fill(220, 185, 103);
      rect(i * tileSize + borderSize, j * tileSize + borderSize, tileSize, tileSize);
    }
  }

  for (var i = 0; i < possibleCells.length; i++) {
    fill(150, 238, 96);
    rect(possibleCells[i][0] * tileSize + borderSize, possibleCells[i][1] * tileSize + borderSize, tileSize, tileSize);
  }
}


function mousePressed() {
  var x_pos = floor((mouseX - borderSize) / tileSize);
  var y_pos = floor((mouseY - borderSize) / tileSize);

  var piece = grabPiece(x_pos, y_pos);

  if (piece != null) {
    possibleCells = piece.getPossibleCells();
  }
}

function grabPiece(x, y) {
  for (var i = 0; i < board.attackPieces.length; i++) {
    if (board.attackPieces[i].pos_x == x && board.attackPieces[i].pos_y == y) {
      locked = true;
      selectedPiece = board.attackPieces[i];
      return selectedPiece;
    }
  }

  for (var i = 0; i < board.defendPieces.length; i++) {
    if (board.defendPieces[i].pos_x == x && board.defendPieces[i].pos_y == y) {
      locked = true;
      selectedPiece = board.defendPieces[i];
      return selectedPiece;
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
      if (canPlace) {
        selectedPiece.pos_x = x_pos
        selectedPiece.pos_y = y_pos
        selectedPiece.previous_pos_x = x_pos;
        selectedPiece.previous_pos_y = y_pos;
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
