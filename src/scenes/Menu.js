class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){
        //load audio
        this.load.audio('sfx_select', './assets/sfx_select.wav');
        this.load.audio('sfx_shoot', './assets/sfx_shoot.wav');
        this.load.audio('sfx_explosion', './assets/sfx_explosion.wav');
    }

    create(){
        //this.scene.start("playScene");
        //menu text config
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding:{
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //Display menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - 
            borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(.5);
        this.add.text(game.config.width/2, game.config.height/2,
            'Use arrow keys to move & (F) to fire', menuConfig).setOrigin(.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 15, 
            'Press LEFT for Novice, \nRIGHT for Super-Chad-Pro', menuConfig).setOrigin(.5);
 
        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
            //novice
            game.settings = {
                spaceshipSpeed: 3,
                gameTime: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            //hard
            game.settings = {
                spaceshipSpeed: 4,
                gameTime: 25000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}