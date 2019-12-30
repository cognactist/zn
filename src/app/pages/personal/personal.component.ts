import { Component, OnInit,ViewChild ,ElementRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../../environments/environment'
import { UserService } from 'src/app/services/user.service'
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import Swal from 'node_modules/sweetalert2/dist/sweetalert2'
declare var $: any;
@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})

export class PersonalComponent implements OnInit {

 

  @ViewChild ("tipText") tipText:ElementRef;
  private userInfo:any;
  public userAccount:any;
  public managerName:any;
  public changeManagerName:any;
  public originalPwdValue:any;
  public newPwdValue:any;
  public repeatNewPwdValue:any;
  public positionName:any;
  private formGroup: any;
 
  public changeNameDisabled:boolean=true;
  public changePwdDisabled:boolean=true;
  constructor(private http:HttpClient ,private  userService: UserService,private router:Router,private fb:FormBuilder) { }

  ngOnInit() {
    this.originalPwdValue=""
    this.newPwdValue=""
    this.repeatNewPwdValue=""
    this.userInfo= JSON.parse(localStorage.getItem("userInfo"))
    
    this.userAccount=localStorage.getItem("account")
    this.managerName=localStorage.getItem("managerName")
    this.positionName=localStorage.getItem("positionName")
    this.changeManagerName=this.managerName;
    this.formGroup = this.fb.group({
      originalPwdValue: '',
      newPwdValue: '',
      repeatNewPwdValue: ''
    });
   
  }

  changeName(name){
    
   var self=this;
    return new Promise(()=>{
      var changeNameData={
        manager_name:name,
        token:localStorage.getItem("token")
      }
      this.http.post(environment.baseUrl+"/account/name/",changeNameData).subscribe(
        (val:any)=>{
         
            Swal.fire(
             {
              title: val.msg,
              showConfirmButton: false,
              timer: 1500
             }
            )
         
         
          self.managerName=name;     
          localStorage.setItem("managerName",name)     
          this.router.navigate(['/pages'])
        },
        err=>{
  
        }
        
      )

    })
  }

  onChangeName(name){
 
    if(name==""){
     this.changeNameDisabled=true
    }else{
      this.changeNameDisabled=false
     
    }
  }
  openChangePwdModal(){
    this.tipText.nativeElement.innerText=""
 
    $('#changePwdModal').modal('show')
  }
  changePwd(old_password,pwd,pwd2){
    if(old_password.length<7&&pwd.length<7&&pwd2.length<7){
      this.tipText.nativeElement.innerText="密码长度必须大于6位！"
      return
    }
    if(pwd!=pwd2){
       this.tipText.nativeElement.innerText="新密码两次输入不一致！"
       return
    }
    return new Promise(()=>{
      var changePwdData={
        pwd:this.userService.rsaEncrypt(pwd),
        pwd2:this.userService.rsaEncrypt(pwd2),
        old_password:this.userService.rsaEncrypt(old_password),
        token:localStorage.getItem("token")
      }
     
      this.http.post(environment.baseUrl+"/account/password/",changePwdData).subscribe(
        (val:any)=>{
          console.log(val)
          if(val.code==10022){
            this.tipText.nativeElement.innerText=val.msg
          }else{
            $('#changePwdModal').modal('hide')
            this.tipText.nativeElement.innerText=""
          }
          
         
        },
        err=>{
  
        }
        
      )

    })

  }
  onChangePwd(){
  
    if(this.originalPwdValue.length>6&&this.newPwdValue.length>6&&this.repeatNewPwdValue.length>6){
    
     this.changePwdDisabled=false
    
    }else{
    
      this.changePwdDisabled=true

    }

  }
}
