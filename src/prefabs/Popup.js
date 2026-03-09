// prefab for a popup message, displayed when you pick up items
class Popup extends Phaser.GameObjects.Sprite {
    constructor(scene, item) {
        super(scene, config.width/2, config.height/2 - 50, 'popup');
        scene.add.existing(this); // add to existing, displayList, updateList
        this.item = item;
        this.scene = scene;
        this.create();
        this.setScale(1.5);
    }

    create() {
        // make message text
        this.messageText = this.scene.add.text(this.x - 200, this.y - 50, this.item.message, {fontSize: 18, color: '#362626'}).setOrigin(0).setDepth(101);

        // make button
        let x = 370;
        let y = 240;
        this.button = this.scene.add.sprite(x, y, 'button').setOrigin(0).setScale(1.5);
        this.buttonText = this.scene.add.text(x+15, y+10, 'pack me!', {fontSize: 18, color: '#362626'}).setOrigin(0).setDepth(101);
        this.button.setDepth(100);
        console.log(this.button);

        this.button.setInteractive({useHandCursor: true});

        this.button.on('pointerdown', () => {
            // this.scene.sound.play("ui-sfx");
            this.handleClick();
        });
    }

    handleClick() {
        this.item.packItem();
        this.button.destroy();
        this.buttonText.destroy();
        this.messageText.destroy();
        this.scene.sound.play("pack-sfx");
        this.destroy();
    }
}