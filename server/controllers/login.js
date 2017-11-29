var LoginView = require('../views/reference'),
    LoginModel = require('../models/dataAccess');



var Login = function(conf) {


    this.conf = conf || {};
    this.view = new LoginView();
    this.model = new LoginModel({
        parameters: this.conf.parameters
    });




    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};



Login.prototype.get_auth = function(req, res, next) {

    var self = this;

    var usuario = req.query.usuario;
    var contrasena =  req.query.contrasena;
    var params = [{ name: 'correo', value: usuario , type: self.model.types.STRING }
    ,{ name: 'pass', value: contrasena, type: self.model.types.STRING }];

    this.model.query('SEL_LOGIN_SP', params, function(error, result) {
        if( result.length > 0  ){
        	console.log("result " + result[0]);
        }
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

module.exports = Login;
