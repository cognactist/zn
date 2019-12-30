
import { Component, OnInit ,ViewChild,ElementRef,Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../../../../environments/environment'
import { PagerService } from 'src/app/services/pager.service';
import { UserService } from 'src/app/services/user.service'
import Swal from 'node_modules/sweetalert2/dist/sweetalert2'
import { FormControl } from '@angular/forms';
import { ComplainService} from 'src/app/services/complain.service'
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-complainant',
  templateUrl: './complainant.component.html',
  styleUrls: ['./complainant.component.scss']
})
export class ComplainantComponent implements OnInit {
  @ViewChild("createUserTip") createUserTip:ElementRef;
  @ViewChild("listBox") listBox:ElementRef;
  constructor(private router:Router,private el:ElementRef,public complainService:ComplainService,private http:HttpClient,private pagerService:PagerService,private userService:UserService) { }
  public total:number=0;
 
  private page_index:number;
  private pager:any;
 
  private totalPage:any;

  private loading:any=false;

  private complainantList:any;
  public mouldList:any;
  public detailsInfo:any={
    complainantPhone:"",
    respondentPhone:"",
    imgs:[],
  };
  public searchComplainantList:any={
    complainantPhone:"",
    respondentPhone:this.complainService.respondentPhone,
    reason:"",
    createTimeStart:"",
    createTimeEnd:"",
  }
  public warnInfo:any={
    titleId:"",
    mouldType:"",

    mouldImgs:[],
    pushType:"",
    pushDetails:"",
    reason:"",
    reportId:""
  }
  ngOnInit() {
    
    this.total=0;
    this.page_index=0;
   
    this.getComplainantList(1)
    var self=this;
  


  }
  resetSearchData(){
    this.complainService.respondentPhone=""
    this.searchComplainantList={
      complainantPhone:"",
      respondentPhone:"",
      reason:"",
      createTimeStart:"",
      createTimeEnd:"",
    }
  }
  getComplainantList(page:number=1){
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
    var createTimeStart=this.searchComplainantList.createTimeStart?this.searchComplainantList.createTimeStart+" 00:00:00":"";
    var createTimeEnd=this.searchComplainantList.createTimeEnd?this.searchComplainantList.createTimeEnd+" 23:59:59":"";
    if(createTimeStart==""&&createTimeEnd!=""){
      createTimeStart="1999-01-01 00:00:00"
    }else if(createTimeStart!=""&&createTimeEnd==""){
      createTimeEnd="2099-12-31 23:59:59"
    }

    var url="/report/list/?page="+Number(page)
    +"&phone="+this.searchComplainantList.complainantPhone
    +"&by_phone="+this.searchComplainantList.respondentPhone
    +"&report_type="+this.searchComplainantList.reason
    +"&created_time_from="+createTimeStart
    +"&created_time_end="+createTimeEnd
    +"&token="+localStorage.getItem("token")
    this.total=0;
    this.loading=true;
    
    return new Promise(()=>{
     
      this.http.get(environment.baseUrl+url).subscribe(
        (val:any)=>{
     
          setTimeout(() => {
            
            if(val.data.data_list_user.length==0){
              this.pager={}
              this.total=0
              
            }else{
              this.complainantList=val.data.data_list_user;
              this.page_index=val.data.page_index;
              this.total=val.data.total;
              this.totalPage=Math.ceil(this.total/10)
              this.pager=this.complainantList;
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
  openDetails(e){
    this.detailsInfo.complainantPhone=e.target.getAttribute("phone")
    this.detailsInfo.respondentPhone=e.target.getAttribute("byPhone")
   
    this.detailsInfo.detail=e.target.getAttribute("detail")
   
    this.detailsInfo.imgs=e.target.getAttribute("imgs").split(",")
   
    this.detailsInfo.createdTime=e.target.getAttribute("createdTime")
    switch (e.target.getAttribute("type")){
      case "1":
          this.detailsInfo.type="色情"
          break
      case "2":
        this.detailsInfo.type="辱骂"
        break
      case "3":
        this.detailsInfo.type="其他行为"
        break

      case "4":
        this.detailsInfo.type="广告"
        break
      case "5":
        this.detailsInfo.type="欺诈"
        break
      case "6":
        this.detailsInfo.type="违法行为（赌博、等）"
        break
    }
    
    this.getDetails()
    $('#detailsModal').modal('show')
    
   
  
    
   
  }
  getDetails(){
     
    return new Promise(()=>{
     var url="/report/details/?phone="+this.detailsInfo.complainantPhone+"&by_phone="+this.detailsInfo.respondentPhone+"&token="+localStorage.getItem("token")
      this.http.get(environment.baseUrl+url).subscribe(
          (val:any)=>{
         
            this.detailsInfo.respondentName=val.data.by_name
            this.detailsInfo.complainantName=val.data.nick_name
            this.detailsInfo.limit=val.data.limit==0?"正常":"已封号"
            this.detailsInfo.warn=val.data.warn
            this.detailsInfo.reportNum=val.data.report_num
            this.el.nativeElement.querySelector('.item').className="item active"
            // $('.carousel').carousel()
          },
          err=>{
    
          }
          
        )
  
      })

  }
  openWarn(e){
    this.getMouldList()
    this.warnInfo.reportId=e.target.getAttribute("reportId")
    this.warnInfo.pushDetails=[e.target.getAttribute("phone")]
    $("#warnModal").modal("show")
   
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
  pushWarn(){
  
    return new Promise(()=>{

       this.http.post(environment.baseUrl+"/push/manage/",{
         user_id:Number(localStorage.getItem("userId")),
         title_id:Number(this.warnInfo.titleId),
         push_type:"2",
         reason:"投诉警告",
         report_id:this.warnInfo.reportId,
         push_deatils:this.warnInfo.pushDetails,
         token:localStorage.getItem("token")
       }).subscribe(
           (val:any)=>{
        
             Swal.fire(
               {
                 title:val.msg,
                 showConfirmButton: false,
                 timer: 1500
               }
             )
             if(val.code==0){
               this.getComplainantList(this.page_index)
               $("#warnModal").modal("hide")
             }
           
            
           },
           err=>{
     
           }
           
         )
   
       })
 

  }
  searchRespondent(e){
   
    this.complainService.respondentPhone= e.target.getAttribute("byPhone")
    this.router.navigate(['/pages/usermanage/complain/respondent']);
  }
  setPage(page: number,get:number=1) {
   
    // get pager object from service
    var self=this;
    if(get==1){
      this.getComplainantList(page).then(
        (val:any)=>{
          
        
        self.pager = this.pagerService.getPager(val.data.total, page,10);
        }
      )
   
    }else{
   
      this.pager = self.pagerService.getPager(this.total,page,10);
    

    }
   
 
  }

}
