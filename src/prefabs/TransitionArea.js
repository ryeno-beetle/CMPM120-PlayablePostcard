// prefab for a zone that changes your view when clicked
class TransitionArea extends Phaser.GameObjects.Sprite {
    constructor(scene, room, x, y, texture, nextRoom) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        
        // console.log("just added NEW TRANS AREA" + texture);
        this.room = room;
        this.nextRoom = nextRoom;
        this.LOW_ALPHA = 0.01;
        this.HIGH_ALPHA = 0.3;
        this.setDepth(-1);  // go behind items
        this.setAlpha(this.LOW_ALPHA);   // hide until hovered over

        // wait prefabs don't have create() by default right
        this.create();
    }

    create() {
        // make self clickable
        this.setInteractive({
            useHandCursor: true,
        });

        // set up callback for when clicked
        this.on("pointerdown", (pointer, localX, localY, event) => {
            // console.log("NEXT ROOM:", this.nextRoom, "AHOY");
            if (!this.scene.isInPopup) {
                // trans fx
                this.scene.sound.play("move-sfx");
                this.scene.cameras.main.fadeOut(250);
                this.scene.cameras.main.on("camerafadeoutcomplete", () => {
                    this.scene.cameras.main.fadeIn(250);
                
                    // do the trans
                    let currentState = this.scene.roomFSM.state;
                    // accessing the FSM's state and manipulating it from here is nontrivial
                    //      because roomFSM.state is just a string?? and not the actual state???
                    //      
                    // get FSM -> get possibleStates obj -> get state from key from FSM string -> get/call whatever
                    this.scene.roomFSM.possibleStates[currentState].room.toggleVisibility();
                    // change state
                    this.scene.roomFSM.possibleStates[currentState].stateMachine.transition(this.nextRoom);
                });
            }
        });

        // callbacks for adjusting alpha depending on hover
        this.on("pointerover", (pointer, localX, localY, event) => {
            if (!this.scene.isInPopup) {
                this.setAlpha(this.HIGH_ALPHA);
            }
        });
        this.on("pointerout", (pointer, localX, localY, event) => {
            this.setAlpha(this.LOW_ALPHA);
        });
    }
}