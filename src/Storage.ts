// Storage from -
//https://github.com/Zerapium/Truth-Untold-Bot/blob/master/storage.js

import fs = require("fs");
import path = require("path");
const  BACKUP_INTERVAL = 60 * 60 * 1000;
const rootFolder = path.resolve(__dirname, '..');

class storage {
date : string|number;
loadedDatabases : boolean;
logs : string[];
databases : any;

	constructor() {
    this.date = '';
    this.loadedDatabases = false;
    this.logs = [];
		this.databases = {};
	}

	/**
	 * @param {string} roomid
	 * @returns {AnyObject}
	 */
	getDatabase(roomid : string) {
		if (!(roomid in this.databases)) this.databases[roomid] = {};
		// sync database properties
		if (roomid === 'global' && !this.databases[roomid].mail) this.databases[roomid].mail = {};
		return this.databases[roomid];
	}

	/**
	 * @param {string} roomid
	 */
	importDatabase(roomid : string) {
		let file : string = '{}';
		try {
			file = fs.readFileSync('./src/databases/' + roomid + '.json').toString();
		} catch (e) {}
		this.databases[roomid] = JSON.parse(file);
	}

importDatabase2(room : string,filename : string,data : any) {
		let file : string = '[]';
		try {
			file = fs.readFileSync('./roomlogs/' + room + '/'+ filename + '.txt').toString();
     // console.log(file.toString());
      if(!file) return;
		} catch (e) {}
  
  console.log(file);
		this.databases[data] = file.toString().split('\n');
	}

	/**
	 * @param {string} roomid
	 */
	exportDatabase(roomid) {
		if (!(roomid in this.databases)) return;
		fs.writeFileSync('./src/databases/' + roomid + '.json', JSON.stringify(this.databases[roomid]));
	}
  	exportDatabaselogs(file,room,roomid) {
		if (!(roomid in this.databases)) return;
		fs.writeFileSync('./roomlogs/' + room.id + '/' + file + '.txt', this.databases[roomid].join('\n'));
	}
	
		exportCommand(file,room,cmd) {
		//if (!(roomid in this.databases)) return;
		fs.writeFileSync('./plugins/'+ file + '.js', cmd);
	}
	
	

	importDatabases() {
    
		let databases = fs.readdirSync('./src/databases');
		for (let i = 0, len = databases.length; i < len; i++) {
			let file = databases[i];
			if (!file.endsWith('.json')) continue;
			this.importDatabase(file.substr(0, file.indexOf('.json')));
		}
	}

	exportDatabases() {
		for (let roomid in this.databases) {
			this.exportDatabase(roomid);
		}
	}

	/**
	 * @param {number} points
	 * @param {User} user
	 * @param {string} roomid
	 */
  
  
 /* addAlt(newUser,oldUser, roomid) {
    newUser = Users.get(newUser).id;
    oldUser = Tools.toId(oldUser);
    if(!newUser) return;
    if(!(roomid in this.databases)) this.databases[roomid] = {};
    let database = this.databases[roomid];
    if(!('alts' in database)) database.alts = {};
    if(!(oldUser in database.alts)) database.alts[oldUser] = {alt : []};
    if(database.alts[oldUser].alt.includes(newUser)) return;
    database.alts[oldUser].alt.push(newUser);
  }
  
  
  addExps(Exps, user, roomid) {
    
		if (isNaN(Exps)) return;
		if (!(roomid in this.databases)) this.databases[roomid] = {};
		let database = this.databases[roomid];
		if (!('explevels' in database)) database.explevels = {};
		if (!(user.id in database.explevels)) database.explevels[user.id] = {Exps: 0, Lvls: 0, Req: 0, Total:0};
    database.explevels[user.id].Total += Exps;
		database.explevels[user.id].Exps += Exps;
    let lvls = database.explevels[user.id].Lvls;
		let exps = database.explevels[user.id].Exps;
    let req;
   let inc = 0;
    if(lvls <= 95) req = 20534;
     if(lvls <= 85) req = 17309;
            if(lvls <= 75) req = 14892;
    if(lvls <= 65) req = 13222;
       if(lvls <= 55) req = 9834;
      if(lvls <= 45) req = 5299;
    if(lvls <= 35) req = 3819;
    if(lvls <= 25) req = 1219;
       if(lvls <= 15) req = 518;
        if(lvls <= 5) req = 219;
     if(lvls > 95) req = 7000;
        
        if(lvls > 95) req = 7009;
    
   
	if(exps >= req) {
    
      database.explevels[user.id].Exps = 0;
     database.explevels[user.id].Req = 0;
      inc = 1;
    }
    /*
    else if(lvls <= 15 && exps >= 519) {
      database.explevels[user.id].Exps = 0;
      inc = 1;
    }
    else if(lvls <= 25 && exps >= 619) {
      database.explevels[user.id].Exps = 0;
      inc = 1;
    }
    else if(lvls <= 35 && exps >= 919) {
      database.explevels[user.id].Exps = 0;
      inc = 1;
    }
    else if(lvls <= 45 && exps >= 1327) {
      database.explevels[user.id].Exps = 0;
      inc = 1;
    }
    else if(lvls <= 55 && exps >= 1641) {
      database.explevels[user.id].Exps = 0;
      inc = 1;
    }
    else if(lvls <= 65 && exps >= 2212) {
      database.explevels[user.id].Exps = 0;
      inc = 1;
    }
    else if(lvls <= 75 && exps >= 3832) {
      database.explevels[user.id].Exps = 0;
      inc = 1;
    }
    else if(lvls <= 85 && exps >= 4309) {
      database.explevels[user.id].Exps = 0;
      inc = 1;
    }
    else if(lvls <= 95 && exps >= 5519) {
      database.explevels[user.id].Exps = 0;
      inc = 1;
    }
    else if(lvls >= 96 && exps >= 7009) {
      database.explevels[user.id].Exps = 0;
      inc = 1;
    }*/
  /*  database.explevels[user.id].Req = req - exps;
  database.explevels[user.id].Lvls += inc;
		let name = Tools.toAlphaNumeric(user.name);
		if (database.explevels[user.id].name !== name) database.explevels[user.id].name = name;
	}
  */
  
  
  
  
/*	addPoints(points, userid,username, roomid) {
		if (isNaN(points)) return;
		if (!(roomid in this.databases)) this.databases[roomid] = {};
		let database = this.databases[roomid];
		if (!('leaderboard' in database)) database.leaderboard = {};
		if (!(userid in database.leaderboard)) database.leaderboard[userid] = {points: 0};
		database.leaderboard[userid].points += points;
		let name = Tools.toAlphaNumeric(username);
		if (database.leaderboard[userid].name !== name) database.leaderboard[userid].name = name;
	}
*/
	/**
	 * @param {number} points
	 * @param {User} user
	 * @param {string} roomid
	 */
	/*removePoints(points, userid, username, roomid) {
		this.addPoints(-points, userid, username, roomid);
	}*/

	/**
	 * @param {User} user
	 * @param {string} roomid
	 */
/*	getPoints(user, roomid) {
		if (!(roomid in this.databases)) this.databases[roomid] = {};
		let database = this.databases[roomid];
		if (!('leaderboard' in database)) database.leaderboard = {};
		if (!(user.id in database.leaderboard)) return 0;
		return database.leaderboard[user.id].points;
	}
  */
  
  //Commands.js me aao
  
  // kuh samh nah aaraha
 /* logChatMessage(roomid, time, messageType, message,room) {
        const date = new Date(time);
      const midnight = new Date();
			midnight.setHours(24, 0, 0, 0);
			this.chatLogRolloverTimes[room.id] = midnight.getTime();
			const year = date.getFullYear();
			const month = date.getMonth() + 1;
			const day = date.getDate();
    const filename = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day + '.txt';
    let data = roomid + filename;
    	if (!(data in this.databases)) this.databases[data] = [];
		let database = this.databases[data];
    
    
        database.push('[' + Tools.toTimestampString(date).split(" ")[1]+ ']' +' '+ message);
  this.exportDatabaselogs(filename,room,data);
   this.importDatabase2(room,filename,data);
  this.date = filename;
    
    }
  
  addCmd(room, cmd, name, ext){
  let material = "let commands = { \n " + name + ": { \n command(target, room, user) { \n " +
  cmd.split(";").join(";\n") + "\n }, \n" + ext.split(",").join(",\n") + ",},}; \n exports.commands = commands;";
  this.exportCommand(name,room,material);
  }
  
  delCmd(name){
fs.unlinkSync("./plugins/" + name + ".js");
  }
  */
}

export let Storage = new storage();