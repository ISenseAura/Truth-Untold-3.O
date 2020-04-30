import fs = require("fs");
import { Tools } from "./Tools";
import { Room, User } from "./Structures";

let commands = {
  help : {
    command(target, room : Room, user : User) {
      if(!target) room.say("Guide not available for now, Use ``$help [command]``");
      let cmd = Tools.toId(target);
      if(!Commands[cmd]) return room.say("Command does not exisssssst");
      if(typeof Commands[cmd] == "string") cmd = Commands[cmd];
      if(!Commands[cmd].help) return room.say("Help not found for the given command");
      room.say(Commands[cmd].help)
    },
    help : "Helps you, ig",
  }
}


let dir = fs.readdirSync("./src/commands/");
for(let i = 0; i < dir.length; i++) {
  if(dir[i].endsWith(".ts")) {
  let file = "/app/dist/commands/" + dir[i].replace(".ts","");
    let command = require(file);
    let cmd = command;
   Object.assign(commands,cmd.commands)
  }
}

let games = fs.readdirSync("./src/Games/");
for(let i = 0; i < games.length; i++) {
  if(games[i].endsWith(".ts")) {
  let file = "/app/dist/Games/" + games[i].replace(".ts","");
 let command = require(file);
    let cmd = command;
   Object.assign(commands,cmd.commands)
  }
}
   console.log("Successfully loaded " + dir + " commands");
console.log("Successfully loaded Games commands " + games);
console.log
 
export let Commands = commands;


