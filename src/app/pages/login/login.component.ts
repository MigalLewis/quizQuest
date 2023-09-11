import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackgroundComponent } from "../../components/background/background.component";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, BackgroundComponent]
})
export class LoginComponent  implements OnInit {
 formGroup!: FormGroup;
  constructor() { 
      this.formGroup = this.createForm();
  }

  ngOnInit() {}

  signInWithGoogle(){}

  signInWithFacebook(){}

  onRegister() {}

  loginEmailAndPassword(){}

  private createForm() {
    return new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

}
