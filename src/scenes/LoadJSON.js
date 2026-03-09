class LoadJSON extends Phaser.Scene {
    constructor() {
        super('loadJSONScene');
    }

    preload() {
        this.load.json('roomDataJSON', '/src/roomData.json');
        // once json loads, move to load scene
        this.load.once("load", function (fileObj) {
            this.scene.start('loadScene');
        }, this);
    }
}