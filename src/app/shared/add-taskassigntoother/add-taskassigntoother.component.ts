import { Component, HostListener, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ENTER, SPACE, hasModifierKey } from '@angular/cdk/keycodes';
import { AdduserComponent } from '../adduser/adduser.component';
import { ElementRef } from '@angular/core';
import * as moment from 'moment/moment';
import { AuthServicesService } from 'src/app/core/auth-services.service';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { ConfirmationdialogComponent } from '../confirmationdialog/confirmationdialog.component';


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
  a: any
  ccresponse: any;
  filesNames: any = "";
  addusername: any = '';
  addCCname: any = '';
  filesizecondition: boolean = false;
  array: any[] = []
  currentdate = new Date();
  // condition for tabchange
  index = 0;
  indexOld = 0;

  constructor(private dialogRef: MatDialogRef<AddTaskassigntootherComponent>, private fb: FormBuilder, private dialog: MatDialog, private services: AuthServicesService) { }

  Priority = [
    { value: 'High', viewValue: 'High Priority' },
    { value: 'Low', viewValue: 'Low Priority' },

  ];

  @ViewChild('attachedfile') attachedfile!: ElementRef
  @ViewChild('tabgroup',{static:true}) tabgroup!:MatTabGroup


  folder() {
    this.attachedfile.nativeElement.click()
  }


  ngOnChanges() {
    // console.log(this.selectedIndex);
    this.answer
    console.log(this.answer + "onchange")

  }




  ngOnInit() {


    setTimeout(() => {
      const tabHeader = (this.tabgroup as any)._tabHeader;
      tabHeader._handleKeydown = (event: KeyboardEvent) => {
        if (hasModifierKey(event)) {
          return;
        }

        switch (event.keyCode) {
          case ENTER:
          case SPACE:
            if (tabHeader.focusIndex !== tabHeader.selectedIndex) {
              const item = tabHeader._items.get(tabHeader.focusIndex);
              this.alertDialog(tabHeader.focusIndex, item, tabHeader);
            }
            break;
          default:
            tabHeader._keyManager.onKeydown(event);
        }
      };
    });

    (this.tabgroup as any)._handleClick = (
      tab: MatTab,
      tabHeader: any,
      index: number
    ) => {
      if (this.tabgroup.selectedIndex != index)
        this.alertDialog(index, tab, tabHeader);
    };

    



    this.a = JSON.parse(localStorage.getItem('userId') || "")

    this.assignroothers = this.fb.group({

      Id: [''],
      Title: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$'), Validators.maxLength(20)]],
      Priority: ['', Validators.required],
      AssignedBy: [this.a],
      AssignedToUserId: [''],
      AssignedDate: ['',],
      CompletedDate: [''],
      Description: ['', Validators.required],
      IntercomGroupIds: [[]],
      IsActive: [this.isActive],
      Latitude: [''],
      Location: [''],
      Longitude: [''],
      Image: ['', Validators.required],
      MultimediaData: [''],
      MultimediaExtension: [''],
      MultimediaFileName: [''],
      MultimediaType: [''],
      TaskEndDateDisplay: ['', Validators.required],
      TaskEndDate: [''],
      TaskDisplayOwners: ['', Validators.required],
      TaskOwners: [[]],
      TaskStatus: [''],
      UserDisplayIds: ['', Validators.required],
      UserIds: [''],
      LeadId: [''],

    })

    console.log(this.selectedIndex);

  }


  alertDialog(index: number, tab: MatTab, tabHeader: any) {

    const idformdirty=this.isdirty();

    if (!idformdirty) {
      tabHeader.focusIndex = index;
  
      if (!tab.disabled) {
        this.tabgroup.selectedIndex = index;
      }
      return;
    }




    const dialogRef = this.dialog.open(ConfirmationdialogComponent, {
      data: {},
    });
    const res = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        tabHeader.focusIndex = index;

        if (!tab.disabled) {
          this.tabgroup.selectedIndex = index;
        }
      }
    });
  }

  isdirty():boolean{
    return this.assignroothers.dirty;
  }



  checking(tab:any ,event: any) {
    console.log(tab.selectedIndex , event)
    // if (tab.selectedIndex !=this.submittedTab1 && confirm("do you want to go")) {
    //   //  confirm("do you want to go")
    //    this.submittedTab1=tab.selectedIndex
    //   console.log("1to 2")

    // } 
  }

  onTabChanged(event: any) {
    console.log(event.index)
    this.selectedIndex = event.index

    // console.log(this.selectedIndex);
    // if(this.assignroothers.controls['dirty']){
    //   console.log("dirty")
    // }



    if (this.selectedIndex == 0) {
      // console.log("assign to other");
      this.assignroothers.reset()


    } else if (this.selectedIndex == 1) {
      // console.log("assign to me");
      this.assignroothers.reset()
      // this.tabConditionChecked()
    }

  }
  // tabConditionChecked() {

  //   if (this.selectedIndex == 0 && this.assignroothers.dirty) {

  //     alert("You want to moves to next pages")

  //   }
  // }


  newdate: any;
  TaskEnd: any

  onStartChange() {
    // console.log(event)
    const date = new Date()
    this.TaskEnd = date.toISOString()
    console.log(this.TaskEnd)
    this.newdate = moment(date).format('D MMM YYYY h:mm A');
    console.log(this.newdate)
    // this.assignroothers.patchValue({TaskEndDateDisplay:TaskEnd})
    // this.assignroothers.patchValue({TaskEndDate:abc})
    this.assignroothers.controls['TaskEndDateDisplay'].setValue(this.TaskEnd)
    this.assignroothers.controls['TaskEndDate'].setValue(this.newdate)
  }



  add() {
    // debugger
    if (this.selectedIndex == 1) {
      this.assignroothers.controls['UserDisplayIds'].disable()
    }

    if (this.assignroothers.invalid) {
      console.log(this.assignroothers.value)
      this.assignroothers.markAllAsTouched()
      return
    } else {
      if (this.selectedIndex == 0) {
        const params = this.assignroothers.value
        console.log(params)

        this.services.assigntask(params).subscribe((res: any) => {
          console.log(res)
        })
      } else if (this.selectedIndex == 1) {


        this.assignroothers.controls['UserIds'].patchValue([this.a])

        const params = this.assignroothers.value
        console.log(params)
        this.services.assigntask(params).subscribe((res: any) => {
          console.log(res)
          this.dialogRef.close()
        })
      }
    }
    // console.log(this.assignroothers.value)

  }

  closed() {
    this.dialogRef.close()
  }
  // cross icon
  cancel() {
    this.dialogRef.close()
  }

  // onTabGroupClick(event: any) {

  //   console.log(event)
  //   // if(!this.submittedTab1 &&  this.selectedIndex==1 ){
  //   //      alert("1 to 2")
  //   //      this.submittedTab1=true

  //   // }else if(this.submittedTab1 &&  this.selectedIndex==0){
  //   //          alert("2 to 1")
  //   //          this.submittedTab1=false
  //   // }
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
      height: '430px',
      width: '400px',
      data: this.detailsObject,
      disableClose: true,
    })

    // adduser.afterClosed().subscribe((res:any)=>console.log(res))
    adduser.afterClosed().subscribe((res: any) =>
    // this.answer = res.data
    {
      if (userrole == "User") {
        // console.log(res)
        this.answer = res.data
        const newUser = this.answer;
        this.addusername = res.data.length + "  Users"
        this.assignroothers.patchValue({ UserDisplayIds: this.addusername })
        for (let i = 0; i <= newUser.length - 1; i++) {
          this.array.push(newUser[i]?.UserId)
        }

        this.assignroothers.patchValue({ UserIds: this.array })

        // const newuserObjct=res.data.map(({Name:any })=> ({UserId, Name })))




        this.assignroothers.patchValue({})

      } else if (userrole == "CC") {
        this.CCanswer = res.data
        const newCC = [...this.CCanswer]
        this.addCCname = res.data.length + "  Users"
        this.assignroothers.patchValue({ TaskDisplayOwners: this.addCCname })

        // newCC.forEach((element: any) => {
        //   delete element['checked']
        // });

        console.log(newCC)

        this.assignroothers.patchValue({ TaskOwners: newCC })
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

        reader.readAsBinaryString(file)
        // console.log("I")

      } else if (extension) {
        this.filesNames = multifilename
        // const convertingBase = btoa(file)

        const reader = new FileReader();

        reader.onload = (evt: any) => {
          const binarydata = evt.target?.result
          const base64string = btoa(binarydata);
          console.log(base64string)

          this.assignroothers.patchValue({ Image: base64string })
          this.assignroothers.patchValue({ MultimediaData: base64string })
          this.assignroothers.patchValue({ MultimediaExtension: extension })
          this.assignroothers.patchValue({ MultimediaFileName: multifilename })
          this.assignroothers.patchValue({ MultimediaType: "D" })

          console.log(this.assignroothers.value);

        }
        reader.readAsBinaryString(file)

        // this.assignroothers.patchValue({ Image: convertingBase })
        // this.assignroothers.patchValue({ MultimediaExtension: extension })
        // this.assignroothers.patchValue({ MultimediaFileName: multifilename })
        // this.assignroothers.patchValue({ MultimediaType: "D" })
        // console.log("D")
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
