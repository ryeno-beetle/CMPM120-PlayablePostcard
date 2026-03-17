class LoadJSON extends Phaser.Scene {
    constructor() {
        super('loadJSONScene');
    }

    preload() {
        // load json
        this.load.json('roomDataJSON', './src/roomData.json');
        // load atlas
        this.load.atlas('items_atlas', './assets/items_atlas.png', './assets/items_atlas.json');
        // once json loads, move to load scene
        this.load.once("complete", () => {
            this.scene.start('loadScene');
        }, this);
    }
}