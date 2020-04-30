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
 
}

export let Storage = new storage();
