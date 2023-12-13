import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-confirmationdialog',
  templateUrl: './confirmationdialog.component.html',
  styleUrls: ['./confirmationdialog.component.scss']
})



export class ConfirmationdialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }



  onNoClick(): void {
    this.dialogRef.close();
  }

}
