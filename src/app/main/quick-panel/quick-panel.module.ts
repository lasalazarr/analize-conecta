import { LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDividerModule, MatListModule, MatSlideToggleModule, MatIconModule } from '@angular/material';
import { registerLocaleData } from '@angular/common';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseQuickPanelComponent } from 'app/main/quick-panel/quick-panel.component';
import localeEsEC from '@angular/common/locales/es-EC';


registerLocaleData(localeEsEC, 'es-Ec');

@NgModule({
  declarations: [
    FuseQuickPanelComponent
  ],
  imports: [
    RouterModule,

    MatDividerModule,
    MatListModule,
    MatSlideToggleModule,

    FuseSharedModule,
    MatIconModule
  ],
  exports: [
    FuseQuickPanelComponent
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-Ec' }],

})
export class FuseQuickPanelModule {
}
