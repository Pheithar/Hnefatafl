class Bot {
  constructor(team) {
    this.team = team;
    if (this.team == attackTeam) {
      this.pieces = board.attackPieces;
    }
    else if (this.team == defendTeam) {
      this.pieces = board.defendPieces;
    }
  }

  getPossibleMoves() {
    var possibleMoves = [];

    for (var i = 0; i < this.pieces.length; i++) {

      var possiblePos = this.pieces[i].getPossibleCells();

      for (var j = 0; j < possiblePos.length; j++) {
        possibleMoves.push([this.pieces[i], possiblePos[j]])
      }

    }
    return possibleMoves;
  }

  movePiece() {

    var move = random(this.getPossibleMoves());
    var pos = [move[0].pos_x, move[0].pos_y];

    board.updatePosition(pos, move[1], this.team)

    move[0].pos_x = move[1][0];
    move[0].pos_y = move[1][1]


    var captures = move[0].checkCapture();
    board.checkKing()

    newLog(pos, move[1], this.team, captures);
  }
}
