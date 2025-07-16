import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatejemploComponent} from './matejemplo/matejemplo.component';
import {MainMarcaComponent} from './main-marca/main-marca.component';
import {FormMarcaComponent} from './main-marca/form-marca/form-marca.component';
import {MainProductoComponent} from './main-producto/main-producto.component';
import {FormxProductoComponent} from './main-producto/formx-producto/formx-producto.component';
import {Not403Component} from './not403/not403.component';
import {RegistrarSolicitudComponent} from './registrar-solicitud/registrar-solicitud.component';
import {GestionarVisualizarComponent} from  './gestionar-visualizar/gestionar-visualizar.component'
import {AddGestionarComponent} from './gestionar-visualizar/add-gestionar/add-gestionar.component';
import {SolicitudRepuestoFormComponent} from './solicitud-repuesto/solicitud-repuesto.component';
import {SolicitudRepuestoListComponent} from './solicitud-repuesto-list/solicitud-repuesto-list.component';
import {MainRecepcionComponent} from './main-recepcion/main-recepcion.component';
import {FormRecepcionComponent} from './main-recepcion/form-recepcion/form-recepcion.component';
import {MainSalidaComponent} from './main-salida/main-salida.component';
import {FormSalidaComponent} from './main-salida/form-salida/form-salida.component';
import {MainRepuestoComponent} from './main-repuesto/main-repuesto.component';
import {FormRepuestoComponent} from './main-repuesto/form-repuesto/form-repuesto.component';


export const pagesRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, /*canActivate: [certGuard]*/ },
  { path: 'mattable', component: MatejemploComponent },
  { path: 'marca', component: MainMarcaComponent,
    children:[
      { path: 'new', component: FormMarcaComponent },
      { path: 'edit/:id', component: FormMarcaComponent },
    ],
    /*canActivate: [certGuard]*/
  },

  {
    path: 'registro_soliciitudre', component: SolicitudRepuestoListComponent,
    children: [
      {
        path: 'new_re', component: SolicitudRepuestoFormComponent,
      },
    ],
  },

  {
    path: 'registro',
    component: RegistrarSolicitudComponent
  },
  {
    path: 'gestionar_visualizar',
    component: GestionarVisualizarComponent,
    children: [
      { path: 'new', component: AddGestionarComponent },
      { path: 'edit/:id', component: AddGestionarComponent },
    ],
  },
  {
    path:'solicitudre',
    component: SolicitudRepuestoFormComponent,
  },

  {
    path: 'product',
    component: MainProductoComponent,
    children: [
      { path: 'new', component: FormxProductoComponent },
      { path: 'edit/:id', component: FormxProductoComponent },
    ], /*canActivate: [certGuard]*/
  },
  {
    path: 'repuestos',
    component: MainRepuestoComponent,
    children: [
      { path: 'new', component: FormRepuestoComponent },
      { path: 'edit/:id', component: FormRepuestoComponent },
    ], /*canActivate: [certGuard]*/
  },
  {
    path: 'recepcion',
    component: MainRecepcionComponent,
    children: [
      { path: 'new', component: FormRecepcionComponent },
      { path: 'edit/:id', component: FormRecepcionComponent }
    ]
  },
  {
    path: 'salida',
    component: MainSalidaComponent,
    children: [
      { path: 'new', component: FormSalidaComponent },
      { path: 'edit/:id', component: FormSalidaComponent },
    ],
  },
  {path:'not-403', component: Not403Component}
  /*{ path: 'categoria', component: MainCategoriaComponent , },
  //{ path: 'categoria', component: MainCategoriaComponent },
  {
    path: 'marca',
    component: MainMarcaComponent,
    children: [
      { path: 'new', component: FormMarcaComponent },
      { path: 'edit/:id', component: FormMarcaComponent },
    ],
  },*/

];
