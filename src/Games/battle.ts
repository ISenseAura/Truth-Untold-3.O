// Idea by Foxxeyy
// Code by Zerapium (aka P9)

import { Room, User, Users, Rooms } from "../Structures";
import { Tools } from "../Tools";
import { Commands } from "../Commands";
import { Storage } from "../Storage";

let attacks : string[] = ["Pythons","JavaScripts","TypeScripts","Javas","C++s", "CoffeeScripts"/*uwu*/];

interface Player {
  id : string
  name: string
  hp : number
}

let Players : any = {};

function attack(by : Player, on : Player, room : Room) {
  if(by.hp < 1 || on.hp < 1) return room.say("the battle has ended");
  if(by.hp > 1 && on.hp < 1) return room.say(by.name + " has won");
  if(by.hp < 1 && on.hp > 1) return room.say(on.name + " has won");
  let attacker : Player = Players[Players.next];
  let b : Player = Players[Players.upNext];
  room.say(attacker.name + " " + Tools.sampleOne(attacks) + " " + b.name);
  function a(msg) {
    room.say(msg)
  }
  a(b.name + " lost 50 HP");
  Players[b.id].hp -= 50
  if(Players[b.id].hp < 1) {
    Players.fainted = true;
    room.say(attacker.name + " has won the battle");
    if(!Storage.databases.battles) Storage.databases.battles = {};
    if(!Storage.databases.battles[attacker.id]) Storage.databases.battles[attacker.id] = {};
    Storage.databases.battles[attacker.id].exp += attacker.hp/1.5;
    room.say(attacker.name + " recieved " + (Math.trunc(attacker.hp/1.5)).toString() + " exp");
  return;
  }
  
  
  Players.next = b.id;
  Players.upNext = attacker.id;
  setTimeout(attack,3000,by,on,room);
}



export let commands ={
  battle : {
    pmOnly : true,
  command(target : string, room : Room, user : User) {
    if(!target.length) room.say("What? you wanna battle yourself?");
  Players[Tools.toId(target)] = {
    id : Tools.toId(target),
    name : target,
    hp : 100
  }
    Players[user.id] = {
      id : user.id,
      name : user.name,
      hp : 100
    }
    Players.fainted = false;
    Players.next = user.id;
    Players.upNext = Tools.toId(target);
        Players.list  = [Tools.toId(target),user.id];

    attack(Players[user.id],Players[Tools.toId(target)],room);
     }
  },
  
  battlexp : {
    command(target : string, room : Room, user : User) {
      let a : string = user.id;
      let exp : number = 0;
      if(target) a = Tools.toId(target);
      if(!Storage.databases.battles) room.say(exp);
      if(!Storage.databases.battles[a]) room.say(exp);
      exp = Storage.databases.battles[a].exp;
      room.say(a);
    },
    help : "Shows a user's battle exp",
    pmOnly : true
  }

}

