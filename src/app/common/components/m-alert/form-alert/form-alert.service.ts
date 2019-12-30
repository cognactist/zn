import { Injectable} from '@angular/core';
import { TextareaBase } from './form-alert-textarea/form-textarea-base';
import { Subject ,Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormAlertService {

  constructor() { }
  public formAlertValue: any;
  public formTextarea: any;
  // public tipText:any;
  public tipTextIsShow:Boolean=false;
  public tipTextIsShowSubject = new Subject<any>();
  sendTipTextIsShowMessage(message) {
    this.tipTextIsShowSubject.next(message);
  }

  clearTipTextIsShowMessage() {
    this.tipTextIsShowSubject.next();
  }

  getTipTextIsShowMessage(): Observable<any> {

    return this.tipTextIsShowSubject.asObservable();
  }

}
