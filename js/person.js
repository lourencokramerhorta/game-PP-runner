const person = new Image();
person.src = "../Img/Person.png";

class Person {
  constructor(crowd) {
    this.crowd = crowd;
    this.ratio = 1000 / 858;
    this.height = 60;
    this.width = this.height / this.ratio;
    this.x = Math.random() * 1000;
    this.y = Math.random() * this.crowd.height - this.crowd.height;
    this.img = person;
    this.speed = 50;
  }

  colisionCheck() {
    if (
      !(
        this.crowd.game.player.x + this.crowd.game.player.width < this.x ||
        this.crowd.game.player.x > this.x + this.width
      ) &&
      this.crowd.game.player.y < this.y + this.height &&
      this.crowd.game.player.y > this.y
    ) {
      this.crowd.game.player.y += 8;
    }
  }
  drawPerson() {
    this.crowd.game.context.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
