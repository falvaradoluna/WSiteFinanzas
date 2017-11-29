var env = process.env.NODE_ENV || 'production',
express = require('express'),
bodyParser = require('body-parser'),
middlewares = require('./middlewares/admin'),
router = require('./router'),
path = require('path');


//Alta de opciones
var done=false;

var ExpressServer = function(config){
  this.config = config || {};
  this.expressServer = express();

  this.expressServer.use(bodyParser.urlencoded({extended: true}))
  this.expressServer.use(bodyParser.json());

  for (var middleware in middlewares){
    this.expressServer.use(middlewares[middleware]);
  }

  this.expressServer.set('view engine', 'html');
  //this.expressServer.set('views',path.resolve('/dist/'));

  //////////////////////////////////////////////////////////////

  if(env == 'development'){
    console.log('OK NO HAY CACHE');
    this.expressServer.set('view cache', false);
    swig.setDefaults({cache: false, varControls:['[[',']]']});
  }

  //Inicia los APIs
  for (var controller in router){
    for (var funcionalidad in router[controller].prototype){
      var method = funcionalidad.split('_')[0];
      var entorno = funcionalidad.split('_')[1];
      var data = funcionalidad.split('_')[2];
      data = (method == 'get' && data !== undefined) ? ':data' : '';
      var url = '/api/' + controller + '/' + entorno + '/' + data;
      console.log(url)
      this.router(controller,funcionalidad,method,url);
    }
  }

  //Servimos el archivo angular
  this.expressServer.get('*', function(req, res){
    res.sendFile(path.resolve('dist/index.html'));
  });

  this.expressServer.post('*', function(req, res){
      res.render('index', {});
  });
};

ExpressServer.prototype.router = function(controller,funcionalidad,method,url){
  console.log(url);
  var parameters = this.config.parameters;


  this.expressServer[method](url, function(req,res,next){
   var conf = {
     'funcionalidad':funcionalidad,
     'req': req,
     'res': res,
     'next': next,
     'parameters' : parameters
   }

   var Controller = new router[controller](conf);
   Controller.response();

 });
}
module.exports = ExpressServer;

