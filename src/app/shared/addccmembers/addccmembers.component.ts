import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addccmembers',
  templateUrl: './addccmembers.component.html',
  styleUrls: ['./addccmembers.component.scss']
})
export class AddccmembersComponent {

  constructor(private dialogref:MatDialogRef<AddccmembersComponent>){}

  closed(){
    this.dialogref.close()
  }

  add(){
    this.dialogref.close()
  }

}
