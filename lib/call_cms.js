var http = require('http');
module.exports = function (option, body, callback) {
    if (typeof body === 'function') {
        callback = body;
        body = {};
    }
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
        if (option.method === 'POST') {
            if (typeof body === 'string') {
                req.write(body);
            } else {
                req.write(JSON.stringify(body));
            }
        }
        req.end();
    } catch (e) {
        callback(e);
    }
}
