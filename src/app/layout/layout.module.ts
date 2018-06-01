import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { SeguridadService } from '../services/seguridad.service';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule.forRoot(),
        NgxSpinnerModule
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent],
    providers: [SeguridadService]
})
export class LayoutModule {}
