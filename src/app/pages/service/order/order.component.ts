import { Component, OnInit ,ViewChild,ElementRef,Renderer2, } from '@angular/core';
import { HttpClient,HttpHandler, HttpRequest } from '@angular/common/http';
import { environment} from '../../../../environments/environment'
import { PagerService}from 'src/app/services/pager.service'
import Swal from 'node_modules/sweetalert2/dist/sweetalert2'

declare var $:any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  @ViewChild("disagreeReason") disagreeReason:ElementRef;
 
  constructor(private el:ElementRef,private renderer2:Renderer2,private http:HttpClient,private pagerService:PagerService,private elementRef:ElementRef) { }
  private userList:any=[];
  public total:number=0;
  private page_index:number;
  private totalPage:number;
 
  private pager:any={};
  private loading:any=false;

 
  public searchOrderInfo:any={
   
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
 
  
  searchUser(page:number=1){
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
     
      this.http.get(environment.baseUrl+"/garbage/audit/?cell_phone="+this.searchOrderInfo.phone
      +"&order_status="+this.searchOrderInfo.status
      +"&time_from="+this.searchOrderInfo.createTimeStart
      +"&time_to=" +this.searchOrderInfo.createTimeEnd
      +"&page_index="+page
      +"&token="+localStorage.getItem("token")
      ).subscribe(
        (val:any)=>{
         
          setTimeout(() => {
            this.userList=val.data.list
         
            localStorage.setItem("list", JSON.stringify(this.userList))
            
               this.total=val.data.total;
               this.page_index=val.data.page_index;
               this.totalPage=Math.ceil( this.total/10)
               this.pager=this.userList
               this.setPage( this.page_index,0)
   
            
          
             this.loading=false
          },500)
        
        },
        err=>{
  
        }
        
      )

    })
   
  }
 

  pass(type){
   
    return new Promise(()=>{
     var reason;
     if(this.disagreeReason){
      reason=this.disagreeReason.nativeElement.value;
     }
      this.http.post(environment.baseUrl+"/garbage/audit/",{
        type:String(type),
        order_id:this.currentDetails.order_id,
        reason:reason,
        manager_id:Number(localStorage.getItem("userId")),
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
              
              //this.searchUser( this.page_index)
              if(type==1){
                this.currentDetails.order_status=2
              }else if(type==2){
                this.currentDetails.order_status=3
              }
             
            }
          
           
          },
          err=>{
    
          }
          
        )
  
      })
  }

  openDetails(e){
    this.currentDetailsList=this.userList;
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
    this.el.nativeElement.querySelector('.item').className="item active"
  }
  setPage(page: number,get:number=1) {
   
    // get pager object from service
    var self=this;
    if(get==1){
      this.searchUser(page).then(
        (val:any)=>{
          
         
        self.pager = this.pagerService.getPager(val.data.total, page,10);
        }
      )
   
    }else{
   
      this.pager = self.pagerService.getPager( this.total,page,10);
    

    }
   
 
  }

}
