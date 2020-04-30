import { Tools } from "./Tools";
import { Bot } from "./Bot";
import { Config } from "./Config";
import { Game } from "./Games";
import { Storage } from "./Storage";



export class User extends Bot {
  id : string;
  name : string;
 offline : boolean;

    
  constructor(name) {
    super()
    this.id = Tools.toId(name)
    this.name = name
    this.offline = false;
  }

say(msg : any) {
  this.pm(this.id,msg)
}

isDev(): boolean {
  if(Config.developers.includes(this.id)) return true;
  return false;
} 
}



export class Room extends Bot {
  id : string;
  clientid : string;
  name : string;
  users : string[];
  auth : any;
  game : Game;
    
  constructor(name) {
    super()
    this.id = Tools.toId(name)
    this.name = name
    this.clientid = name.startsWith("groupchat") ? name : this.id;
    this.auth = {}
    this.users = []
    this.game = null
    if(Storage.databases[this.id]) Storage.databases[this.id] = {};
    Storage.exportDatabase(this.id);
  }

say(msg : any) {
  console.log(this.clientid);
  this.Send(this.clientid,msg)
}

addAuth(char : string, user : string) {
  if(!this.auth) return false;
  if(!this.auth[char]) this.auth[char] = []
  if(this.auth[char].includes(Tools.toId(user))) return true;
  this.auth[char].push(Tools.toId(user));
  return true;
}
}
 


class users {
  users : any;
    constructor() {
    this.users = {}
  }

add(name) : User {
  let id = Tools.toId(name)
  if(id in this.users) return this.users[id];
  this.users[id] = new User(name);
  return this.users[id]
}

get(name,cond?) {
  let id = Tools.toId(name)
  if(!(id in this.users)) {
    if(!cond) return false;
    return this.add(name);
  }
  return this.users[id];
}
}


class rooms {
  rooms : any;
    constructor() {
    this.rooms = {}
  }

add(name) : any {
  let id = Tools.toId(name)
  if(id in this.rooms) return this.rooms[id];
  this.rooms[id] = new Room(name);
  return this.rooms[id]
}

get(name) : any {
  let id = Tools.toId(name)
  if(!(id in this.rooms)) return this.add(name);
  return this.rooms[id];
}

}


export let Rooms = new rooms();
export let Users = new users();