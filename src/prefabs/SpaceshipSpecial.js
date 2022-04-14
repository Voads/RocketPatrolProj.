//spaceship prefab
class SpaceshipSpecial extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointVal){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointVal;
        this.moveSpeed = game.settings.spaceshipSpeed;
        this.randomSpeed = Phaser.Math.Between(this.moveSpeed - .5, this.moveSpeed + 1);
    }

     create(){
        //randomize starting direction on create
        if (Phaser.Math.Between(0,1) > 0.5)
            { this.goLeft = true;}
        else 
            {this.goLeft = false;}
    }

    update(){
        //move left

        //randomize starting direction
        if (this.goLeft)
            {this.x -= (this.moveSpeed + 1);}
        else 
            {this.x += (this.moveSpeed + 1);}

        //wrap edge-to-edge of game screen no matter the velocity
        if (this.goLeft)
        {
            if(this.x <= this.width)
            {
                console.log("is less than going Left");
                this.handleWrap(this.goLeft);
            }
        }
        else 
        {
            if(this.x > game.config.width)
            {
                console.log("is Greater going Right");
                this.handleWrap(this.goLeft);
            }
        }
    }

    //reset pos
    reset(){

        this.reverseBool(this.goLeft);
        this.handleWrap(this.goLeft);
    //  this.x = game.config.width;

    }

    handleWrap(goLeft){
        if (goLeft){
            this.x = game.config.width;
        } else{
            this.x = 0;
        }

    }

    reverseBool(myBool){
        if (myBool){
            myBool = false;
        }
        else{
            myBool = true;
        }
    }
}