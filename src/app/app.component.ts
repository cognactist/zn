import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute,Router,NavigationStart,ActivationStart,ResolveStart,NavigationError} from '@angular/router';
import Swal from 'node_modules/sweetalert2/dist/sweetalert2'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'monitor';
  constructor(private router:Router,private activatedRoute:ActivatedRoute){

  }

  ngOnInit() {
  
    this.router.events.subscribe((e)=>{
     
      if( e instanceof NavigationError){
        console.log(e)
        Swal.fire(
          {
        
           title: "路由错误！",
           showConfirmButton: false,
           timer: 1500
          }
         )
        
      }
    })
 
    
   }
   
}
