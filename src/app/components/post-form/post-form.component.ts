import { Component, OnInit, Input, ViewChild, ElementRef, ComponentFactoryResolver } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Post } from '../../models/post.model';
import { Employee } from '../../models/employee.model';
import { AdDirective } from '../../directives/ad.directive';
import * as PostActions from '../../actions/post.actions';
import { AppState } from '../../app.state';

import { EmployeeAutocompleteComponent } from '../../components/employee-autocomplete/employee-autocomplete.component';


@Component({
  selector: 'post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {


  @ViewChild(AdDirective) adHost: AdDirective;

  selectedPost: Observable<Post>
  employees: Observable<Employee[]>;
  employeeList: any
  selectedPostData: Post

  input: any = {displayText: '', value: ''}

  componentFactory: any;
  componentRef: any;
  viewContainerRef: any;

  constructor(private store: Store<AppState>, private componentFactoryResolver: ComponentFactoryResolver) {
    this.selectedPost = this.store.select(state => {
      return state.postData['selectedPost']
    })

    this.employees = this.store.select(state => {
      return state.adminData['employees']
    })

    this.selectedPost.subscribe(selectedPost => {
      if (selectedPost) {
        this.input.displayText = selectedPost.text;
        this.selectedPostData = selectedPost; 
      }
    })
   }

  ngOnInit() {
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(EmployeeAutocompleteComponent);

    this.employees.subscribe((employees)=>{
      this.employeeList = employees
    })
  }

  addPost(text: string){
    let post: Post = { id: '', text: text, markup: '', publicationDate: new Date().toISOString() }
    this.store.dispatch(new PostActions.AddPost(post))
    this.input = {displayText: '', value: ''}
    this.store.dispatch(new PostActions.UpdateAllPosts(this.employeeList))
  }

  updatePost(text: string){
    let post: Post = { id: this.selectedPostData.id, text: text, markup: '', publicationDate: this.selectedPostData.publicationDate }
    this.store.dispatch(new PostActions.UpdatePost(post))
    this.selectedPostData = null;
    this.input = {displayText: '', value: ''}
    this.store.dispatch(new PostActions.UpdateAllPosts(this.employeeList))
  }

  parseTextInput(text){
    let regex = /([@#][\w_-]+)/g
    let atIndex = text.lastIndexOf("@")
    let cardinalIndex = text.lastIndexOf("#")
    let searchCharacter = atIndex > cardinalIndex ? '@' : '#'
    
    text = text.substring(text.lastIndexOf(searchCharacter));
   
    let isMatch = text.match(regex) ? text.match(regex).length > 0 : false

    if(text === searchCharacter){
      this.closeAutocomplete()
    }
    
    this.viewContainerRef = this.adHost.viewContainerRef;

    if(isMatch){
      this.closeAutocomplete()
      this.componentRef = this.viewContainerRef.createComponent(this.componentFactory);
      (<EmployeeAutocompleteComponent>this.componentRef.instance).query = text.substr(1);
      (<EmployeeAutocompleteComponent>this.componentRef.instance).infoType = searchCharacter === '@' ? 'username' : 'phone'
      let componentData = (<EmployeeAutocompleteComponent>this.componentRef.instance).data

      if((<EmployeeAutocompleteComponent>this.componentRef.instance).ngOnInit()){
        componentData = null
      }else{
        componentData.subscribe((value)=>{
          
          if(value.isMatchQuery !== null){
            if(value.isMatchQuery === false)
            this.closeAutocomplete()
       
          }
          if(value.outputText !== ''){
            let str = this.input.displayText;
            let word = searchCharacter+text.substr(1)
            let newWord = value.outputText;
            var n = str.lastIndexOf(word);
            str = str.slice(0, n) + str.slice(n).replace(word, newWord);

            this.input.displayText = this.input.value = str
            
            this.closeAutocomplete()
          }
        })
      }

    }

    if(!(text.includes('@') || text.includes('#')) || text.includes('\r\n') || text.includes('\n') || text.slice(-1) === '' || text.slice(-1) === "\r\n" || text.slice(-1) === "\n"){
      this.closeAutocomplete()
    }
  
  }

  closeAutocomplete(){ 
    if(this.viewContainerRef)
    this.viewContainerRef.clear();
  }

}
