import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from './department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  url = 'http://localhost:8080/department/';
  constructor(private http: HttpClient) { }

  // getDepartments = (id?: string) => {
  //   if (id) {
  //     return this.http.get(this.url + id)
  //     .toPromise();

  //   } else {
  //     return this.http.get(this.url)
  //     .toPromise();
  //   }
  // }
  public getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.url);
  }

  public getDepartment(id:number): Observable<Department> {
    return this.http.get<Department>(this.url+id);
  }

  public updateDepartment(department: Department) {
    return this.http.put<Department>(this.url, department);
  }
 

  public addDepartment(dept: Department): Observable<Department>{
    return this.http.post<Department>(this.url, dept);
  }

  // deleteDepartment = (id: string) => {
  //   return this.http.delete(this.url + id);
  // }


}
