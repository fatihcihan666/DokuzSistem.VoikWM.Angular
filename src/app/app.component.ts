import { Component } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DokuzSistem.VoikWM.Angular';

  constructor(private router: Router) {

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator

        setTimeout(function () {
          environment.isLoading = true;
        }, 500);//wait 2 seconds
      }

      if (event instanceof NavigationEnd) {
        setTimeout(function () {
          environment.isLoading = false;
        }, 500);//wait 2 seconds

      }

      if (event instanceof NavigationError) {
        // Hide loading indicator
        environment.isLoading = false;

        // Present error to user
        console.log(event.error);
      }
    });
  }
}
