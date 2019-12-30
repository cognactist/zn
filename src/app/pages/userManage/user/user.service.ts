import { Injectable } from '@angular/core';
import { InputTextBase } from 'src/app/common/components/header-form/form-input-text-base';
import { FormBase } from 'src/app/common/components/header-form/form-base';
import { SelectBase } from 'src/app/common/components/header-form/form-select-base';
import { HeaderFormService } from 'src/app/common/components/header-form/header-form.service';
import { ButtonBase } from 'src/app/common/components/header-form/button-base';
import Swal from 'node_modules/sweetalert2/dist/sweetalert2'
import { environment } from '../../../../environments/environment'
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { MhttpService } from 'src/app/services/mhttp.service';
import { MAlert } from 'src/app/common/components/m-alert/m-alert';
import { User } from './user';
import { TextareaBase } from 'src/app/common/components/m-alert/form-alert/form-alert-textarea/form-textarea-base';
import { MAlertService } from 'src/app/common/components/m-alert/m-alert.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public mhttp:MhttpService,public http: HttpClient, private headerFormService: HeaderFormService,private malerService:MAlertService) {

  }
  private getUserListSubject = new Subject<any>();
  private forbidUserSubject = new Subject<any>();
  initHeaderFormItems() {
    let formItems: FormBase<any>[] = [
      new InputTextBase({
        key: 'nick_name',
        label: '用户名称',
        value: '',
        required: true,
        order: 1
      }),
      new InputTextBase({
        key: 'cell_phone',
        label: '用户手机号',
        type: 'text',
        required: true,
        order: 2
      }),
      new InputTextBase({
        key: 'time_from',
        label: '注册时间',
        type: 'date',
        required: true,
        order: 3
      }),
      new InputTextBase({
        key: 'time_to',
        label: '至',
        type: 'date',
        required: true,
        order: 4
      }),
      new SelectBase({
        key: 'account_limit',
        label: '是否被封号',
        options: [
          { key: '', value: '全部' },
          { key: '1', value: '已封号' },
          { key: '0', value: '正常' },
        ],
        required: true,
        order: 5
      }),


    ];
    return this.headerFormService.getFormBase(formItems)

  }
  initHeaderForm() {
    return this.headerFormService.toFormGroup(this.initHeaderFormItems())
  }
  initHeaderFormOperationButtons<ButtonBase>() {

    let operationButtons = [
      new ButtonBase("查询", "mButtonGreen mButton", () => this.getUserList()),
      new ButtonBase("封号", "mButtonGreen mButton", ()=>this.openForbid()),
      new ButtonBase("重置", "mButtonGray mButton", function () {
        console.log("重置")
      })
    ]
    return operationButtons
  }

  openForbid() {

    let formItems: FormBase<any>[] = [
     
      new InputTextBase({
        key: 'cell_phone',
        label: '手机号',
        type: 'text',
        required: true,
        order: 1,
        regType:"phone"
      }),
      new TextareaBase({
        key: 'reason',
        label: '封号原因',
        type: 'textarea',
        maxlength:100,
        required: true,
        order: 2
      }),
    


    ];
   
    this.sendForbidMessage( new MAlert("forbid","封号","form",formItems))
   
  }
  sendForbidMessage(message) {
    this.forbidUserSubject.next(message);
  }

  clearForbidMessage() {
    this.forbidUserSubject.next();
  }

  getForbidMessage(): Observable<any> {
    return this.forbidUserSubject.asObservable();
  }
  sendListMessage(message) {
    this.getUserListSubject.next(message);
  }

  clearListMessage() {
    this.getUserListSubject.next();
  }

  getListMessage(): Observable<any> {
    return this.getUserListSubject.asObservable();
  }
  getUserList(page: number = 1) {
    if (page < 1) {

      Swal.fire(
        {

          title: "无效页码！",
          showConfirmButton: false,
          timer: 1500
        }
      )
      return null
    }
 
    this.headerFormService.formValue.page_index = page;
    return this.mhttp.get("/user/?",this.headerFormService.formValue).then((val)=>{
      this.sendListMessage(val)
    })



  }
  forbidUser(userInfo){

    return this.mhttp.post("/user/ban/",userInfo).then((val:any)=>{
      console.log(val)
      if(val.code==0){
        this.malerService.sendForbidMessage("close")
      }
      Swal.fire(
        {

          title: val.msg,
          showConfirmButton: false,
          timer: 1500
        }
      )
    })
  }
}
