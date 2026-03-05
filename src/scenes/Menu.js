class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        // display menu text
        this.add.text(config.width / 2, config.height / 2 - 40, 'postcard!\nclick to start :3', {fontSize: 30}).setOrigin(0.5);

        this.input.on('pointerdown', () => {
            this.scene.start('playScene');
        })
    }
}