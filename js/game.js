const festival = new Image();
festival.src = "../Img/pp runner start.png";

const gameOverBG = new Image();
gameOverBG.src = "../Img/pp runner gameover.png";

const lawn = new Image();
lawn.src = "../Img/lawn festival looop.png";

const youWinBG = new Image();
youWinBG.src = "../Img/pp runner you win.png";

const nelson = new Audio();
nelson.src = "./nelson-ha-ha.mp3";

class Game {
  constructor(context) {
    this.context = context;
    this.player = new Player(this);
    /* this.powerUps = new PowerUps(this); */
    this.toilets = [];
    this.toiletSize = 100;
    this.crowds = [];
    this.canvasWidth = 1000;
    this.canvasHeight = 1000;
    this.crowdCreationSpeed = 1000;
    this.neonLightsSpeed = 250;
    this.level1 = [15, 15, 10, 10, 30, 5, 10, 10, 30, 5];
    //this.level1 = [];
    this.festivalImg = festival;
    this.gameOverBG = gameOverBG;
    this.nelson = nelson;
    this.youWinBG = youWinBG;
    this.lawn = lawn;
    this.lawnY = 0;
    this.isStarted = false;
    this.isFinished = false;
    this.r = Math.floor(Math.random() * 256);
    this.g = Math.floor(Math.random() * 256);
    this.b = Math.floor(Math.random() * 256);
    this.lineFinishX = this.canvasWidth * Math.random();
    this.lineMoveX =
      (this.canvasWidth / 2) * Math.random() + this.canvasWidth / 4;
    this.lineFinishY = this.canvasHeight * Math.random() + 500;
  }

  deleteEveryting() {
    this.context.clearRect(0, 0, this.canvasHeight, this.canvasWidth);
  }

  updateEverything(previousTimestamp, previousTimestamp2) {
    this.deleteEveryting();
    this.drawEverything();
    if (this.isStarted && !this.isFinished) {
      this.moveEverything();
    }
    requestAnimationFrame((timestamp) => {
      if (
        timestamp - previousTimestamp > this.crowdCreationSpeed &&
        this.isStarted &&
        !this.isFinished
      ) {
        const poper = this.level1.pop();
        const newCrowd = new Crowd(this, poper);
        this.crowds.push(newCrowd);
        previousTimestamp = timestamp;
      }

      if (
        timestamp - previousTimestamp2 > this.neonLightsSpeed &&
        this.isStarted &&
        !this.isFinished
      ) {
        this.mixNeonLights();
        this.mixLineCoordinates();
        previousTimestamp2 = timestamp;
      }

      this.updateEverything(previousTimestamp, previousTimestamp2);
    });
  }

  drawNeonLights() {
    this.context.beginPath();
    this.context.lineWidth = 5;
    this.context.moveTo(this.lineMoveX, this.canvasHeight);
    this.context.lineTo(this.lineFinishX, this.lineFinishY);
    this.context.strokeStyle = `rgba(${this.r},${this.g},${this.b}, 0.5)`;
    this.context.stroke();
  }

  toiletsColision() {
    this.toilets.forEach((toilet) => {
      toilet.checkIfEntered();
    });
  }
  moveCrowds() {
    this.crowds.forEach((crowd) => {
      crowd.moveCrowd();
    });
  }
  drawCrowds() {
    this.crowds.forEach((crowd) => {
      crowd.drawCrowd();
    });
  }
  drawToilets() {
    this.toilets.forEach((toilet) => {
      toilet.drawToilet();
    });
  }

  mixNeonLights() {
    this.r = Math.floor(Math.random() * 256);
    this.g = Math.floor(Math.random() * 256);
    this.b = Math.floor(Math.random() * 256);
  }

  mixLineCoordinates() {
    this.lineFinishX = this.canvasWidth * Math.random();
    this.lineMoveX =
      (this.canvasWidth / 2) * Math.random() + this.canvasWidth / 4;
    this.lineFinishY = this.canvasHeight * Math.random() - 500;
  }

  moveToilets() {
    this.toilets.forEach((toilet) => {
      toilet.moveToilet();
    });
  }
  moveEverything() {
    this.player.updatePlayer();
    this.moveBackground();
    this.moveCrowds();
    this.moveToilets();
    this.crowds.forEach((crowd) => {
      crowd.hitCrowd();
    });
    this.player.bottomColision();
    this.toiletsColision();
    /* if (this.level1.length === 0) {
      this.toilet.moveToilet();
    } */
  }
  createToilets() {
    let numberOfToilets = this.canvasWidth / this.toiletSize;
    for (let i = 0; i < numberOfToilets; i++) {
      this.toilets.push(new Toilet(this, i));
      console.log(this.toilets[this.toilets.length - 1].occupied);
    }
  }
  drawEverything() {
    if (this.isFinished) {
      if (this.didIJustWin) {
        this.drawYouWin();
      } else {
        this.drawEndScreen();
      }
    } else if (!this.isStarted) {
      this.drawStartScreen();
    } else {
      this.drawGameBackground();
      this.player.drawPlayer();
      this.drawCrowds();
      if (this.level1.length === 0) {
        if (this.toilets.length === 0) {
          this.createToilets();
        }
        this.drawToilets();
      }
      this.drawNeonLights();
    }
  }

  drawGameBackground() {
    this.context.drawImage(
      this.lawn,
      0,
      this.lawnY,
      this.canvasWidth,
      this.canvasHeight
    );
    this.context.drawImage(
      this.lawn,
      0,
      this.lawnY - this.canvasHeight,
      this.canvasWidth,
      this.canvasHeight
    );
  }

  moveBackground() {
    if (this.lawnY > this.canvasHeight) {
      this.lawnY = 0;
    } else {
      this.lawnY += 5;
    }
  }

  drawBackground() {
    this.context.drawImage(
      this.festivalImg,
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    );
  }
  drawGameOverBG() {
    this.context.drawImage(
      this.gameOverBG,
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    );
  }
  drawYouWinBG() {
    this.context.drawImage(
      this.youWinBG,
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    );
  }
  drawStartScreen() {
    this.drawBackground();
  }
  drawEndScreen() {
    this.drawGameOverBG();
  }
  drawYouWin() {
    this.drawYouWinBG();
  }

  restartGame() {
    this.crowds = [];
    this.toilets = [];
    this.level1 = [21, 12, 30, 40, 20, 25, 20, 30, 40, 25, 10, 20, 30, 25];
    this.isStarted = true;
    this.isFinished = false;
    this.didIJustWin = false;
    this.lawnY = 0;
    this.player.speed = {
      x: 0,
      y: 0,
    };
    this.player.x = 500;
    this.player.y = 500;
  }
  setControls() {
    window.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case 32:
          this.isStarted = true;
          break;
        case 82:
          if (this.isFinished) {
            this.restartGame();
          }
          break;
      }
      this.player.movePlayer(e);
    });
    window.addEventListener("keyup", (e) => {
      this.player.stopPlayer(e);
    });
  }
  loadingScreen() {
    this.context.drawImage(
      this.festivalImg,
      0,
      0,
      this.canvasHeight,
      this.canvasWidth
    );
  }
  youLose() {
    this.isFinished = true;
    this.didIJustWin = false;
    this.nelson.play();
  }
  youWin() {
    this.isFinished = true;
    this.didIJustWin = true;
  }
  startAnimation() {
    this.setControls();
    this.updateEverything(0, 0);
  }
}
