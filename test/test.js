var Cms = require('../index.js');
var config = {
    host : '192.168.2.49',
    port : 7000,
    tree : 'org',
};
var cms = new Cms(config)
cms.find('/', function (err, result) {
    console.log(err, result);
});
