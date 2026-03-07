// prefab for a view of a room
class Room extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, roomData, hasBox) {
        console.log(texture);
        super(scene, x, y, texture);
        scene.add.existing(this); // add to existing, displayList, updateList
        console.log(this);

        // parse roomData and set up objects and transition areas
        // roomData is just the obj from the json containing data for this specific room
        this.items = [];
        for (let i = 0; i < roomData.items.length; i++) {
            this.items.push(new Item(scene, roomData.items[i].x, roomData.items[i].y, roomData.items[i].textureKey, roomData.items[i].soundKey, roomData.items[i].message).setOrigin(0));
        }
        this.scale = 0.3
    }

    create() {

    }
}