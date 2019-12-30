import { Component, OnInit ,ViewChild ,ElementRef,Renderer2} from '@angular/core';
import { UserService} from "../../services/user.service"
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService:UserService,private router:Router ) { 


  }

  ngOnInit() {
   
    
  }
   
  public userLogin(account,password){
    
    this.userService.login(account,password).subscribe(
      val => {
        var tipText= document.getElementById("tipText");
       
        if(val.code=="0"){
          this.userService.isLoggedIn=true;
          localStorage.setItem("token",val.data.token)
          localStorage.setItem("account",account)
          localStorage.setItem("userId",val.data.manager_id)
          localStorage.setItem("menuInfo",JSON.stringify(val.data.menu))
          localStorage.setItem("positionCode",val.data.position_code)
          localStorage.setItem("managerName",val.data.manager_name)
          localStorage.setItem("positionName",val.data.position_name)
         
          this.router.navigate(['/pages'])
        }else if(val.code=="50001"){
          tipText.style.display="block";
          tipText.innerText=val.msg
        }else{
          tipText.style.display="block";
        }
      },
      err=>{
        console.log(err)
       
      }
      );


   }

  

  }
