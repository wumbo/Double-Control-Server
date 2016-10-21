# Double Control Server

This repo contains a Node.js server used to send controls to the Double. It also has a test webpage, which was initailly used to send controls, however this page is no longer needed, as this can be done through the AppRTC app with integrated driver controls.

## Installation

First, make sure Node.js and NPM are installed, then install required packages:

npm install socket.io
npm install express

Then the server can be run using 

sudo node server.js

Port 8443 must be open for WebSockets to work.

## Future Work

There is some support for having multiple Doubles, but this is not currently implemented in the iOS or driver applications. The iOS API allows you to get the serial number of the Double, which could be used as an ID.

For simplicity, this server could be integrated with the AppRTC server, as they both use Node.js. This would mean only one server would need to be started when testing.
