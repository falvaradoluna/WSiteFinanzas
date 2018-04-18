var externosView = require('../views/reference'),
    externosModel = require('../models/dataAccess');

var externos = function (conf) {
    this.conf = conf || {};
    this.view = new externosView();
    this.model = new externosModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};

// /api/internos/internos
// Funcionalidad de la tabla UNIDADES
externos.prototype.get_createExcel = function (req, res, next) {
    
    var self = this;
    
    console.log('Hola si llego aqui get_createExcel');
    self.view.expositor(res, {
        error: "error",
        result: "result",
    });

    //   var params = [
    //     { name: 'IdCompania', value: idCompania, type: self.model.types.INT },
    //     { name: 'IdSucursal', value: idSucursal, type: self.model.types.INT },
    //     { name: 'PeriodoMes', value: periodoMes, type: self.model.types.INT },
    //     { name: 'periodoYear', value: periodoAnio, type: self.model.types.INT }
    //   ];

    //   this.model.query('Unidad.ObtenerUnidades', params, function (error, result) {
    //     // console.log('Parametros Unidades: ' + JSON.stringify(params));
    //     if (result.length > 0) {
    //       // console.log("UNIDADES Nv1: " + JSON.stringify(result[0]));
    //     }
    //     self.view.expositor(res, {
    //       error: error,
    //       result: result,
    //     });
    //   });
};

module.exports = externos;

