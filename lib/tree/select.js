var call_cms = require('../call_cms.js');
function select(host, port, tree, remote, opt, callback) {
    remote = encodeURIComponent(remote);
    tree   = encodeURIComponent(tree);
    var option = {
        method : 'POST',
        host   : host,
        port   : port,
        path   : `/tree2/select?tree=${tree}&path=${remote}`
    };
    call_cms(option, opt, callback);
};
module.exports = select;
