//spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointVal){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointVal;
        this.moveSpeed = game.settings.spaceshipSpeed;;
    }

    update(){
        //move left
        this.x -= this.moveSpeed;

        //wrap edge-to-edge of game screen
        if(this.x <= 0 - this.width){
            this.x = game.config.width;
        }
    }

    //reset pos
    reset(){
        this.x = game.config.width;
    }
}