import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ButtonComponent } from './button/button.component';
import { IconComponent } from './icon/icon.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatTooltipModule
  ],
  declarations: [
    ButtonComponent,
    IconComponent
  ],
  exports: [
    ButtonComponent,
    IconComponent
  ]
})
export class DesignSystemInitiafyModule { }
