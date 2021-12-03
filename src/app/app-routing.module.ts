import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardCompComponent } from './card-comp/card-comp.component';

const routes: Routes = [{ path: '', component: CardCompComponent }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
