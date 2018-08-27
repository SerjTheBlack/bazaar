import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatInputModule,
  MatListModule,
  MatFormFieldModule,
  MatTabsModule,
  MatGridListModule,
} from '@angular/material';
import {FormsModule} from '@angular/forms'
import {MatProgressSpinnerModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatListModule,
    MatTabsModule,
    MatFormFieldModule,
    MatGridListModule,
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatListModule,
    MatTabsModule,
    MatFormFieldModule,
    MatGridListModule,
  ],
})
export class CustomMaterialModule {
}
