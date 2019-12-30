import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormAlertService } from '../form-alert.service';

@Component({
  selector: 'app-form-alert-textarea',
  //styleUrls: ['./form-alert-textarea.component.scss'],
  template: `
  <div class="textareaContent" >
    <textarea #alertTextarea (blur)="getAlertTextareaValue()" [(ngModel)]="questionData.value" [id]="questionData.key" maxlength="{{questionData.maxlength}}" >          
    </textarea>
    <span  class="textareaLength">{{questionData.value.length}}/{{questionData.maxlength}}</span>
    </div>
  `,
  styles: [`
  .textareaContent{
    position: relative;
  }
    textarea{
      background: #F6F6F6;
      border:none;
      border-radius: 4px;
      color: #333;
      font-size: 16px;
      width: 100%;
      min-height:80px;
      padding:20px;
  }
  .textareaLength{   
      position: absolute;
      bottom: 10px;
      color: #333;
      font-size: 14px;
      right: 20px;
      width: auto;
  
  }
  `]

})
export class FormAlertTextareaComponent implements OnInit {
  @Input() question: any;
  @Output() outputQuestionData = new EventEmitter<any>();
  // @ViewChild("alertTextarea") alertTextarea: ElementRef;
  public questionData: any;
  constructor(public formService: FormAlertService) { }

  ngOnInit() {
    this.questionData = this.question;


  }
  getAlertTextareaValue() {
    console.log(this.questionData)
    this.outputQuestionData.emit(this.questionData);
   
  }
  ngAfterViewChecked() {

    this.formService.formTextarea = this.questionData

  }
  changeDetection() {
    console.log("+++++++")
  }
}
