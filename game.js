class WorldSpawn extends AdventureScene {
    constructor() {
        super("WorldSpawn", "World Spawn");
    }

    preload() {
        // load assets
        this.load.path = './assets/'
        this.load.image('spawn', 'Spawn.png')
        this.load.image('villagers', 'Villagers.png')
        this.load.image('tradingCenter', 'Trading_Center.png')
        this.load.image('farm', 'Farm.png')
        this.load.image('view_base', 'View_Base.png')
        this.load.image('base', 'Base.png')
        this.load.image('mine', 'Mine.png')
        this.load.image('dock', 'Dock.png')
        this.load.image('inside', 'Inside.png')
        this.load.image('hidden', 'Hidden.png')
        this.load.image('nether', 'Nether.png')
        this.load.image('nether_climb', 'Nether_Climb.png')
        this.load.image('nether_roof', 'Nether_Roof.png')
    }
    onEnter() {

        this.addBackground('spawn');

        // nether portal requires fint and steel from Iron ingot and Flint
        let portal = this.add.text(this.w * 0.57, this.w * 0.2, "Nether Portal")
            .setFontSize(this.s * 2)
            .setStyle({ fill: '#c10606' })
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("Flint and steel")) {
                    this.showMessage("A lit nether portal");
                } else {
                    this.showMessage("The portal is not lit");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("Flint and steel")) {
                    this.gotoScene('Nether');
                }
                else {
                    this.showMessage("Return with a means to light the portal");
                    this.shake(portal);
                }
            });

        // loot chest for 64 emeralds
        let key = this.add.text(this.w * 0.4, this.w * 0.3, "Search the chests")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Suprisingly not much in them")
            })
            .on('pointerdown', () => {
                if (this.hasItem("Iron ingot") || this.hasItem("64 emeralds") || this.hasItem("Flint and steel")) {
                    this.showMessage("There's nothing else in the chests")
                } else {
                    this.showMessage("You find 64 emeralds");
                    this.gainItem('64 emeralds');
                }
                this.tweens.add({
                    targets: key,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => key.destroy()
                });
            })

        // go to Villagers
        this.add.text(this.w * 0.1, this.w * 0.15, "Visit the villagers")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("There is a trading center and a farm");
            })
            .on('pointerdown', () => {
                this.gotoScene('Villagers');
            })

        // go to Base
        this.add.text(this.w * 0.04, this.w * 0.33, "Turn around")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("There is a base behind you");
            })
            .on('pointerdown', () => {
                this.gotoScene('ViewBase');
            })

        // craft flint and steel if you have flint and iron ingot
        if (this.hasItem("Flint") && this.hasItem("Iron ingot")) {
            let craft = this.add.text(this.w * 0.38, this.w * 0.27, "Craft Flint and steel")
                .setFontSize(this.s * 2)
                .setInteractive()
                .on('pointerover', () => {
                    this.showMessage("Craft Flint and steel");
                })
                .on('pointerdown', () => {
                    this.gainItem("Flint and steel");
                    this.loseItem("Flint");
                    this.loseItem("Iron ingot");
                    this.tweens.add({
                        targets: craft,
                        y: `-=${2 * this.s}`,
                        alpha: { from: 1, to: 0 },
                        duration: 500,
                        onComplete: () => craft.destroy()
                    });
                });

        }
    }
}
class Villagers extends AdventureScene {
    constructor() {
        super("Villagers", "There is a farm and a trading center");
    }

    onEnter() {

        this.addBackground('villagers');

        // return to world spawn
        this.add.text(this.w * 0.3, this.w * 0.4, "go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Returrn to World Spawn");
            })
            .on('pointerdown', () => {
                this.gotoScene('WorldSpawn');
            });

        // go to trading center
        this.add.text(this.w * 0.2, this.w * 0.18, "Trading center")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Trade with the villagers");
            })
            .on('pointerdown', () => {
                this.gotoScene('TradingCenter');
            });

        // go to farm
        this.add.text(this.w * 0.52, this.w * 0.18, "Farm")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Check on the crops");
            })
            .on('pointerdown', () => {
                this.gotoScene('Farm');
            });
    }
}

class Nether extends AdventureScene {
    constructor() {
        super("Nether", "The Nether")
    }
    onEnter() {
        this.addBackground('nether');

        // Go to NetherClimb
        this.add.text(this.w * 0.25, this.w * 0.2, "climb the stairs")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Follow the torches up the stairs");
            })
            .on('pointerdown', () => {
                this.gotoScene('NetherClimb');
            });

        // return to world spawn
        this.add.text(this.w * 0.35, this.w * 0.5, "go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Return to World Spawn");
            })
            .on('pointerdown', () => {
                this.gotoScene('WorldSpawn');
            });

        // interactable text that does nothing
        let text = this.add.text(this.w * 0.5, this.w * 0.3, "Path to fortress")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You have no reason to go there");
            })
            .on('pointerdown', () => {
                this.showMessage("You have no reason to go there");
                this.tweens.add({
                    targets: text,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            })
    }
}

class NetherClimb extends AdventureScene {
    constructor() {
        super("NetherClimb", "Strange Ladder")
    }
    onEnter() {
        this.addBackground('nether_climb');

        // return nether
        this.add.text(this.w * 0.35, this.w * 0.5, "go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Return down the stairs");
            })
            .on('pointerdown', () => {
                this.gotoScene('Nether');
            });

        // go to NetherRoof if you have ender pearl
        let climb = this.add.text(this.w * 0.17, this.w * 0.2, "Listen to the sign")
            .setFontSize(this.s * 2)
            .setStyle({ fill: '#c10606' })
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("ender pearl")) {
                    this.showMessage("are you sure?");
                } else {
                    this.showMessage("You don't have an ender pearl");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("ender pearl")) {
                    this.loseItem("ender pearl");
                    this.gotoScene('NetherRoof');
                }
                else {
                    this.showMessage("You don't have an ender pearl");
                    this.shake(climb);
                }
            });

    }
}

class NetherRoof extends AdventureScene {
    constructor() {
        super("NetherRoof", "The Nether Roof")
    }
    onEnter() {
        this.addBackground('nether_roof');

        let honey = this.add.text(this.w * 0.4, this.w * 0.3, "COLLECT THE HONEY")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("WHAT ARE YOU WAITING FOR")
                                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => {
                    this.showMessage("HONEY HONEY HONEY HONEY HONEY HONEY HONEY HONEY");
                    this.gainItem('HONEY')
                this.tweens.add({
                    targets: key,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => key.destroy()
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));
    }
}

class TradingCenter extends AdventureScene {
    constructor() {
        super("TradingCenter", "Trading Center")
    }

    onEnter() {

        this.addBackground('tradingCenter');

        // if you have 64 emeralds, exchange for iron ingot
        let trade = this.add.text(this.w * 0.33, this.w * 0.37, "Trade")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Trade with the villagers");
            })
            .on('pointerdown', () => {
                if (this.hasItem("64 emeralds")) {
                    this.loseItem("64 emeralds");
                    this.showMessage("You trade for some iron");
                    this.gainItem('Iron ingot');
                    this.tweens.add({
                        targets: trade,
                        y: `-=${2 * this.s}`,
                        alpha: { from: 1, to: 0 },
                        duration: 500,
                        onComplete: () => trade.destroy()
                    });
                }
                else {
                    this.showMessage("You have no emeralds to trade with");
                    this.shake(trade);
                }
            });

        // aquire flint
        let emeralds = this.add.text(this.w * 0.53, this.w * 0.4, "Loot the chest")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Loot the chest")
            })
            .on('pointerdown', () => {

                if (this.hasItem("Flint") || this.hasItem("Flint and steel")) {
                    this.showMessage("There's nothing else in the chest")
                } else {
                    this.showMessage("You find some Flint");
                    this.gainItem('Flint');
                }
                this.tweens.add({
                    targets: emeralds,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => emeralds.destroy()
                });
            })

        // go back
        this.add.text(this.w * 0.35, this.w * 0.5, "Go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Go back to spawn");
            })
            .on('pointerdown', () => {
                this.gotoScene('Villagers');
            });

    }

}
class Farm extends AdventureScene {
    constructor() {
        super("Farm", "The farm")
    }


    onEnter() {
        this.addBackground('farm');

        // interactable text that does nothing
        let text = this.add.text(this.w * 0.25, this.w * 0.06, "Everything is working smoothly")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerdown', () => {
                this.showMessage("There is nothing to do here");
                this.tweens.add({
                    targets: text,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            })

        // go back
        this.add.text(this.w * 0.35, this.w * 0.5, "Go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Go back to spawn");
            })
            .on('pointerdown', () => {
                this.gotoScene('Villagers');
            });



    }
}

class ViewBase extends AdventureScene {
    constructor() {
        super("ViewBase", "You can see a base by the shore.");
    }

    onEnter() {

        this.addBackground('view_base');

        // go to Base
        this.add.text(this.w * 0.35, this.w * 0.22, "Approach the base")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You can see a mine and dock by the base");
            })
            .on('pointerdown', () => {
                this.gotoScene('Base');
            })

        // go back
        this.add.text(this.w * 0.4, this.w * 0.5, "go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Turn around (again)");
            })
            .on('pointerdown', () => {
                this.gotoScene('WorldSpawn');
            })
    }
}

class Base extends AdventureScene {
    constructor() {
        super("Base", "Theres a mine and dock by the base");
    }

    onEnter() {
        this.addBackground('base');

        // go back to spawn
        this.add.text(this.w * 0.35, this.w * 0.5, "Go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Go back to spawn");
            })
            .on('pointerdown', () => {
                this.gotoScene('WorldSpawn');
            });

        // go inside base
        this.add.text(this.w * 0.32, this.w * 0.26, "Go inside")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Go inside the base");
            })
            .on('pointerdown', () => {
                this.gotoScene('InsideBase');
            });

        // go to the dock
        this.add.text(this.w * 0.05, this.w * 0.3, "Go to the dock")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Go to the dock");
            })
            .on('pointerdown', () => {
                this.gotoScene('Dock');
            });

        // go to the mine
        this.add.text(this.w * 0.5, this.w * 0.35, "Enter the mine")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Enter the mine");
            })
            .on('pointerdown', () => {
                this.gotoScene('Mine');
            });
    }
}

class InsideBase extends AdventureScene {
    constructor() {
        super("InsideBase", "You are inside the base");
    }
    onEnter() {
        this.addBackground('inside');

        // go back outside
        this.add.text(this.w * 0.35, this.w * 0.5, "Go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Go back outside");
            })
            .on('pointerdown', () => {
                this.gotoScene('Base');
            });

        // acquire diamond axe
        let key = this.add.text(this.w * 0.4, this.w * 0.29, "Grab the axe")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Punch the item frame")
            })
            .on('pointerdown', () => {
                if (this.hasItem("Diamond axe")) {
                    this.showMessage("You already have the diamond axe");
                } else {
                    this.showMessage("You pick up the diamond axe");
                    this.gainItem('Diamond axe');
                }
                this.tweens.add({
                    targets: key,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => key.destroy()
                });
            })
    }
}

class Mine extends AdventureScene {
    constructor() {
        super("Mine", "The work of an intellectual");
    }
    onEnter() {
        this.addBackground('mine');

        // go back to the base
        this.add.text(this.w * 0.35, this.w * 0.5, "Go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Go back outside");
            })
            .on('pointerdown', () => {
                this.gotoScene('Base');
            });
    }
}
class Dock extends AdventureScene {
    constructor() {
        super("Dock", "At the dock you spot a hidden tunnel.");
    }
    onEnter() {
        this.addBackground('dock');

        // go back to the base
        this.add.text(this.w * 0.35, this.w * 0.5, "Go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Go back outside");
            })
            .on('pointerdown', () => {
                this.gotoScene('Base');
            });


        // enter HiddenCave
        this.add.text(this.w * 0.41, this.w * 0.23, "Enter the hidden cave")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Enter the hidden cave");
            })
            .on('pointerdown', () => {
                this.gotoScene('HiddenCave');
            });


    }
}

class HiddenCave extends AdventureScene {
    constructor() {
        super("HiddenCave", "There's an enderman stuck on a boat.");
    }
    onEnter() {
        this.addBackground('hidden');

        // go back to the dock
        this.add.text(this.w * 0.35, this.w * 0.5, "Go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Go back to the dock");
            })
            .on('pointerdown', () => {
                this.gotoScene('Dock');
            });

        // acquire ender pearl if you have diamond axe
        let pearl = this.add.text(this.w * 0.33, this.w * 0.37, "Attack the enderman")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Hit the enderman");
            })
            .on('pointerdown', () => {
                if (this.hasItem("Diamond axe")) {
                    this.showMessage("You collect an ender pearl");
                    this.gainItem('ender pearl');
                    this.tweens.add({
                        targets: pearl,
                        y: `-=${2 * this.s}`,
                        alpha: { from: 1, to: 0 },
                        duration: 500,
                        onComplete: () => pearl.destroy()
                    });
                }
                else {
                    this.showMessage("You try hitting the enderman with your first but it doesn't work");
                    this.shake(pearl);
                }
            });

    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50, 50, "You desire honey (in minecraft).").setFontSize(40);
        this.add.text(50, 100, "Unfortunately, all bees in the area have been forcefully relocated.").setFontSize(40);
        this.add.text(50, 150, "Find your way to the Nether roof for some honey.").setFontSize(40);
        this.add.text(50, 200, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => this.scene.start('WorldSpawn'));
        });
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "Bathe in the honey").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('WorldSpawn'));

    }
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Intro, WorldSpawn, Villagers, TradingCenter, Farm, ViewBase, Base,
        InsideBase, Dock, Mine, HiddenCave, Nether, NetherClimb, NetherRoof, Outro],
    title: "Adventure Game",
});

