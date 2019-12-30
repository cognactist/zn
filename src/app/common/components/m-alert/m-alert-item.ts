import { Type } from '@angular/core';

export class MAlertItem {
  constructor(public component: Type<any>, public data?: any) {}
}
export interface MAlertRootComponent {
  data: any;
}


