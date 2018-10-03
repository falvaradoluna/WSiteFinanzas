var reportesView = require('../views/reference'),
    reportesModel = require('../models/dataAccess')
   

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

reportes.prototype.get_saveTemplateDB = function (req, res, next) {
    
  var self = this;
  var idMarca = req.query.idMarca;
  var nombrePlatilla = req.query.nombrePlatilla;
  var usuarioID = req.query.usuarioID;
  
  var params = [
    { name: 'idMarca', value: idMarca, type: self.model.types.INT },
    { name: 'nombrePlatilla', value: nombrePlatilla, type: self.model.types.STRING },
    { name: 'usuarioID', value: usuarioID, type: self.model.types.INT }
  ];
  this.model.query('[Planta].[RegistraPlantilla]', params, function (error, result) {
    self.view.expositor(res, {error: error, result: result, });
  });
};

reportes.prototype.get_templateForBrand = function (req, res, next) {
    
  var self = this;
  var idMarca = req.query.idMarca;
  
  var params = [{ name: 'idMarca', value: idMarca, type: self.model.types.INT }];
  this.model.query('[Planta].[ObtienePlantillaPorMarca]', params, function (error, result) {
    self.view.expositor(res, {error: error, result: result, });
  });
};

reportes.prototype.post_saveFile = function (req, res, next) {
 
 var archivo = req.files.archivo;
 var path = req.body.filepath;
 archivo.mv(path, err => {
    if (err) throw err;
    return res.status(200).json({ok: true, mensaje: 'Archivo guardado'});
  });
};

reportes.prototype.get_saveConfigurationTemplate = function (req, res, next) {
  var self = this;
  var xmlTemplate = req.query.xmlTemplate;
  
  var params = [{ name: 'xmlTemplate', value: xmlTemplate, type: self.model.types.STRING }];
  this.model.query('[Planta].[GuardaPlantillaReportePlanta]', params, function (error, result) {
    self.view.expositor(res, {error: error, result: result, });
  });
};


module.exports = reportes;