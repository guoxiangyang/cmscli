var call_cms = require('../call_cms.js');
function select(host, port, tree, remote, query, opt, callback) {
    remote = encodeURIComponent(remote);
    tree   = encodeURIComponent(tree);
    opt    = encodeURIComponent(JSON.stringify(opt));
    var option = {
        method : 'POST',
        host   : host,
        port   : port,
        path   : `/tree2/select?tree=${tree}&path=${remote}&option=${opt}`,
        body   : query,
    };
    call_cms(option, callback);
};
module.exports = select;
