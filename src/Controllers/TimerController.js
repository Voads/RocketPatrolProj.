export default class TimerController{

    /** @type {Phaser.Scene}*/
    scene

    /** @type {Phaser.GameObjects.Text}*/
    display

    /** @type {Phaser.Time.TimerEvent} */
    timerEvent

    duration = 0;

    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {Phaser.GameObjects.Text} display 
     */
    constructor(scene, display){
        this.scene = scene;
        this.display = display;
    }

    start(duration){
        if (this.timerEvent){
            this.timerEvent.destroy()
            this.timerEvent = undefined
        }
        this.scene.time.addEvent({
            delay: duration
        })
    }

    update(){
        if (!this.timerEvent){
            return
        }

        const elapsed = this.timerEvent

    }
}