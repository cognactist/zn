import { Component, OnInit ,ViewChild,ElementRef, ɵConsole} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../../../environments/environment'
import { PagerService } from 'src/app/services/pager.service';
import { UserService } from 'src/app/services/user.service'
import Swal from 'node_modules/sweetalert2/dist/sweetalert2'
import { FormControl } from '@angular/forms';

declare var $:any;

@Component({
  selector: 'app-push',
  templateUrl: './push.component.html',
  styleUrls: ['./push.component.scss']
})
export class PushComponent implements OnInit {

  @ViewChild("createUserTip") createUserTip:ElementRef;

  constructor(private http:HttpClient,private pagerService:PagerService,private userService:UserService) { }
  public total:number=0;
 
  private page_index:number;
  private pager:any;
 
  private totalPage:any;

  private loading:any=false;
  private searchMouldName:string="";
  private searchMouldType:string="";
  private pushList:any;
  
  public addPushInfo:any={
    titleId:"",
    mouldType:"",
    mouldDetails:"",
    mouldImgs:[],
    pushType:"",
    pushDeatils:"",
    reason:"",
    name:""
  };
  public searchPush:any={
    titleName:"",
    typeId:"",
    pushType:"",
    pushObject:"",
    createTimeStart:"",
    createTimeEnd:"",

  }
  public pushDetailsInfo:any={
    titleName:"",
    titleId:"",
    mouldType:"",
    mouldDetails:"",
    mouldImgs:[],
    pushType:"",
    pushDeatils:"",
    reason:""
  }
  public mouldList:any;
  ngOnInit() {
    
    this.total=0;
    this.page_index=0;
   
    this.getPushList(1)
    var self=this;


  }
  openAddPush(){
    this.getMouldList()
    this.addPushInfo={
      titleId:"",
      mouldType:"",
      mouldDetails:"",
      mouldImgs:[],
      pushType:"",
      pushDeatils:"",
      reason:""
    }
    $("#addPushModal").modal("show")
    
  }
  getPushList(page:number=1){
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
   
    var self=this;
    var createTimeStart=this.searchPush.createTimeStart?this.searchPush.createTimeStart+" 00:00:00":"";
    var createTimeEnd=this.searchPush.createTimeEnd?this.searchPush.createTimeEnd+" 23:59:59":"";
    var url="/push/manage/?page="+Number(page)
    +"&title_name="+this.searchPush.titleName
    +"&type_id="+this.searchPush.typeId
    +"&push_type="+this.searchPush.pushType
    +"&create_time_from="+createTimeStart
    +"&created_time_end="+createTimeEnd
    +"&token="+localStorage.getItem("token")
    this.total=0;
    this.loading=true;
    
    return new Promise(()=>{
     
      this.http.get(environment.baseUrl+url).subscribe(
        (val:any)=>{
          console.log(val)
          setTimeout(() => {
            
            if(val.data.data_list.length==0){
              this.pager={}
              this.total=0
              
            }else{
              this.pushList=val.data.data_list;
              this.page_index=val.data.page_index;
              this.total=val.data.total;
              this.totalPage=Math.ceil(this.total/10)
              this.pager=this.pushList;
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
  
  
  getMouldList(page:number=1){
    
   
    var self=this;
    var url="/template/getall/?page=0&token="+localStorage.getItem("token")
  
    return new Promise(()=>{
     
      this.http.get(environment.baseUrl+url).subscribe(
        (val:any)=>{
        
          this.mouldList=val.data;
      
        },
        err=>{
  
        }
        
      )

    })
   
  }
  addPush(){
     var addPushData={
      user_id:Number(localStorage.getItem("userId")),
      title_id:Number(this.addPushInfo.titleId),
      push_type:this.addPushInfo.pushType,
      reason:this.addPushInfo.reason,
      push_deatils:"",
      token:localStorage.getItem("token")
    }
    console.log(addPushData.push_type)
    console.log(this.addPushInfo.pushDetails)
    if(addPushData.push_type=="2"){
     if(this.addPushInfo.pushDetails){
      addPushData.push_deatils=this.addPushInfo.pushDetails.split('\n')

     }
     
    }
    return new Promise(()=>{
   
      this.http.post(environment.baseUrl+"/push/manage/",addPushData).subscribe(
          (val:any)=>{
            console.log(val)
            Swal.fire(
              {
                title:val.msg,
                showConfirmButton: false,
                timer: 1500
              }
            )
            if(val.code==0){
              this.getPushList(this.page_index)
              $("#addPushModal").modal("hide")
            }
          
           
          },
          err=>{
    
          }
          
        )
  
      })

  }
  openPushDetails(e){
    this.pushDetailsInfo={
      titleName:e.target.getAttribute("titleName"),
      titleId:"",
      mouldType:e.target.getAttribute("mouldType"),
      mouldDetails:e.target.getAttribute("details"),
      mouldImgs:e.target.getAttribute("imgs").split(","),
      pushType:e.target.getAttribute("pushType"),
      pushDetails:e.target.getAttribute("phone"),
      reason:e.target.getAttribute("reason")
    }
 
    $("#pushDetailsModal").modal("show")
  }
  setPage(page: number,get:number=1) {
   
    // get pager object from service
    var self=this;
    if(get==1){
      this.getPushList(page).then(
        (val:any)=>{
          
        
        self.pager = this.pagerService.getPager(val.data.total, page,10);
        }
      )
   
    }else{
   
      this.pager = self.pagerService.getPager(this.total,page,10);
    

    }
   
 
  }

}
