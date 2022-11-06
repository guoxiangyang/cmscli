var call_cms = require('../call_cms.js');
function exists(host, port, tree, opt, callback) {
    console.error("[exists]", tree);
    tree = encodeURIComponent(tree);
    opt  = encodeURIComponent(JSON.stringify(opt));
    var option = {
        host   : host,
        port   : port,
        path   : `/tree2/exists?tree=${tree}&option=${opt}`
    };
    call_cms(option, callback);
};

module.exports = exists;
