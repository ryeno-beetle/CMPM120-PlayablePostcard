// tv view of living room has the box we pack everything into
class Box extends Phaser.GameObjects.Sprite {
     constructor(scene, room, x, y, itemsatlas, frame, animKey, cantPackMessage, packedMessage) {
        super(scene, x, y, itemsatlas, frame);
        scene.add.existing(this); // add to existing, displayList, updateList
        
        this.room = room;
        //TODO: special box sounds ?
        this.cantPackMessage = cantPackMessage;
        this.packedMessage = packedMessage;

        // this.scale = 0.5
        this.anims.play(animKey);
        this.setOrigin(1);

        this.setInteractive({useHandCursor: true, pixelPerfect: true});

        this.on('pointerdown', () => {
            if (!this.scene.isInPopup) {
                this.scene.sound.play("ui-sfx");
                this.handleClick();
            }
        });
        // darken on hover
        this.on("pointerover", (pointer, localX, localY, event) => {
            if (!this.scene.isInPopup) {
                this.setTint(0xEEEEEE);
            }
        });
        this.on("pointerout", (pointer, localX, localY, event) => {
            this.setTint(0xFFFFFF);
        });

        // tween to shake box when something is packed
        //TODO: it still kinda looks like it rotates around the top left for some reason
        this.shakeTween = scene.tweens.chain({
            targets: this,
            // ease: 'Sine.easeInOut',
            loop: 0,
            paused: true,
            persist: true,  // do not destroy after finishing
            tweens: [
                {
                    angle: -5,
                    duration: 30,
                },
                {
                    angle: 5,
                    duration: 60,
                },
                {
                    angle: 0,
                    duration: 30,
                }
            ]
        });
    }

    handleClick() {
        // show one of two popup options
        if (this.scene.heldItem.visible) {  // if holding item, pack it
            // console.log(this.scene.heldItem)
            let popup = new Popup(this.scene, this.packedMessage + this.scene.heldItem.displayName + "...", "pack me!");
            popup.on("popupClosed", () => {
                this.packItem();
            });
        } else {    // nothing to pack
            let popup = new Popup(this.scene, this.cantPackMessage, "so true!");
        }
    }

    packItem() {
        // remove held item sprite, do particles
        this.scene.heldItem.setTexture(null);
        this.scene.heldItem.setVisible(false);

        let poofParticles = this.scene.add.particles(this.scene.heldItem.x, this.scene.heldItem.y, "poofParticle",
            this.scene.itemPoofParticlesConfig);
        poofParticles.start();
        poofParticles.on("complete", () => {
            poofParticles.destroy();
        });

        // desaturate all the room bgs a little so the apt looks more empty :/
        this.scene.rooms.forEach((room) => {
            // amount, multiply? else false
            room.cmFX.saturate(-1 / TOTAL_ITEMS / 1, true);
            // room.cmFX.brightness(1 + 1 / TOTAL_ITEMS / 20, true);
        });


        this.scene.sound.play("pack-sfx");
        this.scene.sound.play(this.scene.heldItemSound, {volume: 0.4});
        this.shakeTween.restart();

        // increment packed counter in play scene and trigger game end if it's the last item
        this.scene.itemsPacked += 1;
        if (this.scene.itemsPacked >= TOTAL_ITEMS) {
            // make postcard interactable and make popup
            this.scene.postcard.makeInteractable();
            let popup = new Popup (this.scene, "Wait, I forgot something...", "go look");
        }
    }

}