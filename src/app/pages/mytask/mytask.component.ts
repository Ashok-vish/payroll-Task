import { Component, OnInit } from '@angular/core';
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
export class MytaskComponent implements OnInit {


  selectedIndex: any = 0
  searchText: any = ''


  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.searchText.data)
    
  }

  change(event: any) {
    // console.log(event)
  }

  onTabChanged(event: any) {
    // console.log(event.index)
    this.selectedIndex = event.index

    // console.log(this.selectedIndex);


    if (this.selectedIndex == 0) {
      // console.log("0");
      this.searchText=''

    } else if (this.selectedIndex == 1) {
      // console.log("1");
      this.searchText=''

    }else if(this.selectedIndex ==2){
      // console.log("2");
      this.searchText=''
      
    }else if(this.selectedIndex ==3 ){
      // console.log('3');
      this.searchText=''
      
    }


  }

  addtask() {

    let dialogref = this.dialog.open(AddTaskassigntootherComponent, {
      height: '500px',
      width: '810px',
      // data: this.topics,
      disableClose: true,

    })

    dialogref.afterClosed().subscribe((res) => {
      // console.log(res)
    })

  }

}
