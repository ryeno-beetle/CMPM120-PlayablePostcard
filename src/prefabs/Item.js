// prefab for an item
class Item extends Phaser.GameObjects.Sprite {
    constructor(scene, room, x, y, texture, pickUpSound, message) {
        super(scene, x, y, texture);
        
        this.room = room;
        this.message = message;
        this.pickUpSound = pickUpSound;

    }

    create() {

    }
}