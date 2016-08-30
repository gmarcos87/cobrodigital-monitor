/*!
 * vary
 * Copyleft 2016 Marcos Gutierrez
 * MIT Licensed
 */
'use strict';


/**
 * Load files
 */
var fetch = require('node-fetch');
var extend = require('util')._extend;

/**
 * Module exports.
 */
 module.exports = monitor;

 /**
  * Main object
  */

 function cvsToJson(string,divisor,headers){
   //Primero por linea
   var lineas = string.split('\n');
   lineas = lineas.filter(function(x){ return x[0]!=null})
   //Despues por campo
   var arrJsonObject = lineas.map(function(linea){
     linea = linea.split(divisor);
     var result = {};
     for (var i = 0; i < linea.length; i++) {
       result[headers[i]] = linea[i];
     }
     return result;
   })
   return arrJsonObject;
 }


 var monitor = {
   /* Customizable options */
  options: {
    path: "monitor",
    sandbox: true,
    urlProduction: "https://www.cuentadigital.com/exportacion.php",
    urlSandbox:"https://www.cuentadigital.com/exportacionsandbox.php",
    userId:"",
    hash:"",
    headers: [
      'fechaDeCobro',
      'horarioDeOperacion',
      'monto',
      'montoNetoRecibido',
      'comision',
      'codigoDeBarraCobrado',
      'suReferencia',
      'medioDePagoUsado',
      'codigoInternoDeLaOperacion',
      'primerCobroDelArchivo'],
      onData : function(data){
        data.time = new Date();
        console.log(data);
        return;
      }
  },
  pullPay: function(req,res,next){
      if (monitor.options.sandbox == true){
        var url = monitor.options.urlSandbox
      } else {
         var url = monitor.options.urlProduction;
      }
      fetch(url+'?control='+monitor.options.hash).then(function(result) {
        return result.text()
       })
      .then(function(body) {
        if (body.indexOf("<center>") < 0){
          var data = {data: cvsToJson(body,'|',monitor.options.headers)};
        } else {
          var data = {error: 'Error de configuración en la herramienta'}
        }

        monitor.options.onData(data)
        res.send(data)
      });
  },
  init: function(opts) {
    monitor.options = extend(monitor.options, opts);
  }
 }
 module.exports = monitor;
