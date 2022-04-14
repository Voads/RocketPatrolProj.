export default class TimerController{

    /** @type {Phaser.Scene}*/
    scene

    /** @type {Phaser.GameObjects.Text}*/
    display

    /** @type {Phaser.Time.TimerEvent} */
    timerEvent

    // /** @type {() => void} */
    // finishedCallback

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

    /**
     * 
     * @param {number} duration 
     * @param {() => void} callback 
     */
    start(duration, callback){

        this.stop()

        this.finishedCallback = callback

        this.scene.time.addEvent({
            delay: duration,
            callback: () => {
                this.stop()

                if (callback)
                    { callback() }
            }
        })
    }

    stop(){
        if (this.timerEvent){
            this.timerEvent.destroy()
            this.timerEvent = undefined
        }
    }

    update(){
        if (!this.timerEvent || this.duration <= 0){
            return
        }

        const elapsed = this.timerEvent.getElapsed()
        const remaining = this.duration - elapsed
        const seconds = remaining / 1000

        this.display.text = seconds.toFixed(2);
        

    }
}