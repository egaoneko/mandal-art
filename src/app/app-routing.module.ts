import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MandalArtComponent } from './mandal-art/mandal-art.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },  
  { path: 'mandal-art/:id', component: MandalArtComponent },  
  { path: 'mandal-art', redirectTo: '/dashboard'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
