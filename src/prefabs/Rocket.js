//Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);//add object to existing scene
        this.isFiring = false;
        this.fireSpd = 2;
        this.moveSpeed = 3;
        this.moveSpdFiring = .7;

        this.sfxRocket = scene.sound.add('sfx_shoot');//add sfx access
    }

    update(){
        //left/right movement
        if(keyLEFT.isDown && this.x >= borderUISize + this.width){
            if(!this.isFiring){
                this.x -= this.moveSpeed;
            } else { //slow speed while firing
                this.x -= this.moveSpdFiring;
            }
        }   
        else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
            if(!this.isFiring){
                this.x += this.moveSpeed;
            } else {
                this.x += this.moveSpdFiring;
            }
        } 
        //fire button
        if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring){
            this.sfxRocket.play();
            this.isFiring = true;
            
        }

        //if fired, move up
        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding){
            this.y -= this.fireSpd;
        }
        
        //reset on miss
        // if (this.y <= borderUISize * 3 + borderPadding){
        //     this.reset();
        // } //now handled in play.update()
    }

    //reset the rocket to the ground
    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding + -2;
    }
}