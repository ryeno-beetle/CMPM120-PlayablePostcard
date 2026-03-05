// play scene! main game scene

class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        // make list of instatiated prefabs for each room
        let roomData = this.cache.json.get('roomDataJSON');
        console.log(roomData);
        //TODO: parse the thing

        // init FSM for rooms
        this.roomFSM = new StateMachine('tvState', {
            tvState: new TVState(),
            couchState: new CouchState(),
            shoeState: new ShoeState(),
            tableState: new TableState(),
            stoveState: new StoveState(),
            fridgeState: new FridgeState(),
            bathroomState: new BathroomState(),
            houseRoomState: new HouseRoomState(),
        }, [this]);
    }

    update() {
        this.roomFSM.step();
    }
}


// room state classes
class TVState extends State {
    enter(scene) {
        console.log("entered tv state");
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
    }
    execute(scene) {

    }
}

class TableState extends State {
    enter(scene) {
        console.log("entered table state");
    }
    execute(scene) {

    }
}

class StoveState extends State {
    enter(scene) {
        console.log("entered stove state");
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