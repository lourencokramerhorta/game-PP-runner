const dude = new Image();
dude.src = "../Img/gajoooo.png";
class Player {
  constructor(game) {
    this.game = game;
    this.ratio = 1000 / 673;
    this.height = 60;
    this.width = this.height / this.ratio;
    this.speed = {
      x: 0,
      y: 0,
    };
    this.x = 500;
    this.y = 500;
    this.img = dude;
  }

  updatePlayer() {
    if (this.x < 0 && this.y < 0) {
      this.x = 0;
      this.y = 0;
    } else if (this.x > this.game.canvasWidth - this.width && this.y < 0) {
      this.x = this.game.canvasWidth - this.width;
      this.y = 0;
    } else if (
      this.y > this.game.canvasWidth - this.width &&
      this.x > this.game.canvasWidth - this.width
    ) {
      this.x = this.game.canvasWidth - this.width;
      this.y = this.game.canvasWidth - this.width;
    } else if (this.y > this.game.canvasWidth - this.width && this.x < 0) {
      this.x = 0;
      this.y = this.game.canvasWidth - this.width;
    } else if (this.x > this.game.canvasWidth - this.width) {
      this.speed.x = -7;
    } else if (this.x < 0) {
      this.speed.x = 7;
    } else if (this.y < 0) {
      this.speed.y = 7;
    } else if (this.y > this.game.canvasWidth - this.width) {
      this.speed.y = -7;
    }
    this.x += this.speed.x;
    this.y += this.speed.y;
  }

  drawPlayer() {
    /* console.log("player"); */
    this.game.context.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  movePlayer(e) {
    switch (e.keyCode) {
      case 37:
        this.speed.x = -7;
        break;
      case 39:
        this.speed.x = 7;
        break;
      case 38:
        this.speed.y = -7;
        break;
      case 40:
        this.speed.y = 7;
        break;
    }
  }
  stopPlayer(e) {
    switch (e.keyCode) {
      case 37:
        this.speed.x = 0;
        break;
      case 39:
        this.speed.x = 0;
        break;
      case 38:
        this.speed.y = 0;
        break;
      case 40:
        this.speed.y = 0;
        break;
    }
  }
  bottomColision() {
    if (this.y + this.height > this.game.canvasHeight) {
      this.game.youLose();
    }
  }
}
