var reportesView = require('../views/reference'),
    reportesModel = require('../models/dataAccess');

var reportes = function (conf) {
  this.conf = conf || {};
  this.view = new reportesView();
  this.model = new reportesModel({
    parameters: this.conf.parameters
  });

  this.response = function () {
    this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
  };
};

// /api/reportes/reportMonth
// Obtiene los datos para el reporte externo en excel
reportes.prototype.get_reportMonth = function (req, res, next) {
    
    var self = this;
    var idHoja = req.query.idHoja;
    var idCompania = req.query.idCompania;
    var periodoYear = req.query.periodoYear;
    var periodoMes = req.query.periodoMes;
  
    var params = [
      { name: 'idHoja', value: idHoja, type: self.model.types.INT },
      { name: 'idCompania', value: idCompania, type: self.model.types.INT },
      { name: 'periodoYear', value: periodoYear, type: self.model.types.INT },
      { name: 'periodoMes', value: periodoMes, type: self.model.types.INT },
    ];
    this.model.query('[ExternoMensual].[ObtenerXMLHoja' + idHoja + ']', params, function (error, result) {
      self.view.expositor(res, {error: error, result: result, });
    });
  };

module.exports = reportes;