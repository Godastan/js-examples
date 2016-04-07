var http = require('http');
var server = new http.Server();

server.listen(9000, '127.0.0.1');

server.on('request', function (req, res) {
    setTimeout(function () {
        res.writeHead(200, {'Access-Control-Allow-Origin': '*'});
        res.end('' + Math.round(Math.random() * 1000));
    }, 1000);
});