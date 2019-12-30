import { Component, OnInit ,ViewChild,ElementRef,Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../../../../environments/environment'
import { PagerService } from 'src/app/services/pager.service';
import { UserService } from 'src/app/services/user.service'
import Swal from 'node_modules/sweetalert2/dist/sweetalert2'
import { FormControl } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ComplainService} from 'src/app/services/complain.service'
import { from } from 'rxjs';
declare var $:any;
@Component({
  selector: 'app-respondent',
  templateUrl: './respondent.component.html',
  styleUrls: ['./respondent.component.scss']
})
export class RespondentComponent implements OnInit {

  @ViewChild("createUserTip") createUserTip:ElementRef;
 
  constructor(public complainService:ComplainService,private router:Router,private http:HttpClient,private pagerService:PagerService,private userService:UserService) { }
  public total:number=0;
 
  private page_index:number;
  private pager:any;
 
  private totalPage:any;

  private loading:any=false;
  private searchMouldName:string="";
  private searchMouldType:string="";

  private respondentList:any;
  
  public addMouldInfo:any={
    mouldType:"",
    mouldName:" ",
    details:"",
    imgs:[],
  };
  public searchRespondentInfo:any={
    respondentPhone:this.complainService.respondentPhone,
    timesStart:"",
    timesEnd:"",
    limit:"",

  }
  ngOnInit() {
    
    this.total=0;
    this.page_index=0;
   
    this.getRespondentList(1)
    var self=this;
  
   

  }
  resetSearchData(){
    this.complainService.respondentPhone=""
    this.searchRespondentInfo={
      respondentPhone:"",
      timesStart:"",
      timesEnd:"",
      limit:"",
  
    }
  }
  getRespondentList(page:number=1){
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
  //  if(this.searchRespondentInfo.respondentPhone==""&&this.searchRespondentInfo.timesStart==""&&this.searchRespondentInfo.timesEnd==""&&this.searchRespondentInfo.limit==""){
   
  //   Swal.fire(
  //     {
      
  //      title: "请输入查询内容！",
  //      showConfirmButton: false,
  //      timer: 1500
  //     }
  //    )
  //    return
  //  }
  
    var self=this;
    var createTimeStart=this.searchRespondentInfo.createTimeStart?this.searchRespondentInfo.createTimeStart+" 00:00:00":"";
    var createTimeEnd=this.searchRespondentInfo.createTimeEnd?this.searchRespondentInfo.createTimeEnd+" 23:59:59":"";
    var url="/report/sumlist/?page="+page
    +"&by_phone="+this.searchRespondentInfo.respondentPhone
    +"&report_num_start="+this.searchRespondentInfo.timesStart
    +"&report_num_end="+this.searchRespondentInfo.timesEnd
    +"&limit="+this.searchRespondentInfo.limit
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
              this.respondentList=val.data.data_list;
              this.page_index=val.data.page_index;
              this.total=val.data.total;
              this.totalPage=Math.ceil(this.total/10)
              this.pager=this.respondentList;
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
 
  getDetails(e){
    this.complainService.respondentPhone=e.target.getAttribute("respondentPhone");
    this.router.navigate(['/pages/usermanage/complain/complainant']);

  }
  setPage(page: number,get:number=1) {
   
    // get pager object from service
    var self=this;
    if(get==1){
      this.getRespondentList(page).then(
        (val:any)=>{
          
        
        self.pager = this.pagerService.getPager(val.data.total, page,10);
        }
      )
   
    }else{
   
      this.pager = self.pagerService.getPager(this.total,page,10);
    

    }
   
 
  }

}
