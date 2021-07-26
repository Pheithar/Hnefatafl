class TextLog {
  constructor() {
      this.log = [];
      this.position = [tileSize * boardSize + 2 * borderSize + consoleSize/8, borderSize]
  }

  show() {
    fill(200);
    rect(this.position[0], this.position[1], 6*consoleSize/8, tileSize*boardSize/2);

    for (var i = 0; i < this.log.length; i++) {
      fill(0)
      textAlign(LEFT, TOP)
      textSize(15)
      text(this.log[i], this.position[0] + 10, this.position[1] + 10)
    }
  }

}
