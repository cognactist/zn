import { Component, OnInit ,ViewChild,ElementRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../../../environments/environment'
import { PagerService } from 'src/app/services/pager.service';
import { UserService } from 'src/app/services/user.service'
import Swal from 'node_modules/sweetalert2/dist/sweetalert2'
declare var $:any;
@Component({
  selector: 'app-self-user',
  templateUrl: './self-user.component.html',
  styleUrls: ['./self-user.component.scss']
})
export class SelfUserComponent implements OnInit {
 
 
  @ViewChild("createUserTip") createUserTip:ElementRef;
  @ViewChild("changePwdTip") changePwdTip:ElementRef;
  constructor(private http:HttpClient,private pagerService:PagerService,private userService:UserService) { }
  public total:number=0;
  private selfUserList:any;
 
  private page_index:number;
  private pager:any;
  public roleList:any;
  private totalPage:any;
  private changePwdAccount:any;
  private changeRoleAccount:any;
  private loading:any=false;


  public addSelfUserInfo={
    account:"",
    managerName:"",
    pwd:"",
    positionName:""
  }

  public searchSelfUserInfo={
    userName:"",
    positionCode:""
  }
  public newPwd:any;
  public changeRolePositionCodeValue:any;
  ngOnInit() {
    this.total=0;
    this.page_index=0;
    this.getRoleList()
    this.getSelfUserList(1)
    var self=this;
    $('#changePwdModal').on('show.bs.modal', function (e) {
     
      self.changePwdAccount=e.relatedTarget.getAttribute('account');
      
 
    })
    $('#changeRoleModal').on('show.bs.modal', function (e) {
    
      self.changeRoleAccount=e.relatedTarget.getAttribute('changeRoleAccount');
      
    })
    $('#createUserModal').on('show.bs.modal', function (e) {
    
      self.createUserTip.nativeElement.innerText=""

      
    })


  }
  addRole(){
    var self=this;

    return new Promise(()=>{
     var addSelfUserData={
      manager_name:this.addSelfUserInfo.managerName,
      position_code:this.addSelfUserInfo.positionName,
      account:this.addSelfUserInfo.account,
      pwd: this.userService.rsaEncrypt(this.addSelfUserInfo.pwd),
      token:localStorage.getItem("token")
     
     }
    if(addSelfUserData.account==""){
      this.createUserTip.nativeElement.innerText="用户名不能为空！"
      return
    }else{
      var reg=/^[0-9a-zA-Z]+$/;
      if(!reg.test(addSelfUserData.account)){
        this.createUserTip.nativeElement.innerText="用户名必须为数字或字母！"
        return
      }
   
    }
   
    if(addSelfUserData.account.length<6||addSelfUserData.account.length>16){
      this.createUserTip.nativeElement.innerText="用户名长度必须为6到16位！"
      return
    }
   
    if(addSelfUserData.manager_name==""){
      this.createUserTip.nativeElement.innerText="昵称不能为空！"
      return
    }
    if(this.addSelfUserInfo.pwd==""){
      this.createUserTip.nativeElement.innerText="密码不能为空！"
      return
    }
    if(this.addSelfUserInfo.pwd.length<6||this.addSelfUserInfo.pwd.length>16){
      this.createUserTip.nativeElement.innerText="密码长度必须为6到16位！！"
      return
    }
    if(addSelfUserData.position_code==""){
      this.createUserTip.nativeElement.innerText="角色不能为空！"
      return
    }
      this.http.post(environment.baseUrl+"/account/?",addSelfUserData).subscribe(
        (val:any)=>{
        
          Swal.fire(
            {
            
             title: val.msg,
             showConfirmButton: false,
             timer: 1500
            }
           ) 
            self.getSelfUserList()
            $('#createUserModal').modal('hide')
         

        },
        err=>{
  
        }
        
      )

    })
  }
  getRoleList(page:number=1){
    if(page<1){
    
      Swal.fire(
        {
        
         title: "无效页码！",
         showConfirmButton: false,
         timer: 1500
        }
       )
      return null
    }
   
    return new Promise(()=>{
     
      this.http.get(environment.baseUrl+"/position/?token="+localStorage.getItem("token")).subscribe(
        (val:any)=>{
          
          this.roleList=val.data.list
        
         
        },
        err=>{
  
        }
        
      )

    })
   
  }

  getSelfUserList(page:number=1){
    if(page<1){
    
      Swal.fire(
        {
        
         title: "无效页码！",
         showConfirmButton: false,
         timer: 1500
        }
       )
      return null
    }
    if(this.searchSelfUserInfo.userName.length>16){
   
      Swal.fire(
        {
        
         title: "用户名长度不能超过16位！！",
         showConfirmButton: false,
         timer: 1500
        }
       )
       return
    }
    var self=this;
    var url="/account/?page_index="+page
    +"&manager_name="+this.searchSelfUserInfo.userName
    +"&position_code="+this.searchSelfUserInfo.positionCode
    +"&token="+localStorage.getItem("token")
    this.total=0;
    this.loading=true;
   
    return new Promise(()=>{
     
      this.http.get(environment.baseUrl+url).subscribe(
        (val:any)=>{
         
          setTimeout(() => {
            
            if(val.data.list.length==0){
              this.pager={}
              this.total=0
              //return
            }else{
              this.selfUserList=val.data.list;
              this.page_index=val.data.page_index;
              this.total=val.data.total;
              this.totalPage=Math.ceil(this.total/10)
              this.pager=this.selfUserList;
              this.setPage(this.page_index,0)
            }
            self.loading=false;
           
          }, 500);
         
         
        },
        err=>{
  
        }
        
      )

    })
   
  }
  changeSelfUserRight(e){
    
   
    var self=this;
    return new Promise(()=>{
     
      var changeSelfUserRightData={
        account:e.target.getAttribute("account"),
        rights:e.target.getAttribute("rights")==1?"启用":"禁用",
        token:localStorage.getItem("token")
      }
      this.http.post(environment.baseUrl+"/account/rights/",changeSelfUserRightData).subscribe(
        (val:any)=>{
          Swal.fire(
            {
            
             title: val.msg,
             showConfirmButton: false,
             timer: 1500
            }
           )
        
            self.getSelfUserList()
         
        },
        err=>{
  
        }
        
      )

    })

  }
  changePwd(){
    if(this.newPwd.length<6||this.newPwd.length>16){
      this.changePwdTip.nativeElement.innerText="密码长度必须为6到16位！！"
      return
    }
    return new Promise(()=>{
      var changePwdData={
        pwd:this.userService.rsaEncrypt(this.newPwd),
        account:this.changePwdAccount,
        token:localStorage.getItem("token")
      
      }
     
      this.http.post(environment.baseUrl+"/account/password/",changePwdData).subscribe(
        (val:any)=>{
        
          Swal.fire(
            {
            
             title:val.msg,
             showConfirmButton: false,
             timer: 1500
            }
           )
          $("#changePwdModal").modal("hide")
        },
        err=>{
  
        }
        
      )

    })

  }
  changeRole(){
    var self=this;
    return new Promise(()=>{
     var changeRoleData={
     
      position_code:this.changeRolePositionCodeValue,
      account:this.changeRoleAccount,
   
      token:localStorage.getItem("token")
     
     }
    
      this.http.post(environment.baseUrl+"/account/position/?",changeRoleData).subscribe(
        (val:any)=>{
        
         
         
          Swal.fire(
            {
            
             title:val.msg,
             showConfirmButton: false,
             timer: 1500
            }
           )
            self.getSelfUserList()
         
         

        },
        err=>{
  
        }
        
      )

    })
  }
  setPage(page: number,get:number=1) {
   
    // get pager object from service
    var self=this;
    if(get==1){
      this.getSelfUserList(page).then(
        (val:any)=>{
          
        
        self.pager = this.pagerService.getPager(val.data.total, page,10);
        }
      )
   
    }else{
   
      this.pager = self.pagerService.getPager(this.total,page,10);
    

    }
   
 
  }
  

}
