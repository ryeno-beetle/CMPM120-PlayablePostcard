// prefab for a view of a room
class Room extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, roomData) {
        // console.log(texture);
        super(scene, x, y, texture);

        this.setVisible(false);
        scene.add.existing(this); // add to existing, displayList, updateList
        this.setDepth(-2);  // go behind transitionareas and items
        // console.log(this);
        this.roomData = roomData;

        // parse roomData and set up its objects and transition areas
        // roomData is just the obj from the json containing data for this specific room
        this.items = [];
        this.transitionAreas = [];
        for (let i = 0; i < roomData.items.length; i++) {
            this.items.push(new Item(scene, this, roomData.items[i].x, roomData.items[i].y,
                roomData.items[i].textureKey, roomData.items[i].soundKey, roomData.items[i].message).setOrigin(0));
            this.items[i].setVisible(false);
        }

        // if this room is tv view of living room, add packing box
        // (get box object in roomData that only the tv room has)
        if (roomData.name === "tv") {
            this.box = new Box(scene, this, roomData.box.x, roomData.box.y, roomData.box.textureKey,
                roomData.box.cantPackMessage, roomData.box.packedMessage).setOrigin(0);
            this.box.setVisible(false);
        }

        // set up transition areas
        for (let i = 0; i < roomData.transitions.length; i++) {
            this.transitionAreas.push(new TransitionArea(scene, roomData.name,
                roomData.transitions[i].x, roomData.transitions[i].y, roomData.transitions[i].key,
                roomData.transitions[i].nextState).setOrigin(0));
            this.transitionAreas[i].setVisible(false);
        }
        // console.log(roomData.name, "room areas:", this.transitionAreas);

        // this.scale = 0.3
    }

    create() {

    }

    //TODO: can we add items to the Room instead of scene? so that we could just room.setVisible(false)
    //      and that would change its and its' items visibility
    toggleVisibility() {
        this.visible = !this.visible;
        this.items.forEach((item) => {
            item.visible = !item.visible;
        });
        this.transitionAreas.forEach((trans) => {
            trans.visible = !trans.visible;
        });
        if (this.box) {
            this.box.visible = !this.box.visible;
        }
    }
}