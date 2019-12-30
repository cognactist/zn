import { Component, OnInit, Input, ViewChild, ElementRef, Type } from '@angular/core';
import { MAlertItem, MAlertRootComponent } from '../m-alert-item';
import { FormGroup, FormControl } from '@angular/forms';
import { ButtonBase } from '../../header-form/button-base';
import { HeaderFormService } from '../../header-form/header-form.service';
import { FormAlertService } from './form-alert.service';
import { InputRegDirective } from 'src/app/common/directives/input-reg.directive';
import { InputFormRegDirective } from 'src/app/common/directives/input-form-reg.directive';
import { InputPhoneRegDirective } from 'src/app/common/directives/input-phone-reg.directive';
import { TextareaBase } from './form-alert-textarea/form-textarea-base';

@Component({
  selector: 'app-form-alert',
  templateUrl: './form-alert.component.html',
  styleUrls: ['./form-alert.component.scss'],
  providers: [InputRegDirective, InputFormRegDirective, InputPhoneRegDirective]
})
export class FormAlertComponent implements MAlertRootComponent {
  constructor(public formService: HeaderFormService, public formAlertService: FormAlertService) { }
  @Input() data: any;
  @ViewChild("tip") tip: ElementRef;
  public questions: any[];
  public form: FormGroup;
  public operationButtons: ButtonBase<any>[];
  public textAreaLength: Number;
  public tipText: any;

  ngOnInit() {

    this.questions = this.formService.getFormBase(this.data)

    this.form = this.formService.toFormGroup(this.formService.getFormBase(this.data))

  }
  ngAfterViewInit() {
    console.log("qqq")

  }
  ngOnChanges() {
    console.log("eeeee")

  }

  AfterContent() {

  }
  regInput(data, question) {
    this.tipText = ""
    if (data == '') {
      if (question.required) {
        if (question.value == '') {
          this.tipText = question.label + "不能为空！"
          
          this.formAlertService.sendTipTextIsShowMessage(true)
          return
        }
      }

    } else {
      var inputValue = data.target.value
     
      if (question.required) {

        if (inputValue == '') {
          this.tipText = question.label + "不能为空！"
          this.formAlertService.sendTipTextIsShowMessage(true)
          return
        }
      }

    }
    var formValue = this.form.value
    for (const key in formValue) {
      if (key == "cell_phone") {
       
        const reg = /^1[3456789]\d{9}$/
        if (!reg.test(formValue[key])) {
          this.tipText = "手机格式错误!"
         
          this.formAlertService.sendTipTextIsShowMessage(true)
          return
        }
      }else if(key==""){

      }
    }
    this.formAlertService.sendTipTextIsShowMessage(false)
  }

  ngAfterViewChecked() {
    this.formAlertService.formAlertValue = this.form.value

  }

}
