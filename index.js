var config = require("./config.json");
var arduino = require("./arduino")(config.arduino);
var debug = require('debug')('envmonitor:main');

var CMD = require('./cmd');

arduino.open(function(err) {
    if(err) debug(err); else {
        debug("device connected");
        arduino.get(CMD.DHT, function(err, results) {

        });
    }
});
