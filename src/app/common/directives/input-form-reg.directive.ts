import { Directive, ElementRef, HostListener, Input, ViewChild, Renderer2 } from '@angular/core';
import { FormAlertService } from '../components/m-alert/form-alert/form-alert.service';
import { AbstractControl, NG_VALIDATORS, Validator, Validators } from '@angular/forms';

@Directive({
  selector: '[inputFormReg]',
  providers: [{ provide: NG_VALIDATORS, useExisting: InputFormRegDirective, multi: true }]
})
export class InputFormRegDirective implements Validator {

  constructor(public el: ElementRef, public renderer: Renderer2) { }

  validate(control: AbstractControl | any): { [key: string]: any } | null {
  
    var inputItem = control.controls;
    if (control.dirty) {

      for (const key in inputItem) {

      }

    }


    return { regForm: "false" }
  }
}
