class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        //load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
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
    }

    update(){

        this.starfield.tilePositionX -= 4;
        this.p1Rocket.update();
        this.ship01.update();
        this.ship02.update();
        this.ship03.update();

        //Collision check
        if (this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.ship03.reset();

        }
        if (this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.ship02.reset();
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.ship01.reset();
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
}