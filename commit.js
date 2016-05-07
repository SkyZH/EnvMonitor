var request = require("request");
var config = require("./config.json");
module.exports = function(data, cb) {
    request({
        method: 'POST',
        preambleCRLF: true,
        postambleCRLF: true,
        uri: config.url,
        json: data
      }, (error, response, body) => {
            cb(error, response, body);
    });
};
