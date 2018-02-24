import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertComponent } from './../../app/main/shared/alert.component';

@Injectable()
export class AuthGuard implements CanActivate {
  /**
   *Guards authorized pages and restricts them by providing authentication layer.
   UnAuthenticated users will be redirected to Login page..
   */
  constructor(private router: Router, public dialog: MatDialog) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {    
    if (localStorage.getItem('currentUser')) {
      let currentDate = new Date();
      let tokenExpiryDate = new Date(JSON.parse(localStorage.getItem('currentUser')).tokenExpiryDate);
      if (tokenExpiryDate < currentDate) {
        let dialogRef = this.dialog.open(AlertComponent, {
          width: '250px',
          height:'150px',
          data: {
            message:'Your Session got expired'
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
          return false;
        })        
      }
      else {
        return true;
      }
    }
    this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
