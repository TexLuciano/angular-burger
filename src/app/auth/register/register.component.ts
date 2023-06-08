import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ToastService } from 'angular-toastify';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toast: ToastService
  ) {}
  ngOnInit(): void {
    this.createForm();
  }

  formCadastroUser!: FormGroup;

  createForm() {
    this.formCadastroUser = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confimPassword: ['', Validators.required],
    });
  }

  submit() {
    if (this.formCadastroUser.valid) {
      const user = {
        name: this.formCadastroUser.controls['name'].value,
        email: this.formCadastroUser.controls['email'].value,
        password: this.formCadastroUser.controls['password'].value,
      };

      try {
        this.authService.createUser(user).subscribe(
          (res) => {
            console.log();
            res.status === 201 && this.toast.success('Usuario criado!');
          },
          (error: HttpErrorResponse) => {
            if (error) {
              this.toast.error('Tente novamente mais tarde');
            }
          }
        );
      } catch (error) {
        
        console.log(error);
      }
    }

    console.log(this.formCadastroUser.value);
  }
}
