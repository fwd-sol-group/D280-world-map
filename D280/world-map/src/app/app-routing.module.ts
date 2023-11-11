// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorldComponent } from './world/world.component';

const routes: Routes = [
  { path: '', component: WorldComponent }, // Default route to WorldComponent
  { path: 'world', component: WorldComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
