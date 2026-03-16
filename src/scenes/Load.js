class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        this.add.text(w / 2, h / 2, "Loading . . .");

        let roomData = this.cache.json.get('roomDataJSON');
        // console.log(roomData.length);
        // load assets from json
        // for each room...
        for (let i = 0; i < roomData.length; i++) {
            // set load path
            this.load.path = roomData[i].assetPath;
            // load background
            this.load.image(roomData[i].bgTextureKey, roomData[i].bgTextureFile);
            // load assets for each item
            // console.log("loading things for room " + roomData[i].name);
            let objs = roomData[i].items;
            // console.log("objs: ", objs);
            for (let j = 0; j < objs.length; j++) {
                // console.log("in " + roomData[i].name + " room , loading item: " + objs[j].textureKey);
                this.load.image(objs[j].textureKey, objs[j].textureFile);
            }

            // load box if currently loading tv room
            if (roomData[i].name === "tv") {
                this.load.image(roomData[i].box.textureKey, roomData[i].box.textureFile);
            }

            // create textures from rects for each transitionarea
            let transes = roomData[i].transitions;
            for (let j = 0; j < transes.length; j++) {
                let rt = this.add.renderTexture(-w, 0, transes[j].w, transes[j].h);
                rt.fill(0xFFFFFF);
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
        this.load.audio("lightstring-sfx", "lightstring.wav");
        // sounds for different item pickups
        this.load.audio("ceramic-sfx", "ceramic.wav");
        this.load.audio("heavy-plastic-sfx", "heavy-plastic.wav");
        this.load.audio("medium-plastic-sfx", "medium-plastic.wav");
        this.load.audio("metal-sfx", "metal.wav");
        this.load.audio("paper-sfx", "paper.wav");
        this.load.audio("plush-sfx", "plush.wav");
        this.load.audio("rattly-sfx", "rattly.wav");
        this.load.audio("timer-sfx", "timer.wav");
        this.load.audio("untaping-sfx", "untaping.wav");
        // long bois
        this.load.audio("construction-bg-sfx", "construction_ambience.wav");

        // load particles
        this.load.path = "./assets/particles/";
        this.load.image("poofParticle", "poofParticle.png")

        // load other random things......
        this.load.path = "./assets/";
        this.load.spritesheet("light-string-sheet", "houseRoom_view/light_string_sheet.png", {
            frameWidth: 25, frameHeight: 600, startFrame: 0, endFrame: 1
        });
        this.load.image("houseRoom_bg_near", "houseRoom_view/houseRoom_bg_near.png");
    }

    create() {
        // start menu
        this.scene.start('menuScene');

        // light string anim
        if (!this.anims.exists("pull-string")) {
            this.anims.create({
                key: "pull-string",
                frames: this.anims.generateFrameNumbers("light-string-sheet", {
                    start: 0, end: 1, first: 0
                }),
                frameRate: 8
            });
        }
    }
}