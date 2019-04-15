import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  CssComponent,
  IconsComponent,
  MessagesComponent,
  StructureComponent,
  TypographyComponent,
  DataTableComponent,
  ActionsComponent,
  AlertsComponent,
  SearchBarComponent,
  ButtonsComponent,
  ColorsComponent,
  GridComponent
} from './sections';

const routes: Routes = [
  {
    path: '',
    loadChildren: './sections/dashboard/dashboard.module#DashboardModule',
    pathMatch: 'full',
  },
  {
    path: 'yes-or-no',
    loadChildren: './sections/yes-or-no/yes-or-no.module#YesOrNoModule',
    pathMatch: 'full',
  },
  { path: 'actions', component: ActionsComponent },
  { path: 'alerts', component: AlertsComponent },
  { path: 'search-bar', component: SearchBarComponent },
  { path: 'buttons', component: ButtonsComponent },
  { path: 'colors', component: ColorsComponent },
  { path: 'grid', component: GridComponent },
  { path: 'css', component: CssComponent },
  { path: 'icons', component: IconsComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'structure', component: StructureComponent },
  { path: 'typography', component: TypographyComponent },
  { path: 'data-table', component: DataTableComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    // { enableTracing: true, } // <-- debugging purposes only
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
