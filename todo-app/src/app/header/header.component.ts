import { Component, LOCALE_ID } from '@angular/core';
import { SnackBarService } from '../services/snackbar.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  constructor(private snack: SnackBarService, private router: Router){
    const token = localStorage.getItem('authToken');
    if(token){
      this.isLoggedIn = true;
    }
  }
  logout():void {
    localStorage.removeItem('authToken');
    this.snack.openSnackBar('Logged Out Successfully');
    this.router.navigateByUrl('/login');
    window.location.reload();
  }
}
