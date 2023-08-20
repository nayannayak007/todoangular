
import { Injectable, Renderer2 } from "@angular/core";

import {
    MatSnackBar,
    MatSnackBarConfig,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
  } from '@angular/material/snack-bar';

@Injectable({ providedIn: "root" })
export class SnackBarService
{
   horizontalPosition: MatSnackBarHorizontalPosition = 'right';
   verticalPosition: MatSnackBarVerticalPosition = 'top';
    constructor(private _snackBar: MatSnackBar) {}
    
    openSnackBar(msg:string) {
        debugger
        const isSuccess =  msg.toLowerCase().indexOf('error') > -1 ? false : true;
        let panelClass = [];
      
        
        if (isSuccess) {
            panelClass = ['success-snackbar'];
          } else {
            panelClass = ['error-snackbar'];
          }
        
          this._snackBar.open(msg,'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: panelClass
          });
       
      }
  
}