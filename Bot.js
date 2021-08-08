class Bot {
  constructor(team) {
    this.team = team;
    if (this.team == attackTeam) {
      this.pieces = board.attackPieces;
    }
    else if (this.team == defendTeam) {
      this.pieces = board.defendPieces;
    }

    this.selectedPiece = false;
    this.pos = [];
    this.move = [];
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

    if (!this.selectedPiece) {
      this.move = this.selectMove(this.getPossibleMoves(), this.team);
      this.pos = [this.move[0].pos_x, this.move[0].pos_y];

      board.updatePosition(this.pos, this.move[1], this.team)

      this.selectedPiece = true;
    }
    else {
      if (int(this.move[0].pos_x) != this.move[1][0]) {
        if (this.move[0].pos_x > this.move[1][0]) {
          this.move[0].pos_x -= animationVel;
        }
        else {
          this.move[0].pos_x += animationVel;
        }
      }
      else if (int(this.move[0].pos_y) != this.move[1][1]) {
        if (this.move[0].pos_y > this.move[1][1]) {
          this.move[0].pos_y -= animationVel;
        }
        else {
          this.move[0].pos_y += animationVel;
        }
      }
      else {
        this.move[0].pos_y = int(this.move[0].pos_y);
        this.move[0].pos_x = int(this.move[0].pos_x);
        this.selectedPiece = false;
        var captures = this.move[0].checkCapture();
        board.checkKing()

        newLog(this.pos, this.move[1], this.team, captures);
        if (currentTurn != "END") {
          changeTurn();
        }
      }

    }

  }

  selectMove(moves, team) {
    var bestMoveValue = 0;
    var bestMove = []

    for (var i = 0; i < moves.length; i++) {
      var value = this.valueOfMove(moves[i][1], team);
      if (value > bestMoveValue) {
        bestMove = [moves[i]];
        bestMoveValue = value;
      }
      else if (value == bestMoveValue) {
        bestMove.push(moves[i]);
      }
    }

    return random(bestMove);
  }

  valueOfMove(move, team) {

    var value = 0;
    var multiplier = 1;

    if (team == attackTeam) {
        multiplier = 2;
    }

    if (move[0]+2 < boardSize && board.getTeamPosition([move[0]+1, move[1]]) != team && board.getTeamPosition([move[0]+1, move[1]]) != emptyCell && (board.getTeamPosition([move[0]+2, move[1]]) == team || board.getTeamPosition([move[0]+2, move[1]]) == hostileCell)) {
      value += multiplier;
    }

    if (move[0]-2 >= 0 && board.getTeamPosition([move[0]-1, move[1]]) != team && board.getTeamPosition([move[0]-1, move[1]]) != emptyCell && (board.getTeamPosition([move[0]-2, move[1]]) == team || board.getTeamPosition([move[0]-2, move[1]]) == hostileCell)) {
      value += multiplier;
    }

    if (move[1]+2 < boardSize && board.getTeamPosition([move[0], move[1]+1]) != team && board.getTeamPosition([move[0], move[1]+1]) != emptyCell && (board.getTeamPosition([move[0], move[1]+2]) == team || board.getTeamPosition([move[0], move[1]+2]) == hostileCell)) {
      value += multiplier;
    }

    if (move[1]-2 >= 0 && board.getTeamPosition([move[0], move[1]-1]) != team && board.getTeamPosition([move[0], move[1]-1]) != emptyCell && (board.getTeamPosition([move[0], move[1]-2]) == team || board.getTeamPosition([move[0], move[1]-2]) == hostileCell)) {
      value += multiplier;
    }

    return value;

  }
}
