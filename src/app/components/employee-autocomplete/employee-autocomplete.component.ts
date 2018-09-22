import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { Employee } from '../../models/employee.model';
import { AppState } from '../../app.state';

import * as AdminActions from '../../actions/admin.actions';

@Component({
  selector: 'app-employee-autocomplete',
  templateUrl: './employee-autocomplete.component.html',
  styleUrls: ['./employee-autocomplete.component.scss']
})
export class EmployeeAutocompleteComponent implements OnInit {
  @Input() query: string;
  @Input() infoType: string;
  employees: Observable<Employee[]>;
  filteredList: Employee[];
  data: BehaviorSubject<any>

  constructor(private store: Store<AppState>) { 
    this.employees = this.store.select(state => {
      return state.adminData['employees']
    })
    this.data = new BehaviorSubject({isMatchQuery: false, outputText: '', outputValue: ''});

  }

  ngOnInit() {
    
    this.employees.subscribe(employees => {
      this.filteredList = employees.filter((item)=>{
        let queryText = this.query.toLocaleLowerCase()
        let employeeName = item.name.toLowerCase()
        let employeeUserName = item.username.toLowerCase()
        let employeePhone = item.phone
        return (queryText !== ' ') && employeeName.includes(queryText) || employeeUserName.includes(queryText) || ( this.infoType === 'phone' && employeePhone.includes(queryText)) 
      })
      let data = {isMatchQuery: this.filteredList.length > 0, outputText: ''}
      this.data.next(data)
    })
  }

  ngOnDestroy(){

  }

  addEmployeeTag(employee){
    let data
    if(this.infoType === 'username'){
      data = {isMatchQuery: this.filteredList.length > 0, outputText: '@' + employee.username}
    }else{
      data = {isMatchQuery: this.filteredList.length > 0, outputText: '#' + employee.phone}
    }
    this.data.next(data)
  }

}
