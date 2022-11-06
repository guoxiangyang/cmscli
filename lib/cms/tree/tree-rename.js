var call_cms = require('../../call_cms.js');
function rename(host, port, tree, to, opt, callback) {
    if (typeof opt === 'function') {
        callback = opt;
        opt = {};
    }
    tree   = encodeURIComponent(tree);
    to     = encodeURIComponent(to);
    opt    = encodeURIComponent(JSON.stringify(opt));
    var option = {
        host   : host,
        port   : port,
        path   : `/tree2/tree/rename?tree=${tree}&to=${to}&option=${opt}`
    };
    call_cms(option, callback);
};
module.exports = rename;
