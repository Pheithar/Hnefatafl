class Board {
  constructor() {
    this.attackPieces = [];
    this.defendPieces = [];
    this.setupPieces();
  }

  setupPieces() {
    this.attackPieces.push(new Piece(attackTeam, 0, 0))
    this.defendPieces.push(new Piece(defendTeam, 1, 0))
  }

  show() {
    for (var i = 0; i < this.attackPieces.length; i++) {
      this.attackPieces[i].show();
    }

    for (var i = 0; i < this.defendPieces.length; i++) {
      this.defendPieces[i].show();
    }
  }

  move() {
    
  }

}
