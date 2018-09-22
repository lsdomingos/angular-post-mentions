//CORE
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { OrderByPipe } from "./pipes/orderby.pipe";
import { Safe } from "./pipes/safehtml.pipe";

//DIRECTIVES
import { AdDirective } from './directives/ad.directive';

//REDUCERS
import { adminReducer } from './reducers/admin.reducer';
import { postReducer } from './reducers/post.reducer';

//ANGULAR MATERIAL
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatMenuModule} from '@angular/material/menu'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatCardModule} from '@angular/material/card';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';

//VIEWS
import { AdminComponent } from './views/admin/admin.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';

//COMPONENTS
import { AppComponent } from './app.component';
import { AddEmployeeComponent } from './components/employee-form/employee-form.component';
import { EmployeesListComponent } from './components/employee-list/employee-list.component';
import { PostFeedComponent } from './components/post-feed/post-feed.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { EmployeeAutocompleteComponent } from './components/employee-autocomplete/employee-autocomplete.component';


import 'rxjs';

const appRoutes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: '', component: DashboardComponent },
  { path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AddEmployeeComponent,
    EmployeesListComponent,
    PostFeedComponent,
    DashboardComponent,
    PostFormComponent,
    OrderByPipe,
    Safe,
    AdDirective,
    EmployeeAutocompleteComponent
  ],
  entryComponents: [PostFormComponent, EmployeeAutocompleteComponent],
  imports: [
    //COMPONENTS

    //MATERIAL
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatBottomSheetModule,
    MatGridListModule,
    MatDividerModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatTableModule,
    

    //CORE
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    StoreModule.forRoot({
      adminData: adminReducer,
      postData: postReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: false, // Restrict extension to log-only mode
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
