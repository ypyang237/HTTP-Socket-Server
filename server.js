var net = require('net');
var fs = require('fs');



function myHeader(length, type) {
  return 'HTTP/1.1 200 OK \r\nServer: Pams \r\n' +
 'Date: '+ new Date() +'; \r\nContent-Type: text/' + type + '\r\n' + 'charset = utf-8 \r\n'+
 'Content-Length:' +  length + '\r\nConnection: keep-alive \r\n\r\n';

}


var server = net.createServer(function(request){

  // console.log(request);
  request.on('data', function(data) {
    console.log('data has been sent');
    // console.log(data.toString());
      var type = "html";
    if (data.toString().indexOf(".css") !== -1){
      type = "css";
    }


    var header = (data.toString().split(" "));
    console.log(header);

    if(header[1] === '/') {
      fs.readFile('./index.html', function(error, serverSideData){
        request.write(myHeader(serverSideData.length, type));
        request.write(serverSideData);
        request.end();
      });
    } else{

      fs.readFile("." + header[1], function(error, serverSideData) {

      if(error) {
        fs.readFile("./404.html", function(error, serverSideData){

        request.write(serverSideData.toString());
        request.end();
        });

      } else {
        console.log('HEADER HTML');
        request.write(myHeader(serverSideData.length, type));
        request.write(serverSideData);
        request.end();

      }

    });

    }


  });

  request.on('end', function() {
    console.log('socket connnection has ended');
  });
});

server.listen({port : 8080}, function() {
  var address = server.address();
  console.log('opened server on %d', address.port);
});