'use strict';
var monitor = require("./app");
var express = require('express');
var app = express();

//CONFIGURACION DE CUENTA DIGITAL Y DEL CALLBACK
monitor.init({
  hash: process.env.CDIGITAL || "qwerty1234qwerty1234qwerty",
  sandbox: false,
  urlDate: {
    fecha: '20160817',
    hour1:'00',
    min1:'00',
    hour2:'23',
    min2:'59'
  }
});

//URL QUE SE USA PARA EL MINTOR
app.use('/hook',monitor.pullPay);

//INICIO EL SERVER
var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});


/*///////INICIAR CON://////////////////////////////////
CDIGITAL=hashobtenidoenlaweb PORT=3003 node example.js
/////////////////////////*/////////////////////////////
