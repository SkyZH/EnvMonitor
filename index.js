var config = require("./config.json");
var arduino = require("./arduino")(config.arduino);
var debug = require('debug')('envmonitor:main');

var CMD = require('./cmd');
var commit = require('./commit');

arduino.open(function(err) {
    if(err) debug(err); else {
        debug("device connected");
        function do_oper_a() {
            arduino.get("a", function(err, results) {
                debug(results);
                setTimeOut(do_oper_A, 10000);
                commit(results, function(err, res, body) {
                    debug(body);
                });
            });
        }
        function do_oper_A() {
            arduino.get("A", function(err, results) {
                debug(results);
                setTimeOut(do_oper_a, 10000);
                commit(results, function(err, res, body) {
                    debug(body);
                });
            });
        }
        do_oper_a();
    }
});
