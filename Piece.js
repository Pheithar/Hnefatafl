class Piece {
  constructor(team, pos_x, pos_y) {
    this.team = team;
    this.pos_x = pos_x;
    this.pos_y = pos_y;

    this.previous_pos_x = this.pos_x;
    this.previous_pos_y = this.pos_y;
  }

  show() {
    textAlign(CENTER, CENTER);
    fill(0)
    text(this.team, this.pos_x * tileSize + borderSize + tileSize/2, this.pos_y * tileSize + borderSize + tileSize/2)
  }

  getPossibleCells() {

    var possibleCells = [];
    for (var i = 0; i < boardSize; i++) {
      for (var j = 0; j < boardSize; j++) {
        if ((i == this.pos_x || j == this.pos_y) && !(i == this.pos_x && j == this.pos_y)) {
          possibleCells.push([i, j]);
        }
      }
    }

    return possibleCells;
  }

}
