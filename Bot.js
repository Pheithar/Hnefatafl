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

    this.copyBoard();
  }

  copyBoard() {
    this.board = board.clone();
  }

  getPossibleMoves(team) {
    var possibleMoves = [];
    var pieces = [];

    if (team == attackTeam) {
      pieces = this.board.attackPieces;
    }
    else if (team == defendTeam) {
      pieces = this.board.defendPieces;
    }

    for (var i = 0; i < pieces.length; i++) {

      var possiblePos = pieces[i].getPossibleCells();

      for (var j = 0; j < possiblePos.length; j++) {
        possibleMoves.push([pieces[i], possiblePos[j]])
      }

    }
    return possibleMoves;
  }

  movePiece() {

    if (!this.selectedPiece) {
      this.move = this.miniMax(2);
      this.pos = [this.move[0].pos_x, this.move[0].pos_y];
      this.piece = board.getPieceAt(this.pos);

      board.updatePosition(this.pos, this.move[1], this.team);

      this.selectedPiece = true;
    }
    else {
      if (int(this.piece.pos_x) != this.move[1][0]) {
        if (this.piece.pos_x > this.move[1][0]) {
          this.piece.pos_x -= animationVel;
        }
        else {
          this.piece.pos_x += animationVel;
        }
      }
      else if (int(this.piece.pos_y) != this.move[1][1]) {
        if (this.piece.pos_y > this.move[1][1]) {
          this.piece.pos_y -= animationVel;
        }
        else {
          this.piece.pos_y += animationVel;
        }
      }
      else {
        this.piece.pos_y = int(this.piece.pos_y);
        this.piece.pos_x = int(this.piece.pos_x);
        this.selectedPiece = false;
        var captures = this.piece.checkCapture();
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

      var value = this.valueOfMove(moves[i][1], team, moves[i][0]);
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

  valueOfMove(move, team, piece) {

    var value = 0;
    var multiplier = 1;

    if (team == attackTeam) {
        multiplier = 2;
    }

    // Comer Pieza

    if (move[0]+2 < boardSize && this.board.getTeamPosition([move[0]+1, move[1]]) != team && this.board.getTeamPosition([move[0]+1, move[1]]) != emptyCell && (this.board.getTeamPosition([move[0]+2, move[1]]) == team || this.board.getTeamPosition([move[0]+2, move[1]]) == hostileCell) && this.board.getPieceAt([move[0]+1, move[1]]) != null && this.board.getPieceAt([move[0]+1, move[1]]).type == normalPiece) {
      value += multiplier;
    }

    if (move[0]-2 >= 0 && this.board.getTeamPosition([move[0]-1, move[1]]) != team && this.board.getTeamPosition([move[0]-1, move[1]]) != emptyCell && (this.board.getTeamPosition([move[0]-2, move[1]]) == team || this.board.getTeamPosition([move[0]-2, move[1]]) == hostileCell) && this.board.getPieceAt([move[0]-1, move[1]]) != null && this.board.getPieceAt([move[0]-1, move[1]]).type == normalPiece) {
      value += multiplier;
    }

    if (move[1]+2 < boardSize && this.board.getTeamPosition([move[0], move[1]+1]) != team && this.board.getTeamPosition([move[0], move[1]+1]) != emptyCell && (this.board.getTeamPosition([move[0], move[1]+2]) == team || this.board.getTeamPosition([move[0], move[1]+2]) == hostileCell) && this.board.getPieceAt([move[0], move[1]+1]) != null && this.board.getPieceAt([move[0], move[1]+1]).type == normalPiece) {
      value += multiplier;
    }

    if (move[1]-2 >= 0 && this.board.getTeamPosition([move[0], move[1]-1]) != team && this.board.getTeamPosition([move[0], move[1]-1]) != emptyCell && (this.board.getTeamPosition([move[0], move[1]-2]) == team || this.board.getTeamPosition([move[0], move[1]-2]) == hostileCell) && this.board.getPieceAt([move[0], move[1]-1]) != null && this.board.getPieceAt([move[0], move[1]-1]).type == normalPiece) {
      value += multiplier;
    }

    // Comer Rey

    var surrounded = 0;

    if (team == attackTeam) {
      if (this.board.king.pos_x+1 < boardSize) {
        if (this.board.board[this.board.king.pos_x+1][this.board.king.pos_y] == attackTeam || this.board.board[this.board.king.pos_x+1][this.board.king.pos_y] == hostileCell || (this.board.king.pos_x+1 == move[0] && this.board.king.pos_y == move[1])) {
          surrounded += 1;
        }
      }
      else {
        surrounded += 1;
      }

      if (this.board.king.pos_x-1 >= 0) {
        if (this.board.board[this.board.king.pos_x-1][this.board.king.pos_y] == attackTeam || this.board.board[this.board.king.pos_x-1][this.board.king.pos_y] == hostileCell || (this.board.king.pos_x-1 == move[0] && this.board.king.pos_y == move[1])) {
          surrounded += 1
        }
      }
      else {
        surrounded += 1;
      }

      if (this.board.king.pos_y+1 < boardSize) {
        if (this.board.board[this.board.king.pos_x][this.board.king.pos_y+1] == attackTeam || this.board.board[this.board.king.pos_x][this.board.king.pos_y+1] == hostileCell || (this.board.king.pos_x == move[0] && this.board.king.pos_y+1 == move[1])) {
          surrounded += 1
        }
      }
      else {
        surrounded += 1;
      }

      if (this.board.king.pos_y-1 >= 0) {
        if (this.board.board[this.board.king.pos_x][this.board.king.pos_y-1] == attackTeam || this.board.board[this.board.king.pos_x][this.board.king.pos_y-1] == hostileCell || (this.board.king.pos_x == move[0] && this.board.king.pos_y-1 == move[1])) {
          surrounded += 1
        }
      }
      else {
        surrounded += 1;
      }

      if (surrounded == 4) {
        value += 1000;
      }
    }

    // Ganar con defensores

    if (piece.type == kingPiece && this.board.board[move[0]][move[1]] == hostileCell && move[0] != throne[0] && move[1] != throne[1]) {
      value += 1000;
    }


    return value;

  }

  miniMax(depth) {
    this.copyBoard();

    var move = [];
    var pos = [];

    var selectedMove = [];
    var value = 0;

    var counter = 0;

    var boards = [];

    while (counter < depth) {

      // if (counter % 2 == 0) {
      //   var moves = this.getPossibleMoves(this.team);
      //   for (var i = 0; i < moves.length; i++) {
      //     var value = this.valueOfMove(moves[i][1], this.team, moves[i][0])
      //     console.log(value);
      //     boards.push(this.board.clone().selectMove(moves[i]))
      //     console.log(boards);
      //   }
      // }

      counter += 1;
    }

    for (var i = 0; i < depth; i++) {
      if (i % 2 == 0) {
        move = this.selectMove(this.getPossibleMoves(this.team), this.team);
        pos = [move[0].pos_x, move[0].pos_y];
        // console.log(this.valueOfMove(move[1], this.team, move[0]));
        // console.log(this.valueOfMove(move, this.team, ));
        // this.board.updatePosition(pos, move[1], this.team);


        // this.board.updatePosition(this.pos, this.move[1], this.team)
        // this.team
        // play
      }
      else {
        // oppositeTeam(this.team)
        // play
      }
    }

    return move;
  }
}
