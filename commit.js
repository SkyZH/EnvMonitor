var requst = require("request");

module.exports = function(data, cb) {
    request({
        method: 'POST',
        preambleCRLF: true,
        postambleCRLF: true,
        uri: 'https://incredib.link:5000',
        multipart: [{
            'content-type': 'application/json',
            body: JSON.stringify(data)
        }]}, (error, response, body) => {
            cb(error, response, body);
    });
};
