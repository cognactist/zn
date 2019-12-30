import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './userManage/user/user.component';
import { FeedbackComponent } from './userManage/feedback/feedback.component';

import { VillageComponent } from './villageManage/village/village.component';
import { RoleComponent } from './authorityManage/role/role.component';
import { SelfUserComponent } from './authorityManage/self-user/self-user.component';
import { PersonalComponent } from './personal/personal.component';
import { AuthGuard} from './auth.guard'
import { MouldComponent } from './noticeManage/mould/mould.component';
import { ApplyVillageComponent} from './villageManage/apply-village/apply-village.component'
import { PushComponent } from './noticeManage/push/push.component';
import { MenuComponent } from './authorityManage/menu/menu.component';
import { OrderComponent } from './service/order/order.component';

import { MomentComponent } from './moment/moment/moment.component';
import { DeviceComponent } from './deviceManage/device/device.component';
import { DeclarationFormComponent } from './deviceManage/declaration-form/declaration-form.component';


const pagesRoutes: Routes = [
  
  {
    path: '',
    component: HomeComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: '',
        canActivate:[AuthGuard],
        children: [
          { path:"personal",component:PersonalComponent},
          { path:"usermanage/user",component:UserComponent},
          { path:"usermanage/feedback",component:FeedbackComponent},
          { path:"usermanage/complain",loadChildren:'./userManage/complain/complain.module#ComplainModule'},
          { path:"addressmanage/village",component:VillageComponent},
          { path:"authoritymanage/role",component:RoleComponent},
          { path:"authoritymanage/menu",component:MenuComponent},
          { path:"authoritymanage/self-user",component:SelfUserComponent},
          { path:"inform/push",component:PushComponent},
          { path:"inform/mould",component:MouldComponent},
          { path:"addressmanage/apply-village",component:ApplyVillageComponent},        
          { path: 'usermanage', redirectTo:"usermanage/user" },
          { path: 'inform', redirectTo:"inform/mould" },
          { path: 'addressmanage', redirectTo:"addressmanage/village" },
          { path: 'authoritymanage', redirectTo:"authoritymanage/role" },
          { path: 'service', redirectTo:"service/order" },
          { path:"service/order",component:OrderComponent},
          { path:"device/device",component:DeviceComponent},
          { path:"device/declaration-form",component:DeclarationFormComponent},
          { path: 'device', redirectTo:"device/device" },
          { path: 'moment/moment', component:MomentComponent },
          { path: 'moment', redirectTo:"moment/moment" },
          { path: '', redirectTo:"personal" }
        ]
      }
    ]
  }

];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(pagesRoutes)
  ],
  exports:[RouterModule]
})
export class PagesRoutingModule { 
   
 
}
