import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../../../environments/environment'
import { PagerService } from 'src/app/services/pager.service';

import Swal from 'node_modules/sweetalert2/dist/sweetalert2'
declare var $: any;
@Component({
  selector: 'app-village',
  templateUrl: './village.component.html',
  styleUrls: ['./village.component.scss']
})
export class VillageComponent implements OnInit {
 
  
  @ViewChild ("addVillageName") addVillageName:ElementRef;
  @ViewChild ("tipText") tipText:ElementRef;
  constructor(private el:ElementRef, private http:HttpClient,private pagerService:PagerService ) { }
  public total:number;
 
  public provinceList:any;
  public cityList:any;
  public districtList:any;
  public provinceId:any="";
  public districtId:any="";
  public cityId:any="";
  public villageName:any="";
  public villageList:any=[];
  private page_index:number;
  private pager:any;
  private totalPage:any;
  public addCityId:any;
  public addProvinceId:any;
  public addDistrictId:any;
  private loading:any=false;
  public searchVillageInfo:any={
    villageName:"",
    provinceId:"",
    cityId:"",
    districtId:"",
    type:""
  }
  public addVillageInfo:any={
    villageName:"",
    provinceId:"",
    cityId:"",
    districtId:"",
    type:""
  }
  ngOnInit() {
    this.getProvince()
    this.total=0;
  }
  openAddVillage(){
    this.tipText.nativeElement.innerText=""
    $('#addVillageModal').modal('show')
  }
  addVillage(){
    var tipText=this.tipText.nativeElement
   
    if(this.addVillageInfo.provinceId==""||this.addVillageInfo.provinceId==undefined){
      tipText.innerText="省不能为空！"
      return
    }
    if(this.addVillageInfo.cityId==""||this.addVillageInfo.cityId==undefined){
      tipText.innerText="市不能为空！"
      return
    }
    if(this.addVillageInfo.districtId==""||this.addVillageInfo.districtId==undefined){
      tipText.innerText="区不能为空！"
      return
    }
   
   if(this.addVillageInfo.villageName==""){
    tipText.innerText="小区名不能为空！"
    return
   }
   if(this.addVillageInfo.villageName.length>20){
    tipText.innerText="小区名需小于20位！"
    return
    }
    var self=this;
    return new Promise(()=>{
      var addVillageData={
        community:this.addVillageInfo.villageName,
        district_id:this.addVillageInfo.districtId,
        // type:"后台创建",
        token:localStorage.getItem("token")
      }
      this.http.post(environment.baseUrl+"/regions/community/?",addVillageData).subscribe(
        (val:any)=>{
          console.log(val) 
          if(val.code==0){
            Swal.fire(
              {
             
               title: val.msg,
               showConfirmButton: false,
               timer: 1500
              }
             )
          }
       
      
          $('#addVillageModal').modal('hide')
        },
        err=>{
  
        }
        
      )
 
     })
  }
  getVillageList(page:any=1){
    var self=this;
  
    // if((this.searchVillageInfo.villageName=="")&&(this.searchVillageInfo.provinceId=="")){
     
    //   Swal.fire(
    //     {
       
    //      title: "小区名或省不能为空！",
    //      showConfirmButton: false,
    //      timer: 1500
    //     }
    //    )
    //   return
    // }
    this.total=0;
    this.loading=true;
    return new Promise(()=>{
      var getVillageListData={
        page_index:page,
        community:this.searchVillageInfo.villageName,
        district_id:this.searchVillageInfo.districtId,
        city_id:this.searchVillageInfo.cityId,
        region_id:this.searchVillageInfo.provinceId,
        type:this.searchVillageInfo.type,
        token:localStorage.getItem("token")
      }
    
      this.http.get(environment.baseUrl+"/regions/community/?page_index="+getVillageListData.page_index
      +"&community="+getVillageListData.community
      +"&district_id="+getVillageListData.district_id
      +"&city_id="+getVillageListData.city_id
      +"&region_id="+getVillageListData.region_id
      +"&type="+getVillageListData.type
      +"&token="+getVillageListData.token
      ).subscribe(
        (val:any)=>{
         setTimeout(() => {
          if(val.data.list.length==0){
            this.pager={}
            this.total=0
            // return
          }else{
            this.villageList=val.data.list;
            this.page_index=val.data.page_index;
            this.total=val.data.total;
            this.totalPage=Math.ceil(this.total/10)
            this.pager=this.villageList;
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
  getProvince(){
   
    this.searchVillageInfo.cityId=""
    this.searchVillageInfo.districtId=""
    return new Promise(()=>{
     
      this.http.get(environment.baseUrl+"/regions/").subscribe(
        (val:any)=>{
          console.log(val) 
          this.provinceList=val.data.list
         
       
        },
        err=>{
  
        }
        
      )
 
     })
  }
  getCity(dataType:string=""){
    
    var provinceId=this.searchVillageInfo.provinceId;
    if(dataType=="add"){
      provinceId=this.addVillageInfo.provinceId;
    }
    return new Promise(()=>{
     
      this.http.get(environment.baseUrl+"/regions/?areas="+provinceId).subscribe(
        (val:any)=>{
          console.log(val) 
        
          this.cityList=val.data.list
          this.districtList=[]

        },
        err=>{
  
        }
        
      )
 
     })

  }
  getDistrict(dataType:string=""){
    var cityId=this.searchVillageInfo.cityId;
    if(dataType=="add"){
      cityId=this.addVillageInfo.cityId;
    }
    return new Promise(()=>{
     
      this.http.get(environment.baseUrl+"/regions/?areas="+cityId).subscribe(
        (val:any)=>{
          console.log(val) 
        
          this.districtList=val.data.list
        

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
      this.getVillageList(page).then(
        (val:any)=>{
          
        
        self.pager = this.pagerService.getPager(val.data.total, page,10);
        }
      )
   
    }else{
   
      this.pager = self.pagerService.getPager(this.total,page,10);
    

    }
   
 
  }

}
