import { Component, OnInit } from '@angular/core';
import { SeguridadService } from '../../../services/seguridad.service';


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    isActive: boolean = false;
    showMenu: string = '';
    menu: any = [];
    
    constructor(private _service: SeguridadService) {
        this.getMenu();
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    getMenu(){
        let usuario = JSON.parse(localStorage.getItem('userLogged'));
        this._service.getMenu({ rolId: usuario.idRol })
        .subscribe(
            resp => { this.menu = resp; },
            error => { },
            () => { }
        );
    }
}
