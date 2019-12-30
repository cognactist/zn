import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './userManage/user/user.component'
import { PagesRoutingModule } from './pages-routing.module';

import { VillageComponent } from './villageManage/village/village.component';
import { FeedbackComponent } from './userManage/feedback/feedback.component';
import { RoleComponent } from './authorityManage/role/role.component';
import { SelfUserComponent } from './authorityManage/self-user/self-user.component';
import { PersonalComponent } from './personal/personal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MouldComponent } from './noticeManage/mould/mould.component';
import { ApplyVillageComponent } from './villageManage/apply-village/apply-village.component';
import { PushComponent } from './noticeManage/push/push.component';
import { MenuComponent } from './authorityManage/menu/menu.component';

import { OrderComponent } from './service/order/order.component';

import { MomentComponent } from './moment/moment/moment.component';
import { ImgArrayPipe } from './../common/pipe/pipe'
import { PagerComponent } from '../common/components/pager/pager.component';
import { ComplainModule } from './userManage/complain/complain.module';
import { DeviceComponent } from './deviceManage/device/device.component';
import { DeclarationFormComponent } from './deviceManage/declaration-form/declaration-form.component';
import { HeaderFormComponent } from '../common/components/header-form/header-form.component';
import { MAlertComponent } from '../common/components/m-alert/m-alert.component';

import { FormAlertComponent } from '../common/components/m-alert/form-alert/form-alert.component';
import { PageAlertComponent } from '../common/components/m-alert/page-alert/page-alert.component';

import { FormAlertTextareaComponent } from '../common/components/m-alert/form-alert/form-alert-textarea/form-alert-textarea.component';
import { InputRegDirective } from '../common/directives/input-reg.directive';
import { InputFormRegDirective } from '../common/directives/input-form-reg.directive';
import { CheckAlertComponent } from '../common/components/m-alert/check-alert/check-alert.component';
import { InputPhoneRegDirective } from '../common/directives/input-phone-reg.directive';




@NgModule({
  declarations: [
    CheckAlertComponent,
    FormAlertComponent,
    PageAlertComponent,
    MAlertComponent,
    FormAlertTextareaComponent,
    InputRegDirective,
    InputFormRegDirective,
    InputPhoneRegDirective,
    HeaderFormComponent,PagerComponent, ImgArrayPipe, ApplyVillageComponent, MouldComponent, RoleComponent, HomeComponent, UserComponent, VillageComponent, FeedbackComponent, SelfUserComponent, PersonalComponent, PushComponent, MenuComponent, OrderComponent, DeviceComponent, DeclarationFormComponent, MomentComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ComplainModule,
    ReactiveFormsModule,
   // MAlertModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
 
})
export class PagesModule { }

