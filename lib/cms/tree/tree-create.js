var call_cms = require('../../call_cms.js');
function create(host, port, tree, opt, callback) {
    if (typeof opt === 'function') {
        callback = opt;
        opt = {};
    }
    tree   = encodeURIComponent(tree);
    opt    = encodeURIComponent(JSON.stringify(opt));
    var option = {
        host   : host,
        port   : port,
        path   : `/tree2/tree/create?tree=${tree}&option=${opt}`
    };
    console.log(option);
    call_cms(option, callback);
};
module.exports = create;
