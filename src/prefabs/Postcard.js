// postcard class!
class Postcard extends Phaser.GameObjects.Sprite {
    constructor(scene, room, x, y) {
        super(scene, x, y, "postcard_small_A");
        scene.add.existing(this); // add to existing, displayList, updateList
        
        this.room = room;
        
        this.scale = 0.25;

        scene.postcard = this; // add ref to postcard in scene

    }

    makeInteractable() {
        // console.log('EEE');
        // this.key = this.textureB; // does this work? NO but we can just swap the anim it is playing B)
        this.setTexture("postcard_small_B");
        //this.madeInteractable = true;
        this.setInteractive({useHandCursor: true});
        //on click
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
    }

    handleClick() {
        this.setScale(1)
        // console.log('postcard clicked');
        this.scene.sound.play("paper-sfx");
        this.scene.tweens.add({
            targets: this,
            duration: 500,
            alpha: 0,
            onComplete: () => {
                // change texture and location etc while in-between tweens
                this.x = config.width/2;
                this.y = config.height/2;
                this.off('pointerover');
                this.off('pointerout');
                this.setTint(0xFFFFFF);
                //TODO: change texture by playing other anim
                this.setTexture("postcard_big_front");
                this.scene.tweens.add({
                    targets: this,
                    duration: 500,
                    alpha: 1,
                    onComplete: () => {
                        // destroy room
                        // we don't want anything visible below for when you flip it over & won't need room again
                        this.room.destroy();
                    }
                });
            }
        });

        // make arrow button to flip postcard
        this.flipButton = new Button(this.scene, config.width - 100, config.height - 100, "flip! ->"); //TODO: multiple button texture options
        this.flipButton.on('pointerdown', () => {
            this.flip();
        });
        this.off('pointerdown');
    }

    flip() {
        console.log("flip");
        this.flipButton.buttonText.destroy();
        this.flipButton.destroy();
        this.scene.tweens.chain({
            targets: this,
            loop: 0,
            tweens: [
                {
                    scaleX: 0,
                    duration: 500,
                    onStart: () => {
                        this.scene.sound.play("paper-sfx");
                    }
                },
                {
                    onStart: () => {
                        this.setTexture("postcard_big_back");
                    },
                    scaleX: 1,
                    duration: 500,
                    hold: 2000,
                    onComplete: () => {
                        this.restartButton = new Button(this.scene, w / 2, h * 0.9, "put away");
                        this.restartButton.on("pointerdown", () => {
                            this.scene.cameras.main.fadeOut(250);
                            this.scene.cameras.main.on("camerafadeoutcomplete", () => {
                                this.scene.scene.start('menuScene');
                            });
                        })
                    }
                },
            ]
        });
    }
}