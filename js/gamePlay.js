const HAN_DOW_POSITION = { X: 250, Y: [550, 650, 770] }
const ROAD_POSITION = { X: windowWidth - 100, Y: [630, 750, 850] }

const generateBound = game => {
  game.physics.world.setBounds(0, 300, windowWidth - 50, 600)

  game.left_collider = new Phaser.Physics.Arcade.Sprite(game, 0, 0).setOrigin(
    0,
    0
  )

  //no idea if it is necessary
  game.left_collider.height = game.cameras.main.height
  //add to scene
  game.add.existing(game.left_collider)
  //add to physics
  game.physics.add.existing(game.left_collider, true)
  //set the physics body width/height to accommodate your desired size
  game.left_collider.body.height = game.cameras.main.height

  //after that just add overlap
}

const addCollider = (game, object) => {
  game.physics.add.overlap(
    object,
    game.left_collider,
    () => {
      setTimeout(() => {
        object.setActive(false)
        object.setVisible(false)
      }, 5000)
    },
    null
  )
}

const generateKaohsiungBackground = game => {
  const scaleRate = window.innerHeight / 1080
  game.background = game.add.tileSprite(
    windowWidth / 2,
    windowHeight / 2,
    1920 / scaleRate,
    1080,
    'background'
  )
  game.background.setScale(scaleRate)
}

const generateHanDowHealth = game => {
  game.hanDowHealth = game.add.group({ defaultKey: 'hanDowHealth' })
  game.hanDowHealth.create(50, 50, 'bgLife').setScale(0.8)
  game.hanDowHealth.create(100, 50, 'bgLife').setScale(0.8)
  game.hanDowHealth.create(150, 50, 'bgLife').setScale(0.8)
}

const addHanDowHealthOne = game => {
  const remainingHealth = game.hanDowHealth.getLength()
  game.hanDowHealth
    .create((remainingHealth + 1) * 50, 50, 'bgLife')
    .setScale(0.8)
}

const generateHanDowCoin = game => {
  // coin icon
  game.bgCoin = game.add.image(windowWidth - 150, 50, 'bgCoin').setScale(0.8)

  // number of han dow coin
  game.hanDowCoin = 0
  game.hanDowCoinText = game.add.text(
    windowWidth - 110,
    28,
    `x${game.hanDowCoin}`,
    {
      fontSize: 50,
      fill: 'black'
    }
  )
}

const generateGameTimer = game => {
  game.gameTime = 90
  const timeText = game.add.text(
    windowWidth / 2 - 100,
    30,
    `Time: ${game.gameTime}`,
    {
      fontSize: 48,
      fill: 'black'
    }
  )

  game.gameTimeCountDown = setInterval(() => {
    game.gameTime -= 1
    timeText.setText(`Time: ${game.gameTime}`)
    if (game.gameTime === 0) {
      clearInterval(game.gameTimeCountDown)
    }
  }, 1000)
}

const generateCoin = game => {
  game.anims.create({
    key: 'displayCoin',
    frames: game.anims.generateFrameNumbers('coinOnTheRoad', {
      start: 1,
      end: 1
    }),
    frameRate: 1,
    repeat: 1
  })
  game.anims.create({
    key: 'getCoin',
    frames: game.anims.generateFrameNumbers('coinOnTheRoad', {
      start: 0,
      end: 0
    }),
    frameRate: 1,
    repeat: 1
  })
  game.coinOnTheRoad = game.physics.add.group({
    defaultKey: 'coinOnTheRoad'
  })
  const generateCoinCallBack = game => {
    const rand = Math.floor(Math.random() * 3)
    const coin = game.coinOnTheRoad.create(
      ROAD_POSITION.X,
      ROAD_POSITION.Y[rand],
      'coinOnTheRoad'
    )
    coin.anims.play('displayCoin', true)
    coin.setCircle(40, 80, 80).setDepth(rand)

    addCollider(game, coin)
  }

  return generateCoinCallBack
}

const generateMushroom = game => {
  game.anims.create({
    key: 'displayMushroom',
    frames: game.anims.generateFrameNumbers('mushroomOnTheRoad', {
      start: 0,
      end: 0
    }),
    frameRate: 1,
    repeat: 1
  })
  game.anims.create({
    key: 'getMushroom',
    frames: game.anims.generateFrameNumbers('mushroomOnTheRoad', {
      start: 1,
      end: 1
    }),
    frameRate: 1,
    repeat: 1
  })
  game.mushroomOnTheRoad = game.physics.add.group({
    defaultKey: 'mushroomOnTheRoad'
  })
  const generateMushroomCallBack = game => {
    const rand = Math.floor(Math.random() * 3)
    const mushroom = game.mushroomOnTheRoad.create(
      ROAD_POSITION.X,
      ROAD_POSITION.Y[rand],
      'mushroomOnTheRoad'
    )
    mushroom.anims.play('displayMushroom', true)
    mushroom
      .setSize(100, 100)
      .setScale(0.8)
      .setDepth(rand)

    addCollider(game, mushroom)
  }

  return generateMushroomCallBack
}

const generateStar = game => {
  game.anims.create({
    key: 'displayStar',
    frames: game.anims.generateFrameNumbers('starOnTheRoad', {
      start: 0,
      end: 0
    }),
    frameRate: 1,
    repeat: 1
  })
  game.anims.create({
    key: 'getStar',
    frames: game.anims.generateFrameNumbers('starOnTheRoad', {
      start: 1,
      end: 1
    }),
    frameRate: 1,
    repeat: 1
  })
  game.starOnTheRoad = game.physics.add.group({
    defaultKey: 'starOnTheRoad'
  })
  const generateStarCallBack = game => {
    const rand = Math.floor(Math.random() * 3)
    const star = game.starOnTheRoad.create(
      ROAD_POSITION.X,
      ROAD_POSITION.Y[rand],
      'starOnTheRoad'
    )
    star.anims.play('displayStar', true)
    star
      .setSize(100, 100)
      .setScale(0.8)
      .setDepth(rand)

    addCollider(game, star)
  }

  return generateStarCallBack
}

/**
 * calculate han dow's position Y
 * @param {Number} hanDowY
 * @param {String} key
 */
function getHanDowPosition(hanDow, hanDowY, key) {
  if (hanDowY === HAN_DOW_POSITION.Y[0]) {
    switch (key) {
      case 'down':
        hanDow.setDepth(1)
        return HAN_DOW_POSITION.Y[1]
      default:
        return hanDowY
    }
  } else if (hanDowY === HAN_DOW_POSITION.Y[1]) {
    switch (key) {
      case 'up':
        hanDow.setDepth(0)
        return HAN_DOW_POSITION.Y[0]
      case 'down':
        hanDow.setDepth(2)
        return HAN_DOW_POSITION.Y[2]
      default:
        return hanDowY
    }
  } else {
    switch (key) {
      case 'up':
        hanDow.setDepth(1)
        return HAN_DOW_POSITION.Y[1]
      default:
        return hanDowY
    }
  }
}

const generateHanDow = game => {
  game.hanDow = game.physics.add.sprite(
    HAN_DOW_POSITION.X,
    HAN_DOW_POSITION.Y[1],
    'hanDow'
  )
  game.hanDow
    .setSize(250, 70, 0)
    .setScale(0.8)
    .setOffset(100, 300)
    .setDepth(1)
  game.anims.create({
    key: 'run',
    frames: game.anims.generateFrameNumbers('hanDow', { start: 0, end: 1 }),
    frameRate: 5,
    repeat: -1
  })
  game.anims.create({
    key: 'youCantSeeMe',
    frames: game.anims.generateFrameNumbers('hanDow', { start: 3, end: 4 }),
    frameRate: 5,
    repeat: -1
  })
  game.anims.create({
    key: 'winwin',
    frames: game.anims.generateFrameNumbers('hanDow', { start: 0, end: 2 }),
    frameRate: 10,
    repeat: -1
  })
  game.anims.create({
    key: 'loser',
    frames: game.anims.generateFrameNumbers('hanDow', { start: 1, end: 2 }),
    frameRate: 10,
    repeat: -1
  })
  game.hanDow.anims.play('run', true)

  game.hanDow.setCollideWorldBounds(true)
  // game.hanDow.body.onWorldBounds = true
  game.hanDow.setBounce(1, 1)

  // han dow operations
  const keyUp = game.input.keyboard.addKey('up')
  const keyDown = game.input.keyboard.addKey('down')
  keyUp.on('down', () => {
    game.hanDow.y = getHanDowPosition(game.hanDow, game.hanDow.y, 'up')
  })
  keyDown.on('down', () => {
    game.hanDow.y = getHanDowPosition(game.hanDow, game.hanDow.y, 'down')
  })
}

const generateTsai = game => {
  game.monsterTsai = game.physics.add.group({
    defaultKey: 'monsterTsai'
  })
  const generateMonsterTsaiCallback = game => {
    const rand = Math.floor(Math.random() * 3)
    const tsai = game.monsterTsai.create(
      ROAD_POSITION.X - 50,
      HAN_DOW_POSITION.Y[rand],
      'monsterTsai'
    )
    tsai
      .setSize(250, 70, 0)
      .setScale(0.8)
      .setOffset(0, 230)
      .setDepth(rand)

    addCollider(game, tsai)
  }

  return generateMonsterTsaiCallback
}

const generateGuo = game => {
  game.monsterGuo = game.physics.add.group({
    defaultKey: 'monsterGuo'
  })
  const generateMonsterGuoCallback = game => {
    const rand = Math.floor(Math.random() * 3)
    const guo = game.monsterGuo.create(
      ROAD_POSITION.X - 50,
      HAN_DOW_POSITION.Y[rand],
      'monsterGuo'
    )
    guo
      .setSize(250, 70, 0)
      .setScale(0.8)
      .setOffset(0, 230)
      .setDepth(rand)

    addCollider(game, guo)
  }

  return generateMonsterGuoCallback
}

const generateRock = game => {
  game.monsterRock = game.physics.add.group({
    defaultKey: 'monsterRock'
  })
  const generateMonsterRockCallback = game => {
    const rand = Math.floor(Math.random() * 3)
    const rock = game.monsterRock.create(
      ROAD_POSITION.X - 50,
      ROAD_POSITION.Y[rand],
      'monsterRock'
    )
    rock.setScale(0.8).setDepth(rand)

    addCollider(game, rock)
  }

  return generateMonsterRockCallback
}

const generateMos = game => {
  game.monsterMos = game.physics.add.group({
    defaultKey: 'monsterMos'
  })
  const generateMonsterMosCallback = game => {
    const rand = Math.floor(Math.random() * 3)
    const mosquito = game.monsterMos.create(
      ROAD_POSITION.X - 50,
      ROAD_POSITION.Y[rand],
      'monsterMos'
    )
    mosquito
      .setSize(100, 50)
      .setScale(0.8)
      .setOffset(0, 70)
      .setDepth(rand)

    addCollider(game, mosquito)
  }

  return generateMonsterMosCallback
}

const generate1450 = game => {
  game.monster1450 = game.physics.add.group({
    defaultKey: 'monster1450'
  })
  const generateMonster1450Callback = game => {
    const rand = Math.floor(Math.random() * 3)
    const onFourFiveZero = game.monster1450.create(
      ROAD_POSITION.X - 50,
      HAN_DOW_POSITION.Y[rand],
      'monster1450'
    )
    onFourFiveZero
      .setSize(200, 70, 0)
      .setScale(0.8)
      .setOffset(0, 230)
      .setDepth(rand)

    addCollider(game, onFourFiveZero)
  }

  return generateMonster1450Callback
}

const generateFlood = game => {
  game.monsterFlood = game.physics.add.group({
    defaultKey: 'monsterFlood'
  })
  const generateMonsterFloodCallback = game => {
    const rand = Math.floor(Math.random() * 3)
    const flood = game.monsterFlood.create(
      windowWidth + 100,
      ROAD_POSITION.Y[rand],
      'monsterFlood'
    )
    flood
      .setSize(820, 70)
      .setScale(0.8)
      .setOffset(-20, 100)
      .setDepth(rand)

    addCollider(game, flood)
  }

  return generateMonsterFloodCallback
}

const hanDowMinusHealth = (game, monster) => {
  if (game.hanDowHealth.getLength() > 0 && !game.youCantSeeHanDow) {
    monster.setVelocityX(100)

    const looseHealth = game.hanDowHealth.getChildren()[
      game.hanDowHealth.getLength() - 1
    ]
    game.hanDowHealth.remove(looseHealth)
    looseHealth.visible = false
  } else {
    monster.setVelocityX(500)
    monster.setVelocityY(-500)
  }
}

// end game

const generateGameWinMessage = game => {
  game.add
    .image(windowWidth / 2, windowHeight / 2 - 100, 'winRibbon')
    .setDepth(5)

  game.add
    .image(windowWidth / 2, windowHeight / 2 - 100, 'winFadatsai')
    .setScale(0.8)
    .setDepth(5)

  const restartBtn = game.add
    .image(windowWidth / 2, windowHeight / 2 + 200, 'restartBtn')
    .setScale(0.8)
    .setDepth(5)
  restartBtn.setInteractive()
  restartBtn.on('pointerdown', () => game.scene.start('gamePlay'))

  game.winLine = game.add
    .image(windowWidth / 2 - 300, windowHeight / 2 + 270, 'winLine')
    .setScale(0.8)

  const fadatsai = game.physics.add
    .image(windowWidth / 2, 0, 'fadatsai')
    .setScale(0.8)
    .setGravity(0, 200)

  fadatsai.setCollideWorldBounds(true)
}

const hanDowWinWin = game => {
  game.hanDow.play('winwin', true)
  game.hanDow.setDepth(0)
  game.hanDow.setVelocityX(200)
}

const generateGameOverMessage = game => {
  game.add
    .image(windowWidth / 2, windowHeight / 2 - 100, 'gameOver')
    .setScale(0.8)
  game.restartBtn = game.add
    .image(windowWidth / 2, windowHeight / 2 + 150, 'restartBtn')
    .setScale(0.8)
  game.restartBtn.setInteractive()
  game.restartBtn.on('pointerdown', () => game.scene.start('gamePlay'))
}

const removeCoin = game => {
  game.coinOnTheRoad.children.iterate(coin => {
    coin.setActive(false)
    coin.setVisible(false)
  })
}

const removeMushroom = game => {
  game.mushroomOnTheRoad.children.iterate(mushroom => {
    mushroom.setActive(false)
    mushroom.setVisible(false)
  })
}

const removeStar = game => {
  game.starOnTheRoad.children.iterate(star => {
    star.setActive(false)
    star.setVisible(false)
  })
}

const removeTsai = game => {
  game.monsterTsai.children.iterate(tsai => {
    tsai.setActive(false)
    tsai.setVisible(false)
  })
}

const removeGuo = game => {
  game.monsterGuo.children.iterate(guo => {
    guo.setActive(false)
    guo.setVisible(false)
  })
}

const removeMos = game => {
  game.monsterMos.children.iterate(mos => {
    mos.setActive(false)
    mos.setVisible(false)
  })
}

const removeRock = game => {
  game.monsterRock.children.iterate(rock => {
    rock.setActive(false)
    rock.setVisible(false)
  })
}

const remove1450 = game => {
  game.monster1450.children.iterate(oneFourFiveZero => {
    oneFourFiveZero.setActive(false)
    oneFourFiveZero.setVisible(false)
  })
}

const removeFlood = game => {
  game.monsterFlood.children.iterate(flood => {
    flood.setActive(false)
    flood.setVisible(false)
  })
}

const gameOverEvent = game => {
  removeCoin(game)
  removeMushroom(game)
  removeStar(game)
  removeTsai(game)
  removeGuo(game)
  removeMos(game)
  removeRock(game)
  remove1450(game)
  removeFlood(game)

  game.coinCollider.destroy()
  game.mushroomCollider.destroy()
  game.starCollider.destroy()
  game.tsaiCollider.destroy()
  game.guoCollider.destroy()
  game.mosCollider.destroy()
  game.rockCollider.destroy()
  game.oneFourFiveZeroCollider.destroy()
  game.floodCollider.destroy()

  clearInterval(game.gameTimeCountDown)

  game.gameTimer.destroy()
}

const checkGameOver = game => {
  return game.hanDowHealth.getLength() === 0
}

const gamePlay = {
  key: 'gamePlay',
  /**
   * load game resource
   */
  preload: function() {
    this.load.image('background', 'img/背景＿又老又窮.jpg')
    this.load.image('bgCoin', 'img/金幣數.svg')
    this.load.image('bgLife', 'img/生命.svg')

    this.load.spritesheet('coinOnTheRoad', 'img/金幣.png', {
      frameWidth: 250,
      frameWidth: 250
    })

    this.load.spritesheet('mushroomOnTheRoad', 'img/中天菇.png', {
      frameWidth: 250,
      frameWidth: 250
    })

    this.load.spritesheet('starOnTheRoad', 'img/星星.png', {
      frameWidth: 250,
      frameWidth: 250
    })

    // monsters
    this.load.image('monsterTsai', 'img/老蔡.svg')
    this.load.image('monsterGuo', 'img/老郭.svg')
    this.load.image('monsterMos', 'img/蚊子.png')
    this.load.image('monsterRock', 'img/石頭.svg')
    this.load.image('monster1450', 'img/1450.svg')
    this.load.image('monsterFlood', 'img/淹大水.png')

    this.load.spritesheet('hanDow', 'img/韓導.png', {
      frameWidth: 450,
      frameHeight: 450
    })

    this.load.image('winRibbon', 'img/彩帶.svg')
    this.load.image('winFadatsai', 'img/高雄發大財.png')
    this.load.image('fadatsai', 'img/發大財.svg')
    this.load.image('winLine', 'img/終點線.svg')
    this.load.image('restartBtn', 'img/restart.png')

    this.load.image('gameOver', 'img/game over.svg')

    this.youCantSeeHanDow = false
  },
  /**
   * after loading finish, add the regarding setting and game objects
   */
  create: function() {
    generateBound(this)
    // kaohsiung background
    generateKaohsiungBackground(this)

    // han dow's lifes
    generateHanDowHealth(this)

    // game coin (top right)
    generateHanDowCoin(this)

    // initial han dow's position
    generateHanDow(this)

    // game time (top left)
    generateGameTimer(this)

    /***************** something on the road *****************/

    // coin generator (on road)
    this.coinGenerator = generateCoin(this)

    this.mushroomGenerator = generateMushroom(this)

    this.starGenerator = generateStar(this)

    this.tsaiGenerator = generateTsai(this)

    this.guoGenerator = generateGuo(this)

    this.mosGenerator = generateMos(this)

    this.rockGenerator = generateRock(this)

    this.oneFourFiveZeroGenerator = generate1450(this)

    this.floodGenerator = generateFlood(this)

    const generateGameObject = () => {
      switch (this.gameTime % 10) {
        case 0:
          this.floodGenerator(this)
          break
        case 1:
          this.mushroomGenerator(this)
          break
        case 2:
          this.coinGenerator(this)
          break
        case 3:
          this.guoGenerator(this)
          break
        case 4:
          this.starGenerator(this)
          break
        case 5:
          this.tsaiGenerator(this)
          break
        case 6:
          this.mosGenerator(this)
          break
        case 7:
          this.guoGenerator(this)
          break
        case 8:
          this.rockGenerator(this)
          break
        case 9:
          this.oneFourFiveZeroGenerator(this)
          break
      }

      if (this.gameTime === 0) {
        generateGameWinMessage(this)

        hanDowWinWin(this)

        gameOverEvent(this)
      }
    }
    this.gameTimer = this.time.addEvent({
      delay: 1000,
      callback: generateGameObject,
      loop: true
    })

    // ****************** collide event********************

    // han dow get coin
    const hanDowGetCoin = (hanDow, coin) => {
      coin.anims.play('getCoin', true)
      coin.setVelocityY(-100)

      // hide and kill coin object after 3ms
      this.coinOnTheRoad.remove(coin)
      setTimeout(() => {
        coin.visible = false
        coin.destroy()
      }, 300)

      this.hanDowCoin += 1
      this.hanDowCoinText.setText(`x${this.hanDowCoin}`)
    }
    this.coinCollider = this.physics.add.collider(
      this.hanDow,
      this.coinOnTheRoad,
      hanDowGetCoin
    )

    const hanDowGetMushroom = (hanDow, mushroom) => {
      addHanDowHealthOne(this)
      mushroom.anims.play('getMushroom', true)
      mushroom.setVelocityY(-100)

      // hide and kill mushroom object after 3ms
      this.mushroomOnTheRoad.remove(mushroom)
      mushroom.setActive(false)

      setTimeout(() => {
        mushroom.setVisible(false)
        mushroom.destroy()
      }, 300)
    }
    this.mushroomCollider = this.physics.add.collider(
      this.hanDow,
      this.mushroomOnTheRoad,
      hanDowGetMushroom
    )

    const hanDowGetStar = (hanDow, star) => {
      hanDow.anims.play('youCantSeeMe')
      this.youCantSeeHanDow = true
      setTimeout(() => {
        hanDow.anims.play('run')
        this.youCantSeeHanDow = false
      }, 8000)

      star.anims.play('getStar', true)
      star.setVelocityY(-100)

      // hide and kill Star object after 3ms
      this.starOnTheRoad.remove(star)
      star.setActive(false)

      setTimeout(() => {
        star.setVisible(false)
        star.destroy()
      }, 300)
    }
    this.starCollider = this.physics.add.collider(
      this.hanDow,
      this.starOnTheRoad,
      hanDowGetStar
    )

    //  han dow collide monster tsai
    const tsaiHitHanDow = (hanDow, tsai) => {
      this.monsterTsai.remove(tsai)
      hanDowMinusHealth(this, tsai)

      if (checkGameOver(this)) {
        gameOverEvent(this)
      }
    }
    this.tsaiCollider = this.physics.add.collider(
      this.hanDow,
      this.monsterTsai,
      tsaiHitHanDow
    )

    // han dow collide monster guo
    const guoHitHanDow = (hanDow, guo) => {
      this.monsterGuo.remove(guo)
      hanDowMinusHealth(this, guo)

      if (checkGameOver(this)) {
        gameOverEvent(this)
      }
    }
    this.guoCollider = this.physics.add.collider(
      this.hanDow,
      this.monsterGuo,
      guoHitHanDow
    )

    const mosHitHanDow = (hanDow, mosquito) => {
      this.monsterMos.remove(mosquito)
      hanDowMinusHealth(this, mosquito)

      if (checkGameOver(this)) {
        gameOverEvent(this)
      }
    }
    this.mosCollider = this.physics.add.collider(
      this.hanDow,
      this.monsterMos,
      mosHitHanDow
    )

    const rockHitHanDow = (hanDow, rock) => {
      rock.setActive(false)
      this.monsterRock.remove(rock)
      hanDowMinusHealth(this, rock)

      if (checkGameOver(this)) {
        gameOverEvent(this)
      }
    }
    this.rockCollider = this.physics.add.collider(
      this.hanDow,
      this.monsterRock,
      rockHitHanDow
    )

    const oneFourFiveZeroHitHanDow = (hanDow, oneFourFiveZero) => {
      oneFourFiveZero.setActive(false)
      this.monster1450.remove(oneFourFiveZero)
      hanDowMinusHealth(this, oneFourFiveZero)

      if (checkGameOver(this)) {
        gameOverEvent(this)
      }
    }
    this.oneFourFiveZeroCollider = this.physics.add.collider(
      this.hanDow,
      this.monster1450,
      oneFourFiveZeroHitHanDow
    )

    const floodHitHanDow = (hanDow, flood) => {
      flood.setActive(false)
      this.monsterFlood.remove(flood)
      hanDowMinusHealth(this, flood)

      if (checkGameOver(this)) {
        gameOverEvent(this)
      }
    }
    this.floodCollider = this.physics.add.collider(
      this.hanDow,
      this.monsterFlood,
      floodHitHanDow
    )
  },
  /**
   * reflash the game scene
   */
  update: function() {
    this.background.tilePositionX += 4

    // coin move
    this.coinOnTheRoad.children.iterate(coin => {
      coin.x -= 4
    })

    this.mushroomOnTheRoad.children.iterate(mushroom => {
      mushroom.x -= 4
    })

    this.starOnTheRoad.children.iterate(star => {
      star.x -= 4
    })

    // monster

    this.monsterTsai.children.iterate(tsai => {
      tsai.x -= 4
    })

    this.monsterGuo.children.iterate(guo => {
      guo.x -= 4
    })

    this.monsterMos.children.iterate(mos => {
      mos.x -= 4
    })

    this.monsterRock.children.iterate(rock => {
      rock.x -= 4
    })

    this.monster1450.children.iterate(oneFourFiveZero => {
      oneFourFiveZero.x -= 4
    })

    this.monsterFlood.children.iterate(flood => {
      flood.x -= 10
    })
    if (checkGameOver(this)) {
      generateGameOverMessage(this)
      this.hanDow.anims.play('loser', true)
    }
  }
}
