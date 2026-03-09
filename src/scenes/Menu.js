class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        // display menu text
        this.add.text(config.width / 2, config.height / 2 - 40, "spring finals are done and \nit's time to move out!\n\nbut you need to finish packing...\n\nclick to start :3", {fontSize: 30}).setOrigin(0.5);

        this.input.on('pointerdown', () => {
            this.sound.play("ui-sfx");
            this.scene.start('playScene');
        })
    }
}