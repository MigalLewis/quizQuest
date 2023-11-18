import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BackgroundComponent } from 'src/app/components/background/background.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, BackgroundComponent, ReactiveFormsModule]
})
export class SignUpPage {

 formGroup: FormGroup;

 constructor(
  private formBuilder: FormBuilder,
  private authService: AuthService) {
  this.formGroup  = this.createForm();
 }

  private createForm() {
    return this.formBuilder.group({
      email: ['', 
        [Validators.required, Validators.email]
      ],
      password: ['',
        [ Validators.required, Validators.minLength(6)]
      ],
      confirmPassword: ['', 
        [Validators.required, Validators.min(6)]
      ]
    });
  }

  googleAuth() {
    this.authService.googleAuth();
  }

  facebookAuth() {
    this.authService.facebookAuth();
  }

  emailAndPasswordRegistration() {
    const email = this.formGroup.get('email')?.value as string;
    const password = this.formGroup.get('password')?.value as string;

    this.authService.emailAndPasswordRegistration(email, password);
    
  }

  get emailControl() {
    return this.formGroup.get('email');
  }

  get passwordControl() {
    return this.formGroup.get('password');
  }

  get confirmPasswordControl() {
    return this.formGroup.get('confirmPassword');
  }
}
