import { Component, OnInit ,ViewChild,ElementRef,Renderer2} from '@angular/core';
import { HttpClient,HttpHandler, HttpRequest,HttpParams } from '@angular/common/http';
import { environment} from '../../../../environments/environment'
import { PagerService}from 'src/app/services/pager.service'
import Swal from 'node_modules/sweetalert2/dist/sweetalert2'

declare var $:any;


@Component({
  selector: 'app-declaration-form',
  templateUrl: './declaration-form.component.html',
  styleUrls: ['./declaration-form.component.scss']
})
export class DeclarationFormComponent implements OnInit {

  @ViewChild("disagreeReason") disagreeReason:ElementRef;
 
  constructor(private renderer2:Renderer2,private http:HttpClient,private pagerService:PagerService,private elementRef:ElementRef) { }
  private declarationFormList:any;
  public total:number=0;
  private page_index:number;
  private totalPage:number;
 
  private pager:any={};
  private loading:any=false;

 
  public searchDeclarationFormInfo:any={
   
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
  public detailsInfo:any={
    phone:"",
    reason:"",
    description:"",
    createTime:"",
    status:"",
    codeImg:"",
    errorImg:"",
    disagree:"",
    reportId:""
  }
  ngOnInit() {
    
    this.total=0;
    this.page_index=0;
    this.totalPage=0;
 
   
  }
 
  
  searchDeclarationForm(page:number=1){
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
      var createTimeStart=this.searchDeclarationFormInfo.createTimeStart?this.searchDeclarationFormInfo.createTimeStart+" 00:00:00":"";
      var createTimeEnd=this.searchDeclarationFormInfo.createTimeEnd?this.searchDeclarationFormInfo.createTimeEnd+" 23:59:59":"";
      if(createTimeStart==""&&createTimeEnd!=""){
        createTimeStart="1999-01-01 00:00:00"
      }else if(createTimeStart!=""&&createTimeEnd==""){
        createTimeEnd="2099-12-31 23:59:59"
      }
      this.http.get(environment.baseUrl+"/device/report/?cell_phone="
      +"&check_status="+this.searchDeclarationFormInfo.status
      +"&time_from="+createTimeStart
      +"&time_to="+createTimeEnd
      +"&error_type="+this.searchDeclarationFormInfo.reason
      +"&page_index="+page
      +"&token="+localStorage.getItem("token")
      ).subscribe(
        (val:any)=>{
         
          setTimeout(() => {
            this.declarationFormList=val.data.list
         
         
               this.total=val.data.total;
               this.page_index=val.data.page_index;
               this.totalPage=Math.ceil( this.total/10);
               this.pager=this.declarationFormList;
               this.setPage( this.page_index,0)
   
            
          
             this.loading=false
          },500)
        
        },
        err=>{
  
        }
        
      )

    })
   
  }
 

  changeStatus(isPass){
    var checkStatus;
    if(isPass=="pass"){
      if(this.detailsInfo.status=="0"){
        checkStatus=1
      }else  if(this.detailsInfo.status=="1"){
        checkStatus=2
      }
    }else{
      if(this.detailsInfo.status=="0"){
        checkStatus=3
      }

    }
 
  
  
    return new Promise(()=>{
      var params = new HttpParams({
        fromString: "check_status=" + checkStatus
          +"&report_id="+this.detailsInfo.reportId
          + "&fail_reason=" + this.disagreeReason.nativeElement.value
          + "&manager_id=" +localStorage.getItem("userId")
          + "&token=" + localStorage.getItem("token")

      })
      this.http.put(environment.baseUrl+"/device/report/",params).subscribe(
          (val:any)=>{
            
            Swal.fire(
              {
                title:val.msg,
                showConfirmButton: false,
                timer: 1500
              }
            )
            if(val.code==0){
              $('#detailsModal').modal('hide')
              this.searchDeclarationForm( this.page_index)
            }
          
           
          },
          err=>{
    
          }
          
        )
  
      })
  }

  openDetails(e){
    console.log(e.target.getAttribute("errorImg"))
   
    var reason=e.target.getAttribute("reason")
     switch(reason){
      case "1":
        reason="扫码无效"
      break;
      case "2":
        reason="箱门未关闭"
      break;
      case "3":
        reason="设备停电"
      break;
      case "4":
        reason="设备被破坏"
      break;
      case "5":
        reason="其他"
      break;
      default:
        
     }
    
 
     var errorImgs=Array(e.target.getAttribute("errorImg").replace(/\["/g,"").replace(/\"]/g,""))
     console.log(errorImgs)
    this.detailsInfo={
      phone:e.target.getAttribute("phone"),
      reason:reason,
      description:e.target.getAttribute("description"),
      createTime:e.target.getAttribute("createTime"),
      status:e.target.getAttribute("status"),
      codeImg:e.target.getAttribute("codeImg").replace(/"/g,""),
      errorImg:errorImgs,
      disagree:"",
      reportId:e.target.getAttribute("reportId")
    }
      
    $('#detailsModal').modal('show')
    
  }
 
  setPage(page: number,get:number=1) {
   
    // get pager object from service
    var self=this;
    if(get==1){
      this.searchDeclarationForm(page).then(
        (val:any)=>{
          
         
        self.pager = this.pagerService.getPager(val.data.total, page,10);
        }
      )
   
    }else{
   
      this.pager = self.pagerService.getPager( this.total,page,10);
    

    }
   
 
  }

}
