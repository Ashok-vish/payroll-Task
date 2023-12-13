import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-viewimages',
  templateUrl: './viewimages.component.html',
  styleUrls: ['./viewimages.component.scss']
})



export class ViewimagesComponent {
  viewimage:any;
  constructor( @Inject(MAT_DIALOG_DATA) public data: any){this.viewimage=this.data}

}
