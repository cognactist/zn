import { Injectable ,Output,EventEmitter} from '@angular/core';

import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MAlertService {

  public alertSubject = new Subject<any>();
  constructor() { }

  sendForbidMessage(message) {
    this.alertSubject.next(message);
  }

  clearForbidMessage() {
    this.alertSubject.next();
  }

  getForbidMessage(): Observable<any> {

    return this.alertSubject.asObservable();
  }
}
