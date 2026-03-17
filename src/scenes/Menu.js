class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        this.bg = this.add.sprite(0, 0, "envelope").setDepth(-1).setOrigin(0);
        
        this.startButton = new Button(this, w / 2 + 30, h / 2 + 15);
        this.startButton.anims.play("playsticker_anim");
        this.creditsButton = new Button(this, this.startButton.x, this.startButton.y + 150, "credits");

        // when starting, fade to instructions before starting play
        this.startButton.on("pointerdown", () => {
            this.cameras.main.fadeOut(250);
            this.cameras.main.on("camerafadeoutcomplete", () => {
                this.bg.setVisible(false);
                this.startButton.toggleVisibility();
                this.creditsButton.toggleVisibility();

                this.add.text(config.width / 2, config.height / 2 - 40,
                    "spring finals are done and it's time to move out!\n\
but you need to finish packing...\n\n\n\
explore with your mouse to see what is interactable,\n\
and click to interact.\n\
\n\nclick to start!",
                    {fontFamily: "almond-milky", fontSize: 30, fontColor: 0x000000}).setOrigin(0.5);
                this.add.text(config.width / 2, config.height * 0.75,
                    "if you are having trouble finding an item, press [P] to have a random item\n\
automatically picked up so you can pack everything and see the ending!",
                    {fontFamily: "almond-milky", fontSize: 20, fontColor: 0x000000}).setOrigin(0.5);
                this.cameras.main.fadeIn(250);

                this.input.on("pointerdown", () => {
                    this.sound.play("ui-sfx");
                    this.cameras.main.fadeOut(250);
                    this.cameras.main.on("camerafadeoutcomplete", () => {
                        this.scene.start('playScene');
                    });
                })
            });
        });

        // popup for credits
        this.creditsButton.on("pointerdown", () => {
            let creditsTxt = "All art, code, sound, and design by Rye D. and Lynn G.\n\n\
Everything made and recorded in-house (literally).\n\
Font is Almond Milky (personal use OK).";
            this.startButton.toggleVisibility();
            this.creditsButton.toggleVisibility();
            this.credits = new Popup(this, creditsTxt, "yay!");
            this.credits.on("popupClosed", () => {
                this.startButton.toggleVisibility();
                this.creditsButton.toggleVisibility();
            });
        });
    }
}