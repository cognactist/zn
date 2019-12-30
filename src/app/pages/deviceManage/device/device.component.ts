import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'
import { PagerService } from 'src/app/services/pager.service';

import Swal from 'node_modules/sweetalert2/dist/sweetalert2'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
declare var $: any;

declare let BMap: any;
@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {

  @ViewChild("addVillageName") addVillageName: ElementRef;
  @ViewChild("tipText") tipText: ElementRef;
  constructor(private el: ElementRef, private http: HttpClient, private pagerService: PagerService) { }
  public total: number;

  public provinceList: any;
  public cityList: any;
  public districtList: any;
  public provinceId: any = "";
  public districtId: any = "";
  public cityId: any = "";
  public villageName: any = "";
  public deviceList: any = [];
  private page_index: number;
  private pager: any;
  private totalPage: any;
  public addCityId: any;
  public addProvinceId: any;
  public addDistrictId: any;
  private loading: any = false;
  public searchDeviceInfo: any = {
    numbers: "",
    provinceId: "",
    cityId: "",
    districtId: "",
    address: "",

  }
  public addDeviceInfo: any = {
    numbers: "",
    provinceId: "",
    cityId: "",
    districtId: "",
    community_id:"",
    address_info: "",
    longitude: null,
    latitude:null,
    ptAddress:""
  }
  public deviceDetailsInfo: any;
  public communityList:any;
  ngOnInit() {
    this.getProvince()
    this.total = 0;
    // var self = this;
    // $('#mapModal').on('hidden.bs.modal', function (e) {
    //   self.cancelLongitudeAndLatitude()
    // })
  }
  openDetails(e) {
    console.log(e)

    this.deviceDetailsInfo = {
      numbers: e.target.getAttribute("server_id"),
      province: e.target.getAttribute("region"),
      city: e.target.getAttribute("city"),
      district: e.target.getAttribute("district"),
      address: e.target.getAttribute("address"),
      status:e.target.getAttribute("server_status")==0?"正常":"异常",
      organic:e.target.getAttribute("organic"),
      residual:e.target.getAttribute("residual"),
      recyclable:e.target.getAttribute("recyclable"),
      hazardous:e.target.getAttribute("hazardous"),
    }
    console.log( e.target.attributes)
   $('#changeNameModal').modal('show')

  }
  openAddDevice() {
    this.tipText.nativeElement.innerText = ""
    $('#addDeviceModal').modal('show')

    
  }
  addDevice() {
    var tipText = this.tipText.nativeElement

    if (this.addDeviceInfo.provinceId == "" || this.addDeviceInfo.provinceId == undefined) {
      tipText.innerText = "省不能为空！"
      return
    }
    if (this.addDeviceInfo.cityId == "" || this.addDeviceInfo.cityId == undefined) {
      tipText.innerText = "市不能为空！"
      return
    }
    if (this.addDeviceInfo.districtId == "" || this.addDeviceInfo.districtId == undefined) {
      tipText.innerText = "区不能为空！"
      return
    }

    var self = this;
    return new Promise(() => {
      var addDeviceData = {
        community_id: Number(this.addDeviceInfo.community_id),
        address_info: this.addDeviceInfo.address_info,
        server_id:this.addDeviceInfo.numbers,
        longitude:this.addDeviceInfo.longitude,
        latitude:this.addDeviceInfo.latitude,
        token: localStorage.getItem("token")
      }
      this.http.post(environment.baseUrl + "/device/", addDeviceData).subscribe(
        (val: any) => {
          console.log(val)
          if (val.code == 0) {
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
        err => {

        }

      )

    })
  }
  getDeviceList(page: any = 1) {
    var self = this;


    this.total = 0;
    this.loading = true;
    return new Promise(() => {
      var getVillageListData = {
        page_index: page,
        serverId: this.searchDeviceInfo.numbers,
        district_id: this.searchDeviceInfo.districtId,
        city_id: this.searchDeviceInfo.cityId,
        region_id: this.searchDeviceInfo.provinceId,
        address_info: this.searchDeviceInfo.address,
        token: localStorage.getItem("token")
      }
      console.log(getVillageListData)
      this.http.get(environment.baseUrl + "/device/?page_index=" + getVillageListData.page_index
        + "&server_id=" + getVillageListData.serverId
        + "&district=" + getVillageListData.district_id
        + "&city=" + getVillageListData.city_id
        + "&region=" + getVillageListData.region_id
        + "&address_info=" + getVillageListData.address_info
        + "&token=" + getVillageListData.token
      ).subscribe(
        (val: any) => {
          setTimeout(() => {
            if (val.data.list.length == 0) {
              this.pager = {}
              this.total = 0
              // return
            } else {
              this.deviceList = val.data.list;
              this.page_index = val.data.page_index;
              this.total = val.data.total;
              this.totalPage = Math.ceil(this.total / 10)
              this.pager = this.deviceList;
              this.setPage(this.page_index, 0)
            }

            this.loading = false
          }, 500);




        },
        err => {

        }

      )

    })
  }
  getProvince() {

    this.searchDeviceInfo.cityId = ""
    this.searchDeviceInfo.districtId = ""
    return new Promise(() => {

      this.http.get(environment.baseUrl + "/regions/").subscribe(
        (val: any) => {
          console.log(val)
          this.provinceList = val.data.list


        },
        err => {

        }

      )

    })
  }
  getCity(dataType: string = "") {

    var provinceId = this.searchDeviceInfo.provinceId;
    if (dataType == "add") {
      provinceId = this.addDeviceInfo.provinceId;
    }
    return new Promise(() => {

      this.http.get(environment.baseUrl + "/regions/?areas=" + provinceId).subscribe(
        (val: any) => {
          console.log(val)

          this.cityList = val.data.list
          this.districtList = []

        },
        err => {

        }

      )

    })

  }
  getDistrict(dataType: string = "") {
    var cityId = this.searchDeviceInfo.cityId;
    if (dataType == "add") {
      cityId = this.addDeviceInfo.cityId;
    }
    return new Promise(() => {

      this.http.get(environment.baseUrl + "/regions/?areas=" + cityId).subscribe(
        (val: any) => {
          console.log(val)

          this.districtList = val.data.list
        

        },
        err => {

        }

      )

    })


  }
  getCommunityList(){

    return new Promise(()=>{
      this.http.get(environment.baseUrl + "/regions/community/?region_id="
      +this.addDeviceInfo.provinceId
      +"&city_id="+this.addDeviceInfo.cityId
      +"&district_id="+this.addDeviceInfo.districtId
      +"&token="+localStorage.getItem("token")
      ).subscribe(
        (val: any) => {
          console.log(val)

          this.communityList=val.data.list


        },
        err => {

        }

      )
    })

  }
  showMap() {
    $('#mapModal').modal('show')
    var self = this;
    var map = new BMap.Map("container");
    var point = new BMap.Point(113.957357, 22.540641);
    map.centerAndZoom(point, 15);
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.MapTypeControl());
    var geoc = new BMap.Geocoder();
    var marker
    map.addEventListener("click", function (e) {
      map.removeOverlay(marker);
      var pt = e.point;
      geoc.getLocation(pt, function (rs) {
        console.log(pt)
        self.addDeviceInfo.latitude=pt.lat;
        self.addDeviceInfo.longitude=pt.lng;
        marker = new BMap.Marker(pt);        // 创建标注    
        map.addOverlay(marker);
        var addComp = rs.addressComponents;
        var overlayText = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber
        self.addDeviceInfo.ptAddress=overlayText
        var label = new BMap.Label(overlayText, { offset: new BMap.Size(20, -10) });
        marker.setLabel(label);
        

      });

    });
  }
  chooseLongitudeAndLatitude() {
   
    $('#mapModal').modal("hide")
  }

  cancelLongitudeAndLatitude() {
    this.addDeviceInfo.latitude="";
    this.addDeviceInfo.longitude="";
    this.addDeviceInfo.ptAddress=""
    $('#mapModal').modal("hide")
  }
  setPage(page: number, get: number = 1) {

    // get pager object from service
    var self = this;
    if (get == 1) {
      this.getDeviceList(page).then(
        (val: any) => {


          self.pager = this.pagerService.getPager(val.data.total, page, 10);
        }
      )

    } else {

      this.pager = self.pagerService.getPager(this.total, page, 10);


    }


  }


}
