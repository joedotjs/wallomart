var http = require('http');
var server = http.createServer();
var PORT = 3001;

server.on('request', require('./app'));

server.listen(PORT, function () {
    console.log('Server listening on port ' + PORT + '.');
});