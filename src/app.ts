// Stole idea from - 
//

import Websocket = require("websocket");
import http = require("https");
import globalts = require("/app/globals");
import { Config } from "./Config";
import { Tools } from "./Tools";
import MP = require("./message-parser");
import { Storage } from "./Storage";
import { Bot } from "./Bot";
import { Rooms, Users,Room, User } from "./Structures";
import * as Commands from "./Commands";

let parser : any = MP.parser;

//Globals initialization...
global.Tools = Tools;
global.Config = Config;
global.Commands = Commands;
global.Bot = new Bot();
global.Storage = Storage;
global.Rooms = Rooms;
global.Users = Users;
global.parser = parser;


const wsclient : Websocket.client = Websocket.client;
let ws : Websocket.client = new wsclient();

export let Connection : any;

ws.on("connect", function(connection : any) {
  Connection = connection;
  connection.on("message", function(message : any) {
    let msg : string = message.utf8Data;
    let array : string[] = msg.split("|");
    if(Tools.toId(array[1]) == "error") console.log(array);
    parser.emit(Tools.toId(array[1]),array)
    
  }
                )
});

let url = "ws://"+ Config.host+":"+Config.port+"/showdown/websocket";
ws.connect(url);
Storage.importDatabases();
