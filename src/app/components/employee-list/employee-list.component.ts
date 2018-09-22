import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Employee } from '../../models/employee.model';
import { Post } from '../../models/post.model';
import { AppState } from '../../app.state';

import * as AdminActions from '../../actions/admin.actions';
import * as PostActions from '../../actions/post.actions';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeesListComponent implements OnInit {

  

  employees: Observable<Employee[]>;

  posts: Observable<Post[]>;

  displayedColumns: string[] = ['name', 'username', 'phone', 'role', 'admin'];
  dataSource: any = []

  constructor(private store: Store<AppState>) {
    this.employees = this.store.select(state => {
      return state.adminData['employees']
    })


   }

   deleteEmployee(index) {
    this.store.dispatch(new AdminActions.RemoveEmployee(index))
  }

  selectEmployee(employee) {
    this.store.dispatch(new AdminActions.SelectEmployee(employee))
  }  

  ngOnInit() {
    this.employees.subscribe((employees)=>{
      console.log('------')
      this.dataSource = employees
    })
  }
}
