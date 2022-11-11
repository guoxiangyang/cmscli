var http = require('http');
module.exports = function (option, callback) {
    if (option.body) {
        option.method = 'POST';
    }
    try {
        var req = http.request(option, function (res) {
            if (option.stdout && option.stderr) {
                if (res.statusCode === 200) {
                    res.pipe(option.stdout);
                } else {
                    res.pipe(option.stderr);
                }
            } else {
                var body = Buffer.from([]);
                res.on('data', function (chunk) {
                    body = Buffer.concat([body, chunk]);
                });
                res.on('end', function () {
                    body = body.toString();
                    if (res.statusCode === 200) {
                        callback(null, body);
                    } else {
                        callback(body);
                    }
                });
            };
        });
        req.on('error', function (err) {
            callback(err);
        });
        if (option.body) {
            if (typeof option.body === 'string') {
                req.write(option.body);
            } else {
                req.write(JSON.stringify(option.body));
            }
        }
        req.end();
    } catch (e) {
        callback(e);
    }
}
