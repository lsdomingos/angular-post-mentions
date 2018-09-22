import { Component, OnInit } from '@angular/core';
import {MatBottomSheet} from '@angular/material';
import { PostFormComponent } from '../../components/post-form/post-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
  }
  
  addPost(): void {
    this.bottomSheet.open(PostFormComponent);
  }
}
