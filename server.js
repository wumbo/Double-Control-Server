var fs = require('fs');
var express = require('express');
var app = express();
var path = require('path');
var io = require('socket.io')(3000);

var doubles = {}; // dict: serial -> socket

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/driver.html'));
    console.log('Driver HTTP request');
});

app.get('/doubletest', function(req, res) {
    console.log('Double test HTTP request');
    res.sendFile(path.join(__dirname, 'public/doubletest.html'));
});

app.listen(80, function() {
    console.log('Listening on port 80');        
});

io.on('connection', function(socket) {
    socket.on("info", function(msg) {
        doubles["id" + msg.serial] = socket;
        socket.serial = msg.serial;
		io.sockets.emit("doubles", Object.keys(doubles));
        console.log("Double info received");
        console.log(Object.keys(doubles).length);
    });
    socket.on("disconnect", function() {
        // remove socket from doubles array if it is a double socket
        if (socket.serial) {
			delete doubles["id" + socket.serial]
			io.sockets.emit("doubles", Object.keys(doubles));
 	       	console.log("Double disconnected");
 	       	console.log(Object.keys(doubles).length);
 	    } else {
	 	    console.log("Driver disconnected");
 	    }
    });
    socket.on("send doubles", function() {
	    socket.emit("doubles", Object.keys(doubles))
    });
    socket.on("control", function(msg) {
        // get double from msg.serial
        // emit to double
        console.log(msg);
    });
});
