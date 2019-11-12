const gameStart = {
  key: 'gameStart',
  /**
   * load game resource
   */
  preload: function() {
    this.load.image('background', 'img/背景＿又老又窮.jpg')

    this.load.image('fadatsai', 'img/高雄發大財.png')
    this.load.image('startBtn', 'img/start.png')
    this.load.image('keyboardUp', 'img/向上鍵.svg')
    this.load.image('keyboardDown', 'img/向下鍵.svg')

    this.load.spritesheet('hanDow', 'img/韓導.png', {
      frameWidth: 450,
      frameHeight: 450
    })
  },
  /**
   * after loading finish, add the regarding setting and game objects
   */
  create: function() {
    // initial background
    const scaleRate = window.innerHeight / 1080
    this.background = this.add.tileSprite(
      windowWidth / 2,
      windowHeight / 2,
      1920 / scaleRate,
      1080,
      'background'
    )
    this.background.setScale(scaleRate)

    // initial hanDow character's position
    this.hanDow = this.physics.add.sprite(250, 650, 'hanDow')
    this.hanDow
      .setSize(250, 70, 0)
      .setScale(0.8)
      .setOffset(100, 300)
      .setDepth(1)
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('hanDow', { start: 0, end: 1 }),
      frameRate: 5,
      repeat: -1
    })
    this.hanDow.anims.play('run', true)

    // 初始化遊戲開始頁面的元素
    this.fadatsai = this.add.image(1200, 400, 'fadatsai')
    this.fadatsai.setScale(0.8)

    this.startBtn = this.add.image(1200, 650, 'startBtn')
    this.startBtn.setScale(0.8)
    this.startBtn.setInteractive()
    this.startBtn.on('pointerdown', () => this.scene.start('gamePlay'))

    const keyboardUpX = 1050
    const keyMarginLeft = 300
    const kyeboardDownX = keyboardUpX + keyMarginLeft
    const keyboardY = 800
    this.keyboardUp = this.add.image(keyboardUpX, keyboardY, 'keyboardUp')
    this.keyboardDown = this.add.image(kyeboardDownX, keyboardY, 'keyboardDown')
  },
  /**
   * reflash the game scene
   */
  update: function() {
    this.background.tilePositionX += 4
  }
}
