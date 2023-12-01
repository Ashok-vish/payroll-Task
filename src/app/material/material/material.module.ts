import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';





const component=[MatFormFieldModule,
  MatNativeDateModule,
  MatSelectModule,
  MatInputModule,
  MatDividerModule,
  MatButtonModule,
  MatIconModule,
  MatTabsModule,
  MatDatepickerModule



 
]

@NgModule({

  declarations: [],
  imports: [
    ...component,
    CommonModule
  ],
  exports:[
    ...component,
  ]
})
export class MaterialModule { }
