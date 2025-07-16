import { Routes } from '@angular/router';

import {LayoutComponent} from './paginas/layout/layout.component';
import {LoginComponent} from './paginas/login/login.component';
import {Not404Component} from './paginas/not404/not404.component';

export const routes: Routes = [
  { path: '', redirectTo:'login' , pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'main', component: LayoutComponent, },
  { path: 'pages',
    component: LayoutComponent,
    loadChildren:()=>import('./paginas/pages.routes').then(x=>x.pagesRoutes)
  },
  { path: '**', component: Not404Component},

];
