var XLSX = require('xlsx')
const XlsxPopulate = require('xlsx-populate');
// ==========================================
//  Recupera el detalle de cuentas contables (Catalogo)
// ==========================================
exports.obtenerXmlCuentasExcel = function (nombreArchivo, idCompania) {
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
            xmlCuenta.push('<idCompania>' + idCompania + '</idCompania>');
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
    console.log(encabezadoCuenta);
    for (var nombreTag in cuenta) {
        if (!encabezadoCuenta.find(cuenta => cuenta.nombre === nombreTag)) {
            return {
                ok: false,
                mensaje: 'El nombre de la columna: ' + nombreTag + ' no es valido',
                xmlcuentas: []
            };
        } else {
            xmlCuenta.push('<' + nombreTag + '>' + cuenta[nombreTag] + '</' + nombreTag + '>');
            encabezadoCuenta.splice(encabezadoCuenta.findIndex(cuenta => cuenta.nombre === nombreTag), 1);
        }
    }
    if (xmlCuenta.length > 0) {
        if (encabezadoCuenta.length > 0) {
            mensaje = 'No contiene información para: ' + encabezadoCuenta.join(', ');
        }         
        /*else {
            var xmlCompania = obtenerCompaniaPorCuenta(cuenta, xlCompanias);
            if (xmlCompania.length > 0) {
                xmlCuenta.push('<Companias>' + xmlCompania.join('') + '</Companias>');
                resultado = true;
            } else {
                mensaje = 'No contiene companias validas';
            }
        }*/
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
/*function obtenerCompaniaPorCuenta(cuenta, xlCompanias) {
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
}*/

// ==========================================
//  Obtiene el nombre del encabezado de la cuenta
// ==========================================
function getEncabezadoCuentas() {
    return [
        { nombre: 'NUMCTA', posicion: 1 },
        { nombre: 'DESCRIPCION', posicion: 1 },
        { nombre: 'NATURALEZA', posicion: 1 },
        { nombre: 'ACUMDET', posicion: 1 },
        { nombre: 'GPO1', posicion: 1 },
        { nombre: 'GPO2', posicion: 1 },
        { nombre: 'GPO3', posicion: 1 },
        { nombre: 'DEPTO', posicion: 1 },
        { nombre: 'DICTAMEN', posicion: 1 },
        { nombre: 'EFINTERNO', posicion: 1 },
        { nombre: 'NOTASDIC', posicion: 1 },
        { nombre: 'NOTASFIN', posicion: 1 },
        { nombre: 'TipoBI', posicion: 1 },
        { nombre: 'AFECTACC', posicion: 1 },
        { nombre: 'GRUPOSAT', posicion: 1 },
        { nombre: 'SITUACION', posicion: 1 },
        { nombre: 'COMPANIA', posicion: 1 }
    ];
    /*return [
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
    ];*/
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

exports.generaExcel = function (nombreArchivo) {

    /*XlsxPopulate.fromBlankAsync()
    .then(workbook => {
        // Modify the workbook.
        workbook.sheet("Sheet1").cell("A1").value("This is neat!");
        
        // Write to file.
        return workbook.toFileAsync("./out.xlsx");
    });*/

    XlsxPopulate.fromFileAsync("./Prueba3.xlsx")
        .then(workbook => {
            const value = workbook.sheet("Cuentas completa").cell("A1").value();
            console.log('valor: ', value);
            var resultFind = resultFind = workbook.sheet(0).find("1100-0001-0001-0004");

            console.log('Celdas: ', workbook.sheet(0).cell.length);
            console.log('Find: ', resultFind);
            console.log('Find: ', resultFind[0].row.node);
            // workbook.sheet(0).cell("A1").value("rgb solid fill").style("fill", "ff0000");
            workbook.sheet(0).cell("A1").style("fill", "ff0000");
            //workbook.sheet(0).cell("A1").style("bold", true);
            return workbook.toFileAsync("./cuentas.xlsx");
        });

    // Load the input workbook from file.
    /*XlsxPopulate.fromBlankAsync()
        .then(workbook => {
            // // Modify the workbook.
            const sheet = workbook.sheet("Sheet1");

            sheet.row(1).height(30);
            sheet.column('A').width(15);
            sheet.column('B').width(25);

            sheet.cell("A1").value("bold").style("bold", true)
                .relativeCell(1, 0).value("italic").style("italic", true)
                .relativeCell(1, 0).value("underline").style("underline", true)
                .relativeCell(1, 0).value("double underline").style("underline", "double")
                .relativeCell(1, 0).value("strikethrough").style("strikethrough", true)
                .relativeCell(1, 0).value("superscript").style("superscript", true)
                .relativeCell(1, 0).value("subscript").style("subscript", true)
                .relativeCell(1, 0).value("larger").style("fontSize", 14)
                .relativeCell(1, 0).value("smaller").style("fontSize", 8)
                .relativeCell(1, 0).value("comic sans").style("fontFamily", "Comic Sans MS")
                .relativeCell(1, 0).value("rgb font color").style("fontColor", "ff0000")
                .relativeCell(1, 0).value("theme font color").style("fontColor", 4)
                .relativeCell(1, 0).value("tinted theme font color").style("fontColor", { theme: 4, tint: -0.5 })
                .relativeCell(1, 0).value("horizontal center").style("horizontalAlignment", "center")
                .relativeCell(1, 0).value("this text is justified distributed").style({ horizontalAlignment: "distributed", justifyLastLine: true })
                .relativeCell(1, 0).value("indent").style("indent", 2)
                .relativeCell(1, 0).value("vertical center").style("verticalAlignment", "center")
                .relativeCell(1, 0).value("this text is wrapped text").style("wrapText", true)
                .relativeCell(1, 0).value("this text is shrink to fit").style("shrinkToFit", true)
                .relativeCell(1, 0).value("right-to-left").style("textDirection", "right-to-left")
                .relativeCell(1, 0).value("text rotation").style("textRotation", -10)
                .relativeCell(1, 0).value("angle counterclockwise").style("angleTextCounterclockwise", true)
                .relativeCell(1, 0).value("angle clockwise").style("angleTextClockwise", true)
                .relativeCell(1, 0).value("rotate text up").style("rotateTextUp", true)
                .relativeCell(1, 0).value("rotate text down").style("rotateTextDown", true)
                .relativeCell(1, 0).value("verticalText").style("verticalText", true)
                .relativeCell(1, 0).value("rgb solid fill").style("fill", "ff0000")
                .relativeCell(1, 0).value("theme solid fill").style("fill", 5)
                .relativeCell(1, 0).value("tinted theme solid fill").style("fill", { theme: 5, tint: 0.25 })
                .relativeCell(1, 0).value("pattern fill").style("fill", {
                    type: "pattern",
                    pattern: "darkDown",
                    foreground: "ff0000",
                    background: {
                        theme: 3,
                        tint: 0.4
                    }
                })
                .relativeCell(1, 0).value("linear gradient fill").style("fill", {
                    type: "gradient",
                    angle: 10,
                    stops: [
                        { position: 0, color: "ff0000" },
                        { position: 0.5, color: "00ff00" },
                        { position: 1, color: "0000ff" }
                    ]
                })
                .relativeCell(1, 0).value("path gradient fill").style("fill", {
                    type: "gradient",
                    gradientType: "path",
                    left: 0.1,
                    right: 0.3,
                    top: 0.5,
                    bottom: 0.7,
                    stops: [
                        { position: 0, color: "ff0000" },
                        { position: 1, color: "0000ff" }
                    ]
                })
                .relativeCell(1, 0).value("thin border").style("border", true)
                .relativeCell(1, 0).value("thick border").style("border", "thick")
                .relativeCell(1, 0).value("double blue border").style("border", { style: "double", color: "0000ff" })
                .relativeCell(1, 0).value("right red border").style("rightBorder", true).style("borderColor", "ff0000")
                .relativeCell(1, 0).value("theme diagonal up border").style("diagonalBorder", { style: "dashed", color: { theme: 6, tint: -0.1 }, direction: "up" })
                .relativeCell(1, 0).value("various styles border").style("borderStyle", { top: "hair", right: "thin", bottom: "medium", left: "thick" })
                .relativeCell(1, 0).value("various colors border").style("border", "thick").style("borderColor", { top: "ff0000", right: "00ff00", bottom: "0000ff", left: "ffff00" })
                .relativeCell(1, 0).value("complex border").style("border", {
                    top: true,
                    right: "thick",
                    bottom: { style: "dotted", color: "ff0000" },
                    left: { style: "mediumDashed", color: 5 },
                    diagonal: { style: "thick", color: "0000ff", direction: "both" }
                })
                .relativeCell(1, 0).value("number").relativeCell(0, 1).value(1.2).style("numberFormat", "0.00")
                .relativeCell(1, -1).value("currency").relativeCell(0, 1).value(1.2).style("numberFormat", `$#,##0.00`)
                .relativeCell(1, -1).value("accounting").relativeCell(0, 1).value(1.2).style("numberFormat", `_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)`)
                .relativeCell(1, -1).value("short date").relativeCell(0, 1).value(1.2).style("numberFormat", "m/d/yyyy")
                .relativeCell(1, -1).value("long date").relativeCell(0, 1).value(1.2).style("numberFormat", `[$-x-sysdate]dddd, mmmm dd, yyyy`)
                .relativeCell(1, -1).value("time").relativeCell(0, 1).value(1.2).style("numberFormat", `[$-x-systime]h:mm:ss AM/PM`)
                .relativeCell(1, -1).value("percentage").relativeCell(0, 1).value(1.2).style("numberFormat", "0.00%")
                .relativeCell(1, -1).value("fraction").relativeCell(0, 1).value(1.2).style("numberFormat", "# ?/?")
                .relativeCell(1, -1).value("scientific").relativeCell(0, 1).value(1.2).style("numberFormat", "0.00E+00")
                .relativeCell(1, -1).value("text").relativeCell(0, 1).value(1.2).style("numberFormat", "@");

            console.log(sheet.row(1).height());
            console.log(sheet.column('A').width());
            console.log(sheet.column('B').width());

            sheet.cell("A1").tap(cell => console.log(cell.value(), cell.style(["bold"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["italic"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["underline"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["underline"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["strikethrough"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["superscript"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["subscript"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["fontSize"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["fontSize"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["fontFamily"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["fontColor"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["fontColor"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["fontColor"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["horizontalAlignment"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["horizontalAlignment", "justifyLastLine"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["indent"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["verticalAlignment"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["wrapText"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["shrinkToFit"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["textDirection"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["textRotation"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["angleTextCounterclockwise"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["angleTextClockwise"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["rotateTextUp"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["rotateTextDown"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["verticalText"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["fill"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["fill"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["fill"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["fill"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["fill"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["fill"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["border"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["border"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["border"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["rightBorder", "borderColor"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["diagonalBorder"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["borderStyle"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["border"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.value(), cell.style(["border"])))
                .relativeCell(1, 1).tap(cell => console.log(cell.relativeCell(0, -1).value(), cell.style(["numberFormat"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.relativeCell(0, -1).value(), cell.style(["numberFormat"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.relativeCell(0, -1).value(), cell.style(["numberFormat"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.relativeCell(0, -1).value(), cell.style(["numberFormat"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.relativeCell(0, -1).value(), cell.style(["numberFormat"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.relativeCell(0, -1).value(), cell.style(["numberFormat"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.relativeCell(0, -1).value(), cell.style(["numberFormat"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.relativeCell(0, -1).value(), cell.style(["numberFormat"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.relativeCell(0, -1).value(), cell.style(["numberFormat"])))
                .relativeCell(1, 0).tap(cell => console.log(cell.relativeCell(0, -1).value(), cell.style(["numberFormat"])));

            // Write to file.
            return workbook.toFileAsync("./out.xlsx");
        });*/








    /*var data = [[1, 2, 3], [true, false, null, "sheetjs"], ["foo", "bar", new Date("2014-02-19T14:30Z"), "0.3"], ["baz", null, "qux"]]
    var ws_name = "SheetJS";
    var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);

    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;
    XLSX.writeFile(wb, 'test.xlsx');*/
}

function datenum(v, date1904) {
    if (date1904) v += 1462;
    var epoch = Date.parse(v);
    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

function sheet_from_array_of_arrays(data, opts) {
    var ws = {};
    var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
    for (var R = 0; R != data.length; ++R) {
        for (var C = 0; C != data[R].length; ++C) {
            if (range.s.r > R) range.s.r = R;
            if (range.s.c > C) range.s.c = C;
            if (range.e.r < R) range.e.r = R;
            if (range.e.c < C) range.e.c = C;
            var cell = { v: data[R][C] };
            if (cell.v == null) continue;
            var cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

            if (typeof cell.v === 'number') cell.t = 'n';
            else if (typeof cell.v === 'boolean') cell.t = 'b';
            else if (cell.v instanceof Date) {
                cell.t = 'n'; cell.z = XLSX.SSF._table[14];
                cell.v = datenum(cell.v);
            }
            else cell.t = 's';

            cell.style("bold", true);
            ws[cell_ref] = cell;
        }
    }
    if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
    return ws;
}

function Workbook() {
    if (!(this instanceof Workbook)) return new Workbook();
    this.SheetNames = [];
    this.Sheets = {};
}



