var LoginView = require('../views/reference'),
  LoginModel = require('../models/dataAccess');

  var Seguridad = function (conf) {
    this.conf = conf || {};
    this.view = new LoginView();
    this.model = new LoginModel({
      parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
      };
    };

    Seguridad.prototype.get_menu = function (req, res, next) {
        var self = this;
        var arrayMenus = [];
        var menu = [];
        let arraySubmenus = [];
        var params = [
          { name: 'idRol', value: req.query.roleId, type: self.model.types.INT }
        ];
      
        this.model.query('Seguridad.ObtieneMenuXRol', params, function (error, result) {    
          if (typeof result !== 'undefined' && result.length > 0) {
            let arrayPadre = result.filter(menu => menu.idPadre === 0);            
            for (var menuPosition = 0; menuPosition < arrayPadre.length; menuPosition++) {
              menu = {
                titulo: arrayPadre[menuPosition].menu,
                icono: arrayPadre[menuPosition].icoMenu,
                url: arrayPadre[menuPosition].url,
                showMenu: 'pages' + menuPosition,
                submenu: []
              };
      
              arraySubmenus = result.filter(menu => menu.idPadre === arrayPadre[menuPosition].idMenu);
              if (arraySubmenus.length > 0) {
                for (var positionSub = 0; positionSub < arraySubmenus.length; positionSub++) {
                  menu.submenu.push({ titulo: arraySubmenus[positionSub].menu, url: arraySubmenus[positionSub].url, icono: arraySubmenus[positionSub].icoMenu });
                };
              }
              arrayMenus.push(menu);
            };
            result = arrayMenus;
          } else{
            result = []
          }
      
          self.view.expositor(res, {
            error: error,
            result: result,
          });
        });
      };
      
      module.exports = Seguridad;