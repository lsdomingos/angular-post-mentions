import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'valispace';
  constructor(router:Router) {
    router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        //GET DATA FROM SERVICES
      }

    })
  }
}
