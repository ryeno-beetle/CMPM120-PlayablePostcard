class LoadJSON extends Phaser.Scene {
    constructor() {
        super('loadJSONScene');
    }

    preload() {
        this.load.json('roomDataJSON', '/src/roomData.json');
    }

    create() {
        // start menu
        this.scene.start('loadScene');
    }
}