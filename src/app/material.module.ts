import { NgModule } from '@angular/core';

import {
  MatAutocompleteModule,
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
  MatTabsModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatAutocompleteModule,
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
    MatTabsModule
  ],
  exports: [
    MatAutocompleteModule,
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
    MatTabsModule
  ]
})
export class MaterialModule { }
