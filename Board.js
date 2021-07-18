class Board {
  constructor() {
    this.attackPieces = [];
    this.defendPieces = [];
    this.board = [];


    for (var i = 0; i < boardSize; i++) {
      this.board.push([]);
      for (var j = 0; j < boardSize; j++) {
        this.board[i].push(emptyCell);
      }
    }

    this.setupPieces();
  }

  setupPieces() {
    this.addPiece(attackTeam, [0, 0]);
    this.addPiece(attackTeam, [0, 1]);
    this.addPiece(attackTeam, [1, 1]);
    this.addPiece(attackTeam, [2, 1]);
    this.addPiece(defendTeam, [4, 0]);
    this.addPiece(defendTeam, [5, 0]);
    this.addKing([3, 3]);
  }

  addPiece(team, position) {
    if (team == attackTeam) {
      this.attackPieces.push(new Piece(team, position[0], position[1]));
    }
    else {
      this.defendPieces.push(new Piece(team, position[0], position[1]));
    }
    this.board[position[0]][position[1]] = team;
  }

  addKing(position) {

    var king = new King(position[0], position[1]);
    this.defendPieces.push(king);
    this.board[position[0]][position[1]] = defendTeam;
    this.king = king;
  }

  updatePosition(previousPosition, newPosition, team) {
    this.board[previousPosition[0]][previousPosition[1]] = emptyCell;
    this.board[newPosition[0]][newPosition[1]] = team;
  }

  getPosition(position) {
    if (this.board[position[0]][position[1]] == emptyCell) {
      return false;
    }
    return true;
  }

  getTeamPosition(position) {
    return this.board[position[0]][position[1]];
  }

  show() {
    for (var i = 0; i < this.attackPieces.length; i++) {
      this.attackPieces[i].show();
    }

    for (var i = 0; i < this.defendPieces.length; i++) {
      this.defendPieces[i].show();
    }
  }

  getPieceAt(position) {
    for (var i = 0; i < this.attackPieces.length; i++) {
      if (this.attackPieces[i].pos_x == position[0] && this.attackPieces[i].pos_y == position[1]) {
        return this.attackPieces[i];
      }
    }

    for (var i = 0; i < this.defendPieces.length; i++) {
      if (this.defendPieces[i].pos_x == position[0] && this.defendPieces[i].pos_y == position[1]) {
        return this.defendPieces[i];
      }
    }
    return null;
  }

  captureAt(position) {
    for (var i = 0; i < this.attackPieces.length; i++) {
      if (this.attackPieces[i].pos_x == position[0] && this.attackPieces[i].pos_y == position[1]) {
        this.board[this.attackPieces[i].pos_x][this.attackPieces[i].pos_y] = emptyCell;
        this.attackPieces.splice(i, 1);
      }
    }

    for (var i = 0; i < this.defendPieces.length; i++) {
      if (this.defendPieces[i].pos_x == position[0] && this.defendPieces[i].pos_y == position[1]) {
        this.board[this.attackPieces[i].pos_x][this.attackPieces[i].pos_y] = emptyCell;
        this.defendPieces.splice(i, 1);
      }
    }
  }

  checkKing() {
    var surrounded = 0;

    if (this.king.pos_x+1 < boardSize) {
      if (this.board[this.king.pos_x+1][this.king.pos_y] == attackTeam || this.board[this.king.pos_x+1][this.king.pos_y] == hostileCell) {
        surrounded += 1
      }
    }
    else {
      surrounded += 1
    }

    if (this.king.pos_x-1 >= 0) {
      if (this.board[this.king.pos_x-1][this.king.pos_y] == attackTeam || this.board[this.king.pos_x-1][this.king.pos_y] == hostileCell) {
        surrounded += 1
      }
    }
    else {
      surrounded += 1
    }

    if (this.king.pos_y+1 < boardSize) {
      if (this.board[this.king.pos_x][this.king.pos_y+1] == attackTeam || this.board[this.king.pos_x][this.king.pos_y+1] == hostileCell) {
        surrounded += 1
      }
    }
    else {
      surrounded += 1
    }

    if (this.king.pos_y-1 >= 0) {
      if (this.board[this.king.pos_x][this.king.pos_y-1] == attackTeam || this.board[this.king.pos_x][this.king.pos_y-1] == hostileCell) {
        surrounded += 1
      }
    }
    else {
      surrounded += 1
    }

    if (surrounded == 4) {
      console.log("Fin");
    }


    //
    // if ((this.king.pos_x+1 < boardSize && this.getPieceAt([this.king.pos_x+1, this.king.pos_y]).team != this.king.team)) {
    //   console.log("AA");
    // }
  }

}
