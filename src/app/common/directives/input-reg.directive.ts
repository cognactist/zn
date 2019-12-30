import { Directive, ElementRef, HostListener, Input, ViewChild, Output } from '@angular/core';
import { FormAlertService } from '../components/m-alert/form-alert/form-alert.service';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

@Directive({
  selector: '[inputReg]',
  outputs: ["errorText"]
  // providers: [{ provide: NG_VALIDATORS, useExisting: InputRegDirective, multi: true }]
})
export class InputRegDirective {
  @Input('inputReg') inputReg: any;

  constructor(public el: ElementRef, public formAlertService: FormAlertService) {


  }



  @HostListener('blur', ["$event"]) onblur(e) {
    console.log(e)

    console.log(123)

  }


}
