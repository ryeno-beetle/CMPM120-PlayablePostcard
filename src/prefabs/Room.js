// prefab for a view of a room
class Room extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, roomData) {
        // console.log(texture);
        super(scene, x, y, texture);

        this.setVisible(false);
        scene.add.existing(this); // add to existing, displayList, updateList
        this.setDepth(-2);  // go behind transitionareas and items
        this.roomData = roomData;

        // parse roomData and set up its objects and transition areas
        // roomData is just the obj from the json containing data for this specific room
        this.items = [];
        this.transitionAreas = [];
        for (let i = 0; i < roomData.items.length; i++) {
            this.items.push(new Item(scene, this, roomData.items[i].x, roomData.items[i].y,
                'items_atlas', 0, roomData.items[i].animKey, roomData.items[i].name, roomData.items[i].soundKey, roomData.items[i].message).setOrigin(0));
            this.items[i].displayName = roomData.items[i].displayName;
            this.items[i].setVisible(false);
        }

        // set up transition areas
        for (let i = 0; i < roomData.transitions.length; i++) {
            this.transitionAreas.push(new TransitionArea(scene, roomData.name,
                roomData.transitions[i].x, roomData.transitions[i].y, roomData.transitions[i].key,
                roomData.transitions[i].nextState).setOrigin(0));
            this.transitionAreas[i].setVisible(false);
        }

        // create colorMatrix to be able to change saturation
        this.cmFX = this.preFX.addColorMatrix();

        // --- ROOM SPECIFIC THINGS BELOW ---
        // if this room is tv view of living room, add packing box
        // (get box object in roomData that only the tv room has)
        if (roomData.name === "tv") {
            this.box = new Box(scene, this, roomData.box.x, roomData.box.y, 'items_atlas', 0, roomData.box.animKey,
                roomData.box.cantPackMessage, roomData.box.packedMessage).setOrigin(0);
            this.box.setVisible(false);
            // console.log(this.box)
        }

        // if this room is fridge room, add postcard
        if (roomData.name == "fridge") {
            this.postcard = new Postcard(scene, this, roomData.postcard.x, roomData.postcard.y);
            this.postcard.setVisible(false);
        }

        // if this room is house room (closet), add light and string to turn it on
        if (roomData.name === "houseRoom") {
            let LOW_INTENSITY = -5;
            let HIGH_INTENSITY = 4;
            // x, y, radius, color, intensity
            this.light = this.scene.lights.addLight(425, 30, 2000, 0xFFFFFF, LOW_INTENSITY);
            this.light.setVisible(false);    // start true so that when we enter room for the first time it's false
            // be affected by lighting
            // https://docs.phaser.io/api-documentation/class/gameobjects-lightsplugin
            this.setPipeline("Light2D");
            this.items[0].setPipeline("Light2D");
            // add foreground not affected by lighting
            this.foreground = this.scene.add.sprite(0, 0, "houseRoom_bg_near").setOrigin(0).setDepth(-2);
            this.foreground.setVisible(false);
            
            this.lightString = this.scene.add.sprite(this.light.x + 20, this.light.y, "light-string-sheet", 0).setOrigin(0);
            this.lightString.setVisible(false);
            this.lightString.setInteractive({useHandCursor: true});
            this.lightString.on('pointerdown', () => {
                if (!this.scene.isInPopup) {
                    this.scene.sound.play("lightstring-sfx");
                    this.lightString.anims.play("pull-string");
                    this.lightString.once("animationcomplete", () => {
                        this.lightString.setFrame(0);
                        // toggle light by toggling intensity
                        this.light.intensity = (this.light.intensity <= 0) ? HIGH_INTENSITY : LOW_INTENSITY;
                    });
                }
            });
            this.lightString.on("pointerover", (pointer, localX, localY, event) => {
                if (!this.scene.isInPopup) {
                    this.lightString.setTintFill(0xFFFFFF);
                }
            });
            this.lightString.on("pointerout", (pointer, localX, localY, event) => {
                this.lightString.clearTint();
            });
        }
    }

    // to be able to hide room and all of its things as a unit
    toggleVisibility() {
        this.visible = !this.visible;
        this.items.forEach((item) => {
            item.visible = !item.visible;
        });
        this.transitionAreas.forEach((trans) => {
            trans.visible = !trans.visible;
        });

        if (this.box) { // for tv view
            this.box.visible = !this.box.visible;
        }
        if (this.postcard) {
            this.postcard.visible = !this.postcard.visible;
        }
        if (this.light) {   // for house room (closet)
            this.light.visible = !this.light.visible;
            this.lightString.visible = !this.lightString.visible;
            this.foreground.visible = !this.foreground.visible;
        }
    }
}