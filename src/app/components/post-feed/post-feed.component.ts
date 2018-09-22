import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Post } from '../../models/post.model';
import { Employee } from '../../models/employee.model';
import { AppState } from '../../app.state';

import * as PostActions from '../../actions/post.actions';

@Component({
  selector: 'post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.scss']
})
export class PostFeedComponent implements OnInit {

  posts: Observable<Post[]>;
  employees: Observable<Employee[]>;

  constructor(private store: Store<AppState>) {
    this.posts = this.store.select(state => {
      return state.postData['posts']
    })

    this.employees = this.store.select(state => {
      return state.adminData['employees']
    })



  }

  ngOnInit() {
    this.employees.subscribe((employees)=>{
      this.store.dispatch(new PostActions.UpdateAllPosts(employees))
    })
    
  }

  ngAfterViewInit(){
    
  }

  selectPost(post) {
    this.store.dispatch(new PostActions.SelectPost(post))
  }  

  deletePost(index) {
    this.store.dispatch(new PostActions.RemovePost(index))
  }

}
