class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // TODO: how the heck do you wait for a file to load before doing stuff....
        this.load.json('roomDataJSON', '/src/roomData.json').onload(() => {
            let roomData = this.cache.json.get('roomDataJSON');
            console.log(roomData);
            // load assets from json
            // for each room...
            for (let i = 0; i < roomData.length; i++) {
                // set load path
                this.load.path = roomData[i].assetPath;
                // load background
                console.log(roomData[i].bgTextureKey);
                this.load.image(roomData[i].bgTextureKey, roomData[i].bgTextureFile);
                // load assets for each item
                let objs = roomData[i].items;
                for (let j = 0; j < objs.length; j++) {
                    this.load.image(objs[i].textureKey, objs[j].textureFile);
                }
                // TODO: sound will have a different load path, how do we want to handle that
            }
        });
    }

    create() {
        // start menu
        this.scene.start('menuScene');
    }
}