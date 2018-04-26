var externosView = require('../views/reference'),
    externosModel = require('../models/dataAccess');
var json2xls = require('json2xls');
var fs = require('fs');
var app = require('express')

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

// /api/externos/companias
// Funcionalidad que llena el select de compañias
externos.prototype.get_companias = function (req, res, next) {
    var self = this;
    var idUsuario = req.query.idusuario;
  
    var params = [
      { name: 'IdUsuario', value: idUsuario, type: self.model.types.INT }
    ];
  
    this.model.query('Catalogo.ObtenerCompaniaPorUsuario', params, function (error, result) {
      self.view.expositor(res, {
        error: error,
        result: result,
      });
    });
  };

  // /api/externos/createExcel
// Funcionalidad para crear el excel
externos.prototype.get_createExcel = function (req, res, next) {
    var self = this;
    var idCompania = req.query.idCompania;
    var resporteId = req.query.resporteId;
    var periodoYear = req.query.periodoYear;
    var periodoMes = req.query.periodoMes

    var params = [
        { name: 'IdCompania', value: idCompania, type: self.model.types.INT },
        { name: 'resporteId', value: resporteId, type: self.model.types.INT },
        { name: 'periodoYear', value: periodoYear, type: self.model.types.INT },
        { name: 'periodoMes', value: periodoMes, type: self.model.types.INT }
    ];

    var json = {
        foo: 'Con',
        qux: 'IF',
        poo: 123,
        stux: new Date()
    }
    
    var xls = json2xls(json);
    var path = 'excel/';
    var nameExcel = 'Externo' + periodoYear + '.xlsx'
    var urlSave = path + nameExcel;
    console.log( 'urlSave', urlSave );
    fs.writeFileSync(urlSave, xls, 'binary', function(err){
        if (err) {
            return console.log(err);
        }
    
        console.log("Se guardo!");
        // if (err) {
        //     console.log( 'error', err );
        // }else{
        //     console.log( 'en el ELSE' );
        //     self.view.expositor(res, {
        //         result: { Success: true, Msg: 'Se creo el excel con éxito.', Name: nameExcel }
        //     });
        // };
    });

    // console.log( 'parametrosExcel', params );
    // self.view.expositor(res, {
    //     result: {Success: true, Msg: 'Rifo', Name: params}
    // });
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

//   /api/externos/createExcel
// Funcionalidad para crear el excel
// externos.prototype.get_createExcel = function (req, res, next) {

//     var xl = require('excel4node');
//     var self = this;

//     var wb = new xl.Workbook();

//     // Add Worksheets to the workbook
//     var ws = wb.addWorksheet('Sheet 1');
//     var ws2 = wb.addWorksheet('Sheet 2');

//     // Create a reusable style
//     var style = wb.createStyle({
//         font: {
//             color: '#FF0800',
//             size: 12
//         },
//         numberFormat: '$#,##0.00; ($#,##0.00); -'
//     });

//     ws.cell(1, 1).number(100).style(style);
//     ws.cell(1, 2).number(200).style(style);

//     ws.cell(2, 1).string('Suma =').style(style);
//     ws.cell(2, 2).formula('A1 + B1').style(style);
    
//     ws.cell(3, 1).string('Hola Mundo con variables').style(style);
    
//     ws.cell(4, 1).bool(true).style(style).style({ font: { size: 14 } });

//     ws2.cell(1, 1).string('Hola Mundo2').style(style);
    
//     wb.write( 'excel/Excel5.xlsx', function( err, stats ){
//         console.log( "stats", stats );
//         if (err) {  
//             console.error(err);
//             self.view.expositor(res, {
//                 error: true,
//                 result: err
//             });
//         } 

//         self.view.expositor(res, {
//             error: false,
//             result: {Success: true, Msg: 'Se genero el Layout correctamente', Name: 'Excel5.xls'}
//         });

//         // setTimeout( function(){
//         //     var fs = require("fs");
//         //     fs.unlink('excel/Excel1.xls', function(err) {
//         //        if (err) {
//         //            return console.error(err);
//         //        }
//         //     });            
//         // }, 5000 );
//     });

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
//};

module.exports = externos;

