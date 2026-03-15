// rye donaldson and lynn gen!
// playable postcard ?!?
// time estimate: 

/* CITATIONS:
    - Camera fade: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/camera-effects/
    - Listening to another prefab's emitted event: https://phaser.io/examples/v3.85.0/events/view/listen-to-game-object-event
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
const TOTAL_ITEMS = 10;
const w = game.config.width, h = game.config.height;