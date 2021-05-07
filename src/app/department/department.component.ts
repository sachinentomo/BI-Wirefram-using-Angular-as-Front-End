import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Department } from './department';
import { DepartmentService } from './department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
 
  departments:Department[];
  
  department:Department;
  newDepartment:Department;
  displayModal = false;
  modalTitle:string;

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private service: DepartmentService) {
    this.department = new Department();

    // this.service.getDepartments()
    // .then((response) =>{
    //   this.departments = response;
    //   this.dtTrigger.next();
    //   console.log(response);
    // })
    // .catch((err) => {
    //   console.log(err);
    // })
    
  }

  ngOnInit(): void {
    this.service.getDepartments().subscribe(data => {
      this.departments = data;
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
    this.department.departmentId=null;
    this.department.departmentCode='';
    this.department.departmentName = '';
    this.department.departmentDesc = '';
    this.department.departmentLoc = '';
    this.department.isActive=true;
  }

  onSubmit(){
    if(this.department.departmentId==null)
      this.addDepartment();
      if(this.department.departmentId!=null)
      this.editDepartment();  
       
  }

  addDepartment(){
    this.newDepartment = new Department();
      this.newDepartment.departmentName = this.department.departmentName;
      this.newDepartment.departmentDesc = this.department.departmentDesc;
      this.newDepartment.departmentLoc = this.department.departmentLoc;
      this.newDepartment.isActive = true;
      this.service.addDepartment(this.newDepartment).subscribe(response=>{
      this.departments.push(response);
      this.rerender();
      });
    }

  editDepartment(){
    this.service.updateDepartment(this.department).subscribe(response=>{
      console.log(response);
      var department1 = this.departments.filter((department : Department) => department.departmentId == this.department.departmentId ? department : null);
      this.departments[this.departments.indexOf(department1[0])] = response;
      this.rerender();
      });
  }  

  loadDepartment(id:number){
      this.modalTitle = "Update Department Details";
        this.service.getDepartment(id)
        .subscribe((response : Department) =>{
          this.department.departmentId = response.departmentId;
          this.department.departmentCode = response.departmentCode;
          this.department.departmentName = response.departmentName;
          this.department.departmentDesc = response.departmentDesc;
          this.department.departmentLoc = response.departmentLoc;
          this.department.isActive = response.isActive;
        });
    }

    

    
    
  // saveDepartment(){
  //   this.modalTitle = "Update Department Details";
  //   if (this.department.departmentId) {
  //     //this.editDepartment();
  //   }
  //   else{
  //    // this.addDepartment();
  //   }
  // }
//   editDepartment(){
//     var date = new Date();
//     var dateString = date.getDate() + '/' + date.getMonth() + 1 + '/' + date.getFullYear();
//       this.service.updateDepartment({
//         "id":this.departmentId,
//         "deptName": this.departmentName,
//         "deptDescription": this.departmentDesc,
//         "deptLocation": this.departmentLoc,
//         "deptCreatedDate": dateString,
//         "deptCreatedBy": "userName",
//         "deptUpdatedDate": dateString,
//         "deptUpdatedBy": "userName",
//         "deptActive": "1"
//       })
//       .subscribe(response => {
//         this.displayModal = false;
//         var department = this.departments.filter((department : any) => department.id == this.departmentId ? department : null);
//         this.departments[this.departments.indexOf(department[0])] = response;
//         this.rerender();
//         alert('Successfully Updated!');
//       }, err => {
//         console.log(err);
//       });
//   }

//   addDepartment(){
//     var date = new Date();
//     var dateString = date.getDate() + '/' + date.getMonth() + 1 + '/' + date.getFullYear();
//     this.service.addDepartment({
//       "deptName": this.departmentName,
//       "deptDescription": this.departmentDesc,
//       "deptLocation": this.departmentLoc,
//       "deptCreatedDate": dateString,
//       "deptCreatedBy": "userName",
//       "deptUpdatedDate": dateString,
//       "deptUpdatedBy": "userName",
//       "deptActive": "1"
//   })
//   .subscribe(response => {
//     this.departments.push(response);
//     this.displayModal = false;
//     this.rerender();
//     alert('Successfully Added!');
//   }, err => {
//     console.log(err);
//   });
// }
  
  
  // loadDepartment = (id: string) => {
  //   this.modalTitle = "Update Department Details";
  //     this.service.getDepartments(id)
  //     .then((response : any) =>{
  //       this.departmentName = response.departmentName;
  //       this.departmentDesc = response.departmentDesc;
  //       this.departmentLoc = response.departmentLoc;
  //       this.departmentId = response.departmentId;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //    }
  //     )
  // }
  
  // deleteDepartment(id:string, name:string, index: number) {
  //   if (confirm('Sure you want to delete '+ name +' Department ?')) {
  //       this.service.deleteDepartment(id)
  //       .subscribe(response => {
  //         this.departments.splice(index, 1);
  //         this.rerender();
  //       }, err => {
  //         console.log(err);
  //       });
  //   }
  // }
}
