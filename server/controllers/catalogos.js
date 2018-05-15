var LoginView = require('../views/reference'), LoginModel = require('../models/dataAccess');

var Catalogos = function (conf) {
    this.conf = conf || {};
    this.view = new LoginView();
    this.model = new LoginModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};

// ==========================================
//  Recupera todos los departamentos
// ==========================================
Catalogos.prototype.get_departamentos = function (req, res, next) {
    var self = this;
    this.model.query('[Catalogo].[ObtenerDepartamento]', [], function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

// ==========================================
//  Recupera todos los departamentos por companias (XML)
// ==========================================
Catalogos.prototype.get_departamentosPorCompanias = function (req, res, next) {
    var self = this;

    var params = [
        { name: 'idCompania', value: req.query.idCompanias, type: self.model.types.STRING },
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
    ];

    this.model.query('[Interno].[ObtenerDepartamentoxCompanias]', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};


module.exports = Catalogos;