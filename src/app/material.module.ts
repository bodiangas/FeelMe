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
  MatSlideToggleModule,
  MatOptionModule,
  MatSelectModule,
  MatDividerModule,
  MatTabsModule,
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
    MatOptionModule,
    MatSelectModule,
    MatDividerModule,
    MatTabsModule
  ],
  exports: [
    MatToolbarModule,
    MatDividerModule,
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
    MatSlideToggleModule,
    MatOptionModule,
    MatSelectModule,
    MatTabsModule
  ]
})
export class MaterialModule { }
