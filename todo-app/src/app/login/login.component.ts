import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { SnackBarService } from '../services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({  
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private authService: AuthService,  private router: Router, private snack: SnackBarService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
  
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.authService.login(formData?.username, formData?.password).subscribe((data:any) => {
        localStorage.setItem('authToken', data.token);
        this.snack.openSnackBar('Logged In Successfully');
        this.router.navigateByUrl('/tasks').then(() =>{
          window.location.reload();
        });
      })
    }
  }
}
