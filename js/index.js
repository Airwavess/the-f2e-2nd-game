const config = {
  type: Phaser.AUTO,
  width: windowWidth,
  height: windowHeight,
  parent: 'app',
  scene: [gameStart, gamePlay],
  physics: {
    default: 'arcade',
    // arcade: { debug: true }
  }
}

const game = new Phaser.Game(config)
