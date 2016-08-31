# Monitor en node para CuentaDigital.com

Simple middleware en Javascript para Express que solicita y convierte a json los datos extraidos del api de CuentaDigital.com

Con este paquete podes:
  - Declarar el hash por ENV
  - Asignar una función tipo callback cuando los datos son convertidos a json
  - Logear la actividad de la cuenta

En mi caso utlizo este middleware para hacer un pull cuando el Webhook es solicitado. De esta forma los datos agregados al sistema son siempre los que solicito y no los que envia el Webhook. Es decir, la sincronización es en Pull y no en Push.

### Intalación
Requiere [Node.js](https://nodejs.org/) y [Express](http://expressjs.com/es/).

```sh
$ npm install --save cobrodigital-monitor
```

Incluirlo en la app

```js
var cobro = require(cobrodigital-monitor)
...
app.use('/hook',cobro.pullPay); //Ruta de Express
```

### Configuración

Cuenta con una función de configuración:
```js
cobro.init({
  hash: "qwerty1234qwerty1234qwerty" //hash extraido de la web de cuentadigital
  sandbox: false,                     //utilizar url de prueba o de producción
  headers: [                         //array con el orden de los datos configurados
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
    time: true, //Si la consulta incuye le rango de fecha y horario
    urlDate: {
      fecha:'20160801', //yyyymmdd - Por default toma la fecha de la solicitud
      hour1:'00',
      min1:'00',
      hour2:'23',
      min2:'59'
    },
    onData : function(data){
        //callback con la data en JSON
    }
});
```
