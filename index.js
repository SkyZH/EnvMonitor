var config = require("./config.json");
var arduino = require("./arduino")(config.arduino);
var debug = require('debug')('envmonitor:main');

var CMD = require('./cmd');
var commit = require('./commit');

arduino.open(function(err) {
    if(err) debug(err); else {
        debug("device connected");
        function do_oper_a() {
            arduino.get("A", function(err, results) {
                debug(results);
                commit(results, function(err, res, body) {
                    debug(body);
                });
            });
            setTimeout(do_oper_A, 10000);
        }
        function do_oper_A() {
            arduino.get("a", function(err, results) {
                debug(results);
                commit(results, function(err, res, body) {
                    debug(body);
                });
            });
            setTimeout(do_oper_a, 10000);
        }
        setTimeout(do_oper_a, 10000);
    }
});
