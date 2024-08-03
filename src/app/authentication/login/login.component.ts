import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import InputDataValidationType from '../validation/input-data-validation.interface';
import {
  setErrorValidation,
  setSuccessValidation,
} from '../validation/set-validation-data.function';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../authentication-card.scss'],
})
export class LoginComponent {
  data: Array<InputDataValidationType> = [
    {
      id: 'email-input',
      text: '',
      error: false,
      validators: [],
    },
    {
      id: 'password-input',
      text: '',
      error: false,
      validators: [],
    },
  ];

  passwordHidden: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.setValidators();
  }

  onInputChange() {
    console.info('Input changed');
  }

  onFocusOut(e: any) {
    const element = e.target as HTMLElement;
    this.data
      .find((inputData: InputDataValidationType) => inputData.id === element.id)
      ?.validators.every((validator: Function) => validator());
  }

  isFormValid() {
    return this.data.every((inputData: InputDataValidationType) =>
      inputData.validators.every((validator: Function) => validator(false))
    );
  }

  togglePasswordVisibility() {
    this.passwordHidden = !this.passwordHidden;
  }

  logIn(event: any) {
    event.preventDefault();
    console.info('Login button clicked');

    this.authService.login(this.data[0].text, this.data[1].text).then((data: any) => {
      console.info('Data received', data);
      //route to home
      this.router.navigate(['/home']);
    }).catch((error: any) => {
      this.snackBar.open('Usuario o contraseña incorrectos', '', {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    })
  }

  private setValidators() {
    this.setEmailValidator();
    this.setPasswordValidator();
  }

  private setEmailValidator() {
    const emailInput = this.data[0];
    emailInput.validators.push(
      (changeValues: boolean = true) => {
        return emailInput.text.length === 0
          ? setErrorValidation(emailInput, 'Escribe tu correo', changeValues)
          : setSuccessValidation(emailInput);
      },
      (changeValues: boolean = true) => {
        return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          emailInput.text
        )
          ? setSuccessValidation(emailInput)
          : setErrorValidation(
              emailInput,
              'Correo electrónico inválido',
              changeValues
            );
      }
    );
  }

  private setPasswordValidator() {
    const passwordInput = this.data[1];
    passwordInput.validators.push(
      (changeValues: boolean = true) => {
        return passwordInput.text.length === 0
          ? setErrorValidation(
              passwordInput,
              'Escribe tu contraseña',
              changeValues
            )
          : setSuccessValidation(passwordInput);
      },
      (changeValues: boolean = true) => {
        return passwordInput.text.length < 8
          ? setErrorValidation(
              passwordInput,
              'La contraseña debe tener al menos 8 caracteres',
              changeValues
            )
          : setSuccessValidation(passwordInput);
      }
    );
  }
}
