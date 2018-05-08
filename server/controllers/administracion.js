var LoginView = require('../views/reference'), LoginModel = require('../models/dataAccess');
// 
var _procesaExcel = require('../helpers/procesaExcel');

var Administracion = function (conf) {
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
//  Recupera todas las cuentas contables
// ==========================================
Administracion.prototype.get_cuentaContable = function (req, res, next) {
    var self = this;
    this.model.query('[AdministracionCC].[ObtieneCuentasContablesAEnviarABPRO]', [], function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

// ==========================================
//  Funcionalidad para guardar una cuenta contable
// ==========================================
Administracion.prototype.get_cuentaContableExecute = function (req, res, next) {
    var self = this;
    var params = [
        { name: 'IdUsuario', value: req.query.idUsuario, type: self.model.types.INT },
        { name: 'xmlCta', value: req.query.xmlCuenta, type: self.model.types.STRING }
    ];
    if (req.query.idMovimiento != 4) {
        params.push({ name: 'idError', value: 0, type: self.model.types.INT });
        params.push({ name: 'IdMovimiento', value: req.query.idMovimiento, type: self.model.types.INT });
    }

    var storeProcedure = '';
    if (req.query.idMovimiento == 1) {
        storeProcedure = '[AdministracionCC].[ProcesaCuentaContable]';
    } else if (req.query.idMovimiento == 2) {
        storeProcedure = '[AdministracionCC].[ActualizaCuentaContable]';
    } else if (req.query.idMovimiento == 3) {
        storeProcedure = '[AdministracionCC].[EliminaCuentaContable]';
    } else if (req.query.idMovimiento == 4) {
        storeProcedure = '[AdministracionCC].[EnviaAProgramacionParaGuardarEnBPOR]';
    }

    this.model.post(storeProcedure, params, function (error, result, returnValue) {
        var resultado = { respuesta: 1 };
        if (typeof returnValue !== 'undefined') {
            resultado = { respuesta: returnValue };
        }
        self.view.expositor(res, {
            error: error,
            result: resultado,
        });

    });
};

// ==========================================
//  Recupera todos los conceptos del balance nivel 1
// ==========================================
Administracion.prototype.get_balanceConceptoNivel01 = function (req, res, next) {
    var self = this;
    this.model.query('Catalogo.ObtieneBalanceConceptoNivel01', [], function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

// ==========================================
//  Recupera todos los conceptos del balance nivel 2
// ==========================================
Administracion.prototype.get_balanceConceptoNivel02 = function (req, res, next) {
    var self = this;
    this.model.query('Catalogo.ObtieneBalanceConceptoNivel02', [], function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

// ==========================================
//  Recupera todos los conceptos del balance nivel 2
// ==========================================
Administracion.prototype.get_balanceConceptoNivel03 = function (req, res, next) {
    var self = this;
    this.model.query('Catalogo.ObtieneBalanceConceptoNivel03', [], function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

// ==========================================
//  Recupera todos los conceptos de notas del dictamen
// ==========================================
Administracion.prototype.get_notasDictamen = function (req, res, next) {
    var self = this;
    this.model.query('[Catalogo].[ObtieneNotasDictamen]', [], function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

// ==========================================
//  Recupera todos los conceptos de notas financieras
// ==========================================
Administracion.prototype.get_notasFinancierancieras = function (req, res, next) {
    var self = this;
    this.model.query('[Catalogo].[ObtieneNotasFinancieras]', [], function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

// ==========================================
//  Recupera todos los conceptos de estado de resultados
// ==========================================
Administracion.prototype.get_conceptoEstadoResultado = function (req, res, next) {
    var self = this;
    this.model.query('[Interno].[ObtieneConceptoEstadoResultado]', [], function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

// ==========================================
//  Funcionalidad para recuperar el detalle de la cuenta
// ==========================================
Administracion.prototype.get_detalleCuenta = function (req, res, next) {
    var self = this;
    var params = [
        { name: 'idcuenta', value: req.query.idMovimiento, type: self.model.types.INT }
    ];

    this.model.query('[AdministracionCC].[ProcesaCuentaContable]', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

// ==========================================
//  Recupera la naturaleza de las cuentas
// ==========================================
Administracion.prototype.get_cuentaContableNaturaleza = function (req, res, next) {
    var self = this;
    this.model.query('[Catalogo].[ObtieneCuentaContableNaturaleza]', [], function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

// ==========================================
//  Recupera los dictamenes de las cuentas
// ==========================================
Administracion.prototype.get_dictamenCuenta = function (req, res, next) {
    var self = this;
    this.model.query('[Catalogo].[ObtieneDictamen]', [], function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

// ==========================================
//  Recupera los dictamenes de las cuentas
// ==========================================
Administracion.prototype.get_estadoFinancieroInterno = function (req, res, next) {
    var self = this;
    this.model.query('[Interno].[ObtieneEstadoFinancieroInterno]', [], function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

// ==========================================
//  Recupera el detalle de cuentas contables (Catalogo)
// ==========================================
Administracion.prototype.get_cuentaContableDetalle = function (req, res, next) {
    var self = this;
    this.model.query('[Catalogo].[ObtieneCuentaContableDetalle]', [], function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

// ==========================================
//  Recupera el detalle de cuentas contables (Catalogo)
// ==========================================
Administracion.prototype.get_afectaCuentaContable = function (req, res, next) {
    var self = this;
    this.model.query('[Bpro].[ObtieneAfectacionCuentaContable]', [], function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

// ==========================================
//  Recupera la situación de cuentas contables (Catalogo)
// ==========================================
Administracion.prototype.get_situacionCuenta = function (req, res, next) {
    var self = this;
    this.model.query('[Catalogo].[ObtieneCuentaContableSituacion]', [], function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

// ==========================================
//  Procesa archivo excel y amlacena las cuentas, retorna cuentas no validas (primer validación)
// ==========================================
Administracion.prototype.get_procesaExcel = function (req, res, next) {
    var resultadoXml = _procesaExcel.obtenerXmlCuentasExcel(req.query.nombreArchivo);
    var resultadoInsert = false;
    var mensaje = 'Se genero un error al procesar el excel';
    if (resultadoXml.ok) {
        var self = this;
        var params = [
            { name: 'IdMovimiento', value: 1, type: self.model.types.INT },
            { name: 'IdUsuario', value: req.query.idUsuario, type: self.model.types.INT },
            { name: 'xmlCta', value: resultadoXml.xmlcuentas, type: self.model.types.STRING },
            { name: 'idError', value: 0, type: self.model.types.INT }
        ];        
        this.model.post('[AdministracionCC].[ProcesaCuentaContableMasivo]', params, function (error, result, returnValue) {
            if ((typeof returnValue !== 'undefined' && returnValue === 0)) {
                resultadoInsert = true;
                mensaje = 'Archivo procesado correctamente';
            }
        });
    }
    return res.status(200).json({
        ok: resultadoXml.ok,
        mensaje: !resultadoXml.ok ? resultadoXml.mensaje : mensaje,
        errores: resultadoXml.errores,
        cuentasValidas: resultadoXml.cuentasValidas
    });
};

module.exports = Administracion;
