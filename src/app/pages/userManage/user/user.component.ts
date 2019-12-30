import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input, } from '@angular/core';
import { HttpClient, HttpHandler, HttpRequest } from '@angular/common/http';
import { environment } from '../../../../environments/environment'
import Swal from 'node_modules/sweetalert2/dist/sweetalert2'
import { PagerComponent } from '../../../common/components/pager/pager.component'
import { User } from './user';
import { HeaderFormComponent } from '../../../common/components/header-form/header-form.component'
import { UserService } from './user.service';
import { FormGroup } from '@angular/forms';
import { ButtonBase } from 'src/app/common/components/header-form/button-base';
import { Subscription, from } from 'rxjs';
import { MAlertComponent } from '../../../common/components/m-alert/m-alert.component'
import { MAlert } from 'src/app/common/components/m-alert/m-alert';
declare var $: any;


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  @ViewChild("forbidTip") forbidTip: ElementRef;

  constructor(private userService: UserService, private http: HttpClient, private elementRef: ElementRef) {

  }

  public listSubscription: Subscription;
  public forbidSubscription: Subscription;

  private userList: any = [];
  public total: number = 0;
  private pageIndex: number = 0;
  private loading: any = false;
  public searchUserInfo: User = new User();
  public forbidInfo: User = new User();

  public dataDetailsHeaderTitle: string;
  public dataDetailsBodyText: string;

  public formItems: any[];
  public headerForm: FormGroup;
  public operationButtons: ButtonBase<any>[];
  public alertData: any = "";
  public alertStatusData: string = ""
  ngOnInit() {
    var self = this;
    this.formItems = this.userService.initHeaderFormItems()
    this.headerForm = this.userService.initHeaderForm()
    this.operationButtons = this.userService.initHeaderFormOperationButtons()
    this.listSubscription = this.userService.getListMessage()
      .subscribe(val => {
        this.setDataTable(val)

      });
    this.forbidSubscription = this.userService.getForbidMessage()
      .subscribe(val => {
        this.alertData = val
      });

  }
  forbidUser(e) {
    e.manager_id = localStorage.getItem("userId");

    this.userService.forbidUser(e).then((val: any) => {
      this.alertStatusData = new Date().getTime().toString()
      this.userService.getUserList(this.pageIndex)

    })
  }
  resetUser() {

    this.searchUserInfo.clearUser()

    this.setPagerInfo()
  }
  setPagerInfo(total: number = 0, pageIndex: number = 0) {
    this.total = total;
    this.pageIndex = pageIndex;

  }
  setDataTable(val) {
    this.userList = val.data.list;
    if (this.userList.length == 0) {
      this.setPagerInfo()
    } else {
      this.setPagerInfo(val.data.total, val.data.page_index)

    }
  }


  openForbid() {

    this.alertStatusData = new Date().getTime().toString()
    this.alertData = new MAlert("forbid", "封号", "form", this.forbidInfo = new User())

  }
  
  showForbidReason(e) {
    this.alertStatusData = new Date().getTime().toString()
    this.alertData = new MAlert("forbidReason", "封号原因", "check", e.target.getAttribute("reason"))
  }
  onPageChange(e) {
    this.userService.getUserList(e)

  }

}
