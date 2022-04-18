class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        //load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfieldBG', './assets/starfieldBG.png');
        this.load.image('starfieldClose', './assets/starfieldClose.png');
        this.load.image('starfieldMid', './assets/starfieldMid.png');
        this.load.image('starfieldFar', './assets/starfieldFar.png');
        this.load.spritesheet('shipExplo', './assets/shipExplosion.png', 
            {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        
        this.load.image('particle', './assets/defaultParticle.png');
        this.load.image('particleOrange', './assets/darkOrangeParticle.png');
    }

    create(){
        //place tile sprite
        this.starfieldBG = this.add.tileSprite(0, 0, 640, 480, 'starfieldBG').setOrigin(0, 0);
        this.starfieldClose = this.add.tileSprite(0, 0, 640, 480, 'starfieldClose').setOrigin(0, 0);
        this.starfieldMid = this.add.tileSprite(0, 0, 640, 480, 'starfieldMid').setOrigin(0, 0);
        this.starfieldFar = this.add.tileSprite(0, 0, 640, 480, 'starfieldFar').setOrigin(0, 0);
        
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
        this.shipSpecial = new SpaceshipSpecial(this, game.config.width + borderUISize*6, borderUISize * 3.5,
            'rocket', 0, 50).setOrigin(0,0);
        this.shipSpecial.create();

        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4,
             'spaceship', 0, 30).setOrigin(0,0); //uppermost ship 
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2,
             'spaceship', 0, 20).setOrigin(0,0); //Mid ship
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4,
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

        //create particle emitter(s)
        this.particle = this.add.particles('particle');
        //his.particle = this.add.particles('particleOrange');
        this.exploEmitter = this.particle.createEmitter({
            x: 0,
            y: 0,
            speed: { min: -400, max: 400 },
            angle: { min: 0, max: 360 },
            scale: { start: 1, end: 0, ease: 'Power3' },    
            blandMode: 'ADD',
            active: false,
            lifespan: { min: 900, max: 900 },
            quantity: 4,
        });
        //this.exploEmitter.on = false;

        //keep score
        this.p1Score = 0;
        //keep track of successive hits
        this.combo = 0;

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
        //display High Score of play session
        this.scoreRight = this.add.text(game.config.width - borderPadding - borderUISize, borderUISize + borderPadding * 2, 
            "HS:" + highScore, scoreConfig).setOrigin(1,0);

        //game over flag
        this.gameOver = false;

        //play clock/timer with 'oneShot' timer
        scoreConfig.fixedWidth = 0;
        this.delayClock;
        this.clock = this.time.addEvent({delay: game.settings.gameTime, callback: () =>{
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart, LEFT for Menu', 
                scoreConfig).setOrigin(.5);
            this.gameOver = true;

            //track highScore at end of round 
            this.TrackHighScore(this.p1Score);
        }, callbackScope: this, repeat: 0});

        //display clock/timer
        this.secondsLeft = game.settings.gameTime;
        this.displayTimer = this.add.text(game.config.width/2, borderUISize+ borderPadding * 2, this.seconds,    
            scoreConfig).setOrigin(.5,0);

        //display delay clock timer
        this.displayDelay = this.add.text

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
            //Parallax
            this.starfieldClose.tilePositionX -= 5;
            this.starfieldMid.tilePositionX -= 2.5;
            this.starfieldFar.tilePositionX -= 1;

            //class updates
            this.p1Rocket.update();
            this.shipSpecial.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        //Collision check
        if (this.checkCollision(this.p1Rocket, this.shipSpecial)){
            this.p1Rocket.reset();
            this.shipExplode(this.shipSpecial);
            this.ComboTracker(true);
            this.AddTimeCheck(this.combo);
        }
        if (this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            this.ComboTracker(true);
            this.AddTimeCheck(this.combo);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            this.ComboTracker(true);
            this.AddTimeCheck(this.combo);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            this.ComboTracker(true);
            this.AddTimeCheck(this.combo);
        }
        //Check Rocket miss
        if (this.p1Rocket.y <= borderUISize * 3 + borderPadding){
            this.p1Rocket.reset();
            this.ComboTracker(false);
        }

        //update timer display
        if(!this.gameOver && this.secondsLeft >= 0){
            this.secondsLeft = (game.settings.gameTime - this.clock.getElapsed()) / 1000;
            this.displayTimer.text = this.secondsLeft.toFixed(2);

        }
        else{ //sometimes the display is off by .02 seconds, correct this
            this.secondsLeft = 0.00;
            this.displayTimer.text = this.secondsLeft.toFixed(2);

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

        //play particle explosion
        //this.exploEmitter.setOrigin(0,0);
        this.exploEmitter.setPosition(ship.x + 32, ship.y + 32);
        this.exploEmitter.active = true;
        this.exploEmitter.explode(100);
        //this.exploEmitter.on = true;
        //this.exploEmitter.emitParticleAt(100, ship.x + (ship.x/2), ship.y + (ship.y/2));

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

    ComboTracker(hitBool){
        if (hitBool){
            this.combo++;
        }
        else{
            this.combo = 0
        }
    }

    AddTimeCheck(myCombo){
        if (myCombo >= 2){
            //pause game timer
            this.clock.paused = true;

            //var addTime = 0;
            //cap pause time at a maximum of 5 seconds (reached at a combo of 5 and above)
            if (myCombo <= 5){
                //add time
                var addTime = (myCombo) * 1000;
            }
            else{
                var addTime = 5 * 1000;
            }

            //reset timer if it is still going
            if (this.delayClock){
                //console.log('resetting delayclock timer.');
                this.delayClock.reset({
                    delay: addTime,                // ms
                    callback: () =>
                    {
                        this.clock.paused = false;
                        console.log('reset timer finished...')       
                        //this.delayClock.remove();
                    },
                    callbackScope: this,
                    loop: false,
                    repeat: 0,
                    startAt: 0,
                    timeScale: 1,
                    paused: false
                });
                this.time.addEvent(this.delayClock);
            }
            
            //start delay timer
            else {
                this.delayClock = this.time.addEvent({delay: addTime, callback: () =>{
                    this.clock.paused = false;
                    console.log('delayClock finished...')
                    //this.delayClock.remove();

                }, callbackScope: this, repeat: 0});
            }
            
            console.log("Adding time by pausing timer.", this.delayClock.delay.toFixed(2));

        }
    }
}