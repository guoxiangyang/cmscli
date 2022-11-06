var call_cms = require('../../call_cms.js');
function list(host, port, opt, callback) {
    if (typeof opt === 'function') {
        callback = opt;
        opt = {};
    }
    opt    = encodeURIComponent(JSON.stringify(opt));
    var option = {
        host   : host,
        port   : port,
        path   : `/tree2/tree/list?option=${opt}`
    };
    call_cms(option, callback);
};
module.exports = list;
