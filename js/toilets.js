let openToilet = new Image();
openToilet.src = "../Img/open_new.png";

let closedToilet = new Image();
closedToilet.src = "../Img/closed_new.png";

class Toilet {
  constructor(game, i) {
    this.game = game;
    this.x = i * this.game.toiletSize;
    this.y = -1000;
    this.numberOfToilets = this.game.canvasWidth / this.toiletSize;
    this.occupied = !!Math.round(Math.random());
    this.openToilet = openToilet;
    this.closedToilet = closedToilet;
  }

  drawToilet() {
    if (this.occupied) {
      this.game.context.drawImage(
        this.closedToilet,
        this.x,
        this.y,
        this.game.toiletSize,
        this.game.toiletSize
      );
    } else {
      this.game.context.drawImage(
        this.openToilet,
        this.x,
        this.y,
        this.game.toiletSize,
        this.game.toiletSize
      );
    }
  }
  moveToilet() {
    this.y = this.y + 3;
  }

  checkIfEntered() {
    if (this.game.player.y < this.game.toiletSize + this.y) {
      console.log("chegou");
      if (
        this.game.player.x > this.x &&
        this.game.player.x + this.game.player.width <
          this.x + this.game.toiletSize
      ) {
        console.log("entrou certa", this.occupied);
        if (this.occupied) {
          this.game.youLose();
        } else {
          this.game.youWin();
        }
      } else if (
        this.x + this.game.toiletSize > this.game.player.x &&
        this.game.player.x + this.game.player.width >
          this.x + this.game.toiletSize
      ) {
        console.log("meio");
        this.game.youLose();
      }
    }
  }
}
