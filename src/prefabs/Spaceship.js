//spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointVal){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointVal;
        this.moveSpeed = game.settings.spaceshipSpeed;
        this.randomSpeed = Phaser.Math.Between(this.moveSpeed - .5, this.moveSpeed + 1);
    }

    // create(){
    //     this.randomSpeed = Phaser.Math.Between(1, this.moveSpeed + 1);
    // }

    update(){
        //move left
        //this.x -= this.moveSpeed;
        this.x -= this.randomSpeed;

        //wrap edge-to-edge of game screen
        if(this.x <= 0 - this.width){
            this.x = game.config.width;
        }
    }

    //reset pos
    reset(){
        this.randomSpeed = Phaser.Math.Between(this.moveSpeed - .5, this.moveSpeed + 1);
        this.x = game.config.width;
    }
}