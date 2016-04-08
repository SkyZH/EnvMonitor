var config = require("./config.json");
var arduino = require("./arduino")(config.arduino);
var debug = require('debug')('envmonitor:main');

var CMD = require('./cmd');
var commit = require('./commit');

arduino.open(function(err) {
    if(err) debug(err); else {
        debug("device connected");
        function do_oper() {
            arduino.get("a", function(err, results) {
                debug(results);
                arduino.get("A", function(err, results) {
                    debug(results);
                    commit(results, function(err, res, body) {
                        debug(body);
                    });
                });
                commit(results, function(err, res, body) {
                    debug(body);
                });
            });
        }
        setInterval(do_oper, 10000);
    }
});
