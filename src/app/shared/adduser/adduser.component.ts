import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent {

  constructor(private dialogref:MatDialogRef<AdduserComponent>){}

  
  closed(){
    this.dialogref.close()
  }

  add(){
    this.dialogref.close()
  }

  

}
