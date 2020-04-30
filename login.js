//var globals = require("./globals.js");

let url = require("url");
let https = require("https");
let util = require("util");
let Config = require("./dist/Config").Config;
let Tools = require("./dist/Tools").Tools;
let bot = require("./dist/Bot").Bot;
let Bot = new bot();
let psurl = "ws://sim.smogon.com:8000/showdown/websocket";
let loginurl = "https://play.pokemonshowdown.com/~~showdown/action.php";

let autoJoin = function(index) {
  for (let r in Config.rooms) {
    Bot.Send("", "/j " + Config.rooms[r]);
    console.log("Joined " + Config.rooms[r]);
   // Bot.Send("botdevelopment", "checking Bot.Send() works")
  }
};

module.exports = function(id, challstr) {
  let ac = url.parse(loginurl);
  let requestOptions = {
    hostname: ac.hostname,
    port: ac.port,
    path: ac.pathname,
    agent: false
  };

  requestOptions.method = "POST";
  let data =
    "act=login&name=" +
    Config.username +
    "&pass=" +
    Config.password +
    "&challengekeyid=" +
    id +
    "&challenge=" +
    challstr;
  requestOptions.headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Content-Length": data.length
  };
  var req = https.request(requestOptions, function(res) {
    res.setEncoding("utf8");
    var data = "";
    res.on("data", function(chunk) {
      data += chunk;
    });
    res.on("end", function() {
      if (data === ";") {
        console.log(
          "failed to log in; nick is registered - invalid or no password given"
        );
        process.exit();
        return;
      }
      if (data.length < 50) {
        console.log("failed to log in: " + data);
        process.exit();
        return;
      }
      if (data.indexOf("heavy load") !== -1) {
        console.log("the login server is under heavy load");
        return;
      }
      try {
        data = JSON.parse(data.substr(1));
        if (data.actionsuccess) {
          data = data.assertion;
        } else {
          this.error(
            "could not log in; action was not successful: " +
              JSON.stringify(data)
          );
          return;
        }
      } catch (e) {}
      console.log("Sending log in trn...");
      Bot.Send("", "/trn " + Config.username + ",0," + data);
      Bot.Send("", "/avatar " + (Config.avatar ? Config.avatar : 167));
      autoJoin(0);
    });
  });
  req.on("error", function(err) {
    console.log("login error: " + util.inspect(err));
    return;
  });
  if (data) {
    req.write(data);
  }
};
