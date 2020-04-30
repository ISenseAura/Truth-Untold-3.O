 interface config {
  username : string,
  password : string,
  host : string,
  port : number,
  developers : string[],
  rooms : string[],
  avatar : any,
  commandCharacter : any,
  ranks : string[],
  autoRes : any
}

export let Config : config = {
  //Username of bot
  username : "TS Rocks!",
  
  password : "",
  
  host : "sim.smogon.com",
  
  port : 8000,

  //List of developers
  developers : ["zerapium"],
  
  //Rooms to join 
  rooms : [],
  
  //Set avatar on connect
  avatar : 119,
  
  //Command Character 
  
  commandCharacter : {
    default : "$",
  },
  
  ranks : ["+","%","@","*","#","$","-","&","~"],
  
  //Autoresponses - ``autoRes : false`` to disable them
  // example use - ``autoRes : { roomid : { msg : reply } }``
  // response to a specified user -  ``autoRes : { roomid : { msg : { userid : reply } } }``
  autoRes : {
    botdevelopment : {
      "youalive" : { "zerapium" : "yes, i am" }
    }
  },
};
