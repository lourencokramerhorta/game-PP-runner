const powerUpImg = new Image();
powerUpImg.src = "../js/1-up-powerup.png"
class Burger {
  constructor(powerUps) {
    this.powerUps = powerUps;
    this.height = 30;
    this.width = 30;
    this.x = Math.random() * 1000;
    this.y = Math.random();
    this.img = powerUpImg;
  }
  drawPowerUp() {
    this.game.context.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
