import { ElementRef, Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment'
import { PagerService } from 'src/app/services/pager.service';
import { FormsModule } from '@angular/forms';
import Swal from 'node_modules/sweetalert2/dist/sweetalert2'
import { SelectorContext } from '@angular/compiler';



declare var $: any;
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  @ViewChild("positionCode") positionCode: ElementRef;
  @ViewChild("positionName") positionName: ElementRef;
  @ViewChild("addPositionCode") addPositionCode: ElementRef;
  @ViewChild("addPositionName") addPositionName: ElementRef;
  constructor(private el: ElementRef, private http: HttpClient, private pagerService: PagerService) { }
  public total: number = 0;

  private authorityList: any;
  private roleList: any;
  private page_index: number;
  private pager: any;
  private totalPage: any;
  public deleteRoleCode: any;

  public changeRoleInfos: any;
  private changeRoleAuthority: any;
  public completeAuthorityList: any;
  private loading: any = false;

  public menuList: any;
  public changeMenuList: any;
  ngOnInit() {
    this.total = 0;
    this.page_index = 0;

    this.getRoleList(1)

    this.authorityList = JSON.parse(localStorage.getItem("menuInfo"))


  }

  getRoleList(page: number = 1) {
    if (page < 1) {

      Swal.fire(
        {
          title: "无效页码！",
          showConfirmButton: false,
          timer: 1500
        }
      )
      return null
    }
    this.total = 0;
    this.loading = true;
    return new Promise(() => {

      this.http.get(environment.baseUrl + "/position/?page_index=" + page + "&token=" + localStorage.getItem("token")).subscribe(
        (val: any) => {
          console.log(val)
          setTimeout(() => {

            if (val.data.list.length == 0) {
              this.pager = {}
              this.total = 0

            } else {
              this.roleList = val.data.list;
              this.page_index = val.data.page_index;
              this.total = val.data.total;
              this.totalPage = Math.ceil(this.total / 10)
              this.pager = this.roleList;
              this.setPage(this.page_index, 0)
            }
            this.loading = false;
          }, 500);



        },
        err => {

        }

      )

    })

  }
  openAddRole() {
    // this.getRoleAuthority()
    this.getMenuList()
    $('#addRoleModal').modal('show')
  }
  addRole() {
    var self = this;

    return new Promise(() => {

      var addRoleData = {

        position_code: this.addPositionCode.nativeElement.value,
        position_name: this.addPositionName.nativeElement.value,
        authority_list: [],
        token: localStorage.getItem("token")
      }

  console.log(8888888888888)
      var fatherMenuIdCheckedList=[]
     
      for (let i = 0; i < self.menuList.length; i++) {
        if(self.menuList[i].father_menu==0&&self.menuList[i].value==true){
          fatherMenuIdCheckedList.push(self.changeMenuList[i].menu_id)
        }
      
      }
      
      for (let j = 0; j < self.menuList.length; j++) {

        for (let k = 0; k <fatherMenuIdCheckedList.length; k++) {
          if(self.menuList[j].father_menu==fatherMenuIdCheckedList[k]){
            self.menuList[j].value=false
          }
          
        }

      }
      self.menuList.map((item) => {
        if (item.value) {
          addRoleData["authority_list"].push(item.comment)
        }
      })
      this.http.post(environment.baseUrl + "/position/?", addRoleData).subscribe(
        (val: any) => {

          Swal.fire(
            {

              title: val.msg,
              showConfirmButton: false,
              timer: 1500
            }
          )

          self.getRoleList()
        },
        err => {

        }

      )

    })
  }
  openChangeRole(e) {
    this.menuList = []
    this.changeMenuList = []
    this.changeRoleAuthority = []
    this.changeRoleInfos = {
      position_code: e.target.getAttribute("position_code"),
      position_name: e.target.getAttribute("position_name"),
      authority_id: e.target.getAttribute("authority_id")
    }
    var self = this;

    this.getMenuList().then(function (v) {

      self.getRoleAuthority(self.changeRoleInfos.authority_id)
    }).catch(function (err) {

    })


    $('#changeRoleModal').modal('show')
  }
  changeRole() {

    var self = this;
    return new Promise(() => {
      var authorityList = []
      var fatherMenuIdCheckedList=[]
     
      for (let i = 0; i < self.changeMenuList.length; i++) {
        if(self.changeMenuList[i].father_menu==0&&self.changeMenuList[i].value==true){
          fatherMenuIdCheckedList.push(self.changeMenuList[i].menu_id)
        }
      
      }
      
      for (let j = 0; j < self.changeMenuList.length; j++) {

        for (let k = 0; k <fatherMenuIdCheckedList.length; k++) {
          if(self.changeMenuList[j].father_menu==fatherMenuIdCheckedList[k]){
            self.changeMenuList[j].value=false
          }
          
        }

      }
    

      self.changeMenuList.map((item) => {
        if (item.value == true) {
          authorityList.push('"' + item.comment + '"')
        }
      })

      console.log(self.changeMenuList)

      var params = new HttpParams({
        fromString: "position_code=" + this.changeRoleInfos.position_code
          + "&position_name=" + this.positionName.nativeElement.value
          + "&authority_list=" + "[" + authorityList + "]"
          + "&token=" + localStorage.getItem("token")

      })
      this.http.put(environment.baseUrl + "/position/?", params).subscribe(
        (val: any) => {
          Swal.fire(
            {

              title: val.msg,
              showConfirmButton: false,
              timer: 1500
            }
          )
          if (val.code == 0) {
            self.getRoleList()
          }


        },
        err => {

        }

      )

    })
  }

  getRoleAuthority(authorityId: any = null) {
    var self = this
    return new Promise(() => {

      this.http.get(environment.baseUrl + "/position/authority/?page_index=" + 1 + "&authority_id=" + authorityId + "&token=" + localStorage.getItem("token")).subscribe(
        (val: any) => {
          console.log(val)
          self.changeRoleAuthority = val.data.authority_list
          var fatherMenuIdCheckedList=[]
          self.changeMenuList.forEach(function (v1, k1) {
            self.changeRoleAuthority.forEach(function (v2, k2) {
              if (v1.comment == v2.name) {
                v1.value = true
                if(v1.father_menu==0){
                  fatherMenuIdCheckedList.push(v1.menu_id)
                }
                
              }

            })

          })

        

          for (let i = 0; i <  self.changeMenuList.length; i++) {
           
            for (let j = 0; j < fatherMenuIdCheckedList.length; j++) {
           
              if( self.changeMenuList[i].father_menu==fatherMenuIdCheckedList[j]){
                self.changeMenuList[i].value=true
              }


            }


          }

        },
        err => {

        }

      )

    })
  }
  getMenuList(fatherMenu: string = "") {

    var url = "/menu/?father_mark=" + fatherMenu

      + "&token=" + localStorage.getItem("token")

    var self = this;
    return new Promise((resolve, reject) => {

      this.http.get(environment.baseUrl + url).subscribe(
        (val: any) => {
          console.log(val)
          self.menuList = val.data;
          self.changeMenuList = val.data;

          resolve("123")
        },
        err => {

        }

      )

    })

  }
  openDeleteModal(e) {
    this.deleteRoleCode = e.target.getAttribute("code");
    $('#deleteModal').modal('show')


  }
  deleteRole() {

    var self = this;
    return new Promise(() => {

      var url = "/position/?position_code=" + localStorage.getItem("positionCode")
        + "&delete_code=" + self.deleteRoleCode
        + "&token=" + localStorage.getItem("token")

      this.http.delete(environment.baseUrl + url, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }).subscribe(
        (val: any) => {
          console.log(val)
          Swal.fire(
            {

              title: val.msg,
              showConfirmButton: false,
              timer: 1500
            }
          )
          self.getRoleList()


        },
        err => {

        }

      )

    })
  }

  onfatherChange(e) {
    var target = e.target

    if (target.checked) {

      for (let i = 0; i < this.menuList.length; i++) {
        if (this.menuList[i].father_menu == target.getAttribute("menuId")) {
          this.menuList[i].value = true
        }

      }
    } else {
      for (let i = 0; i < this.menuList.length; i++) {
        if (this.menuList[i].father_menu == target.getAttribute("menuId")) {
          this.menuList[i].value = false
        }

      }

    }

  }
  onChildrenChange(e) {
    let target = e.target
    let targetFatherMenuId = target.getAttribute("fatherMenu")
    let flag = false;
    let targetFatherMenuIndex;
    let menuId = target.getAttribute("menuId")
    if (target.checked) {

      for (let i = 0; i < this.menuList.length; i++) {
        if (this.menuList[i].menu_id == targetFatherMenuId) {
          targetFatherMenuIndex = i;
        }
        if (this.menuList[i].father_menu == targetFatherMenuId) {

          if (this.menuList[i].menu_id != menuId) {
            if (this.menuList[i].value == true) {
              flag = true
            } else {
              flag = false
              this.menuList[targetFatherMenuIndex].value = flag
              return
            }
          }

        }
      }
      this.menuList[targetFatherMenuIndex].value = flag



    } else {
      for (let i = 0; i < this.menuList.length; i++) {
        if (this.menuList[i].menu_id == targetFatherMenuId) {
          this.menuList[i].value = false
          return
        }

      }

    }

  }

  setPage(page: number, get: number = 1) {

    // get pager object from service
    var self = this;
    if (get == 1) {
      this.getRoleList(page).then(
        (val: any) => {


          self.pager = this.pagerService.getPager(val.data.total, page, 10);
        }
      )

    } else {

      this.pager = self.pagerService.getPager(this.total, page, 10);


    }


  }
}
