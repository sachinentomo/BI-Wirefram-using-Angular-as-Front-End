import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee Management';
  navigationMenu = [
    {'name': 'Department', 'route': 'department'},
    {'name': 'Project', 'route': 'project'},
    {'name': 'Employee', 'route': 'employee'},
    {'name': 'Search', 'route': 'search'},
    {'name': 'Report', 'route': 'report'},
    {'name': 'Result', 'route': 'result'}
  ];
}
