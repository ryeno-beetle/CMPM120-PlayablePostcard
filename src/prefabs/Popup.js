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
        let x = this.x + (this.width * 0.75);
        let y = this.y + (this.height);
        this.button = new Button(this.scene, x, y, this.buttonText);

        // listen for click
        this.button.on("pointerdown", () => {
            this.scene.sound.play("ui-sfx");
            this.emit("popupClosed");
            this.button.buttonText.destroy();
            this.button.destroy();
            this.messageText.destroy();

            this.scene.isInPopup = false;
            this.destroy();
        });
    }
}