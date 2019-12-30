import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef, Input, ComponentFactoryResolver, ViewContainerRef, ComponentRef, ComponentFactory } from '@angular/core';
import { MAlert } from './m-alert';

import { FormAlertComponent } from "./form-alert/form-alert.component";
import { PageAlertComponent } from "./page-alert/page-alert.component";
import { HeaderFormService } from '../header-form/header-form.service';
import { FormAlertService } from './form-alert/form-alert.service';
import { MAlertService } from './m-alert.service';
import { Subscription, from } from 'rxjs';
import { CheckAlertComponent } from './check-alert/check-alert.component';
@Component({
  selector: 'app-m-alert',
  templateUrl: './m-alert.component.html',
  styleUrls: ['./m-alert.component.scss'],
  entryComponents: [CheckAlertComponent, FormAlertComponent, PageAlertComponent]
})
export class MAlertComponent implements OnInit {
  @ViewChild("mAlert") mAlert: ElementRef;
  //@ViewChild(MAlertDirective,{read: ViewContainerRef}) alertHost: MAlertDirective;
  constructor(private componentFactoryResolver: ComponentFactoryResolver, public formService: HeaderFormService, public formAlertService: FormAlertService, public mAlertService: MAlertService) { }

  @Input() headerTitle: string;
  @Input() bodyText: string;
  @ViewChild('con', { read: ViewContainerRef }) container;
  @Input() alertData: MAlert;
  @Input() alertStatusData: any;
  @Output() submitForm = new EventEmitter<any>();
  alertComponentFactory: ComponentFactory<any>
  alertComponentRef: ComponentRef<any>;
  public alertStatus: any = true;
  private alertStatusFlag: any = true;
  public sureIsGreen:Boolean=true;
  ngOnInit() {
  
    var self = this;

    this.mAlertService.getForbidMessage().subscribe(val => {
    
      if (val == "close") {
       
        self.closeAlert()


      }
    })
    this.formAlertService.getTipTextIsShowMessage().subscribe(val=>{
      console.log("tiptext"+val)
      
        this.sureIsGreen=val
     
    })
  }
  ngOnChanges() {

    if(this.alertStatusFlag){
      this.alertStatus = !this.alertStatus;
      if (this.alertStatus) {
        this.openAlert()
       
      }
    }
    this.alertStatusFlag=true
  

  }
  ngAfterViewChecked() {
   

  }
  ngAfterViewInit() {

  }
  ngAfterContentChecked() {

  }
  closeAlert() {
  
    this.alertComponentRef.destroy()
    this.alertStatus = false


  }
  openAlert() {
   
    this.alertStatus = true

    this.alertComponentFactory = this.chooseAlertType()
    this.loadAlertType()
    this.alertComponentRef.instance.data = this.alertData.data1;
  }
  loadAlertType() {

    this.alertComponentRef = this.container.createComponent(this.alertComponentFactory); // Internally this method will call the create() method from the factory and will append the component as a sibling to our container.

  }
  chooseAlertType() {
    var factory: ComponentFactory<any>;

    switch (this.alertData.type) {
      case "check":
        factory = this.componentFactoryResolver.resolveComponentFactory(CheckAlertComponent)

        break;
      case "form":
        factory = this.componentFactoryResolver.resolveComponentFactory(FormAlertComponent)
        break;
      case "page":
        factory = this.componentFactoryResolver.resolveComponentFactory(PageAlertComponent)
        break;

      default:
        factory = this.componentFactoryResolver.resolveComponentFactory(CheckAlertComponent)
        break;
    }
    return factory
  }
  sure() {
    this.alertStatusFlag=false;
    this.formAlertService.formAlertValue[this.formAlertService.formTextarea.key] = this.formAlertService.formTextarea.value
    this.submitForm.emit(this.formAlertService.formAlertValue)
    this.mAlertService.sendForbidMessage("close")
  }
}
