
var buffy = require('buffy');
var debug = require('debug')('envmonitor:reader');
var CMD = require('./cmd.json');

function* parser(reader) {
    while(true) {
        yield {"success": false, "size": 2};
        cmd = reader.uint8();
        size = reader.uint8();
        yield {"success": false, "size": size};
        result = {}
        if(cmd == CMD.DHT) {
            result = {
                "Humdity": reader.float32LE(),
                "Temperature": {
                    "Celsius": reader.float32LE(),
                    "Fahrenheit": reader.float32LE()
                },
                "HeatIndex": {
                    "Fahrenheit": reader.float32LE(),
                    "Celsius": reader.float32LE()
                }
            };
            debug(result);
        } else if (cmd == CMD.PM) {
            result = {
                "PM01": reader.int16LE(),
                "PM25": reader.int16LE(),
                "PM10": reader.int16LE()
            };
            debug(result);
        } else if(cmd == CMD.FAILED) {
            result = {
                "status": "Failed"
            };
            reader.skip(size);
        }
        yield {
            "success": true,
            "command": cmd,
            "result": result,
            "size": 0
        };
    }
}

module.exports = function(serialStream, dataCallback) {
    var reader = buffy.createReader();

    var dataParser = parser(reader);
    var status = dataParser.next().value;

    onData = function() {
        debug(reader.bytesAhead() + " in buffer");
        while(true) {
            if(status.success) {
                dataCallback(status);
                status = dataParser.next().value;
            } else {
                if(reader.bytesAhead() >= status.size) {
                    status = dataParser.next().value;
                    debug("size to recv: " + status.size);
                } else {
                    break;
                }
            }
        }
    }
    serialStream.pipe(reader);
    return onData;
};
