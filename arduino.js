var serialport = require("serialport");
var Stream = require('stream');
var debug = require('debug')('envmonitor:arduino');

var SerialReader = require('./reader');
var SerialPort = serialport.SerialPort;


module.exports = function(config) {
    var serialPort = new SerialPort(config.serial.path, {
        baudrate: config.serial.baudrate
    }, config.serial.immediate);

    var serialStream = new Stream();
    serialStream.readable = true;

    var serialReader = new SerialReader(serialStream, onData);

    function onData(status) {
        //debug(status);
    }

    return {
        "open": function(cb) {
            serialPort.open(function (error) {
                if(error) {
                    debug('failed to open: ' + error);
                    cb(error);
                } else {
                    debug("device connected");
                    serialPort.on('data', function(data) {
                        serialStream.emit('data', data);
                        serialReader();
                    });
                    cb(null);
                }
            });
        },
        "get": function(cmd, cb) {
            serialPort.write(cmd, cb);
        }
    };
};
