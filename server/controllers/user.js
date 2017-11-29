var UserAddView = require('../views/reference'),
    UserModel = require('../models/dataAccess');

var userAdd = function(conf) {
    this.conf = conf || {};
    this.view = new UserAddView();
    this.model = new UserModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};



userAdd.prototype.get_persona = function(req, res, next) {

    var self = this;

    
  
    var params = [];

    this.model.query('SEL_PERSONA_SP', params, function(error, result) {
        if( result.length > 0  ){
            console.log("resultaaaaaaa " + result[0]);
        }
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};



userAdd.prototype.post_userAdd = function(req, res, next) {
    var self = this;
    var name = req.body.name;
    var apepaterno =  req.body.apepaterno;
    var apematerno = req.body.apematerno;
    var correo =  req.body.correo;
    var password =  req.body.password;

var params = [
     { name: 'nombre', value: name , type: self.model.types.STRING }
    ,{ name: 'apepaterno', value: apepaterno, type: self.model.types.STRING }
    ,{ name: 'apematerno', value: apematerno , type: self.model.types.STRING }
    ,{ name: 'correo', value: correo, type: self.model.types.STRING }
    ,{ name: 'password', value: password, type: self.model.types.STRING }
    ];

 try {
        this.model.post('INS_PROFESOR_SP', params, function(error, result){
            self.view.expositor(res, {
                error: error,
                result: result
            });
        });
        console.log("Se inserto con exito al usuario");
    } catch (error) {
        console.log('Mensaje: ' + error);   
    }
};





module.exports = userAdd;
