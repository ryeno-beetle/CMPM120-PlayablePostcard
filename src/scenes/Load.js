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
            // create anims for each item
            let objs = roomData[i].items;
            for (let j = 0; j < objs.length; j++) {
                // console.log(this.anims.generateFrameNames('items_atlas', {
                //         prefix: objs[j].name,
                //         start: 1,
                //         end: 2,
                //         suffix: '',
                //         zeroPad: 0 
                //     }))
                this.anims.create({
                    key: objs[j].animKey,
                    frames: this.anims.generateFrameNames('items_atlas', {
                        prefix: objs[j].name,
                        start: 1,
                        end: 2,
                        suffix: '',
                        zeroPad: 0 
                    }),
                    repeat: -1,
                    frameRate: 4
                });
            }

            // needed to take this out of json temporarily lol
            // {
            //     "name": "tv", 
            //     "animKey": "tv_anim",
            //     "soundKey": "heavy-plastic-sfx",
            //     "x": 750,
            //     "y": 290,
            //     "message": "our beautiful tv <3"
            // }
            // {
            //     "name": "inchworm", 
            //     "animKey": "inchworm_anim",
            //     "soundKey": "ceramic-sfx",
            //     "x": 100,
            //     "y": 370,
            //     "message": "so fashionable!"
            // }
            // {
            //     "name": "foxtimer", 
            //     "animKey": "foxtimer_anim",
            //     "soundKey": "timer-sfx",
            //     "x": 600,
            //     "y": 450,
            //     "message": "tickticktickticktcitkcitcktickticktcitkcitkcitkci"
            // },

            // load box if currently loading tv room
            // if (roomData[i].name === "tv") {
            //     this.load.image(roomData[i].box.textureKey, roomData[i].box.textureFile);
            // }

            // create textures from rects for each transitionarea
            let transes = roomData[i].transitions;
            for (let j = 0; j < transes.length; j++) {
                let rt = this.add.renderTexture(-w, 0, transes[j].w, transes[j].h);
                rt.fill(0xFFFFFF);
                rt.saveTexture(transes[j].key);
            }
        }

        // same for box
            this.anims.create({
                key: "box_anim",
                frames: this.anims.generateFrameNames('items_atlas', {
                    prefix: "box",
                    start: 1,
                    end: 2,
                    suffix: '',
                    zeroPad: 0 
                }),
                repeat: -1,
                frameRate: 4
            });

        // load ui assets
        this.load.path = './assets/ui/';
        this.load.image('popup', 'popup.png');
        this.load.image('button', 'button.png');
        this.load.image("envelope", "envelope.png");

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