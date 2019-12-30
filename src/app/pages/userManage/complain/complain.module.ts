import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ComplainRoutingModule } from './complain-routing.module';
import { ComplainComponent } from './complain/complain.component';
import { ComplainantComponent } from './complainant/complainant.component';
import { RespondentComponent } from './respondent/respondent.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ComplainRoutingModule,
    FormsModule
  ],
  declarations: [ComplainComponent,ComplainantComponent,RespondentComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ComplainModule { }
