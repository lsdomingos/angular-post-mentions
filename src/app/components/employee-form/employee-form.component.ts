import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Employee } from '../../models/employee.model';
import * as AdminActions from '../../actions/admin.actions';
import * as PostActions from '../../actions/post.actions';
import { AppState } from '../../app.state';

@Component({
  selector: 'employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  @ViewChild('name') name: ElementRef;
  @ViewChild('username') username: ElementRef;
  @ViewChild('role') role: ElementRef;
  @ViewChild('phone') phone: ElementRef;
  @ViewChild('employeeForm') employeeForm: ElementRef;

  selectedEmployee: Observable<Employee>;
  selectedEmployeeData: any = null;
  employees: Observable<Employee>;
  employeesData: any;
  valid: boolean = true;
  usernameValue: any;
  nameValue: any;
  phoneValue: any;

  constructor(private store: Store<AppState>) { 
    this.selectedEmployee = this.store.select(state => {
      return state.adminData['selectedEmployee']
    })

    this.employees = this.store.select(state => {
      return state.adminData['employees']
    })
  }

  ngOnInit() {


    this.selectedEmployee.subscribe(selectedEmployee => {
      if (selectedEmployee) {
        this.selectedEmployeeData = selectedEmployee;
        this.fillInputValues(selectedEmployee.id, selectedEmployee.name, selectedEmployee.username, selectedEmployee.phone, selectedEmployee.role)
      }
    })

    this.employees.subscribe((employees)=>{
      this.employeesData = employees
    })
  }

  addEmployee(name: string, username: string, phone: string, role: string) {
    let employee: Employee = { id: '', name: name, username: username, phone: phone, role: role }
    this.store.dispatch(new AdminActions.AddEmployee(employee))
    this.fillInputValues()
  }

  updateEmployee(name: string, username: string, phone: string, role: string) {
    let employee: Employee = { id: this.selectedEmployeeData.id, name: name, username: username, phone: phone, role: role }
    this.store.dispatch(new AdminActions.UpdateEmployee(employee))
    this.fillInputValues()
    this.selectedEmployeeData = null;
  }

  fillInputValues(id: string = '', name: string = '', username: string = '', phone: string = '', role: string = '') {
    this.nameValue = name
    this.usernameValue = username
    this.role.nativeElement.value = role
    this.phoneValue = phone
    //this.selectedEmployeeData = {id: id , name: name, username: username, phone: phone, role: role}
  }

  validateUsername(text){

  }

  validatePhone(text){
    this.valid = true
    this.employeesData.forEach(element => {
      if(element.phone === text){
        this.valid = false
      }
    });
  }

}
