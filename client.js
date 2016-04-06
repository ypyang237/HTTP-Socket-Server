var net = require('net');
// var host = '127.0.0.1';
var port = process.argv[2] || 8080;
var host = process.argv[3] || 'localhost';
var path = process.argv[4] || '/index.html';
var method = process.argv[5] || 'GET';
var date = process.argv[6] || new Date();
// var connection = process.argv[6] || 'keep-alive';
// var accept = process.argv[7] || 'text/html, text/css';


function generateHead(host, path, method, date) {
  return method  + ' ' + path + ' ' + ' HTTP/1.1\n' +
 'Date: ' + date + ' ' + '\n' + 'Host: ' + host + '\n'+
   'User-Agent: ' + 'client.js\n\n';
}


var client = net.createConnection(port, host, function(){
  // connect listener
console.log(process.argv);
console.log('HERE ' + generateHead(host, path, method, date));

  console.log('connected to server');
  client.write(generateHead(host, path, method, date));
  // client.write(connection + ' ' + accept + ' ' + date);

  //path {object}

  client.on('data', function(data){
    console.log(data.toString());
    client.end();
  });

  client.on('end', function() {
    console.log('disconnected from server');
  });

}) ;
