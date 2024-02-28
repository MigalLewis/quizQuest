import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, LoadingController } from '@ionic/angular';
import { SessionService } from 'src/app/service/session.service';
import { AuthService } from 'src/app/service/auth.service';
import { BackgroundComponent } from 'src/app/components/background/background.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule,
    ReactiveFormsModule,
    BackgroundComponent
  ]
})
export class HomePage implements OnInit {
  formGroup!: FormGroup;

  constructor(private loadingCtrl: LoadingController, 
    private authService: AuthService,
    private sessionService: SessionService) {

   }

  async ngOnInit() {
    this.formGroup = this.createFormGroup();
    
    // const loading = await this.loadingCtrl.create({
    //   message: 'Loading your folders ...'
    // });
    // loading.present();

    // this.loadingCtrl.dismiss();
  }

  onJoin() {
    if(this.formGroup.valid) {
      let gameCode = this.formGroup.get('gameCode')?.value;
      let uid = this.authService.getUID();
      if(uid && gameCode) {
        this.sessionService.joinSession(gameCode, uid);
      }
    }

  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      gameCode: new FormControl(undefined, [Validators.required])
    });
  }

}
