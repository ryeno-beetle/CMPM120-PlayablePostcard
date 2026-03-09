// prefab for an item that the player picks up
class Item extends Phaser.GameObjects.Sprite {
    constructor(scene, room, x, y, texture, pickUpSound, message) {
        super(scene, x, y, texture);
        scene.add.existing(this); // add to existing, displayList, updateList
        
        console.log("just added" + texture);
        this.room = room;
        this.message = message;
        this.pickUpSound = pickUpSound;
        
        this.scale = 0.3

        this.setInteractive({useHandCursor: true});

        this.on('pointerdown', () => {
            this.handleClick();
        });
    }

    handleClick() {
        // show popup
        console.log(this.message);
        let popup = new Popup(this.scene, this);

        // make obj not interactable
        this.off('pointerdown');
        this.removeInteractive();
    }

    packItem() {
        // pack this item!
        console.log('item packed!');
        // remove from parent's item list
        this.room.items.splice(this.room.items.indexOf(this), 1);
        // increment packed counter in play scene and trigger game end if it's the last item
        this.scene.itemsPacked += 1;
        if (this.scene.itemsPacked == TOTAL_ITEMS) {
            this.scene.scene.start('endScene');
        }
        // destroy item
        this.destroy();

        // TODO: some way of tracking when all items are packed
    }
}