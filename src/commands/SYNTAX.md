###Syntax for commands

```javascript
export let commands = { 
[name] {
  command(target, room, user) {
  //...code to be executed
  },
  devOnly : boolean,
  chatOnly : boolean,
  help : string,
  
}
}```

*where target = the target message ,room = instance