import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { SnackBarService } from '../services/snackbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', [
      Validators.required,
      Validators.minLength(8), 
      Validators.pattern(/[a-z]/), 
      Validators.pattern(/[A-Z]/),
      Validators.pattern(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/), 
      Validators.pattern(/\d/) 
    ]]
  });
  
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snack: SnackBarService) {}

  ngOnInit(): void {
   
  }

  
  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get email() {
    return this.registerForm.get('email');
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.authService.register(formData.email,formData.username, formData.password).subscribe((data:any) => {
        this.snack.openSnackBar('You have been registered successfully');
        this.router.navigateByUrl('/login');
      });
    }
  }
}
