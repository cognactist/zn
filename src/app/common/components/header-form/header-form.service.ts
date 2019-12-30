import { Injectable } from '@angular/core';
import { FormBase } from './form-base';
import { SelectBase } from './form-select-base';
import { InputTextBase } from './form-input-text-base';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonBase } from './button-base';
import { FormAlertService } from '../m-alert/form-alert/form-alert.service';
@Injectable({
  providedIn: 'root'
})
export class HeaderFormService {
  public formValue: any;
  constructor( formAlertService:FormAlertService) { }
  public getFormBase(formItems) {

    return formItems.sort((a, b) => a.order - b.order);
  }

  public toFormGroup(questions: FormBase<any>[]) {
    let group: any = {};

    questions.forEach(question => {

      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');

    });
    return new FormGroup(group);
  }


}
