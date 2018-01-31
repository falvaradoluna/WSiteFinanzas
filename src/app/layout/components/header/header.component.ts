import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IAuth } from '../../../login/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  pushRightClass = 'push-right';
  userLogged: IAuth;

  constructor(private translate: TranslateService, public router: Router) {
    this.router.events.subscribe(val => {
      if (
        val instanceof NavigationEnd &&
        window.innerWidth <= 992 &&
        this.isToggled()
      ) {
        this.toggleSidebar();
      }
    });
  }

  ngOnInit() {
    this.userLogged = JSON.parse(localStorage.getItem('userLogged'));
  }

  isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    this.showSideBar();
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  rltAndLtr() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('rtl');
  }

  onLoggedout() {
    localStorage.removeItem('userLogged');
  }

  changeLang(language: string) {
    this.translate.use(language);
  }

  // Se agrego boton para quitar menu en pantallas grandes
  toggleSidebarCustom() {
    const dom: any = document.querySelector('.sidebar');
    const domMain: any = document.querySelector('.main-container');
    dom.classList.toggle('hidden-nav');
    domMain.classList.toggle('main-container-full-width');
  }

  showSideBar() {
    const dom: any = document.querySelector('.sidebar');
    dom.classList.remove('hidden-nav');
  }
}
