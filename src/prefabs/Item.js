// prefab for an item that the player picks up
class Item extends Phaser.GameObjects.Sprite {
    constructor(scene, room, x, y, texture, pickUpSound, message) {
        super(scene, x, y, texture);
        scene.add.existing(this); // add to existing, displayList, updateList
        
        // console.log("just added" + texture);
        this.room = room;
        this.message = message;
        this.pickUpSound = pickUpSound;
        this.texture = texture;
        
        this.scale = 0.3

        this.setInteractive({useHandCursor: true});

        this.on('pointerdown', () => {
            this.scene.sound.play("ui-sfx");
            //TODO: i've got to pack this first...
            this.handleClick();
        });
    }

    handleClick() {
        // show popup
        // console.log(this.message);
        // scene, message, buttonText
        let popup = new Popup(this.scene, this.message, "pick up!");

        // start holding item once popup gets closed
        popup.on("popupClosed", () => {
            this.holdItem();
        });

        // make obj not interactable
        this.off('pointerdown');
        this.removeInteractive();
    }

    holdItem() {   
        // give our image key to the scene's heldItem
        this.scene.heldItem.setTexture(this.texture);
        this.scene.heldItem.setVisible(true);
        this.scene.sound.play("pack-sfx");  //TODO: pickup sfx
        // remove from parent's item list
        this.room.items.splice(this.room.items.indexOf(this), 1);
        // destroy this item, but the play scene will have the sprite until packed
        this.destroy();
    }
}