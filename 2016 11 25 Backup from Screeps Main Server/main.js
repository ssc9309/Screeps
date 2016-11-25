//notes
/*
- reassign should be ran only once per tick. not # creeps per tick
    - make a new module that is ran by spawn
- use main to iterate through spawns.
- create a spawn module
- get the numbers and maybe other param from the Memory.rooms[spawn.room.name].truckLimit, etc
    - if (x === undefined) 
    {
       txt = "x is undefined";
    }
    - i can use this to initialize
- assign room name to the creeps to control creeps that were sent outside.
    - fuck. i can't explore outside to expand anymore
- and i can control my world with the Memory menu

- the truck also looks for the miner in the room. would this be a problem?
- use filters and shit for finding creeps and buildings.
    - there is a lot of work in miners and trucks
        - reassigning numbers can utilize filters
        - find buildings and creeps can also utilize filters.
        
- change some of the findClosestByPath to a custom function
    - just first thing that fits the constraint instead of calculating all the distances.
    - for something like fixing walls, they all need to be fixed anyway, so find all buildings, as soon as a building met the constraint, break out of loop of search.
    
- get the structure id for the collecting link, and run the link module for every spawn.
    - make all links send energy to the link strucure id stored in memory

- build and repair, search for target when switching away from 'collect' job
    - spend all energy, exit 'distribute' job, get energy, and when switching away from 'collect' search again.
    - or if the id is gone (built), find a new one

- http://support.screeps.com/hc/en-us/articles/203016382-Game#getObjectById

- you can get a list of creeps with filters
    - this will be easier to get a hard list of each type of creeps.
    
- start the id process with miner maybe. 
    

*/


var spawnModule = require('spawnModule');

for(var i in Game.spawns)
{
    //console.log(i.structureType);
    //console.log(Game.spawns[i].structureType);
    var spawnBuilding = Game.spawns[i];
    spawnModule(spawnBuilding);
}

var transferModule = require('transferModule');
var minerModule = require('minerModule');
var truckModule = require('truckModule');
var buildModule = require('buildModule');
var upgradeModule = require('upgradeModule');
var armyModule = require('armyModule');
var controlModule = require('controlModule');
//var repairModule = require('repairModule');
var testModule = require('testModule');
var linkModule = require('linkModule');
var wallRepairModule = require('wallRepairModule');

var allCreeps = Game.creeps;

for(var index in allCreeps)
{
    //var creep = Game.creeps[name];
    var creep = allCreeps[index];

    if (Memory.creeps[creep.name].role == 'miner')
    {
        minerModule(creep);
    }
    else if (Memory.creeps[creep.name].role == 'truck')
    {
        truckModule(creep);
    }
    else if (Memory.creeps[creep.name].role == 'build')
    {
        buildModule(creep);
    }
    else if (Memory.creeps[creep.name].role == 'upgrade')
    {
        upgradeModule(creep);
    }
    else if (Memory.creeps[creep.name].role == 'army')
    {
        armyModule(creep);
    }
    else if (Memory.creeps[creep.name].role == 'transfer')
    {
        transferModule(creep);
    }
    else if (Memory.creeps[creep.name].role == 'control')
    {
        controlModule(creep);
    }
    else if (Memory.creeps[creep.name].role == 'repair')
    {
        //repairModule(creep, buildingMaxHealth);
    }
    else if (Memory.creeps[creep.name].role == 'test')
    {
        testModule(creep);
    }
    else if (Memory.creeps[creep.name].role == 'wallRepair')
    {
        wallRepairModule(creep);
    }
}

console.log(Game.cpu.getUsed());
