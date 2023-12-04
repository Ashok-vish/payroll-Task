import { Component, HostListener, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddccmembersComponent } from '../addccmembers/addccmembers.component';
import { AdduserComponent } from '../adduser/adduser.component';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-add-taskassigntoother',
  templateUrl: './add-taskassigntoother.component.html',
  styleUrls: ['./add-taskassigntoother.component.scss']
})
export class AddTaskassigntootherComponent implements OnInit, OnChanges {
  isActive: boolean = true;
  assignroothers: FormGroup = this.fb.group({})
  selectedIndex = 0;
  detailsObject: any
  answer: any;
  CCanswer: any[] = []
  ccresponse: any;
  filesNames: any = "";
  addusername: any = '';
  addCCname: any = '';
  filesizecondition: boolean = false;

  constructor(private dialogRef: MatDialogRef<AddTaskassigntootherComponent>, private fb: FormBuilder, private dialog: MatDialog) { }

  Priority = [
    { value: 'High', viewValue: 'High Priority' },
    { value: 'Low', viewValue: 'Low Priority' },

  ];

  // @HostListener('click', ['attachedfile'])
  @ViewChild('attachedfile') attachedfile!: ElementRef

  folder() {
    this.attachedfile.nativeElement.click()
  }


  ngOnChanges() {
    // console.log(this.selectedIndex);
    this.answer
    console.log(this.answer + "onchange")

  }




  ngOnInit() {
    let a = localStorage.getItem('userId')


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
      AssignedBy: [localStorage.getItem('userId')],
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

  // folder(){

  // }


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

  // addCC() {
  //   const addccc = this.dialog.open(AddccmembersComponent, {
  //     height: '450px',
  //     width: '400px',
  //     data: this.ccresponse,
  //     disableClose: true,

  //   })

  //   addccc.afterClosed().subscribe((res: any) => {
  //     console.log(res + "cc  test")
  //   })
  // }


  adduser(userrole: any) {

    // dataObject={}
    if (userrole == "User") {

      this.detailsObject = {
        "Userrole": "User",
        "data": this.answer

      }
    } else if (userrole == "CC") {
      this.detailsObject = {
        "Userrole": "CC",
        "data": this.CCanswer

      }
    }
    const adduser = this.dialog.open(AdduserComponent, {
      height: '450px',
      width: '400px',
      data: this.detailsObject,
      disableClose: true,
    })

    // adduser.afterClosed().subscribe((res:any)=>console.log(res))
    adduser.afterClosed().subscribe((res: any) =>
    // this.answer = res.data
    {
      if (userrole == "User") {
        this.answer = res.data
      } else if (userrole == "CC") {
        this.CCanswer = res.data
      }
    }

    )
    console.log(this.answer)
    console.log(this.detailsObject);

  }




  previewImages(event: any) {
    // console.log(event)
    console.log(event.target.files[0])
    const file = event.target.files[0]

    const extension = file.name.split(".")[1]
    const multifilename = file.name.split(".")[0]
    const imagesSize = file.size / Math.pow(1024, 2)   // converting to MB

    console.log(imagesSize)

    console.log(extension + multifilename)

    const imageExtension = ["jpg", "png", "svg", "jpeg"]


    if (imagesSize <= 2) {
      // debugger
      this.filesizecondition = false
      if (imageExtension.includes(extension)) {
        this.filesNames = multifilename
        const reader = new FileReader();
        reader.onload = (evt: any) => {
          const binarydata = evt.target?.result
          const base64string = btoa(binarydata);
          console.log(base64string)

          this.assignroothers.patchValue({ Image: base64string })
          this.assignroothers.patchValue({ MultimediaData: base64string })
          this.assignroothers.patchValue({ MultimediaExtension: extension })
          this.assignroothers.patchValue({ MultimediaFileName: multifilename })
          this.assignroothers.patchValue({ MultimediaType: "I" })

          console.log(this.assignroothers.value);

        }

        // const convertingBase=btoa(file)
        // console.log(convertingBase);
        reader.readAsBinaryString(file)
        // console.log("I")

      } else if (extension) {
        const convertingBase = btoa(file)

        this.assignroothers.patchValue({ Image: convertingBase })
        this.assignroothers.patchValue({ MultimediaExtension: extension })
        this.assignroothers.patchValue({ MultimediaFileName: multifilename })
        this.assignroothers.patchValue({ MultimediaType: "D" })
        console.log("D")
      } else {
        this.assignroothers.patchValue({ Image: "" })
        this.assignroothers.patchValue({ MultimediaExtension: "" })
        this.assignroothers.patchValue({ MultimediaFileName: "" })
        this.assignroothers.patchValue({ MultimediaType: "" })
        console.log("")
      }
    } else {
      this.filesizecondition = true
      console.log("images is greater than 2mb")
    }





  }




}
