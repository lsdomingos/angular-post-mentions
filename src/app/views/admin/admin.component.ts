import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Employee } from './../../models/employee.model';
import { AppState } from './../../app.state';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {

  constructor(private store: Store<AppState>) {

   }

  ngOnInit() {

  }

}
