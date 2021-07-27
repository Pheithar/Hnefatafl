class Piece {
  constructor(team, pos_x, pos_y) {
    this.team = team;
    this.pos_x = pos_x;
    this.pos_y = pos_y;

    this.previous_pos_x = this.pos_x;
    this.previous_pos_y = this.pos_y;

    this.type = normalPiece;
  }

  show() {
    textAlign(CENTER, CENTER);
    fill(0)
    text(this.team, this.pos_x * tileSize + borderSize + tileSize/2, this.pos_y * tileSize + borderSize + tileSize/2)
  }

  getPossibleCells() {

    var possibleCells = [];
    var blocked = false;
    for (var i = this.pos_x+1; i < boardSize; i++) {
      if (!(board.getPosition([i, this.pos_y]) || blocked) || (this.type == kingPiece && board.board[i][this.pos_y] == hostileCell)) {
        possibleCells.push([i, this.pos_y]);
      }
      else if (board.getPosition([i, this.pos_y])) {
        blocked = true;
      }
    }

    blocked = false;
    for (var i = this.pos_x-1; i >= 0; i--) {
      if (!(board.getPosition([i, this.pos_y]) || blocked) || (this.type == kingPiece && board.board[i][this.pos_y] == hostileCell)) {
        possibleCells.push([i, this.pos_y]);
      }
      else if (board.getPosition([i, this.pos_y])) {
        blocked = true;
      }
    }

    blocked = false;
    for (var i = this.pos_y+1; i < boardSize; i++) {
      if (!(board.getPosition([this.pos_x, i]) || blocked) || (this.type == kingPiece && board.board[this.pos_x][i] == hostileCell)) {
        possibleCells.push([this.pos_x, i]);
      }
      else if (board.getPosition([this.pos_x, i])) {
        blocked = true;
      }
    }

    blocked = false;
    for (var i = this.pos_y-1; i >= 0; i--) {
      if (!(board.getPosition([this.pos_x, i]) || blocked) || (this.type == kingPiece && board.board[this.pos_x][i] == hostileCell)) {
        possibleCells.push([this.pos_x, i]);
      }
      else if (board.getPosition([this.pos_x, i])) {
        blocked = true;
      }
    }

    return possibleCells;
  }

  checkCapture() {

    var captures = [];

    if (this.pos_x+2 < boardSize && board.getTeamPosition([this.pos_x+1, this.pos_y]) != this.team && board.getTeamPosition([this.pos_x+1, this.pos_y]) != emptyCell && (board.getTeamPosition([this.pos_x+2, this.pos_y]) == this.team || board.getTeamPosition([this.pos_x+2, this.pos_y]) == hostileCell) && board.getPieceAt([this.pos_x+1, this.pos_y]).type == normalPiece) {
          board.captureAt([this.pos_x+1, this.pos_y]);
          captures.push([this.pos_x+1, this.pos_y]);
    }

    if (this.pos_x-2 >= 0 && board.getTeamPosition([this.pos_x-1, this.pos_y]) != this.team && board.getTeamPosition([this.pos_x-1, this.pos_y]) != emptyCell && (board.getTeamPosition([this.pos_x-2, this.pos_y]) == this.team || board.getTeamPosition([this.pos_x-2, this.pos_y]) == hostileCell) && board.getPieceAt([this.pos_x-1, this.pos_y]).type == normalPiece) {
      board.captureAt([this.pos_x-1, this.pos_y]);
      captures.push([this.pos_x-1, this.pos_y]);
    }

    if (this.pos_y+2 < boardSize && board.getTeamPosition([this.pos_x, this.pos_y+1]) != this.team && board.getTeamPosition([this.pos_x, this.pos_y+1]) != emptyCell && (board.getTeamPosition([this.pos_x, this.pos_y+2]) == this.team || board.getTeamPosition([this.pos_x, this.pos_y+2]) == hostileCell) && board.getPieceAt([this.pos_x, this.pos_y+1]).type == normalPiece) {
      board.captureAt([this.pos_x, this.pos_y+1]);
      captures.push([this.pos_x, this.pos_y+1]);
    }

    if (this.pos_y-2 >= 0 && board.getTeamPosition([this.pos_x, this.pos_y-1]) != this.team && board.getTeamPosition([this.pos_x, this.pos_y-1]) != emptyCell && (board.getTeamPosition([this.pos_x, this.pos_y-2]) == this.team || board.getTeamPosition([this.pos_x, this.pos_y-2]) == hostileCell) && board.getPieceAt([this.pos_x, this.pos_y-1]).type == normalPiece) {
      board.captureAt([this.pos_x, this.pos_y-1]);
      captures.push([this.pos_x, this.pos_y-1]);
    }
    return captures
  }
}

class King extends Piece {
  constructor(pos_x, pos_y) {
    super(defendTeam, pos_x, pos_y);

    this.type = kingPiece;
  }

  show() {
    textAlign(CENTER, CENTER);
    fill(0)
    text(this.team + "K", this.pos_x * tileSize + borderSize + tileSize/2, this.pos_y * tileSize + borderSize + tileSize/2)
  }
}
