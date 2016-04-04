var request = require("request");

module.exports = function(data, cb) {
    request({
        method: 'POST',
        preambleCRLF: true,
        postambleCRLF: true,
        uri: 'http://www.incredib.link:5000',
        json: data
      }, (error, response, body) => {
            cb(error, response, body);
    });
};
