// prefab for an item
class Item extends Phaser.GameObjects.Sprite {
    constructor(scene, room, x, y, texture, pickUpSound, message) {
        super(scene, x, y, texture);
        scene.add.existing(this); // add to existing, displayList, updateList
        
        this.room = room;
        this.message = message;
        this.pickUpSound = pickUpSound;
        
        this.scale = 0.3
    }

    create() {

    }
}