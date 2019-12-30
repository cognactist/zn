import { Component, OnInit ,Input} from '@angular/core';
import { MAlertItem, MAlertRootComponent } from '../m-alert-item';

@Component({
  selector: 'app-check-alert',
 
 styles:[`
 .detailText{
  min-height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}

 `],

  template: `
  <div class="detailText" >
  {{data}}
  </div>
`
})
export class CheckAlertComponent implements MAlertRootComponent{

  @Input() data: any;

}
