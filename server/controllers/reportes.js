var reportesView = require('../views/reference'),
    reportesModel = require('../models/dataAccess'),
    fs = require("fs")
   

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
  var idCompania = req.query.idCompania;
  var nombrePlatilla = req.query.nombrePlatilla;
  var usuarioID = req.query.usuarioID;
  
  var params = [
    { name: 'idCompania', value: idCompania, type: self.model.types.INT },
    { name: 'nombrePlatilla', value: nombrePlatilla, type: self.model.types.STRING },
    { name: 'usuarioID', value: usuarioID, type: self.model.types.INT }
  ];
  this.model.query('[Planta].[RegistraPlantilla]', params, function (error, result) {
    self.view.expositor(res, {error: error, result: result, });
  });
};

reportes.prototype.get_templateForBrand = function (req, res, next) {
    
  var self = this;
  var idCompania = req.query.idCompania;
  
  var params = [{ name: 'idCompania', value: idCompania, type: self.model.types.INT }];
  this.model.query('[Planta].[ObtienePlantillaPorMarca]', params, function (error, result) {
    self.view.expositor(res, {error: error, result: result, });
  });
};

reportes.prototype.post_saveFile = function (req, res, next) {
  var archivo = req.files.archivo;
  var dir = req.body.dir;
  var filePathBack = req.body.filePathBack;
  var filepath = req.body.filepath;

  
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  if (fs.existsSync(filepath)) {
    fs.copyFileSync(filepath,filePathBack);
  }
  
  archivo.mv(filepath, err => {
    if (err) throw err;
    return res.status(200).json({ok: true, mensaje: 'Archivo guardado'});
  });
};

reportes.prototype.get_saveConfigurationTemplate = function (req, res, next) {
  var self = this;
  var idHoja = req.query.idHoja;
  var idPlantilla = req.query.idPlantilla;
  var xmlTemplate = req.query.xmlTemplate;
  var xmlDepartamento = req.query.xmlDepartamento;
  var xmlEstadoResultado = req.query.xmlEstadoResultado;
  
  
  var params = [
            { name: 'idHoja', value: idHoja, type: self.model.types.INT },
            { name: 'idPlantilla', value: idPlantilla, type: self.model.types.INT },
            { name: 'xmlTemplate', value: xmlTemplate, type: self.model.types.XML },
            { name: 'xmlDepartamento', value: xmlDepartamento, type: self.model.types.XML },
            { name: 'xmlEstadoResultado', value: xmlEstadoResultado, type: self.model.types.XML }
          ];
  this.model.query('[Planta].[GuardaPlantillaReportePlanta]', params, function (error, result) {
    self.view.expositor(res, {error: error, result: result, });
  });
};

reportes.prototype.get_alineacionTextReportePlanta = function (req, res, next) {
  var self = this;
    this.model.query('[Planta].[ObtieneAlineacionTextReportePlanta]', [], function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

reportes.prototype.get_excelLabelDetail = function (req, res, next) {
  var self = this;
  var idEtiqueta = req.query.idEtiqueta;

  
  var params = [{ name: 'idEtiqueta', value: idEtiqueta, type: self.model.types.INT }];
  this.model.query('[Planta].[ObtieneEtiquetaExcelDetalle]', params, function (error, result) {
      self.view.expositor(res, {
          error: error,
          result: result,
      });
  });
};

reportes.prototype.get_clasificacion = function (req, res, next) {
  var self = this;
  
  this.model.query('[Planta].[ObtieneClasificacion]', [], function (error, result) {
      self.view.expositor(res, {
          error: error,
          result: result,
      });
  });
};

reportes.prototype.get_estadoResultadosConcepto = function (req, res, next) {
  var self = this;
  
  this.model.query('[Interno].[ObtieneEstadoResultadosConcepto]', [], function (error, result) {
      self.view.expositor(res, {
          error: error,
          result: result,
      });
  });
};

reportes.prototype.get_departamentoxCompaniayUsuario = function (req, res, next) {
  var self = this;
  var idUsuario = req.query.idUsuario;
  var idCompania = req.query.idCompania;
  
  
  var params = [
                { name: 'idUsuario', value: idUsuario, type: self.model.types.INT },
                { name: 'idCompania', value: idCompania, type: self.model.types.INT }
               ];
  this.model.query('[Planta].[ObtenerDepartamentoxCompaniayUsuario]', params, function (error, result) {
    self.view.expositor(res, {error: error, result: result, });
  });
};

reportes.prototype.get_clasificacionAutolinea = function (req, res, next) {
  var self = this;
  this.model.query('[Planta].[ObtieneClasificacionAutolinea]', [], function (error, result) {
    self.view.expositor(res, {error: error, result: result, });
  });
};

reportes.prototype.get_clasificacionAutolineaHONDA = function (req, res, next) {
  var self = this;
  var idAutoLineaPlanta = req.query.idAutoLineaPlanta;
  var periodoYear = req.query.periodoYear;
  var idAutoLinea = req.query.idAutoLinea;
  var params = [
                  { name: 'idAutoLineaPlanta', value: idAutoLineaPlanta, type: self.model.types.INT },
                  { name: 'periodoYear', value: periodoYear, type: self.model.types.INT },
                  { name: 'idAutoLinea', value: idAutoLinea, type: self.model.types.INT }
               ];
  this.model.query('[Planta].[ObtieneClasificacionAutolineaHONDA]', params, function (error, result) {
    self.view.expositor(res, {error: error, result: result, });
  });
};

reportes.prototype.get_gurdarConfiguracionHonda = function (req, res, next) {
  var self = this;
  var idAutoLineaPlanta = req.query.idAutoLineaPlanta;
  var xmlAutoLinea = req.query.xmlAutoLinea;
  
  var params = [
                  { name: 'idAutoLineaPlanta', value: idAutoLineaPlanta, type: self.model.types.INT },
                  { name: 'xmlAutoLinea', value: xmlAutoLinea, type: self.model.types.XML }
               ];
  this.model.query('[Planta].[GuardaConfiguracionAutoLinea]', params, function (error, result) {
    self.view.expositor(res, {error: error, result: result, });
  });
};

reportes.prototype.get_departamentoConfiguracionHonda = function (req, res, next) {
  var self = this;
  this.model.query('[Planta].[ObtieneDepartamentoConfiguracionHonda]', [], function (error, result) {
    self.view.expositor(res, {error: error, result: result, });
  });
};

reportes.prototype.get_etiquetaConfiguracionHonda = function (req, res, next) {
  var self = this;
  this.model.query('[Planta].[ObtieneEtiquetaConfiguracionHonda]', [], function (error, result) {
    self.view.expositor(res, {error: error, result: result, });
  });
};

reportes.prototype.get_cuentasSinClasificarHONDA = function (req, res, next) {
  var self = this;
  var periodoYear = req.query.periodoYear;
  var periodoMes = req.query.periodoMes;
  
  var params = [
                  { name: 'periodoYear', value: periodoYear, type: self.model.types.INT },
                  { name: 'periodoMes', value: periodoMes, type: self.model.types.INT }
               ];
  this.model.query('[Planta].[ObtieneCuentasSinClasificarHONDA]', params, function (error, result) {
    self.view.expositor(res, {error: error, result: result, });
  });
};

reportes.prototype.get_guardaConfiguracionReporteHondaHojaDosTres = function (req, res, next) {
  var self = this;
  var xmlCtas = req.query.xmlCtas;
  
  var params = [{ name: 'xmlCtas', value: xmlCtas, type: self.model.types.XML }];
  this.model.query('[Planta].[GuardaConfiguracionReporteHondaHojaDosTres]', params, function (error, result) {
    self.view.expositor(res, {error: error, result: result, });
  });
};

module.exports = reportes;