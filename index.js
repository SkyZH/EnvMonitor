var config = require("./config.json");
var arduino = require("./arduino")(config.arduino);
var debug = require('debug')('envmonitor:main');

var CMD = require('./cmd');
var commit = require('./commit');

arduino.open(function(err) {
    if(err) debug(err); else {
        debug("device connected");
        function do_oper() {
            arduino.get("aA", function(err, results) {
                commit(results);
            });
        }
        setInterval(do_oper, 10000);
    }
});
