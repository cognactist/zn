
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HeaderFormService } from './header-form.service';
import { FormBase } from './form-base';
import { ButtonBase } from './button-base';
@Component({
  selector: 'app-header-form',
  templateUrl: './header-form.component.html',
  styleUrls: ['./header-form.component.scss']
})
export class HeaderFormComponent implements OnInit {

  constructor(public headerFormService: HeaderFormService) { }
 
  @Input() questions: any[];
  @Input() form: FormGroup;
  @Input() operationButtons: ButtonBase<any>[];
  
  ngOnInit() {
    
  }
  ngAfterViewChecked(){
    
    this.headerFormService.formValue=this.form.value
  }
  
  onSubmit() {
    console.log(JSON.stringify(this.form.value))
  }
}
