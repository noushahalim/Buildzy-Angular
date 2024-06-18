import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { engineerGuard } from './guards/engineer.guard';

const routes: Routes = [
  {path:'', loadChildren: () => import('./modules/client/client.module').then((m) => m.ClientModule)},
  {path:'auth', loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),canActivate:[authGuard]},
  {path:'engineer', loadChildren: () => import('./modules/engineer/engineer.module').then((m) => m.EngineerModule),canActivate:[engineerGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
