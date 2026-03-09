class End extends Phaser.Scene {
    constructor() {
        super("endScene");
    }

    create() {
        // display menu text
        this.add.text(config.width / 2, config.height / 2 - 40, "you've packed everything!\nclick to return to menu :]", {fontSize: 30}).setOrigin(0.5);

        this.input.on('pointerdown', () => {
            this.sound.play("ui-sfx");
            this.scene.start('menuScene');
        })
    }
}