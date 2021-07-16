import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseContentComponent } from 'app/main/content/content.component';
import { PlatformModule } from '@angular/cdk/platform';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfoUpdateDataComponent } from './Ubicacion/info-update-data/info-update-data.component';
import { DialogComponent } from './dialog/dialog.component';


@NgModule({
    declarations: [
        FuseContentComponent,
        DialogComponent,DialogComponent
        
        
       
    ],
    imports     : [
        RouterModule,
        PlatformModule,
        FuseSharedModule,
        BrowserAnimationsModule
    ],
    exports: [
        FuseContentComponent
    ],entryComponents: [DialogComponent]  
})
export class FuseContentModule
{
}
