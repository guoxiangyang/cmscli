var http = require('http');
module.exports = function (option, callback) {
    try {
        var req = http.request(option, function (res) {
            var body = '';
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {
                if (res.statusCode === 200) {
                    callback(null, body);
                } else {
                    callback(body);
                }
            });
        });
        req.on('error', function (err) {
            callback(err);
        });
        req.end();
    } catch (e) {
        callback(e);
    }
}
