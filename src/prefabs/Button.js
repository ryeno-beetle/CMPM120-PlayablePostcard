// making a button prefab because who knew we needed so many buttons
class Button extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, text) {
        super(scene, x, y, 'button');
        scene.add.existing(this); // add to existing, displayList, updateList
        this.scene = scene;
        this.setDepth(102);

        this.buttonText = this.scene.add.text(this.x - this.width / 3, this.y - this.height / 4, text,
            {fontSize: 24, color: '#362626', align: "center"}).setDepth(102);

        this.setInteractive({useHandCursor: true});

        // darken button on hover
        this.on("pointerover", (pointer, localX, localY, event) => {
            this.setTint(0xEEEEEE);
        });
        this.on("pointerout", (pointer, localX, localY, event) => {
            this.setTint(0xFFFFFF);
        });

        // play sound when clicked, but doing other things is up to parent to listen
        this.on("pointerdown", () => {
            scene.sound.play("ui-sfx");
        })
    }

    toggleVisibility() {
        this.visible = !this.visible;
        this.buttonText.visible = !this.buttonText.visible;
    }
}