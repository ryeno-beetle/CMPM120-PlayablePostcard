class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // set load path
        this.load.path = 'assets/';
    }

    create() {
        // start menu
        this.scene.start('menuScene');
    }
}