import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Project } from './project';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects:Project[];
  project:Project;
  newProject:Project;
  displayModal = false;
  modalTitle:string;

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private projectService: ProjectService) { 
    this.newProject = new Project();
    this.project = new Project();
    }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
      console.log(data);
      this.dtTrigger.next();
    });
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  refreshModel=()=>{
    this.modalTitle = "Add New Department";
    this.displayModal = true;
    this.newProject.projectName = '';
    this.newProject.projectDesc = '';
    this.newProject.isActive=true;
  }

  onAddSubmit(){
    this.projectService.addProject(this.newProject).subscribe(response=>{
      console.log(response);
      this.projects.push(response);
      this.rerender();
      });
  }

  loadProject(id:number){ 
    this.modalTitle = "Update Department Details";
      this.projectService.getProject(id)
      .subscribe((response : Project) =>{
        this.project = response;
      });
  }

  onUpdateSubmit(){
    this.projectService.updateProject(this.project).subscribe(response=>{
      console.log(response);
      var project1 = this.projects.filter((project : Project) => project.projectId == this.project.projectId ? project : null);
      this.projects[this.projects.indexOf(project1[0])] = response;
      this.rerender();
      });
  }
}