import { NgModule } from '@angular/core';
import { Routes, Router, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { ConfigComponent } from './config/config.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth.guard';



const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MainComponent },
  { path: 'config', canActivate: [AuthGuard], component: ConfigComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
