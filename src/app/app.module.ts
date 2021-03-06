import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard, SortService, FechaActualizacionService } from './shared';
 import { DataTablesModule } from 'angular-datatables';
// import { ClasificacionHondaComponent } from './modules/reportes/reportesDePlanta/shared/honda/classification/clasificacion-honda/clasificacion-honda.component';
// import { HondaComponent } from './modules/reportes/reportesDePlanta/shared/honda/honda.component';
// import { NissanComponent } from './modules/reportes/reportesDePlanta/shared/nissan/nissan.component';
// import { ReporteDePlantaComponent } from './modules/reportes/reportesDePlanta/reporte-de-planta/reporte-de-planta.component';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  // for development
  // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-5/master/dist/assets/i18n/', '.json');
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    DataTablesModule
    //DataTablesModule.forRoot()
    
  ],
  declarations: [AppComponent
    //, ClasificacionHondaComponent
    //, HondaComponent
  //  , NissanComponent
  ],
  providers: [AuthGuard, SortService, FechaActualizacionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
