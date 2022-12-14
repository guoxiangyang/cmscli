var call_cms = require('../call_cms.js');
function find(host, port, tree, remote, opt, callback) {
    var stdout = opt.stdout;
    var stderr = opt.stderr;
    delete opt.stdout;
    delete opt.stderr;
    remote = encodeURIComponent(remote);
    tree   = encodeURIComponent(tree);
    opt    = encodeURIComponent(JSON.stringify(opt));
    var option = {
        host   : host,
        port   : port,
        path   : `/tree2/find?tree=${tree}&path=${remote}&option=${opt}`,
        stdout : stdout,
        stderr : stderr,
    };
    call_cms(option, callback);
};
module.exports = find;
