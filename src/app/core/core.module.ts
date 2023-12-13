import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TruncatepipesPipe } from './pipes/truncatepipes.pipe';
import { NumbersonlyDirective } from './directives/numbersonly.directive';



@NgModule({
  declarations: [
    TruncatepipesPipe,
    NumbersonlyDirective,
  
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports:[
    TruncatepipesPipe,
    NumbersonlyDirective,
  
  ]
})
export class CoreModule { }
