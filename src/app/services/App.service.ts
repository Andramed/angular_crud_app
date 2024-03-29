import { Injectable, ViewChild } from '@angular/core';
import { EmployeeService } from './employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { Employe } from '../interface/Employee';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { Store } from '@ngxs/store';
import {SaveEmp} from './storeNgxs/actions/saveEmp.actions'
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
	private empSerive: EmployeeService,
	private store: Store
  ) { }

 
  dataSubject: BehaviorSubject<Employe[]> = new BehaviorSubject<Employe[]>([]);
	getListEmp(){
		this.empSerive.getEmployee().subscribe(
			res => {
				const source = res.body;
				if (source) {
					this.dataSubject.next(source)
					this.store.dispatch(new SaveEmp(source))
				}
			}
		)			
	}
	
	
}
