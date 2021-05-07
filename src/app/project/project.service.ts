import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  url = 'http://localhost:8080/project/';
  constructor(private http: HttpClient) { }

  public getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url);
  }

  public getProject(id:number): Observable<Project> {
    return this.http.get<Project>(this.url+id);
  }

  public updateProject(project: Project) {
    return this.http.put<Project>(this.url, project);
  }
 

  public addProject(project: Project): Observable<Project>{
    return this.http.post<Project>(this.url, project);
  }

  // deleteDepartment = (id: string) => {
  //   return this.http.delete(this.url + id);
  // }


}
