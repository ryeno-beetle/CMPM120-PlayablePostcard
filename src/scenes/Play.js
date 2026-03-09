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
            console.log(roomData[i].bgTextureKey);
            this.rooms.push(new Room(this, 0, 0, roomData[i].bgTextureKey, roomData[i]).setOrigin(0));
        }
        console.log(this.rooms);

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

        // vars
        this.itemsPacked = 0;
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
        console.log("entered tv state");
        this.room = scene.rooms.find(room => room.roomData.name === "tv");
        this.room.toggleVisibility();
    }
    execute(scene) {

    }
}

class CouchState extends State {
    enter(scene) {
        console.log("entered couch state");
    }
    execute(scene) {

    }
}

class ShoeState extends State {
    enter(scene) {
        console.log("entered shoe state");
        this.room = scene.rooms.find(room => room.roomData.name === "shoe");
        this.room.toggleVisibility();
    }
    execute(scene) {

    }
}

class DiningState extends State {
    enter(scene) {
        console.log("entered dining state");
        this.room = scene.rooms.find(room => room.roomData.name === "dining");
        this.room.toggleVisibility();
    }
    execute(scene) {

    }
}

class StoveState extends State {
    enter(scene) {
        console.log("entered stove state");
        this.room = scene.rooms.find(room => room.roomData.name === "stove");
        this.room.toggleVisibility();
    }
    execute(scene) {

    }
}

class FridgeState extends State {
    enter(scene) {
        console.log("entered fridge state");
    }
    execute(scene) {

    }
}

class BathroomState extends State {
    enter(scene) {
        console.log("entered bathroom state");
    }
    execute(scene) {

    }
}

class HouseRoomState extends State {
    enter(scene) {
        console.log("entered HOUSE ROOM state");
    }
    execute(scene) {

    }
}