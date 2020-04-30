import { Tools } from '../Tools';
import { Config } from "../Config"
import { Storage } from "../Storage";
import { Room, User } from "../Structures";

declare global {
  namespace NodeJS {
    interface Global {
      Tools : any;
      Config : any;
      Bot : any;
      toId : any;
      Commands : any;
      Storage : any;
      Rooms : any;
      Users : any;
      parser : any;
      User : User;
      Room : Room;
    }
  }
}