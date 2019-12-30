import { Component, OnInit,Input } from '@angular/core';
import { MAlertItem, MAlertRootComponent } from '../m-alert-item';

@Component({
  selector: 'app-page-alert',
  templateUrl: './page-alert.component.html',
  styleUrls: ['./page-alert.component.scss']
})
export class PageAlertComponent implements  MAlertRootComponent{
  @Input() data: any;
  

}
