import { Component } from '@angular/core';
import InputDataValidationType from '../validation/input-data-validation.interface';
import { setErrorValidation, setSuccessValidation } from '../validation/set-validation-data.function';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss', '../authentication-card.scss']
})
export class ChangePasswordComponent {
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

  onInputChange(){
    console.info('Input changed')
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

  togglePasswordVisibility(){
    this.passwordHidden = !this.passwordHidden;
  }

  changePassword(event: any) {
    event.preventDefault();
    this.authService.changeUserPassword(this.data[0].text, this.data[1].text).then((res) => {
      this.snackBar.open('Contraseña cambiada exitosamente', '', {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: ['success-snackbar']
      });
      this.router.navigate(['/authentication/login'])
    }).catch((err) => {
      this.snackBar.open('Error al cambiar la contraseña', '', {
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
              'Escribe tu nueva contraseña',
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
