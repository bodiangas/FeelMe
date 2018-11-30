import { NgModule } from '@angular/core';

import {
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatDialogModule,
  MatExpansionModule,
  MatMenuModule,
  MatInputModule,
  MatSliderModule,
  MatCheckboxModule,
  MatSlideToggleModule
} from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatExpansionModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatCheckboxModule,
    MatSlideToggleModule,
  ],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatDialogModule,
    MatExpansionModule,
    MatMenuModule,
    MatInputModule,
    MatSliderModule,
    MatCheckboxModule,
    MatSlideToggleModule
  ]
})
export class MaterialModule { }
