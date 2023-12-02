import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddccmembersComponent } from '../addccmembers/addccmembers.component';
import { AdduserComponent } from '../adduser/adduser.component';

@Component({
  selector: 'app-add-taskassigntoother',
  templateUrl: './add-taskassigntoother.component.html',
  styleUrls: ['./add-taskassigntoother.component.scss']
})
export class AddTaskassigntootherComponent implements OnInit, OnChanges {
  isActive: boolean = true;
  assignroothers: FormGroup = this.fb.group({})
  selectedIndex = 0

  constructor(private dialogRef: MatDialogRef<AddTaskassigntootherComponent>, private fb: FormBuilder, private dialog: MatDialog) { }

  Priority = [
    { value: 'High', viewValue: 'High Priority' },
    { value: 'Low', viewValue: 'Low Priority' },

  ];


  ngOnChanges() {
    // console.log(this.selectedIndex);
  this.answer
    console.log(this.answer  + "onchange")

  }




  ngOnInit() {
    this.answer
    console.log(this.answer)

    this.assignroothers = this.fb.group({

      Id: [''],
      Title: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z ]+$'),
          Validators.maxLength(20),
        ],
      ],

      Priority: ['', Validators.required],
      // AssignedBy: [this.userDetails.UserId],
      AssignedBy: [''],
      AssignedToUserId: [''],
      AssignedDate: [''],
      CompletedDate: [''],
      Description: ['', Validators.required],
      IntercomGroupIds: [[]],
      IsActive: [this.isActive],
      Latitude: [''],
      Location: [''],
      Longitude: [''],
      Image: [''],
      MultimediaData: [''],
      MultimediaExtension: [''],
      MultimediaFileName: [''],
      MultimediaType: [''],
      TaskEndDateDisplay: ['', Validators.required],
      TaskEndDate: [''],
      TaskDisplayOwners: [''],
      TaskOwners: [''],
      TaskStatus: [''],
      UserDisplayIds: ['', Validators.required],
      UserIds: [''],
      LeadId: [''],

    })



    console.log(this.selectedIndex);

  }


  onTabChanged(event: any) {
    console.log(event.index)
    this.selectedIndex = event.index

    console.log(this.selectedIndex);


    if (this.selectedIndex == 0) {
      console.log("assign to other");

    } else if (this.selectedIndex == 1) {
      console.log("assign to me");

    }

  }

  onStartChange(event: any) {
    console.log(event)
  }


  add() {
    // debugger

    // if (this.assignroothers.invalid) {
    //   this.assignroothers.markAllAsTouched()
    //   return
    // }else{
    // }
    console.log(this.assignroothers.value)

  }

  closed() {
    this.dialogRef.close()
  }
// cross icon
  cancel() {
    this.dialogRef.close()
  }


  // add CC

  addCC() {
    const addccc=this.dialog.open(AddccmembersComponent, {
      height: '450px',
      width: '400px',
      // data: this.topics,
      disableClose: true,

    })

    addccc.afterClosed().subscribe((res:any)=>{
      console.log(res + "cc  test")
    })
  }

  answer:any
  adduser(){
    const adduser = this.dialog.open(AdduserComponent,{
      height: '450px',
      width: '400px',
      data: this.answer,
      disableClose: true,
    })

    // adduser.afterClosed().subscribe((res:any)=>{this.answer=res})
    adduser.afterClosed().subscribe((res:any)=>this.answer=res)



  }




}
