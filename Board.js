class Board {
  constructor() {
    this.attackPieces = [];
    this.defendPieces = [];
    this.board = [];


    for (var i = 0; i < boardSize; i++) {
      this.board.push([]);
      for (var j = 0; j < boardSize; j++) {
        if ((i == 0 && j == 0) || (i == 0 && j == boardSize-1) || (i == boardSize-1 && j == 0) || (i == boardSize-1 && j == boardSize-1) || (i == throne[0] && j == throne[1])) {
          this.board[i].push(hostileCell);
        }
        else {
          this.board[i].push(emptyCell);
        }
      }
    }

    this.setupPieces();
  }

  setupPieces() {
    this.addPiece(attackTeam, [0, 3]);
    this.addPiece(attackTeam, [0, 4]);
    this.addPiece(attackTeam, [0, 5]);
    this.addPiece(attackTeam, [1, 5]);
    this.addPiece(attackTeam, [0, 6]);
    this.addPiece(attackTeam, [0, 7]);

    this.addPiece(attackTeam, [3, 0]);
    this.addPiece(attackTeam, [4, 0]);
    this.addPiece(attackTeam, [5, 0]);
    this.addPiece(attackTeam, [5, 1]);
    this.addPiece(attackTeam, [6, 0]);
    this.addPiece(attackTeam, [7, 0]);

    this.addPiece(attackTeam, [10, 3]);
    this.addPiece(attackTeam, [10, 4]);
    this.addPiece(attackTeam, [10, 5]);
    this.addPiece(attackTeam, [9, 5]);
    this.addPiece(attackTeam, [10, 6]);
    this.addPiece(attackTeam, [10, 7]);

    this.addPiece(attackTeam, [3, 10]);
    this.addPiece(attackTeam, [4, 10]);
    this.addPiece(attackTeam, [5, 10]);
    this.addPiece(attackTeam, [5, 9]);
    this.addPiece(attackTeam, [6, 10]);
    this.addPiece(attackTeam, [7, 10]);

    this.addPiece(defendTeam, [5, 3]);
    this.addPiece(defendTeam, [5, 4]);
    this.addPiece(defendTeam, [5, 6]);
    this.addPiece(defendTeam, [5, 7]);

    this.addPiece(defendTeam, [3, 5]);
    this.addPiece(defendTeam, [4, 5]);
    this.addPiece(defendTeam, [6, 5]);
    this.addPiece(defendTeam, [7, 5]);

    this.addPiece(defendTeam, [4, 4]);
    this.addPiece(defendTeam, [4, 6]);
    this.addPiece(defendTeam, [6, 4]);
    this.addPiece(defendTeam, [6, 6]);

    this.addKing([5, 5]);
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

    if (this.getPieceAt(newPosition) != null && this.getPieceAt(newPosition).type == kingPiece && this.board[newPosition[0]][newPosition[1]] == hostileCell && newPosition[0] != throne[0] && newPosition[1] != throne[1]) {
      console.log("END");
      endGame()
    }

    if (previousPosition[0] == throne[0] && previousPosition[1] == throne[1]) {
      this.board[previousPosition[0]][previousPosition[1]] = hostileCell;
    }
    else {
      this.board[previousPosition[0]][previousPosition[1]] = emptyCell;
    }
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
        this.board[position[0]][position[1]] = emptyCell;
        this.attackPieces.splice(i, 1);
      }
    }

    for (var i = 0; i < this.defendPieces.length; i++) {
      if (this.defendPieces[i].pos_x == position[0] && this.defendPieces[i].pos_y == position[1]) {
        this.board[position[0]][position[1]] = emptyCell;
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
      console.log("END");
      endGame()
    }


  }

}
