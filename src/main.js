/*  names:
        rye donaldson and lynn gen!
    title:
        Home Together for Nine Months is Not Time Enough With You All
    time estimate:
        at least 25 hours each but probably a lot more. more than endless runner

    citations (we kinda only used Phaser docs/examples/notes):
        - Camera fade: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/camera-effects/
        - Listening to another prefab's emitted event: https://phaser.io/examples/v3.85.0/events/view/listen-to-game-object-event
        - ColorMatrix for desaturation: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/shader-builtin/?h=colormatrix#colormatrix

    artistic comments:
        - all assets were 100% hand-drawn! either traced from photos, or simply sketched
        - as you might expect, most of the messages/items in this game only make sense to our
            apartment mates, but they were all chosen because they have been meaningful in our
            lives together this year

    technical comments:
        - major Phaser components used include Cameras (fade in/out), Text, TextureAtlas,
            Tweens, Particles, PreFX, Lights

    workload breakdown:
        - we each drew half the backgrounds and half the item sprites
        - much of the code was pair programmed
        - Rye lead the item/UI prefabs and roomData JSON architecture
        - Lynn lead the transition areas and recorded SFX

    HELP FOR GRADERS:
        - if you are having trouble finding items, you can press P to automatically
            have a random one picked up for you!
        - after packing all normal items, you end the game by finding the last item
            at the fridge.
*/

'use strict'

let config = {
    type: Phaser.AUTO,
    width: 1366,
    height: 768,
    scene: [LoadJSON, Load, Menu, Play, End],
}

let game = new Phaser.Game(config);

// item counts
const TOTAL_ITEMS = 13;
const w = game.config.width, h = game.config.height;