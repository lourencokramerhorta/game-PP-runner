class PowerUps {
  constructor(game, densityReceived) {
    this.game = game;
    this.height = 400;
    this.width = this.game.canvasWidth;
    this.x = 0;
    this.y = 0 - this.height;
    this.people = this.generatePowerUps(densityReceived);
  }

  generatePowerUps(number) {
    let powerUps = new Array();
    for (let index = 0; index < number; index++) {
      const boost = new Burger(this);
      powerUps.push(boost);
    }
    return powerUps;
  }

  drawPowerUps() {
    this.people.forEach((person) => {
      person.drawPerson();
    });
  }

  hitPowerUps() {
    this.people.forEach((person) => {
      person.colisionCheck();
    });
  }

  movePowerUps() {
    for (let index = 0; index < this.people.length; index++) {
      this.people[index].y += 3;
    }
  }
}
