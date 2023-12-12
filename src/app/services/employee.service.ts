import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpParams, HttpResponse} from "@angular/common/http"
import { Employe } from '../interface/Employee';
import { Observable, catchError, of } from 'rxjs';
import { ServerResponse } from '../interface/ServerResponse';
import { EditEmp } from '../interface/EditEmpData';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  URL: string = 'http://localhost:3000/';

  constructor(private _http: HttpClient) { }

 addEmploye(data: Employe) :Observable<HttpResponse<ServerResponse>> {
		return  this._http.post<HttpResponse<ServerResponse>>('http://localhost:3000/employee', data, {
			observe: 'response'
		}).pipe(
			catchError(error => {
				throw ({
					error,
				})
				
			})
		);	
  } 

  getEmployee(managerId:number | undefined): Observable<HttpResponse<Employe[]>> {
	if (!managerId ) {
		throw new Error("User not logedd we can obtaine list of EMP");
		
	}
	let queryParam = managerId ? new HttpParams().set('managerId', managerId.toString()) : undefined;

	const response = this._http.get<Employe[]>(`http://localhost:3000/employee`, 
			{
			observe:'response',
			params: queryParam
			})
			.pipe(
			catchError(error => {
				throw({
				error,
				})
			})
			)
	;
	return response
  }
  

  deleteEmploye(id: number): Observable<HttpResponse<Employe>>{
		const response = this._http.delete<Employe>(`${this.URL}employee/${id}`, {
			observe: 'response'
		})
		.pipe(
			catchError(error => {
				throw ({
					error,
				})
			})
		)
		return response
  }

  editEmployee(id: number, data: EditEmp) : Observable<HttpResponse<Employe>> {
	console.log({
		data,
		id
	});
	
	const response = this._http.patch<Employe>(`${this.URL}employee/${id}`, data,  {
		observe: 'response'
	})
		.pipe(
			catchError(error => {
				throw ({
					error,
				})
			})
		)
	return response
  }
}
