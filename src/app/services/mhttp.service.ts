import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class MhttpService {

  constructor(private http: HttpClient) { }

  public get(url, params?: any) {
    params.token = localStorage.getItem("token")
    var p = new HttpParams({
      fromObject: params
    })
    return new Promise((resolve, reject) => {
      this.http.get(environment.baseUrl + url + p.toString()).subscribe(
        (val) => {
          resolve(val)
        },
        (err) => {
          reject(err)
        }
      )
    })

  }
  public post(url, params?: any) {
    params.token = localStorage.getItem("token")
  
    return new Promise((resolve, reject) => {
      this.http.post(environment.baseUrl + url,params).subscribe(
        (val) => {
          resolve(val)
        },
        (err) => {
          reject(err)
        }
      )
    })

  }
}
