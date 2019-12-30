import { Component, OnInit ,ViewChild,ElementRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../../../environments/environment'
import { PagerService } from 'src/app/services/pager.service';
import { UserService } from 'src/app/services/user.service'
import Swal from 'node_modules/sweetalert2/dist/sweetalert2'
import { FormControl } from '@angular/forms';

declare var $:any;
@Component({
  selector: 'app-apply-village',
  templateUrl: './apply-village.component.html',
  styleUrls: ['./apply-village.component.scss']
})
export class ApplyVillageComponent implements OnInit {

  @ViewChild("createUserTip") createUserTip:ElementRef;

  constructor(private http:HttpClient,private pagerService:PagerService,private userService:UserService) { }
  public total:number=0;
 
  private page_index:number;
  private pager:any;
 
  private totalPage:any;

  private loading:any=false;
  public searchMouldName:string="";
  public searchMouldType:string="";
  private applyVillageList:any;
  
  public addMouldInfo:any={
    mouldType:"",
    mouldName:" ",
    details:"",
    imgs:[],
  };
  public searchApplyVillage:any={
    applyPhone:"",
    status:"",
    createTimeStart:"",
    createTimeEnd:"",
    community:"",

  }
  ngOnInit() {
    
    this.total=0;
    this.page_index=0;
   
    this.getApplyVillageList(1)
    var self=this;
  
    $('#createUserModal').on('show.bs.modal', function (e) {
    
      self.createUserTip.nativeElement.innerText=""

      
    })


  }
 
  getApplyVillageList(page:number=1){
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
    var createTimeStart=this.searchApplyVillage.createTimeStart?this.searchApplyVillage.createTimeStart+" 00:00:00":"";
    var createTimeEnd=this.searchApplyVillage.createTimeEnd?this.searchApplyVillage.createTimeEnd+" 23:59:59":"";
    var url="/regions/community/apply/?page_index="+page
    +"&community="+this.searchApplyVillage.community
    +"&status="+this.searchApplyVillage.status
    +"&cell_phone="+this.searchApplyVillage.applyPhone
    +"&time_from="+createTimeStart
    +"&time_to="+createTimeEnd
    +"&token="+localStorage.getItem("token")
    this.total=0;
    this.loading=true;
    
    return new Promise(()=>{
     
      this.http.get(environment.baseUrl+url).subscribe(
        (val:any)=>{
          console.log(val)
          setTimeout(() => {
            
            if(val.data.list.length==0){
              this.pager={}
              this.total=0
              
            }else{
              this.applyVillageList=val.data.list;
              this.page_index=val.data.page_index;
              this.total=val.data.total;
              this.totalPage=Math.ceil(this.total/10)
              this.pager=this.applyVillageList;
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
 
  changeStatus(e,status){
     
    return new Promise(()=>{
     
      this.http.post(environment.baseUrl+"/regions/community/apply/",{
        manager_id:localStorage.getItem("userId"),
        apply_id:e.target.getAttribute("applyId"),
        status:status==1?"审核通过":"审核不通过",
        token:localStorage.getItem("token")
      }).subscribe(
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
              this.getApplyVillageList(this.page_index)
            }
          
           
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
      this.getApplyVillageList(page).then(
        (val:any)=>{
          
        
        self.pager = this.pagerService.getPager(val.data.total, page,10);
        }
      )
   
    }else{
   
      this.pager = self.pagerService.getPager(this.total,page,10);
    

    }
   
 
  }
}
