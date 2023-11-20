import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BackgroundComponent } from 'src/app/components/background/background.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, BackgroundComponent]
})
export class SplashPage implements OnInit {
  timeleft = 3;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.redirect();
  }

  private redirect() {
    let downloadTimer = setInterval(() => {
      if(this.timeleft === 1){
        clearInterval(downloadTimer);
        this.router.navigate(['']);
      }
      this.timeleft -= 1;
    }, 1000);
  }

}
