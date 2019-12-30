import { Directive, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

@Directive({
  selector: '[inputPhoneReg]',
  providers: [{ provide: NG_VALIDATORS, useExisting: InputPhoneRegDirective, multi: true }]

})
export class InputPhoneRegDirective implements Validator{

  constructor(public el: ElementRef) { }

  validate(control: AbstractControl | any): { [key: string]: any } | null {
    const reg = /^1[3456789]\d{9}$/
    return { regphone: !reg.test(control.value) }
  }

}
