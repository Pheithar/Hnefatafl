class TextLog {
  constructor() {
      this.log = [];
      this.position = [tileSize * boardSize + 2 * borderSize + consoleSize/8, borderSize]
      this.max_logs = 13;
  }

  show() {
    fill(200);
    rect(this.position[0], this.position[1], 6*consoleSize/8, tileSize*boardSize/2);

    var counter = 0;
    for (var i = this.log.length-1; i >= 0; i--) {
      if (counter < this.max_logs) {
        fill(0)
        textAlign(LEFT, TOP)
        textSize(15)
        text(this.log[i], this.position[0] + 10, this.position[1] + 10 + 20*counter)
        counter++;
      }
    }
  }

}
