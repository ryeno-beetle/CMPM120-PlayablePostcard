class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        this.load.json('roomDataJSON', '/src/roomData.json');

        // set load path
        this.load.path = 'assets/';
    }

    create() {
        // start menu
        this.scene.start('menuScene');
    }
}