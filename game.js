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
    }
    onEnter() {

// change to find flint in chest
        this.addBackground('spawn');

        let portal = this.add.text(this.w * 0.57, this.w * 0.2, "Nether Portal")
            .setFontSize(this.s * 2)
            .setStyle({ fill: '#c10606' })
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("key")) {
                    this.showMessage("You can light the portal");
                } else {
                    this.showMessage("The portal is not lit");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("flint and steel")) {
                    this.loseItem("flint and steel");
                    this.showMessage("*squeak*");
                    this.gotoScene('Nether');
                }
                else {
                    this.showMessage("Return with a means to light the portal");
                    this.shake(portal);
                }
            });

        let key = this.add.text(this.w * 0.4, this.w * 0.3, "Search the chests")
            .setFontSize(this.s * 2)
            .setStyle({ fill: '#2fdac6' })
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("There are so many items")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the flint and steel");
                this.gainItem('flint and steel');
                this.tweens.add({
                    targets: key,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => key.destroy()
                });
            })

        this.add.text(this.w * 0.1, this.w * 0.15, "Visit the villagers")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("There is a trading center and a farm");
            })
            .on('pointerdown', () => {
                this.gotoScene('Villagers');
            })

        this.add.text(this.w * 0.04, this.w * 0.33, "Turn around")
            .setFontSize(this.s * 2)
            .setStyle({ fill: '#000000' })
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("There is a base behind you");
            })
            .on('pointerdown', () => {
                this.gotoScene('ViewBase');
            })

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

// flint and steel light nether portal
// can go in and up to to nether roof
// read sign that says you need pearl
// if you have pearl you can use
// reach the nether roof and end.
class Nether extends AdventureScene {
    constructor() {
        super("Nether", "The Nether")
    }

    onEnter() {
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

        // trade for some iron
        this.addBackground('tradingCenter');


        // return to world spawn
        let trade = this.add.text(this.w * 0.33, this.w * 0.37, "Trade")
            .setFontSize(this.s * 2)
            .setStyle({ fill: '#1eff00' })
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Trade with the villagers");
            })
            .on('pointerdown', () => {
                if (this.hasItem("64 emeralds")) {
                    this.loseItem("64 emeralds");
                    this.showMessage("You trade for a diamond axe");
                    this.gainItem('Diamond Axe');
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

        // check chest
        let emeralds =this.add.text(this.w * 0.53, this.w * 0.4, "Loot the chest")
            .setFontSize(this.s * 2)
            .setStyle({ fill: '#1eff00' })
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Loot the chest")
            })
            .on('pointerdown', () => {
                this.showMessage("You find some emeralds");
                this.gainItem('64 emeralds');
                this.tweens.add({
                    targets: emeralds,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => emeralds.destroy()
                });
            })



        // go to farm
        this.add.text(this.w * 0.35, this.w * 0.5, "Go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Go back to spawn");
            })
            .on('pointerdown', () => {
                this.gotoScene('WorldSpawn');
            });

    }

}
class Farm extends AdventureScene {
    constructor() {
        super("Farm", "The farm")
    }


    onEnter() {
        this.addBackground('farm');


        let text = this.add.text(this.w * 0.25, this.w * 0.06, "Everything is working smoothly")
            .setFontSize(this.s * 2)
            .setStyle({ fill: '#000000' })
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

            // go back to spawn
        this.add.text(this.w * 0.35, this.w * 0.5, "Go back")
            .setFontSize(this.s * 2)
            .setStyle({ fill: '#3bd3fd' })
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Go back to spawn");
            })
            .on('pointerdown', () => {
                this.gotoScene('WorldSpawn');
            });



    }
}

class ViewBase extends AdventureScene {
    constructor() {
        super("ViewBase", "You can see a base by the shore.");
    }

        onEnter() {

        this.addBackground('view_base');

        this.add.text(this.w * 0.35, this.w * 0.22, "Approach the base")
            .setFontSize(this.s * 2)
            .setStyle({ fill: '#000000' })
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You can see a mine and dock by the base");
            })
            .on('pointerdown', () => {
                this.gotoScene('Base');
            })


            this.add.text(this.w * 0.4, this.w * 0.5, "go back")
            .setFontSize(this.s * 2)
            .setStyle({ fill: '#000000' })
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Turn around (again)");
            })
            .on('pointerdown', () => {
                this.gotoScene('WorldSpawn');
            })


        }
}

// get diamond axe from the base
// go to dock to find hidden area with enderman and pearl
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
        this.add.text(this.w * 0.35, this.w * 0.22, "Go inside")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Go inside the base");
            })
            .on('pointerdown', () => {
                this.gotoScene('InsideBase');
            });

         // go to the dock
        this.add.text(this.w * 0.4, this.w * 0.5, "Go to the dock")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Go to the dock");
            })
            .on('pointerdown', () => {
                this.gotoScene('Dock');
            });

         // go to the dock
        this.add.text(this.w * 0.4, this.w * 0.5, "Enter the mine")
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


// can collect diamond axe from inside
class InsideBase extends AdventureScene {
    constructor() {
        super("InsideBase", "You are inside the base");
    }
    onEnter() {
        this.addBackground('inside');
    }
}

class Mine extends AdventureScene {
    constructor() {
        super("Mine", "You are in the mine");
    }
    onEnter() {
        this.addBackground('mine');
    }
}

class Dock extends AdventureScene {
    constructor() {
        super("Dock", "You are at the dock");
    }
    onEnter() {
        this.addBackground('dock');
    }
}

// hidden scene where you find enderman. Kill for pearl


class Intro extends Phaser.Scene {  
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50, 50, "You've got a strong hunger for some honey.").setFontSize(40);
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
        this.add.text(50, 50, "That's all!").setFontSize(50);
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
    scene: [Intro, WorldSpawn, Villagers, TradingCenter, Farm, ViewBase, Base, InsideBase, Dock, Mine, Nether, Outro],
    title: "Adventure Game",
});

