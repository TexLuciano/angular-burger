import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from 'angular-toastify';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    this.loginForm();
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toast: ToastService,
    private router: Router
  ) {}

  loginUser!: FormGroup;



  submit() {
    if (this.loginUser.valid) {
      try {
        this.authService.loginUser(this.loginUser.value).subscribe(
          (res) => {
          
            
            if (res.token) {
            
              sessionStorage.setItem('userAngularBurger', res.token);
            }
            res.name && this.toast.success(`Bem vindo ${res.name && res.name}`);

            setTimeout(() => {
              res.name && this.router.navigate(['home']);
            }, 1000);
          },
          (error: HttpErrorResponse) => {
            if (error) {
              error.status === 401 &&
                this.toast.error('Verifique seu email e senha');
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  }

  loginForm() {
    this.loginUser = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
}
