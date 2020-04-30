import { Rooms ,Room, User } from "../Structures";

export let commands = {
  js : "eval",
  ts : "eval",
  eval : {
    command(target : string, room : Room, user : User) {
      let a = "/shrug";
      try {
        a = JSON.stringify(eval(target));
      } catch (e) { a = e.message }
      if(a == undefined) a = "/shrug";
      room.say(a)
      
    },
    devOnly : true,
    help : "evals the target"
  },
  
  restart : "kill",
  kill : {
    command(target : string, room : Room, user : User) {
      process.exit(-1);
    },
    devOnly : true,
    help : "The bot dies :("
  },
  
  say : {
    command(target : string, room : Room, user : User) {
      room.say(target.trim())
    },
    devOnly : true,
    help : "Makes the bot say anything we want"
  }
  
};