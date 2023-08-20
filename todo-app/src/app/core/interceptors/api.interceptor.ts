import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { Router } from "@angular/router";
import { SnackBarService } from "src/app/services/snackbar.service";

@Injectable({ providedIn: "root" })
export class ApiInterceptor implements HttpInterceptor {
  constructor(private router : Router, private snack : SnackBarService){}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
   
    const token = localStorage.getItem('authToken');
    let apiReq = req;
    apiReq = req.clone({ url: `https://todoappwebapi.azurewebsites.net/api${req.url}`, setHeaders : { Authorization: `Bearer ${token}`} });
   
    return next.handle(apiReq).pipe(
      catchError((error: HttpErrorResponse) => {
       if(error.status == 401 || error.status == 0)
       {
        localStorage.removeItem('authToken');
        this.snack.openSnackBar('ERROR: ' + 'You have been logged out');
        this.router.navigateByUrl('/login');
       }
       if(error.status == 500)
       {
        console.log(error);
        this.snack.openSnackBar('ERROR: Something went wrong.' );
       }
        error.error.errors.forEach((e:any) => {
            this.snack.openSnackBar('ERROR: ' + e.description);
        });

        return throwError(error);
      })
    );
  }
}
