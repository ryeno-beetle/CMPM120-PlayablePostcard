// rye donaldson and lynn gen!
// playable postcard ?!?
// time estimate: 

/* CITATIONS:
*/

'use strict'

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [LoadJSON, Load, Menu, Play],
}

let game = new Phaser.Game(config);