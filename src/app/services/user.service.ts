import { Injectable } from '@angular/core';
import { HttpClient,HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable,of, from } from "rxjs";
import { Router } from '@angular/router';
import { environment} from '../../environments/environment'
import jsrsasign from 'jsrsasign';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private router:Router) { }
  public isLoggedIn:boolean=false;
  login(account:any,password:any):Observable<any>{

    let pwd=this.rsaEncrypt(password)
  
    var userLoginData={
      account:account,
      pwd:pwd
    }
   
    return this.http.post(environment.baseUrl+"/login/",userLoginData)
      
  }
  loginOut(){
    localStorage.clear()
    this.isLoggedIn=false;
    this.router.navigate(["/login"])
  }
 
  public rsaEncrypt(data){
    let rsa = new jsrsasign.RSAKey();
    //使用公钥加密
    
    let publicKey=`-----BEGIN PUBLIC KEY-----
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDAlJM2wv1EAp9gid8qQpJrFVji
    /+yrIwpnqCv4MxkB2FHf8RQVoa27SdxqLSttMhcy0I33GCDIyx8VvBIKKJi7nDVK
    PjB+0MF7dDEQTn+eI/xGH2jqVybRhuXsLZx3C/RDRf+Rq/WPlMnvz2rzIR2qT8oa
    H/B29nf9/xldDTtYDwIDAQAB
    -----END PUBLIC KEY-----`
    rsa = jsrsasign.KEYUTIL.getKey(publicKey)
    var enc = jsrsasign.KJUR.crypto.Cipher.encrypt(data,rsa);
    //转换成Base64格式
    let base64Sign = jsrsasign.hextob64(enc);
    return base64Sign;

  }
}
