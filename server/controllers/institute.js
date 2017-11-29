var InstituteView = require('../views/reference'),
    InstituteModel = require('../models/dataAccess');

var Institute = function (conf) {
    this.conf = conf || {};
    this.view = new InstituteView();
    this.model = new InstituteModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};

Institute.prototype.post_institute = function(req, res, next) {
    var self = this;
    var nombre = req.body.nombre;
    var direccion = req.body.direccion;
    var clave = req.body.clave;

    var params = [{name: 'nombre', value: nombre, type: self.model.types.STRING},
    {name: 'domicilio', value: direccion, type: self.model.types.STRING},
    {name: 'clave', value: clave, type: self.model.types.STRING}]

    try {
        this.model.post('INS_INSTITUTE_SP', params, function(error, result){
            self.view.expositor(res, {
                error: error,
                result: result
            });
        });
    } catch (error) {
        console.log('Mensaje: ' + error);   
    }
    
}

module.exports = Institute;