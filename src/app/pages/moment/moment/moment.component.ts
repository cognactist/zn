import { Component, OnInit ,ViewChild,ElementRef,Renderer2} from '@angular/core';
import { HttpClient,HttpHandler, HttpRequest } from '@angular/common/http';
import { environment} from '../../../../environments/environment'
import { PagerService}from 'src/app/services/pager.service'
import Swal from 'node_modules/sweetalert2/dist/sweetalert2'
import { e } from '@angular/core/src/render3';

declare var $:any;

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.scss']
})
export class MomentComponent implements OnInit {

  @ViewChild("disagreeReason") disagreeReason:ElementRef;
 
  constructor(private renderer2:Renderer2,private http:HttpClient,private pagerService:PagerService,private elementRef:ElementRef) { }
  private momentList:any=[];
  public total:number=0;
  private page_index:number;
  private totalPage:number;
 
  private pager:any={};
  private loading:any=false;

 
  public searchMomentInfo:any={
   
    phone:"",
    status:"",
    createTimeStart:"",
    createTimeEnd:"",
    reason:""
  }
  public forbidInfo:any={
    forbidPhone:"",
    forbidReason:"",
    
  }
  public forbidReason:any="";
  private forbidDisabled:boolean=true;
 
  public currentDetailsList:Array<any>=[];
  public currentDetailsIndex:any=1;
  public currentDetails:any;
  ngOnInit() {
    
    this.total=0;
    this.page_index=0;
    this.totalPage=0;
 
   
  }
 
  
  searchMoment(page:number=1){
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
   // this.clearPage()
   this.total=0;
    this.loading=true;
    return new Promise(()=>{
     
      this.http.get(environment.baseUrl+"/dynamic/audit/?cell_phone="+this.searchMomentInfo.phone
      +"&is_audit="+this.searchMomentInfo.status
      +"&time_from="+this.searchMomentInfo.createTimeStart
      +"&time_to="+this.searchMomentInfo.createTimeEnd
      +"&page_index="+page
      +"&token="+localStorage.getItem("token")
      ).subscribe(
        (val:any)=>{
         
          setTimeout(() => {
            this.momentList=val.data.list
            
               this.total=val.data.total;
               this.page_index=val.data.page_index;
               this.totalPage=Math.ceil( this.total/10)
               this.pager=this.momentList;
               this.setPage( this.page_index,0)
   
            
          
             this.loading=false
          },500)
        
        },
        err=>{
  
        }
        
      )

    })
   
  }
 
  openForbid(){
    this.forbidInfo={
      forbidPhone:"",
      forbidReason:"",
    }
    // this.forbidTip.nativeElement.innerText=""
    $("#forbidModal").modal("show")
  }
  verify(type){
   
    return new Promise(()=>{
      var failReason;
      if(this.disagreeReason){
        failReason=this.disagreeReason.nativeElement.value
      }else{
        failReason=""
      }
      this.http.post(environment.baseUrl+"/dynamic/audit/",{
        type:String(type),
        reason:failReason,
        dynamic_id:this.currentDetails.dynamic_id,
        manager_id:localStorage.getItem("userId"),
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
             // $("#detailsModal").modal("hide")
          
             // this.searchMoment( this.page_index)
             switch (type){
               case 1:
                  type=1;
                  this.currentDetailsList[this.currentDetailsIndex].check_time=val.data.time
               break;
               case 2:
                  type=2;
                  this.currentDetails.fail_reason=failReason;
                  this.currentDetailsList[this.currentDetailsIndex].check_time=val.data.time
                break;
                case 3:
                  type=2
                  this.currentDetails.fail_reason=failReason;
                  this.currentDetailsList[this.currentDetailsIndex].force_time=val.data.time
                break;
                case 4:
                  type=1;
                  this.currentDetailsList[this.currentDetailsIndex].force_time=val.data.time
                break;
                default:

             }
             this.currentDetails.is_audit=type;
            
            // this.currentDetailsList[this.currentDetailsIndex]=this.currentDetails;
            
             
            }
          
           
          },
          err=>{
    
          }
          
        )
  
      })
  }
  showForbidReason(e){
 //  this.forbidTip.nativeElement.innerText=""
   this.forbidInfo.forbidReason=""
   this.forbidInfo.forbidReasonLength=0
    $('#forbidReasonModal').modal('show')
    
   this.elementRef.nativeElement.querySelector("#forbidReasonDetail").innerText=e.target.getAttribute("reason")
  
   
  }
  openDetails(e){
    this.currentDetailsList=this.momentList;
    this.currentDetailsIndex=e.target.getAttribute("detailsIndex");
    this.currentDetails=this.currentDetailsList[this.currentDetailsIndex]
    $('#detailsModal').modal('show')
    
  }
  changeDetails(change){
    console.log("change-------"+this.currentDetailsIndex)
    if(change=="pre"&&this.currentDetailsIndex<=0){
    
      Swal.fire(
        {
          title:"已经是第一条了！",
          showConfirmButton: false,
          timer: 1500
        }
      )
      return
    }else if(change=="next"&&this.currentDetailsIndex>=this.currentDetailsList.length-1){
    
      Swal.fire(
        {
          title:"已经是最后一条了！",
          showConfirmButton: false,
          timer: 1500
        }
      )
      return
    }
    if(change=="pre"){
      this.currentDetails=this.currentDetailsList[--this.currentDetailsIndex]
    }else if(change=="next"){
      this.currentDetails=this.currentDetailsList[++this.currentDetailsIndex]
    }

  }
  setPage(page: number,get:number=1) {
   
    // get pager object from service
    var self=this;
    if(get==1){
      this.searchMoment(page).then(
        (val:any)=>{
          
         
        self.pager = this.pagerService.getPager(val.data.total, page,10);
        }
      )
   
    }else{
   
      this.pager = self.pagerService.getPager( this.total,page,10);
    

    }
   
 
  }

}
