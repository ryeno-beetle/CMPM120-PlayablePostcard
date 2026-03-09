class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        let roomData = this.cache.json.get('roomDataJSON');
        console.log(roomData.length);
        // load assets from json
        // for each room...
        for (let i = 0; i < roomData.length; i++) {
            // set load path
            this.load.path = roomData[i].assetPath;
            // load background
            this.load.image(roomData[i].bgTextureKey, roomData[i].bgTextureFile);
            // load assets for each item
            console.log("loading things for room " + roomData[i].name);
            let objs = roomData[i].items;
            console.log("objs: ", objs);
            for (let j = 0; j < objs.length; j++) {
                console.log("in " + roomData[i].name + " room , loading item: " + objs[j].textureKey);
                this.load.image(objs[j].textureKey, objs[j].textureFile);
            }
            // TODO: sound will have a different load path, how do we want to handle that

            // create textures from rects for each transitionarea
            let transes = roomData[i].transitions;
            for (let j = 0; j < transes.length; j++) {
                let rt = this.add.renderTexture(-w, 0, transes[j].w, transes[j].h);
                rt.fill(0xFFFAAA);  //TODO: set better color
                rt.saveTexture(transes[j].key);
            }
        }

        // load ui assets
        this.load.path = './assets/ui/';
        this.load.image('popup', 'popup.png');
        this.load.image('button', 'button.png');

        // load audio
        this.load.path = "./assets/sfx/";
        this.load.audio("ui-sfx", "tap.wav");
        this.load.audio("pack-sfx", "pack.wav");
        this.load.audio("move-sfx", "steps.wav");
    }

    create() {
        // start menu
        this.scene.start('menuScene');
    }
}