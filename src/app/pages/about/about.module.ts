import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule, NzLayoutModule],
})
export class AboutModule {}
