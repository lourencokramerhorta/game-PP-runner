class Crowd {
  constructor(game, densityReceived) {
    this.game = game;
    this.height = 400;
    this.width = this.game.canvasWidth;
    this.x = 0;
    this.y = 0 - this.height;
    this.people = this.generatePeople(densityReceived);
  }

  generatePeople(number) {
    let people = new Array();
    for (let index = 0; index < number; index++) {
      const person = new Person(this);
      people.push(person);
    }
    return people;
  }

  drawCrowd() {
    this.people.forEach((person) => {
      person.drawPerson();
    });
  }

  hitCrowd() {
    this.people.forEach((person) => {
      person.colisionCheck();
    });
  }

  moveCrowd() {
    for (let index = 0; index < this.people.length; index++) {
      this.people[index].y += 3;
    }
  }
}
