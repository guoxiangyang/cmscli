var call_cms = require('../call_cms.js');
function del(host, port, tree, opt, callback) {
    tree   = encodeURIComponent(tree);
    opt    = encodeURIComponent(JSON.stringify(opt));
    var option = {
        host   : host,
        port   : port,
        path   : `/tree2/tree/del?tree=${tree}&option=${opt}`
    };
    call_cms(option, callback);
};
module.exports = del;
