import { Connection } from "./app";

export class Bot {
  
  Send(room : string,msg : string) {
    Connection.send(room + "|" + msg);
  }
  
  pm(user : string, msg : string) {
    Connection.send("|/pm " + user + ", " + msg);
  }
  
}

