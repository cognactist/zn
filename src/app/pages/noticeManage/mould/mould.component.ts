import { Component, OnInit ,ViewChild,ElementRef, COMPILER_OPTIONS} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment} from '../../../../environments/environment'
import { PagerService } from 'src/app/services/pager.service';
import { UserService } from 'src/app/services/user.service'
import Swal from 'node_modules/sweetalert2/dist/sweetalert2'
import { FormControl } from '@angular/forms';
// var qiniu = require('qiniu-js')

import * as qiniu from 'qiniu-js'
declare var Qiniu: any;
declare var plupload: any;
declare var $:any;
@Component({
  selector: 'app-mould',
  templateUrl: './mould.component.html',
  styleUrls: ['./mould.component.scss']
})
export class MouldComponent implements OnInit {

  @ViewChild("createUserTip") createUserTip:ElementRef;
  @ViewChild("upload") upload:ElementRef;
  constructor(private http:HttpClient,private pagerService:PagerService,private userService:UserService) { }
  public total:number=0;
 
  private page_index:number;
  private pager:any;
 
  private totalPage:any;

  private loading:any=false;
  public searchMouldName:string="";
  public searchMouldType:string="";
  public mouldList:any;
  
  public addMouldInfo:any={
    mouldType:"",
    mouldName:" ",
    details:"",
    imgs:[],
  };
  public checkMouldInfo:any={
    mouldType:"",
    mouldName:" ",
    details:"",
    imgs:[],
    mouldStatus:""
  };
  public changeMouldInfo:any={
    mouldType:"",
    mouldName:" ",
    details:"",
    imgs:[],
  };
  ngOnInit() {
    
    this.total=0;
    this.page_index=0;
   
    this.getMouldList(1)
    var self=this;
  
    $('#addMouldModal').on('show.bs.modal', function (e) {

     self.addMouldInfo={
      mouldType:"",
      mouldName:" ",
      details:"",
      imgs:[],
    };
    if(this.upload){
      this.upload.nativeElement.value=""
    }
   

      
    })


  }
  addMould(){
    var self=this;
    if(this.addMouldInfo.mouldType==1){
      this.addMouldInfo.imgs=[]
    }
    return new Promise(()=>{
     var addMouldData={
      type_id:this.addMouldInfo.mouldType,
      title_name:this.addMouldInfo.mouldName,
      details:this.addMouldInfo.details,
      is_files:this.addMouldInfo.imgs,
      user_id:Number(localStorage.getItem("userId")),
      token:localStorage.getItem("token")
     }
   
      this.http.post(environment.baseUrl+"/template/manage/?",addMouldData).subscribe(
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
      
          self.getMouldList()
          $('#addMouldModal').modal('hide')
         }
          
         
           
         

        },
        err=>{
  
        }
        
      )

    })
  }
  
  uploadImgs(dataType,fileUrl,file,key,token){
   
    var putExtra = {
      fname:file.name,
      params: {},
      mimeType: null
    };
    var config = {
      useCdnDomain: true,
      region: null
    };
   
    var observable = qiniu.upload(file, key, token, putExtra, config)
    var subscription = observable.subscribe(
     (v)=>{
    
      if(v.total.percent==100){
       
      
        if(dataType=="add"){
           this.addMouldInfo.imgs.push(fileUrl)
        }else if(dataType=="change"){
          this.changeMouldInfo.imgs.push(fileUrl)
        }
        
      }
     },
     (err)=>{
      
     },
     (c)=>{
  
   
      
     }
    )
   
    
  }
  onchangeUploadImg(e,dataType){
   
    var imgfiles=e.target.files
    if(imgfiles.length>3){
      Swal.fire(
        {
        
         title: "图片个数不能超过3张！",
         showConfirmButton: false,
         timer: 1500
        }
       )
      
       return 
    }
   var self=this;
    return new Promise(()=>{
    this.http.post(environment.baseUrl+"/image/manage/",{
      user_id:localStorage.getItem("userId"),
      is_file:String(imgfiles.length),
      token:localStorage.getItem("token")
    }).subscribe(
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
             
            if(imgfiles.length!=0){
             
                if(dataType=="add"){
                  
                  this.uploadImgs(dataType,val.data[0].file_url,imgfiles[0],val.data[0].key,val.data[0].token)
             
                }else if(dataType=="change"){
                  this.uploadImgs(dataType,val.data[0].file_url,imgfiles[0],val.data[0].key,val.data[0].token)
                 
                }
                
         
            }
            
           
          }
         
          
         
         
        },
        err=>{
  
        }
        
      )

    })

  }
      // 上传添加时的轮播图
  //   uploadBanner(): void {
  //     const _this = this;
  //     _this.uploadProgress = 0;
  //     _this.bannerUrl = '';
  //     const optionImg = {
  //         runtimes: 'html5,flash,html4',      // 上传模式，依次退化
  //         browse_button: 'uploadbanner',      // 上传选择的点选按钮，必需
  //         // 在初始化时，uptoken，uptoken_url，uptoken_func三个参数中必须有一个被设置
  //         // 切如果提供了多个，其优先级为uptoken > uptoken_url > uptoken_func
  //         // 其中uptoken是直接提供上传凭证，uptoken_url是提供了获取上传凭证的地址，如果需要定制获取uptoken的过程则可以设置uptoken_func
  //         // uptoken : '', // uptoken是上传凭证，由其他程序生成
  //         // uptoken_url: '//cloud-api.changhong.io',         // Ajax请求uptoken的Url，强烈建议设置（服务端提供）
  //         uptoken_func: function(file) {    // 在需要获取uptoken时，该方法会被调用
  //             // _this.uploadProgress = 0;
  //             return _this.uptoken;
  //         },
  //         get_new_uptoken: true,             // 设置上传文件的时候是否每次都重新获取新的uptoken
  //         // downtoken_url: '/downtoken',
  //         // Ajax请求downToken的Url，私有空间时使用，JS-SDK将向该地址POST文件的key和domain，服务端返回的JSON必须包含url字段，url值为该文件的下载地址
  //         // unique_names: true,              // 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
  //         // save_key: true,                  // 默认false。若在服务端生成uptoken的上传策略中指定了sava_key，则开启，SDK在前端将不对key进行任何处理
  //         domain: 'http://pqe96fvpl.bkt.clouddn.com',     // bucket域名，下载资源时用到，必需
  //         //container: 'container',             // 上传区域DOM ID，默认是browser_button的父元素
  //         max_file_size: '100mb',             // 最大文件体积限制
  //         flash_swf_url: 'https://cdn.bootcss.com/plupload/2.1.9/Moxie.swf',  // 引入flash，相对路径
  //         max_retries: 3,                     // 上传失败最大重试次数
  //         //dragdrop: true,                     // 开启可拖曳上传
  //         //drop_element: 'container',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
  //         chunk_size: '4mb',                  // 分块上传时，每块的体积
  //         auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
  //         init: {
  //           'FilesAdded': function(up, files) {
  //             plupload.each(files, function(file) {
  //             if (file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png') {
  //                 _this.uploadProgress = 0;
  //             } else {
  //                 _this.nzMessageService.success('仅支持类型为.jpg,.png的文件');
  //                 up.removeFile(file);
  //                 return false;
  //             }});
  //           },
  //           'BeforeUpload': function(up, file) {
  //             // 每个文件上传前，处理相关的事情
  //           },
  //           'UploadProgress': function(up, file) {
  //             // 每个文件上传时，处理相关的事情
  //             _this.uploadProgress = file.percent;
  //           },
  //           'FileUploaded': function (up, file, info) {
  //             // 每个文件上传成功后，处理相关的事情
  //             // 其中info是文件上传成功后，服务端返回的json，形式如：
  //             // {
  //             //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
  //             //    "key": "gogopher.jpg"
  //             //  }
  //             // 查看简单反馈
  //             const domain = up.getOption('domain');
  //             const res = JSON.parse(info.response);
  //             const sourceLink = domain + '/' + res.key; // 获取上传成功后的文件的Url
  //             _this.bannerUrl = sourceLink;
  //           },
  //           'Error': function (up, err, errTip) {
  //             // 上传出错时，处理相关的事情
  //             // swal('', errTip, 'error');
  //           },
  //           'Key': function (up, file) {
  //             // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
  //             // 该配置必须要在unique_names: false，save_key: false时才生效
  //             const key = 'portal/banners/' + file.name;
  //             // do something with key here
  //             return key;
  //           }
  //             // 'UploadComplete': function() {
  //             // 队列文件处理完毕后，处理相关的事情
  //             // },
  //             // 'Key': function(up, file) {
  //             // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
  //             //该配置必须要在unique_names: false，save_key: false时才生效
  //             //
  //             //var key = "";
  //             //do something with key here
  //             //return key
  //             // }
  //         }
  //       };
  //     this.uploaderAdd = Qiniu.uploader(optionImg);
  // }
  getMouldList(page:number=1){
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
    var url="/template/getall/?page="+page
    +"&title_name="+this.searchMouldName
    +"&type_id="+this.searchMouldType
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
              this.mouldList=val.data.data_list;
              this.page_index=val.data.page_index;
              this.total=val.data.total;
              this.totalPage=Math.ceil(this.total/10)
              this.pager=this.mouldList;
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
  // getMould(e){
   
  //  console.log(e.target)
    // var self=this;
    // var url="/template/manage/?title_id="+e.target.getAttribute("titleId")
    // +"&token="+localStorage.getItem("token")  
    // return new Promise(()=>{
    // this.http.post(environment.baseUrl+url,{
    //   title_id:e.target.getAttribute("titleId"),
    //   token:localStorage.getItem("token")
    // }).subscribe(
    //     (val:any)=>{
    //       console.log(val)
          
         
         
    //     },
    //     err=>{
  
    //     }
        
    //   )

    // })
  // }
  openCheckMould(e){

    var mouldStatus=e.target.getAttribute("status")
   
    switch (mouldStatus){
      case "1":
          mouldStatus="生效中"
      break;
      case "0":
          mouldStatus="审核中"
      break;
      case "2":
          mouldStatus="审核失败"
      break;
      default:
          mouldStatus="错误的模板"
    }
    this.checkMouldInfo={
      mouldType:e.target.getAttribute("titleId"),
      mouldName:e.target.getAttribute("mouldName"),
      details:e.target.getAttribute("details"),
      imgs:e.target.getAttribute("imgs").split(","),
      mouldStatus:mouldStatus
    }
   

    $('#checkMouldModal').modal('show')
  }
  openChangeMould(e){

    var imgs=e.target.getAttribute("imgs").split(",")===''?[]:e.target.getAttribute("imgs").split(",")
    this.changeMouldInfo={
      mouldType:e.target.getAttribute("typeId"),
      titleId:e.target.getAttribute("titleId"),
      mouldName:e.target.getAttribute("mouldName"),
      details:e.target.getAttribute("details"),
      imgs:imgs,
    }


    $('#changeMouldModal').modal('show')
  }
  changeMould(){
   
    var self=this;
    var token=localStorage.getItem("token")
   
    var imgsList=this.changeMouldInfo.imgs
    for(var i=0;i<imgsList.length;i++){
      imgsList[i]='"'+imgsList[i]+'"'
    }
  
    var params=new HttpParams({
      fromString:"title_id="+this.changeMouldInfo.titleId
      +"&title_name="+this.changeMouldInfo.mouldName
      +"&details="+this.changeMouldInfo.details
      +"&files_url="+"["+imgsList+"]"
      +"&user_id="+Number(localStorage.getItem("userId"))
      +"&token="+token
    })
    
    return new Promise(()=>{
    this.http.put(environment.baseUrl+"/template/manage/",params,{
     headers: { 
       "Content-Type":"application/x-www-form-urlencoded" 
      }
    }
    ).subscribe(
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
            this.getMouldList()
            $('#changeMouldModal').modal('hide')
          }
        },
        err=>{
  
        }
        
      )

    })
  }
  deleteMould(e){
    
    var url="/template/manage/?title_id="+e.target.getAttribute("titleId")
    +"&token="+localStorage.getItem("token")

    return new Promise(()=>{
    this.http.delete(environment.baseUrl+url,{
      headers: { "Content-Type":"application/x-www-form-urlencoded" }
    }
    ).subscribe(
        (val:any)=>{
          Swal.fire(
            {
            
             title: val.msg,
             showConfirmButton: false,
             timer: 1500
            }
           )
        
          if(val.code==0){
            this.getMouldList()
            $('#deleteMouldModal').modal('hide')
          }
  
        },
        err=>{
  
        }
        
      )

    })
  }
  deleteImg(e,type){
   
    var imgIndex=Number(e.target.getAttribute("imgIndex"))
    if(type=="add"){
      this.addMouldInfo.imgs.splice(imgIndex,1)
    }else if(type=="change"){
      this.changeMouldInfo.imgs.splice(imgIndex,1)

    }
    
  }
  
  setPage(page: number,get:number=1) {
   
    // get pager object from service
    var self=this;
    if(get==1){
      this.getMouldList(page).then(
        (val:any)=>{
          
        
        self.pager = this.pagerService.getPager(val.data.total, page,10);
        }
      )
   
    }else{
   
      this.pager = self.pagerService.getPager(this.total,page,10);
    

    }
   
 
  }
  

}
