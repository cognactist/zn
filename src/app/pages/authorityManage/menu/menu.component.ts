import { Component, OnInit ,ViewChild,ElementRef} from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { environment} from '../../../../environments/environment'
import { PagerService } from 'src/app/services/pager.service';
import { UserService } from 'src/app/services/user.service'
import Swal from 'node_modules/sweetalert2/dist/sweetalert2'
import { FormControl } from '@angular/forms';

declare var $:any;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private http:HttpClient,private userService:UserService) { }
  public menuList:any;
  public addMenuInfo:any={
    fatherNode:"",
    selfName:"",
    menuName:"",
    url:"",
  }
  public changeMenuInfo:any={
    
    fatherNode:"",
    menuName:"",
    url:"",
  }
  public deleteMenuInfo:any={
    
    fatherNode:"",
    menuName:"",
    url:"",
  }
  ngOnInit() {
    this.getMenuList("")
  }
  getMenuList(fatherMenu:string=""){
    
    var url="/menu/?father_mark="+fatherMenu
    
    +"&token="+localStorage.getItem("token")
   
    
    return new Promise(()=>{
     
      this.http.get(environment.baseUrl+url).subscribe(
        (val:any)=>{
          console.log(val)
         this.menuList=val.data
         
        },
        err=>{
  
        }
        
      )

    })
   
  }
  openAddMenu(e){
 
    this.addMenuInfo.menuId=e.target.getAttribute("menuId"),
    this.addMenuInfo.selfName=e.target.getAttribute("comment");
    this.addMenuInfo.fatherNode=e.target.getAttribute("father_menu")
   
    $('#addChildrenModal').modal('show')
  }
  addMenu(){
    
    var addMenuData={
      father_menu_id:this.addMenuInfo.fatherNode,
      comment:this.addMenuInfo.menuName,
      url:this.addMenuInfo.menuPath,
      token:localStorage.getItem("token")
    }
    return new Promise(()=>{
     
      this.http.post(environment.baseUrl+"/menu/",addMenuData).subscribe(
        (val:any)=>{
          console.log(val)
       
         Swal.fire(
          {
          
           title: val.msg,
           showConfirmButton: false,
           timer: 1500
          }
         )
        if(val.code==0){
          $('#addChildrenModal').modal('hide')
        }
        this.getMenuList()
        },
        err=>{
  
        }
        
      )

    })
   
  }
  openChangeMenu(e){
    this.changeMenuInfo.fatherNode=e.target.getAttribute("fatherMenu");
    this.changeMenuInfo.menuName=e.target.getAttribute("comment");
    this.changeMenuInfo.menuId=e.target.getAttribute("menuId"),
    this.changeMenuInfo.fatherName=e.target.getAttribute("fatherComment");
    this.changeMenuInfo.menuPath=e.target.getAttribute("url");
    $('#changeMenuModal').modal('show')
  }
  changeMenu(){

   var h=new HttpParams(
    {
      fromString:"father_menu_id="+this.changeMenuInfo.fatherNode
                  +"&menu_id="+this.changeMenuInfo.menuId
                  +"&comment="+this.changeMenuInfo.menuName
                  +"&url="+this.changeMenuInfo.menuPath
                  +"&token="+localStorage.getItem("token")
    }
   )
    // var httpParams=new HttpParams({
    //   fromString:"father_menu_id="+this.changeMenuInfo.fatherNode
    //               +"&menu_id="+this.changeMenuInfo.menuId
    //               +"&comment="+this.changeMenuInfo.menuName
    //               +"&url="+this.changeMenuInfo.menuPath
    //               +"&token="+localStorage.getItem("token")
    // })
    return new Promise(()=>{
     
      this.http.put(environment.baseUrl+"/menu/",h).subscribe(
        (val:any)=>{
          console.log(val)
        
         Swal.fire(
          {
          
           title: val.msg,
           showConfirmButton: false,
           timer: 1500
          }
         )
          if(val.code==0){
            $('#changeMenuModal').modal('hide')
          }
          this.getMenuList()
        },
        err=>{
  
        }
        
      )

    })
   
  }
  openDeleteMenu(e){
    this.deleteMenuInfo.menuId=e.target.getAttribute("menuId");
    this.deleteMenuInfo.menuName=e.target.getAttribute("comment");
   
    $('#deleteModal').modal('show')
  }
  deleteMenu(){
  
    var url="/menu/?menu_id="+this.deleteMenuInfo.menuId+"&token="+localStorage.getItem("token")
    return new Promise(()=>{
     
      this.http.delete(environment.baseUrl+url).subscribe(
        (val:any)=>{
          console.log(val)
          Swal.fire(
            {
            
             title: val.msg,
             showConfirmButton: false,
             timer: 1500
            }
           )
          if(val.code==0){
          $('#deleteModal').modal('hide')
          }
          this.getMenuList()
         
        },
        err=>{
  
        }
        
      )

    })
   
  }
}
