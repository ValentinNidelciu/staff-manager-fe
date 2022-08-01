import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManagerListComponent } from './manager/manager-list/manager-list.component';

const routes: Routes = [
  {path: "", component: HomeComponent },
  {path: "manager/list", component: ManagerListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
