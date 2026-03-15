// prefab for a popup message, displayed when you pick up items
class Popup extends Phaser.GameObjects.Sprite {
    constructor(scene, message, buttonText) {
        super(scene, config.width/2, config.height/2 - 50, 'popup');
        scene.add.existing(this); // add to existing, displayList, updateList
        this.message = message;
        this.buttonText = buttonText;
        this.scene = scene;
        this.create();
        this.setScale(2.5);
        
        scene.isInPopup = true;
    }

    create() {
        // make message text
        this.messageText = this.scene.add.text(this.x - this.width * 1.1, this.y - this.height * 0.8, this.message,
            {fontSize: 28, color: '#362626'}).setOrigin(0).setDepth(101);
        
        // make button
        let x = this.x + (this.width * 0.6);
        let y = this.y + (this.height * 0.9);
        this.button = this.scene.add.sprite(x, y, 'button').setOrigin(0).setScale(2).setDepth(100);
        this.buttonText = this.scene.add.text(x+22, y+15, this.buttonText, {fontSize: 24, color: '#362626'}).setOrigin(0).setDepth(101);

        this.button.setInteractive({useHandCursor: true});

        this.button.on('pointerdown', () => {
            this.handleClick();
        });
        // darken button on hover
        this.button.on("pointerover", (pointer, localX, localY, event) => {
            this.button.setTint(0xEEEEEE);
        });
        this.button.on("pointerout", (pointer, localX, localY, event) => {
            this.button.setTint(0xFFFFFF);
        });
    }

    handleClick() {
        // this.item.packItem();
        // emit signal that popup was closed, and args for listeners
        this.scene.sound.play("ui-sfx");
        this.emit("popupClosed");
        this.button.destroy();
        this.buttonText.destroy();
        this.messageText.destroy();

        this.scene.isInPopup = false;
        this.destroy();
    }
}