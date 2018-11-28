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
  MatSliderModule
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
    MatSliderModule
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
    MatSliderModule
  ]
})
export class MaterialModule { }
