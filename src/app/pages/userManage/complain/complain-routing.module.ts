import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComplainComponent } from './complain/complain.component';
import { ComplainantComponent } from './complainant/complainant.component';
import { RespondentComponent } from './respondent/respondent.component';

const routes: Routes = [
  {
    path: '',
    component: ComplainComponent,
   // canActivate:[AuthGuard],
    children: [
      {
        path: '',
     
        children: [
         
          { path:"complainant",component:ComplainantComponent},
          { path:"respondent",component:RespondentComponent},
          { path: 'complain', redirectTo:"complainant" },
          { path: '', redirectTo:"complainant" }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplainRoutingModule { }
