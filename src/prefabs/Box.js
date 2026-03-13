// tv view of living room has the box we pack everything into
class Box extends Phaser.GameObjects.Sprite {
     constructor(scene, room, x, y, texture, cantPackMessage, packedMessage) {
        super(scene, x, y, texture);
        scene.add.existing(this); // add to existing, displayList, updateList
        
        this.room = room;
        //TODO: special box sounds ?
        this.cantPackMessage = cantPackMessage;
        this.packedMessage = packedMessage;

        this.scale = 0.3

        this.setInteractive({useHandCursor: true});

        this.on('pointerdown', () => {
            this.scene.sound.play("ui-sfx");
            this.handleClick();
        });

    }

    handleClick() {
        // show popup
        //TODO: different popups depending on whether holding item
        let popup = new Popup(this.scene, this.cantPackMessage, "so true!");
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
    }

}