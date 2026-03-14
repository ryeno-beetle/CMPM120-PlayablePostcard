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
        // show one of two popup options
        if (this.scene.heldItem.visible) {  // if holding item, pack it
            let popup = new Popup(this.scene, this.packedMessage + this.scene.heldItem.texture.key + "...", "pack me!");
            popup.on("popupClosed", () => {
                this.packItem();
            });
        } else {    // nothing to pack
            let popup = new Popup(this.scene, this.cantPackMessage, "so true!");
        }
    }

    packItem() {
        // remove held item sprite
        this.scene.heldItem.setTexture(null);
        this.scene.heldItem.setVisible(false);
        // increment packed counter in play scene and trigger game end if it's the last item
        this.scene.itemsPacked += 1;
        if (this.scene.itemsPacked == TOTAL_ITEMS) {
            this.scene.scene.start('endScene');
        }
    }

}