import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public menuInfo:any;
  public positionName:any;
  constructor(private userService :UserService) { }
 
  ngOnInit() {
   
    this.menuInfo= JSON.parse(localStorage.getItem("menuInfo"))
  
  
  
    this.positionName= localStorage.getItem("positionName")
    
      
  }

  loginOut(){
    this.userService.loginOut()
  }

}
