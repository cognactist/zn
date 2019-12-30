import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
 
import {Observable, of, throwError} from "rxjs";
import {catchError} from "rxjs/internal/operators";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    console.log(req)
    
    return next.handle(req).pipe(
      
      catchError((err: HttpErrorResponse) => this.handleData(err))
    ) ;
  }
 
  private handleData(
    event: HttpResponse<any> | HttpErrorResponse,
  ): Observable<any> {
    //业务处理：一些通用操作
    switch (event.status) {
      case 404:
        console.log(404)
      // this.router.navigate(['/pages/404']);
      //  return of(event) ;
        break ;
      case 200:
          console.log(200)
        break;
      case 302:
        console.log(302)
        localStorage.clear()
        this.router.navigate(['/login']);
        
        break ;
      default:
        console.log("default")
    }
    return throwError(event) ;
  }
}
