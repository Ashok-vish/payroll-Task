import { Component } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { AssignedbymeComponent } from './assignedbyme/assignedbyme.component';
import { AddTaskassigntootherComponent } from 'src/app/shared/add-taskassigntoother/add-taskassigntoother.component';

@Component({
  selector: 'app-mytask',
  templateUrl: './mytask.component.html',
  styleUrls: ['./mytask.component.scss']
})
export class MytaskComponent {

  searchText: any = ''

  constructor(private dialog: MatDialog) { }

  change(event: any) {
    console.log(event)
  }

  addtask() {

    let dialogref = this.dialog.open(AddTaskassigntootherComponent, {
      height: '500px',
      width: '810px',
      // data: this.topics,
      disableClose: true,

    })

    dialogref.afterClosed().subscribe((res) => {
      console.log(res)
    })

  }

}
