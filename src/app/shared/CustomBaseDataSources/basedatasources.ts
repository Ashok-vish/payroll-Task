import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { AuthServicesService } from "../../core/auth-services.service";


export class BaseDataSource implements DataSource<any>{

    allDataresponse = new BehaviorSubject<any[]>([])
    totalPaginationcount= new BehaviorSubject<number>(0)    
    totalCount!:Observable<any>  
    

    // if we mention here service it will not make customedatasources
    constructor() { this.totalCount=this.totalPaginationcount.asObservable() }

    connect(collectionViewer: CollectionViewer): Observable<readonly any[]> {
        return this.allDataresponse.asObservable()

    }


    disconnect(collectionViewer: CollectionViewer): void {
        this.allDataresponse.complete()
        this.totalPaginationcount.complete()
        
    }


}