import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';


const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
          { path: '', redirectTo: 'blank-page' },
          { path: 'configuracionDePlantilla',loadChildren:'../modules/reportes/reportesDePlanta/configuracion-plantilla/configuracion-plantilla.module#ConfiguracionDePlantillaModule'},
          { path: 'externo',loadChildren:'../modules/reportes/externo/externo.module#ExternoModule'},
          { path: 'cuentas', loadChildren: '../modules/catalogos/cuentas/cuentas.module#CuentasModule' },
          { path: 'cuentas', loadChildren: '../modules/catalogos/cuentas/cuentas.module#CuentasModule' },
          { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
          { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
          { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
          { path: 'forms', loadChildren: './form/form.module#FormModule' },
          { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
          { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
          { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
          { path: 'internos', loadChildren: '../modules/internos/internos.module#InternosModule' },
          { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
