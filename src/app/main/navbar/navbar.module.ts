import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatIconModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseNavbarComponent } from 'app/main/navbar/navbar.component';
import { FuseNavigationModule } from '@fuse/components';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [
        FuseNavbarComponent
    ],
    imports     : [
        RouterModule,
        FlexLayoutModule,

        MatButtonModule,
        MatIconModule,

        FuseSharedModule,
        FuseNavigationModule
    ],
    exports     : [
        FuseNavbarComponent
    ]
})
export class FuseNavbarModule
{
}
