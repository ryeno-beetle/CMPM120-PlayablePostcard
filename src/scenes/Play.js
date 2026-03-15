// play scene! main game scene

class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        // make list of instatiated prefabs for each room
        let roomData = this.cache.json.get('roomDataJSON');
        this.rooms = [];
        for (let i = 0; i < roomData.length; i++) {
            // console.log(roomData[i].bgTextureKey);
            this.rooms.push(new Room(this, 0, 0, roomData[i].bgTextureKey, roomData[i]).setOrigin(0));
        }
        // console.log(this.rooms);

        // init FSM for rooms
        this.roomFSM = new StateMachine('tvState', {
            tvState: new TVState(),
            couchState: new CouchState(),
            shoeState: new ShoeState(),
            diningState: new DiningState(),
            stoveState: new StoveState(),
            fridgeState: new FridgeState(),
            bathroomState: new BathroomState(),
            houseRoomState: new HouseRoomState(),
        }, [this]);

        // --- vars ---
        this.itemsPacked = 0;
        // set up held item as a sprite whose image changes to whatever we picked up.
        // when not holding anything, visibile will be false and key will be null
        this.heldItem = this.add.sprite(w * 0.75, h * 0.9, null).setOrigin(0.5).setScale(0.5);
        this.heldItem.setVisible(false);
        // if we are in dialogue, we don't want to be able to interact with other things
        this.isInPopup = false;

        // tween to bob held item slightly
        this.heldItemTween = this.tweens.add({
            targets: this.heldItem,
            y: "+=15",
            ease: 'Sine.easeInOut',
            duration: 1000,
            repeat: -1,
            yoyo: true,
        });

        // particles for item no longer being held
        this.itemPoofParticlesConfig = {
            scale: {start: 2, end: 0},
            alpha: {start: 0.9, end: 0},
            speed: {min: -400, max: 400},
            angle: {min: 0, max: 360},
            blendMode: 'SCREEN',
            count: 1,
            frequency: 20,
            lifespan: 500,
            duration: 150,
        };
    }

    update() {
        this.roomFSM.step();
    }

    // helper for fading camera out/in that TransitionAreas can call
    cameraFadeTransition() {
        this.cameras.main.fadeOut(250);
        this.cameras.main.on("camerafadeoutcomplete", () => {
            this.cameras.main.fadeIn(250);
        });
    }
}


// room state classes
class TVState extends State {
    enter(scene) {
        // console.log("entered tv state");
        this.room = scene.rooms.find(room => room.roomData.name === "tv");
        this.room.toggleVisibility();
    }
    execute(scene) {

    }
}

class CouchState extends State {
    enter(scene) {
        // console.log("entered couch state");
        this.room = scene.rooms.find(room => room.roomData.name === "couch");
        this.room.toggleVisibility();
    }
    execute(scene) {

    }
}

class ShoeState extends State {
    enter(scene) {
        // console.log("entered shoe state");
        this.room = scene.rooms.find(room => room.roomData.name === "shoe");
        this.room.toggleVisibility();
    }
    execute(scene) {

    }
}

class DiningState extends State {
    enter(scene) {
        // console.log("entered dining state");
        this.room = scene.rooms.find(room => room.roomData.name === "dining");
        this.room.toggleVisibility();
    }
    execute(scene) {

    }
}

class StoveState extends State {
    enter(scene) {
        // console.log("entered stove state");
        this.room = scene.rooms.find(room => room.roomData.name === "stove");
        this.room.toggleVisibility();
    }
    execute(scene) {

    }
}

class FridgeState extends State {
    enter(scene) {
        // console.log("entered fridge state");
        this.room = scene.rooms.find(room => room.roomData.name === "fridge");
        this.room.toggleVisibility();
    }
    execute(scene) {

    }
}

class BathroomState extends State {
    enter(scene) {
        // console.log("entered bathroom state");
        this.room = scene.rooms.find(room => room.roomData.name === "bathroom");
        this.room.toggleVisibility();
    }
    execute(scene) {

    }
}

class HouseRoomState extends State {
    enter(scene) {
        // console.log("entered HOUSE ROOM state");
        this.room = scene.rooms.find(room => room.roomData.name === "houseRoom");
        this.room.toggleVisibility();
    }
    execute(scene) {

    }
}