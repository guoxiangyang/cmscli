var call_cms = require('../call_cms.js');
function ln(host, port, tree, src, dst, opt, callback) {
    console.error("[ln]", src, dst);
    src  = encodeURIComponent(src);
    dst  = encodeURIComponent(dst);
    tree = encodeURIComponent(tree);
    opt  = encodeURIComponent(JSON.stringify(opt));
    var option = {
        host   : host,
        port   : port,
        path   : `/tree2/ln?tree=${tree}&src=${src}&dst=${dst}&option=${opt}`
    };
    call_cms(option, callback);
};

module.exports = ln;
