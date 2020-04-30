import events = require("events");
import { Tools } from "./Tools";
import { Rooms, Users } from "./Structures";
import { Config } from "./Config";
import { Commands } from "./Commands";
export let parser : any = new events.EventEmitter();

parser.on("challstr", function(msg : string) {
  let login = require("/app/login")
  login(msg[2],msg[3]) 
}
          );

parser.on("init", function(msg : string) {
  let room = msg[0];
  let users = msg[6].split(",");
  if(!(Tools.toId(room) in Rooms.rooms)) Rooms.add(room);
  for(let i = 1;i < users.length;i++) {
    Users.add(users[i]);
    if(!Rooms.get(Tools.toId(room)).users.includes(Tools.toId(users[i]))) {
      Rooms.get(Tools.toId(room)).users.push(Tools.toId(users[i]));
    }
    let char = users[i].charAt(0);
    if(!Config.ranks.includes(char)) Rooms.get(Tools.toId(room)).addAuth(char, users[i].replace(char,"")); 
  }

});

parser.on("c", function(msg : string) {

  let user : string = msg[3];
  let message : string = msg[4];
  let room : string = msg[0];
  if(!Rooms.get(room).users.includes(Tools.toId(user))) Rooms.get(room).users.push(Tools.toId(user));

  let Room  = Rooms.get(room);
  let User = Users.get(user,true);
  if(Config.ranks.includes(user.charAt(0))) Rooms.get(room).addAuth(user.charAt(0),user.replace(user.charAt(0),""));
  let char : any = Config.commandCharacter[Room.id] ? Config.commandCharacter[Room.id] : Config.commandCharacter.default;
  if(!message) return console.log(msg);
  if(message.charAt(0) == char) {
    let opts = message.split(" ");
    let cmd = Tools.toId(opts[0].replace("&",""));
    let target = message.replace(opts[0],"");
    if(!Commands[cmd]) return;
    if(typeof Commands[cmd] == "string") cmd = Commands[cmd];
    if(Commands[cmd].devOnly && !User.isDev()) return;
    if(Commands[cmd].pmOnly) return Room.say("This command can only be used in PMs");
    Commands[cmd].command(target, Room, User);
  }
  if(Config.autoRes) {
    let automsg = Tools.toId(message);
    if(Config.autoRes[Room.id][automsg]) {
      if(typeof Config.autoRes[Room.id][automsg] == "object") {
        if(Config.autoRes[Room.id][automsg][User.id])  return Room.say(Config.autoRes[Room.id][automsg][User.id]);
        return;
      }
      Room.say(Config.autoRes[Room.id][automsg])
    }
  }
});

parser.on("error", function(msg : string) {
  for(let i = 0; i < Config.developers.length; i++) {
    Users.get(Config.developers[i]).say("!code ERROR : \n " + msg[2]);
  }
});

parser.on("pm", function(msg : string) {
  console.log(msg);
  let user = msg[2];
  let message = msg[4];
  let User = Users.get(Tools.toId(user),true);
  let Room = User;
//  Users.get("zerapium").say(Tools.toId(user) + " : " + message); 
    let char : any = Config.commandCharacter[Room.id] ? Config.commandCharacter[Room.id] : Config.commandCharacter.default;
  if(message.charAt(0) == char) {
    let opts = message.split(" ");
    let cmd = Tools.toId(opts[0].replace("&",""));
    let target = message.replace(opts[0],"");
    if(!Commands[cmd]) return;
    if(typeof Commands[cmd] == "string") cmd = Commands[cmd];
    if(Commands[cmd].devOnly && !User.isDev()) return;
    if(Commands[cmd].chatOnly) return User.say("This command can only be used in a chatroom");
    Commands[cmd].command(target, Room, User);
  }
});
    

parser.on("j",function(msg : string) {
  // @[room,"j",user]
  let room = msg[0]
  let user = msg[2]
  let char = user.charAt(0)
  if(!Rooms.get(room).users.includes(Tools.toId(user))) Rooms.get(room).users.push(Tools.toId(user));
  if(Config.ranks.includes(char)) Rooms.get(room).addAuth(char,user.replace(char,""));
  if(!(Tools.toId(user) in Users.users)) Users.add(user)
});