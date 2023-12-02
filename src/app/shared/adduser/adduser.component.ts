import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthServicesService } from 'src/app/core/auth-services.service';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {

  listofCategory: any[] = [];
  formm: number = 1;
  // text: string = '';
  last: number = 10;
  totalPage: any
  userIds: any[] = [];
  retaindata: any[] = [];
  checked: boolean = false;
  searchText:any=''


  constructor(private dialogref: MatDialogRef<AdduserComponent>, public services: AuthServicesService,
    @Inject(MAT_DIALOG_DATA) public data: any, private activateroute: ActivatedRoute) { this.retaindata = data }

  ngOnInit() {

    console.log(this.retaindata)

    this.getSettings()

    if (this.retaindata?.length > 0) {
      // this.userIds?.push(this.retaindata)
      for(let i=0; i<=this.retaindata.length-1; i++){
        this.userIds.push(this.retaindata[i])
      }
    }


  }

  searcbar(event:any){
    // console.log(event.target.value);
    // this.searchText=event.target.value

    setTimeout(()=>{
      this.searchText=event.target.value
      console.log(this.searchText)
      this.getSettings()
    },1000)

  }

  getSettings() {
    // debugger
    this.services.addusers(this.formm, this.searchText, this.last).subscribe((res: any) => {
      this.listofCategory = res.data.Members
      console.log(this.listofCategory);

      this.totalPage = res.data.TotalRecords

      if (this.retaindata?.length > 0) {
        // debugger
        for (let i = 0; i < this.retaindata?.length; i++) {
          for (let j = 0; j < this.listofCategory?.length; j++) {
            if (this.retaindata[i].UserId == this.listofCategory[j].UserId && this.retaindata?.[i].checked) {
              this.listofCategory[j]['checked'] = true;
            }
          }
        }
      }
    })
  }

  seletectedTopic(event: any, list: any) {

    console.log(event)
    // debugger
    if (event.checked) {
      const topicsincludes = this.userIds?.some(user => user === list.userId)
      if (!topicsincludes) {
        list['checked'] = true
        // if(this.retaindata?.length!=0){
        //   this.userIds?.push(this.retaindata)
        // }
        this.userIds?.push(list)
        console.log(this.userIds)
      }
    } else {
      let tempArray = this.userIds?.filter((next) => {
        return next !== list
      })
      this.userIds = [...tempArray];
      console.log(this.userIds)
    }

  }


  appenddata() {

    if (!(this.listofCategory && this.listofCategory.length < 10)) {
      if (this.totalPage >= 1 && this.totalPage != 0 && this.listofCategory.length == 10) {
        this.formm += 10;
        this.getSettings()
      }
    }

  }


  closed() {
    this.dialogref.close()
  }

  add() {
    console.log(this.userIds)

    this.dialogref.close(this.userIds)
  }



}
