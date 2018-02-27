var internosView = require('../views/reference'),
  InternosModel = require('../models/dataAccess');

var internos = function (conf) {
  this.conf = conf || {};
  this.view = new internosView();
  this.model = new InternosModel({
    parameters: this.conf.parameters
  });

  this.response = function () {
    this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
  };
};

// /api/internos/internos
// Funcionalidad de la tabla UNIDADES
internos.prototype.get_internos = function (req, res, next) {
  var self = this;
  var idCompania = req.query.idCompania;
  var idSucursal = req.query.idSucursal;
  var periodoMes = req.query.periodoMes;
  var periodoAnio = req.query.periodoYear;
  console.log('QueryString Unidades = ' + JSON.stringify(req.query));

  var params = [
    { name: 'IdCompania', value: idCompania, type: self.model.types.INT },
    { name: 'IdSucursal', value: idSucursal, type: self.model.types.INT },
    { name: 'PeriodoMes', value: periodoMes, type: self.model.types.INT },
    { name: 'periodoYear', value: periodoAnio, type: self.model.types.INT }
  ];

  this.model.query('Unidad.ObtenerUnidades', params, function (error, result) {
    console.log('Parametros Unidades: ' + JSON.stringify(params));
    if (result.length > 0) {
      console.log("UNIDADES Nv1: " + JSON.stringify(result[0]));
    }
    self.view.expositor(res, {
      error: error,
      result: result,
    });
  });
};

// /api/internos/estadoresultados
// Funcionalidad de la tabla ESTADO DE RESULTADOS
internos.prototype.get_estadoresultados = function (req, res, next) {
  var self = this;
  var idCompania = req.query.idCompania;
  var idSucursal = req.query.idSucursal;
  var periodoMes = req.query.periodoMes;
  var periodoYear = req.query.periodoYear;
  var idDepartamento = req.query.idDepartamento;
  console.log('QueryString ER Nv1 = ' + JSON.stringify(req.query));

  var params = [
    { name: 'idCompania', value: idCompania, type: self.model.types.INT },
    { name: 'IdSucursal', value: idSucursal, type: self.model.types.INT },
    { name: 'PeriodoMes', value: periodoMes, type: self.model.types.INT },
    { name: 'PeriodoYear', value: periodoYear, type: self.model.types.INT },
    { name: 'IdDepartamento', value: idDepartamento, type: self.model.types.INT }
  ];

  this.model.query('Contabilidad.ObtieneEstadoDeResultados', params, function (error, result) {
    console.log('Parametros: ' + params);
    if (result.length > 0) {
      console.log("Estado de Resultados " + result[0]);
    }
    self.view.expositor(res, {
      error: error,
      result: result,
    });
  });
};

// /api/internos/sumadepartamentos
// Funcionalidad de la tabla SUMA DE DEPARMATEMTOS
internos.prototype.get_sumadepartamentos = function (req, res, next) {
  var self = this;
  var idCia = req.query.idcia;
  var idSucursal = req.query.idsucursal;
  var departamento = req.query.departamento
  var mes = req.query.mes;
  var anio = req.query.anio;

  var params = [
    { name: 'IdAgencia', value: idCia, type: self.model.types.STRING },
    { name: 'MSucursal', value: idSucursal, type: self.model.types.STRING },
    { name: 'Departamento', value: departamento, type: self.model.types.STRING },
    { name: 'Mes', value: mes, type: self.model.types.STRING },
    { name: 'Anio', value: anio, type: self.model.types.STRING }
  ];

  this.model.query('SP_SUMA_DE_DEPARTAMENTOS', params, function (error, result) {
    console.log('Parametros: ' + params);
    console.log(req.query);
    // if (result.length > 0) {
    //   console.log("Suma de departamentos " + result[0]);
    // }
    self.view.expositor(res, {
      error: error,
      result: result,
    });
  });
};

// /api/internos/unidadesdepto
// Funcionalidad de la tabla UNIDADES por departamento
internos.prototype.get_unidadesdepto = function (req, res, next) {
  var self = this;
  var idCompania = req.query.idCompania;
  var idSucursal = req.query.idSucursal;
  var periodoMes = req.query.periodoMes;
  var periodoYear = req.query.periodoYear;
  var idPestana = req.query.idPestana;

  console.log('QueryString Unidades X Depto = ' + JSON.stringify(req.query));

  var params = [
    { name: 'idCompania', value: idCompania, type: self.model.types.INT },
    { name: 'IdSucursal', value: idSucursal, type: self.model.types.INT },
    { name: 'periodoMes', value: periodoMes, type: self.model.types.INT },
    { name: 'periodoYear', value: periodoYear, type: self.model.types.INT },
    { name: 'idPestana', value: idPestana, type: self.model.types.INT }
  ];

  this.model.query('Unidad.ObtenerUnidadesPorPestania', params, function (error, result) {
    if (result && result.length > 0) {
      console.log("Unidades Depto " + result[0]);
    }
    self.view.expositor(res, {
      error: error,
      result: result,
    });
  });
};

// /api/internos/companias
// Funcionalidad del dropdown de compañias
internos.prototype.get_companias = function (req, res, next) {
  var self = this;
  var idUsuario = req.query.idusuario;

  var params = [
    { name: 'IdUsuario', value: idUsuario, type: self.model.types.INT }
  ];

  this.model.query('Catalogo.ObtenerCompaniaPorUsuario', params, function (error, result) {
    console.log(params);
    // if (result.length > 0) {
    //     console.log("SP_CONSULTA_COMPANIA " + result[0]);
    // }
    self.view.expositor(res, {
      error: error,
      result: result,
    });
  });
};

// /api/internos/sucursales
// Funcionalidad del dropdown de compañias
internos.prototype.get_sucursales = function (req, res, next) {
  var self = this;
  var idCompania = req.query.idCompania;

  var params = [
    { name: 'IdCompania', value: idCompania, type: self.model.types.INT },
  ];

  this.model.query('Catalogo.ObtenerSucursalXCompania', params, function (error, result) {
    console.log(params);
    self.view.expositor(res, {
      error: error,
      result: result,
    });
  });
};

// /api/internos/departamentos
// Funcionalidad del dropdown de departamentos
internos.prototype.get_departamentos = function (req, res, next) {
  var self = this;
  // var idReporte = req.query.idreporte;
  // var idSucursal = req.query.idsucursal;
  // var idAgencia = req.query.idcia;
  // var anio = req.query.anio;
  // var mes = req.query.mes;

  // var params = [
  //   { name: 'IdSucursal', value: idSucursal, type: self.model.types.STRING },
  //   { name: 'IdAgencia', value: idAgencia, type: self.model.types.INT },
  //   { name: 'Anio', value: anio, type: self.model.types.STRING },
  //   { name: 'Mes', value: mes, type: self.model.types.STRING }
  // ];

  var params = [];

  this.model.query('Unidad.ObtienePestania', params, function (error, result) {
    console.log(params);
    self.view.expositor(res, {
      error: error,
      result: result,
    });
  });
};

// /api/internos/detalleunidadesmensual
// Funcionalidad para detalle de Unidades mensual (doble click celdas de lado azul)
internos.prototype.get_detalleunidadesmensual = function (req, res, next) {
  var self = this;
  var idCompania = req.query.idCompania;
  var idSucursal = req.query.idSucursal;
  var periodoYear = req.query.periodoYear;
  var periodoMes = req.query.periodoMes;
  var idOrigen = req.query.idOrigen;

  console.log('QueryString Unidades Nv2 = ' + JSON.stringify(req.query));

  var params = [
    { name: 'IdCompania', value: idCompania, type: self.model.types.INT },
    { name: 'IdSucursal', value: idSucursal, type: self.model.types.INT },
    { name: 'periodoMes', value: periodoMes, type: self.model.types.INT },
    { name: 'periodoYear', value: periodoYear, type: self.model.types.INT },
    { name: 'idOrigen', value: idOrigen, type: self.model.types.INT }
  ];

  this.model.query('Unidad.ObtenerCantidadXAutoLinea', params, function (error, result) {
    console.log(params);
    self.view.expositor(res, {
      error: error,
      result: result,
    });
  });
};

// /api/internos/detalleunidadesmensualflotillas
// Funcionalidad para detalle de Unidades mensual (doble click celdas de lado azul)
internos.prototype.get_detalleunidadesmensualflotillas = function (req, res, next) {
  var self = this;
  var idCompania = req.query.idCompania;
  var idSucursal = req.query.idSucursal;
  var periodoYear = req.query.periodoYear;
  var periodoMes = req.query.periodoMes;
  var idOrigen = req.query.idOrigen;

  console.log('QueryString Unidades Nv2 Flotillas = ' + JSON.stringify(req.query));

  var params = [
    { name: 'IdCompania', value: idCompania, type: self.model.types.INT },
    { name: 'IdSucursal', value: idSucursal, type: self.model.types.INT },
    { name: 'periodoMes', value: periodoMes, type: self.model.types.INT },
    { name: 'periodoYear', value: periodoYear, type: self.model.types.INT },
    { name: 'idOrigen', value: idOrigen, type: self.model.types.INT }
  ];

  this.model.query('Unidad.ObtenerCantidadFlotillaXAutoLinea', params, function (error, result) {
    console.log(params);
    self.view.expositor(res, {
      error: error,
      result: result,
    });
  });
};

// /api/internos/detalleunidadestipo
// Funcionalidad para tipo de Unidades (tercer nivel de unidades)
internos.prototype.get_detalleunidadestipo = function (req, res, next) {
  var self = this;
  var idCompania = req.query.idCompania;
  var idSucursal = req.query.idSucursal;
  var idOrigen = req.query.idOrigen;
  var periodoYear = req.query.periodoYear;
  var periodoMes = req.query.periodoMes;
  var idAutoLinea = req.query.idAutoLinea;

  console.log('QueryString Unidades Nv3 = ' + JSON.stringify(req.query));

  var params = [
    { name: 'IdCompania', value: idCompania, type: self.model.types.INT },
    { name: 'IdSucursal', value: idSucursal, type: self.model.types.INT },
    { name: 'periodoMes', value: periodoMes, type: self.model.types.INT },
    { name: 'periodoYear', value: periodoYear, type: self.model.types.INT },
    { name: 'idAutoLinea', value: idAutoLinea, type: self.model.types.INT },
    { name: 'idOrigen', value: idOrigen, type: self.model.types.INT }
  ];

  this.model.query('Unidad.ObtenerCantidadXUnidadDescripcion', params, function (error, result) {
    console.log(params);
    self.view.expositor(res, {
      error: error,
      result: result,
    });
  });
};

// /api/internos/detalleunidadestipoflotillas
// Funcionalidad para tipo de Unidades (tercer nivel de unidades)
internos.prototype.get_detalleunidadestipoflotillas = function (req, res, next) {
  var self = this;
  var idDepartamento = req.query.idDepartamento;
  var idCompania = req.query.idCompania;
  var idSucursal = req.query.idSucursal;
  var idOrigen = req.query.idOrigen;
  var periodoYear = req.query.periodoYear;
  var periodoMes = req.query.periodoMes;
  var idAutoLinea = req.query.idAutoLinea;

  console.log('QueryString Unidades Nv3 Flotillas = ' + JSON.stringify(req.query));

  var params = [
    { name: 'departamentoOri', value: idDepartamento, type: self.model.types.STRING },
    { name: 'IdCompania', value: idCompania, type: self.model.types.INT },
    { name: 'IdSucursal', value: idSucursal, type: self.model.types.INT },
    { name: 'periodoMes', value: periodoMes, type: self.model.types.INT },
    { name: 'periodoYear', value: periodoYear, type: self.model.types.INT },
    { name: 'idAutoLinea', value: idAutoLinea, type: self.model.types.INT },
    { name: 'idOrigen', value: idOrigen, type: self.model.types.INT }
  ];

  this.model.query('Unidad.ObtenerCantidadFlotillaXUnidadDescripcion', params, function (error, result) {
    console.log(params);
    self.view.expositor(res, {
      error: error,
      result: result,
    });
  });
};

// /api/internos/detalleunidadestipoacumulado
// Funcionalidad para tipo de Unidades acumulado(tercer nivel de unidades)
internos.prototype.get_detalleunidadestipoacumulado = function (req, res, next) {
  var self = this;
  var idCompania = req.query.idCompania;
  var idSucursal = req.query.idSucursal;
  var idOrigen = req.query.idOrigen;
  var periodoYear = req.query.periodoYear;
  var periodoMes = req.query.periodoMes;
  var idAutoLinea = req.query.idAutoLinea;

  console.log('QueryString Unidades Nv3Acumulado = ' + JSON.stringify(req.query));

  var params = [
    { name: 'IdCompania', value: idCompania, type: self.model.types.INT },
    { name: 'IdSucursal', value: idSucursal, type: self.model.types.INT },
    { name: 'PeriodoMes', value: periodoMes, type: self.model.types.INT },
    { name: 'periodoYear', value: periodoYear, type: self.model.types.INT },
    { name: 'idAutoLinea', value: idAutoLinea, type: self.model.types.INT },
    { name: 'idOrigen', value: idOrigen, type: self.model.types.INT }
  ];

  this.model.query('Unidad.ObtenerCantidadXDescripcionAcumulado', params, function (error, result) {
    console.log(params);
    self.view.expositor(res, {
      error: error,
      result: result,
    });
  });
};


// /api/internos/detalleunidadestipoacumuladoflotillas
// Funcionalidad para tipo de Unidades acumulado(tercer nivel de unidades)
internos.prototype.get_detalleunidadestipoacumuladoflotillas = function (req, res, next) {
  var self = this;
  var idDepartamento = req.query.idDepartamento;
  var idCompania = req.query.idCompania;
  var idSucursal = req.query.idSucursal;
  var idOrigen = req.query.idOrigen;
  var periodoYear = req.query.periodoYear;
  var periodoMes = req.query.periodoMes;
  var idAutoLinea = req.query.idAutoLinea;

  console.log('QueryString Unidades Nv3 Flotillas = ' + JSON.stringify(req.query));

  var params = [
    { name: 'departamentoOri', value: idDepartamento, type: self.model.types.STRING },
    { name: 'IdCompania', value: idCompania, type: self.model.types.INT },
    { name: 'IdSucursal', value: idSucursal, type: self.model.types.INT },
    { name: 'periodoMes', value: periodoMes, type: self.model.types.INT },
    { name: 'periodoYear', value: periodoYear, type: self.model.types.INT },
    { name: 'idAutoLinea', value: idAutoLinea, type: self.model.types.INT },
    { name: 'idOrigen', value: idOrigen, type: self.model.types.INT }
  ];

  this.model.query('Unidad.ObtenerCantidadFlotillaXDescripcionAcumulado', params, function (error, result) {
    console.log(params);
    self.view.expositor(res, {
      error: error,
      result: result,
    });
  });
};

// /api/internos/detalleunidadesseries
// Funcionalidad para series de Unidades (cuarto nivel de unidades)
internos.prototype.get_detalleunidadesseries = function (req, res, next) {
  var self = this;
  var idCompania = req.query.idCompania;
  var idSucursal = req.query.idSucursal;
  var idOrigen = req.query.idOrigen;
  var periodoYear = req.query.periodoYear;
  var periodoMes = req.query.periodoMes;
  var unidadDescripcion = req.query.unidadDescripcion;

  console.log('QueryString Unidades Nv4 = ' + JSON.stringify(req.query));

  var params = [
    { name: 'IdCompania', value: idCompania, type: self.model.types.INT },
    { name: 'IdSucursal', value: idSucursal, type: self.model.types.INT },
    { name: 'idOrigen', value: idOrigen, type: self.model.types.INT },
    { name: 'periodoMes', value: periodoMes, type: self.model.types.INT },
    { name: 'periodoYear', value: periodoYear, type: self.model.types.INT },
    { name: 'unidadDescripcion', value: unidadDescripcion, type: self.model.types.STRING }
  ];

  this.model.query('Unidad.ObtenerDetalleUnidades', params, function (error, result) {
    console.log(params);
    self.view.expositor(res, {
      error: error,
      result: result,
    });
  });
};

// /api/internos/detalleunidadesacumulado
// Funcionalidad para detalle de Unidades Acumulado(segundo nivel de unidades)
internos.prototype.get_detalleunidadesacumulado = function (req, res, next) {
  var self = this;
  var idCompania = req.query.idCompania;
  var idSucursal = req.query.idSucursal;
  var periodoYear = req.query.periodoYear;
  var periodoMes = req.query.periodoMes;
  var idOrigen = req.query.idOrigen;

  console.log('QueryString Unidades Nv2 Acumulado = ' + JSON.stringify(req.query));

  var params = [
    { name: 'IdCompania', value: idCompania, type: self.model.types.INT },
    { name: 'IdSucursal', value: idSucursal, type: self.model.types.INT },
    { name: 'periodoMes', value: periodoMes, type: self.model.types.INT },
    { name: 'periodoYear', value: periodoYear, type: self.model.types.INT },
    { name: 'idOrigen', value: idOrigen, type: self.model.types.INT }
  ];

  this.model.query('Unidad.ObtenerCantidadXAutoLineaAcumulado', params, function (error, result) {
    console.log(params);
    self.view.expositor(res, {
      error: error,
      result: result,
    });
  });
};

// /api/internos/tipounidadacumulado
// Funcionalidad para detalle de Unidades Acumulado(tercer nivel de unidades)
internos.prototype.get_tipounidadacumulado = function (req, res, next) {
  var self = this;
  var idCompania = req.query.idCompania;
  var idSucursal = req.query.idSucursal;
  var periodoYear = req.query.periodoYear;
  var periodoMes = req.query.periodoMes;
  var idOrigen = req.query.idOrigen;
  var idAutoLinea = req.query.idAutoLinea;
  console.log("===============================================================");
  console.log('QueryString Unidades Nv3 Acumulado = ' + JSON.stringify(req.query));

  var params = [
    { name: 'IdCompania', value: idCompania, type: self.model.types.INT },
    { name: 'IdSucursal', value: idSucursal, type: self.model.types.INT },
    { name: 'PeriodoMes', value: periodoMes, type: self.model.types.INT },
    { name: 'periodoYear', value: periodoYear, type: self.model.types.INT },
    { name: 'IdOrigen', value: idOrigen, type: self.model.types.INT },
    { name: 'idAutoLinea', value: idAutoLinea, type: self.model.types.INT }
  ];

  this.model.query('Unidad.ObtenerCantidadXDescripcionAcumulado', params, function (error, result) {
    console.log(params);
    self.view.expositor(res, {
      error: error,
      result: result,
    });
  });
};

// /api/internos/detalleunidadesacumuladoflotillas
// Funcionalidad para detalle de Unidades Acumulado flotillas(segundo nivel de unidades)
internos.prototype.get_detalleunidadesacumuladoflotillas = function (req, res, next) {
  var self = this;
  var idCompania = req.query.idCompania;
  var idSucursal = req.query.idSucursal;
  var periodoYear = req.query.periodoYear;
  var periodoMes = req.query.periodoMes;
  var idOrigen = req.query.idOrigen;

  console.log('QueryString Unidades Nv2 Acumulado flotillas= ' + JSON.stringify(req.query));

  var params = [
    { name: 'IdCompania', value: idCompania, type: self.model.types.INT },
    { name: 'IdSucursal', value: idSucursal, type: self.model.types.INT },
    { name: 'periodoMes', value: periodoMes, type: self.model.types.INT },
    { name: 'periodoYear', value: periodoYear, type: self.model.types.INT },
    { name: 'idOrigen', value: idOrigen, type: self.model.types.INT }
  ];

  this.model.query('Unidad.[ObtenerCantidadFlotillaXAutoLineaAcumulado]', params, function (error, result) {
    console.log(params);
    self.view.expositor(res, {
      error: error,
      result: result,
    });
  });
};

// /api/internos/detalleresultadosmensual
// Funcionalidad para detalle de Estado de Resultados mensual (doble click celdas de lado azul)
internos.prototype.get_detalleresultadosmensual = function (req, res, next) {
  var self = this;
  var idAgencia = req.query.idcia;
  var anio = req.query.anio;
  var mes = req.query.mes;
  var idSucursal = req.query.idsucursal;
  var mSucursal = req.query.msucursal;
  var departamento = req.query.departamento;
  var concepto = req.query.concepto;
  var idEstadoResultado = req.query.idEstadoDeResultado;
  var idDetalle = req.query.idDetalle;

  var params = [
    { name: 'IdAgencia', value: idAgencia, type: self.model.types.STRING },
    { name: 'Anio', value: anio, type: self.model.types.STRING },
    { name: 'Mes', value: mes, type: self.model.types.STRING },
    { name: 'IdSucursal', value: idSucursal, type: self.model.types.STRING },
    { name: 'MSucursal', value: mSucursal, type: self.model.types.STRING },
    { name: 'Departamento', value: departamento, type: self.model.types.STRING },
    { name: 'Concepto', value: concepto, type: self.model.types.STRING },
    { name: 'IdEstadoDeResultado', value: idEstadoResultado, type: self.model.types.STRING },
    { name: 'IdDetalle', value: idDetalle, type: self.model.types.STRING }
  ];

  this.model.query('SP_ESTADO_DE_RESULTADOS_DETALLE', params, function (error, result) {
    console.log(params);
    self.view.expositor(res, {
      error: error,
      result: result,
    });
  });
};

// /api/internos/detalleresultadoscuentas
// Funcionalidad para detalle de Estado de Resultados mensual (doble click celdas de lado azul)
internos.prototype.get_detalleresultadoscuentas = function (req, res, next) {
  var self = this;
  var IdCia = req.query.IdCia;
  // var servidorAgencia = req.query.servidoragencia;
  // var concentradora = req.query.concentradora;
  var anio = req.query.anio;
  var mes = req.query.mes;
  var numCta = req.query.numcta;

  var params = [
    { name: 'IdCia', value: IdCia, type: self.model.types.INT },
    { name: 'Anio', value: anio, type: self.model.types.STRING },
    { name: 'Mes', value: mes, type: self.model.types.STRING },
    { name: 'NumCta', value: numCta, type: self.model.types.STRING }
  ];

  this.model.query('SP_ESTADO_DE_RESULTADOS_DETALLE_CUENTAS', params, function (error, result) {
    console.log(params);
    self.view.expositor(res, {
      error: error,
      result: result,
    });
  });
};


// /api/internos/efectivoysituacion
// Funcionalidad para las opciones de efectivo real y situacion financiera
internos.prototype.get_efectivoysituacion = function (req, res, next) {
  //Variables nuevas
  var self = this;
  var IdCompania = req.query.idcia
  var periodoYear = req.query.anio

  var params = [
    { name: 'IdCompania', value: IdCompania, type: self.model.types.INT },
    { name: 'periodoYear', value: periodoYear, type: self.model.types.STRING }
  ];

  this.model.query('[Interno].[ObtenerFlujoEfectivoReal]', params, function (error, result) {
    console.log(params);
    self.view.expositor(res, {
      error: error,
      result: result,
    });
  });
};

// /api/internos/unidadesacumuladopresupuesto
// Funcionalidad para Unidades nv1 Acumulado presupuesto
internos.prototype.get_unidadesacumuladopresupuesto = function (req, res, next) {
  var self = this;
  var idCompania = req.query.idCompania;
  var idSucursal = req.query.idSucursal;
  var periodoYear = req.query.periodoYear;

  console.log('QueryString Unidades Nv1 Acumulado presupuesto= ' + JSON.stringify(req.query));

  var params = [
    { name: 'IdCompania', value: idCompania, type: self.model.types.INT },
    { name: 'IdSucursal', value: idSucursal, type: self.model.types.INT },
    { name: 'periodoYear', value: periodoYear, type: self.model.types.INT }
  ];

  this.model.query('Unidad.ObtenerPresupuestoAcumulado', params, function (error, result) {
    console.log("Error", error);
    console.log("Result", result);
    self.view.expositor(res, {
      error: error,
      result: result,
    });
  });
};


// /api/internos/estadosituaciofinanciera
internos.prototype.get_estadosituaciofinanciera = function (req, res, next) {
  var self = this;
  var IdCompania = req.query.idcia
  var periodoYear = req.query.anio

  var params = [
    { name: 'IdCompania', value: IdCompania, type: self.model.types.INT },
    { name: 'periodoYear', value: periodoYear, type: self.model.types.STRING }
  ];
  console.log(params);
  this.model.query('[Interno].[ObtenerEstadoSituacionFinanciera]', params, function (error, result) {
    console.log("Error", error);
    console.log("Result", result);
    self.view.expositor(res, {
      error: error,
      result: result,
    });
  });
};

// /api/internos/unidadesacumuladopresupuestodepartamento
// Funcionalidad para Unidades nv1 Acumulado presupuesto
internos.prototype.get_unidadesacumuladopresupuestodepartamento = function (req, res, next) {
  var self = this;
  var idPestana = req.query.idPestana;
  var idCompania = req.query.idCompania;
  var idSucursal = req.query.idSucursal;
  var periodoYear = req.query.periodoYear;

  console.log('QueryString Unidades Nv1 Acumulado presupuesto x depto= ' + JSON.stringify(req.query));

  var params = [
    { name: 'idPestana', value: idPestana, type: self.model.types.INT },
    { name: 'idCompania', value: idCompania, type: self.model.types.INT },
    { name: 'IdSucursal', value: idSucursal, type: self.model.types.INT },
    { name: 'periodoYear', value: periodoYear, type: self.model.types.INT }
  ];

  this.model.query('Unidad.ObtenerPresupuestoAcumuladoPorPestania', params, function (error, result) {
    self.view.expositor(res, {
      error: error,
      result: result,
    });
  });
};

// /api/internos/unidadesacumuladorealdepartamento
// Funcionalidad para Unidades nv1 Acumulado real
internos.prototype.get_unidadesacumuladorealdepartamento = function (req, res, next) {
  var self = this;
  var idPestana = req.query.idPestana;
  var idCompania = req.query.idCompania;
  var idSucursal = req.query.idSucursal;
  var periodoYear = req.query.periodoYear;

  console.log('QueryString Unidades Nv1 Acumulado real x depto= ' + JSON.stringify(req.query));

  var params = [
    { name: 'idPestania', value: idPestana, type: self.model.types.INT },
    { name: 'idCompania', value: idCompania, type: self.model.types.INT },
    { name: 'IdSucursal', value: idSucursal, type: self.model.types.INT },
    { name: 'periodoYear', value: periodoYear, type: self.model.types.INT }
  ];

  this.model.query('Unidad.ObtenerUnidadesXPestaniaXAcumulado', params, function (error, result) {
    self.view.expositor(res, {
      error: error,
      result: result,
    });
  });
};

// /api/internos/acumuladoreal
// Funcionalidad para las opciones de AcumuladoReal
internos.prototype.get_acumuladoreal = function (req, res, next) {

  var self = this;
  var IdSucursal = req.query.IdSucursal;
  var IdCompania = req.query.IdCompania;
  var periodoYear = req.query.anio;

  var params = [
    { name: 'IdSucursal', value: IdSucursal, type: self.model.types.INT },
    { name: 'IdCompania', value: IdCompania, type: self.model.types.INT },
    { name: 'periodoYear', value: periodoYear, type: self.model.types.STRING }
  ];

  this.model.query('[Unidad].[ObtenerUnidadesXAcumulado]', params, function (error, result) {

    self.view.expositor(res, {
      error: error,
      result: result,
    });
  });
};

// /api/internos/autolineaacumulado
// Funcionalidad para las opciones de AutolineaAcumulado
internos.prototype.get_autolineaacumulado = function (req, res, next) { 

  var self = this;
  var IdCompania = req.query.IdCompania;
  var IdSucursal = req.query.IdSucursal;
  var periodoYear = req.query.anio;
  var PeriodoMes = req.query.mes;
  var IdOrigen = req.query.IdOrigen

  var params = [
    { name: 'IdCompania', value: IdCompania, type: self.model.types.INT },
    { name: 'IdSucursal', value: IdSucursal, type: self.model.types.INT },
    { name: 'periodoYear', value: periodoYear, type: self.model.types.INT },
    { name: 'PeriodoMes', value: PeriodoMes, type: self.model.types.INT },
    { name: 'IdOrigen', value: IdOrigen, type: self.model.types.INT }
  ];

  this.model.query('[Unidad].[ObtenerCantidadXAutoLineaAcumulado]', params, function (error, result) {
    console.log("error", error);
    console.log("result", result);
    self.view.expositor(res, {
      error: error,
      result: result,
    });
  });
};

// /api/internos/estadoresultadospresupuesto
// Funcionalidad para las obtener estado de resultados presupuesto
internos.prototype.get_estadoresultadospresupuesto = function (req, res, next) {

  var self = this;
  var idCompania      = req.query.idCompania;
  var IdSucursal      = req.query.IdSucursal;
  var periodoYear     = req.query.anio;
  var IdDepartamento  = req.query.IdDepartamento

  var params = [
    { name: 'idCompania',     value: idCompania, type: self.model.types.INT },
    { name: 'IdSucursal',     value: IdSucursal, type: self.model.types.INT },
    { name: 'periodoYear',    value: periodoYear, type: self.model.types.INT },
    { name: 'IdDepartamento', value: IdDepartamento, type: self.model.types.INT }
  ];
    console.log("params", params);
  this.model.query('[Contabilidad].[ObtieneEstadoDeResultadosPresupuesto]', params, function (error, result) {
    console.log("error", error);
    console.log("result", result);
    self.view.expositor(res, {
      error: error,
      result: result,
    });
  });
};

// internos.prototype.post_internos = function(req, res, next) {
// var self = this;
// var name = req.body.name;
// var apepaterno =  req.body.apepaterno;
// var apematerno = req.body.apematerno;
// var correo =  req.body.correo;
// var password =  req.body.password;

// var params = [
//  { name: 'nombre', value: name , type: self.model.types.STRING }
// ,{ name: 'apepaterno', value: apepaterno, type: self.model.types.STRING }
// ,{ name: 'apematerno', value: apematerno , type: self.model.types.STRING }
// ,{ name: 'correo', value: correo, type: self.model.types.STRING }
// ,{ name: 'password', value: password, type: self.model.types.STRING }
// ];

// try {
//     this.model.post('INS_PROFESOR_SP', params, function(error, result){
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
//     console.log("Se inserto con exito al usuario");
// } catch (error) {
//     console.log('Mensaje: ' + error);
// }
// };

module.exports = internos;

