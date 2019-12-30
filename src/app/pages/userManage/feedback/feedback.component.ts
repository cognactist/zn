import { Component, OnInit, ViewChild ,ElementRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../../../environments/environment'
import { PagerService } from 'src/app/services/pager.service';
import { FormsModule }   from '@angular/forms';
declare var $:any;
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  constructor(private http:HttpClient,private pagerService:PagerService) { }
  public total:number=0;
  private feedbackList:any;
  private page_index:any=1;
  private pager:any={};
  private totalPage:any;
  public userDetail:object={};
  private userDetailPhone:any;
  private userDetailNickName:any;
  private userDetailFeedbackImages:any;
  private userDetailFeedbackDetail:any;
  private userDetailCreatedTime:any;
  private loading:any=false;
  @ViewChild ("userPhone") userPhone:ElementRef;
  @ViewChild ("createdTimeStart") createdTimeStart:ElementRef;
  @ViewChild ("createdTimeEnd") createdTimeEnd:ElementRef;
  ngOnInit() {
    this.getFeedbackList()
    var self=this;
   
  }

  getFeedbackList(page:number=1){
      this.total=0;
      this.loading=true;
      return new Promise(()=>{
        var getFeedbackListData={
          token:localStorage.getItem("token"),
          phone:this.userPhone.nativeElement.value,
          created_time_from:this.createdTimeStart.nativeElement.value?this.createdTimeStart.nativeElement.value+" 00:00:00":"",
          created_time_end:this.createdTimeEnd.nativeElement.value?this.createdTimeEnd.nativeElement.value+" 23:59:59":"",
          page:page
        }
        this.http.get(environment.baseUrl+"/feedback/search/?phone="
        +getFeedbackListData.phone+"&created_time_from="
        +getFeedbackListData.created_time_from+"&created_time_end="
        +getFeedbackListData.created_time_end+"&page="
        +getFeedbackListData.page+"&token="
        +getFeedbackListData.token).subscribe(
          (val:any)=>{
            setTimeout(() => {
              console.log(val)
              if(val.data.data_list_user.length==0){
                this.pager={}
                this.total=0
              }else{
                this.feedbackList=val.data.data_list_user;
                this.total=val.data.total;
                this.page_index=val.data.page_index;
                this.pager=this.feedbackList;
                this.totalPage=Math.ceil(this.total/10)
                this.setPage(this.page_index,0)
  
              }
             
             

              this.loading=false
            }, 500);
         
          
         
          },
          err=>{
    
          }
          
        )
  
      })
     
    }
  show(e){
  
    this.userDetail={
      phone:e.target.getAttribute("phone"),
      nickName:e.target.getAttribute("nickName"),
      feedbackImages:e.target.getAttribute("feedbackImages"),
      feedbackDetail:e.target.getAttribute("feedbackDetail"),
      createdTime:e.target.getAttribute("createdTime")
    }
   
    $('#userDetailModal').modal('show')
  
   
  
  }
  setPage(page: number,get:number=1) {
  
    // get pager object from service
    var self=this;
    if(get==1){
      this.getFeedbackList(page).then(
        (val:any)=>{
          
        
        self.pager = this.pagerService.getPager(val.data.total, page,10);
        }
      )
    
    }else{
    
      this.pager = self.pagerService.getPager(this.total,page,10);
    

    }
    
  
  }
}
