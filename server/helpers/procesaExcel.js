var XLSX = require('xlsx')
// ==========================================
//  Recupera el detalle de cuentas contables (Catalogo)
// ==========================================
exports.obtenerXmlCuentasExcel = function (nombreArchivo) {
    var xmlCuentaFinal = '';
    var xmlCuentas = [];
    var mensaje = 'Se genero un error al procesar el excel';
    var resultado = false;
    var errores = [];

    var workbook = XLSX.readFile('server\\uploads\\' + nombreArchivo);
    var sheet_name_list = workbook.SheetNames;
    if (validaNombreHojas(sheet_name_list)) {
        var xlCuentas = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        var xlCompanias = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[1]]);
        for (var i = 0; i < xlCuentas.length; i++) {
            var arrayCuentas = obtenerXmlCuenta(xlCuentas[i], getEncabezadoCuentas(), xlCompanias);
            if (arrayCuentas['ok']) {
                xmlCuentas.push('<CuentaContable>' + arrayCuentas['xmlcuentas'].join('') + '</CuentaContable>');
            } else {
                errores.push({ cuenta: xlCuentas[i], mensaje: arrayCuentas['mensaje'] });
            }
        }
        if (xmlCuentas.length > 0) {
            xmlCuentaFinal = '<CuentaContables>' + xmlCuentas.join('') + '</CuentaContables>';
            resultado = true;
            mensaje = 'Xml generado correctamente.'
        } else {
            mensaje = 'Ninguna cuenta fue valida';
        }
    } else {
        mensaje = 'Error al validar las hojas del excel';
    }

    return {
        ok: resultado,
        mensaje: mensaje,
        xmlcuentas: xmlCuentaFinal,
        errores: errores,
        cuentasValidas: xmlCuentas.length
    };

    return xmlCuentaFinal;
};

// ==========================================
//  Obtiene el xml por cuenta contable
// ==========================================
function obtenerXmlCuenta(cuenta, encabezadoCuenta, xlCompanias) {
    var xmlCuenta = [];
    var mensaje = '';
    var resultado = false;
    for (var nombreTag in cuenta) {
        if (!encabezadoCuenta.find(cuenta => cuenta === nombreTag)) {
            return {
                ok: false,
                mensaje: 'El nombre de la columna: ' + nombreTag + ' no es valido',
                xmlcuentas: []
            };
        } else {
            xmlCuenta.push('<' + nombreTag + '>' + cuenta[nombreTag] + '</' + nombreTag + '>');
            encabezadoCuenta.splice(encabezadoCuenta.findIndex(cuenta => cuenta === nombreTag), 1);
        }
    }
    if (xmlCuenta.length > 0) {
        if (encabezadoCuenta.length > 0) {
            mensaje = 'No contiene información para: ' + encabezadoCuenta.join(', ');
        } else {
            var xmlCompania = obtenerCompaniaPorCuenta(cuenta, xlCompanias);
            if (xmlCompania.length > 0) {
                xmlCuenta.push('<Companias>' + xmlCompania.join('') + '</Companias>');
                resultado = true;
            } else {
                mensaje = 'No contiene companias validas';
            }
        }
    } else {
        mensaje = 'La información de la cuenta no es valida';
    }
    return {
        ok: resultado,
        mensaje: mensaje,
        xmlcuentas: xmlCuenta
    };
}

// ==========================================
//  Obtiene las companias por cuenta contable
// ==========================================
function obtenerCompaniaPorCuenta(cuenta, xlCompanias) {
    var xmlCompania = [];
    var xmlCompanias = [];
    var companias = xlCompanias.filter(item => item.NUMCTA === cuenta.NUMCTA);
    if (companias.length > 0) {
        for (var p = 0; p < companias.length; p++) {
            var arrayEncabezadoCompania = ['NUMCTA', 'RAZONSOCIAL', 'DESCRIPCION'];
            for (var nombreTag in companias[p]) {
                if (!arrayEncabezadoCompania.find(comp => comp === nombreTag)) {
                    return [];
                } else {
                    xmlCompania.push('<' + nombreTag + '>' + companias[p][nombreTag] + '</' + nombreTag + '>');
                    arrayEncabezadoCompania.splice(arrayEncabezadoCompania.findIndex(comp => comp === nombreTag), 1);
                }
            }
            if (arrayEncabezadoCompania.length === 0) {
                xmlCompanias.push('<Compania>' + xmlCompania.join('') + '</Compania>');
            } else {
                return [];
            }
            xmlCompania = [];
        }
    }
    return xmlCompanias;
}

// ==========================================
//  Obtiene el nombre del encabezado de la cuenta
// ==========================================
function getEncabezadoCuentas() {
    return [
        'NUMCTA',
        'DESCRIPCION',
        'NATURALEZA',
        'ACUMDET',
        'GPO1',
        'GPO2',
        'GPO3',
        'DEPTO',
        'DICTAMEN',
        'EFINTERNO',
        'NOTASDIC',
        'NOTASFIN',
        'TipoBI',
        'AFECTACC',
        'GRUPOSAT',
        'SITUACION'
    ];
}

// 
// ==========================================
//  Valida el nombre de las hojas de excel
// ==========================================
function validaNombreHojas(sheet_name_list) {
    if (sheet_name_list[0] !== 'Cuentas') {
        return false;
    } if (sheet_name_list[1] !== 'Companias') {
        return false;
    }
    return true;
}

