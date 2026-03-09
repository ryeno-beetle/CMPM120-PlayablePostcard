// prefab for a zone that changes your view when clicked
class TransitionArea extends Phaser.GameObjects.Sprite {
    constructor(scene, room, x, y, texture, nextRoom) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        
        console.log("just added NEW TRANS AREA" + texture);
        this.room = room;
        this.nextRoom = nextRoom;
        this.LOW_ALPHA = 0.25;
        this.HIGH_ALPHA = 0.5;
        this.setDepth(-1);  // go behind items
        this.setAlpha(this.LOW_ALPHA);   // hide initially TODO: alpha 0 makes it uninteractable.. is that bad

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
            console.log("NEXT ROOM:", this.nextRoom, "AHOY");
            let currentState = this.room + "State";
            // console.log("this state is", this.scene.roomFSM.possibleStates[currentState]);
            // console.log("state type is:", typeof(this.scene.roomFSM.possibleStates.state));
            // hide room we are leaving
            // accessing the FSM's state and manipulating it from here is nontrivial
            //      because roomFSM.state is just a string?? and not the actual state???
            //      
            // get FSM -> get possibleStates obj -> get state from key from this room's name -> get/call whatever
            this.scene.roomFSM.possibleStates[currentState].room.toggleVisibility();
            // change state
            this.scene.roomFSM.possibleStates[currentState].stateMachine.transition(this.nextRoom);
        });
        // callbacks for adjusting alpha depending on hover
        this.on("pointerover", (pointer, localX, localY, event) => {
            this.setAlpha(this.HIGH_ALPHA);
        });
        this.on("pointerout", (pointer, localX, localY, event) => {
            this.setAlpha(this.LOW_ALPHA);
        });
    }
}