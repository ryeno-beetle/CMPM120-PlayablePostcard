// prefab for a view of a room
class Room extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, roomData, hasBox) {
        console.log(texture);
        super(scene, x, y, texture);

        this.setVisible(false);
        scene.add.existing(this); // add to existing, displayList, updateList
        console.log(this);
        this.roomData = roomData;

        // parse roomData and set up its objects and transition areas
        // roomData is just the obj from the json containing data for this specific room
        this.items = [];
        for (let i = 0; i < roomData.items.length; i++) {
            //TODO: does name need to match the state cause we are referring to the dining room as tableState
            this.items.push(new Item(scene, roomData.name, roomData.items[i].x, roomData.items[i].y,
                roomData.items[i].textureKey, roomData.items[i].soundKey, roomData.items[i].message).setOrigin(0));
            this.items[i].setVisible(false);
        }
        this.scale = 0.3
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
    }
}