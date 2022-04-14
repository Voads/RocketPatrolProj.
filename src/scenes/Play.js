class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        //load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.spritesheet('shipExplo', './assets/shipExplosion.png', 
            {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create(){
        //place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        
        //green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        
        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        //add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding,
        'rocket').setOrigin(0.5, 0);

        //add spaceships
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4,
             'spaceship', 0, 30).setOrigin(0,0); //uppermost ship 
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2,
             'spaceship', 0, 20).setOrigin(0,0); //Mid ship
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 +borderPadding*4,
             'spaceship', 0, 10).setOrigin(0,0); //Bottom ship

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //animation config
        this.anims.create({
            key: 'shipExplode',
            frames: this.anims.generateFrameNumbers('shipExplo', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        //keep score
        this.p1Score = 0;
        //display the score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding:{
                top: 5,
                bottom: 5,
            },
            fixedWidth: 120
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize+ borderPadding * 2, this.p1Score,    
            scoreConfig);
        this.scoreRight = this.add.text(game.config.width - borderPadding - borderUISize, borderUISize + borderPadding * 2, 
            "HS:" + highScore, scoreConfig).setOrigin(1,0);

        //game over flag
        this.gameOver = false;

        //play clock/timer
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTime, () =>{
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart, LEFT for Menu', 
                scoreConfig).setOrigin(.5);
            this.gameOver = true;

            //set highScore
            this.TrackHighScore(this.p1Score);
        }, null, this);

    }

    update(){

        //check for restart key input
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start('menuScene');
        }
        if(!this.gameOver){
            this.starfield.tilePositionX -= 4;
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        //Collision check
        if (this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);

        }
        if (this.checkCollision(this.p1Rocket, this.ship02)){
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
    }

    checkCollision(box1, box2){
        //simple AABB (axis-aligned bounding boxes) check
        if (box1.x < box2.x + box2.width &&
            box1.x + box1.width > box2.x &&
            box1.y < box2.y + box2.height &&
            box1.height + box1.y > box2.y)
            {
                return true;
            } 
            else {return false;}
    
    }

    shipExplode(ship){
        //temp hide ship
        ship.alpha = 0;
        //create explosion sprite
        let boom = this.add.sprite(ship.x, ship.y, 'shipExplo').setOrigin(0,0);
        boom.anims.play('shipExplode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy;
        });
        //add score
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        //audio
        this.sound.play('sfx_explosion');
    }

    //check and replace high score
    TrackHighScore(myScore){

        if (highScore < myScore){
            highScore = myScore;
        }

    }
}