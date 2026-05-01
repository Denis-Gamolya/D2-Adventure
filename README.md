A simple adventure game by Denis Gamolya based on a simple adventure game engine by [Adam Smith](https://github.com/rndmcnlly).

Code requirements:
- **4+ scenes based on `AdventureScene`**: WorldSpawn, Villagers, TradingCenter, Farm, ViewBase, Base,
        InsideBase, Dock, Mine, HiddenCave, Nether, NetherClimb, NetherRoof
- **2+ scenes *not* based on `AdventureScene`**: Intro, Outro
- **2+ methods or other enhancement added to the adventure game engine to simplify my scenes**:
    - Enhancement 1: Added a helper to load all the background images and properly scale them
    - Enhancement 2: Added a helper to shake buttons you could not currently press

Experience requirements:
- **4+ locations in the game world**: unsatisfied (name at least 4 of the classes).
- **2+ interactive objects in most scenes**: you can trade with the villager only if you have emeralds
                                             and loot the chest nearby
                                             at WorldSpawn you can craft if you have materials and loot
                                             the chests
- **Many objects have `pointerover` messages**: Theres a messsage for each object ex nether portal with
                                                and without flint and steel
                                                You can loot a chest and when you try to loot it again 
                                                it will say its empty
- **Many objects have `pointerdown` effects**: You can collect various items ex. iron ingot, emeralds
- **Some objects are themselves animated**: shake effect when you interact with something with having 
                                            the right item
                                            fade effect when you interact and collect an item

Asset sources:
- All screenshots were taken by myself from a private minecraft server.

Code sources:
- `adventure.js` and `index.html` were created for this project [Adam Smith](https://github.com/rndmcnlly) and edited by me.
- `game.js` was sketched by [Adam Smith](https://github.com/rndmcnlly) and rewritten by me.