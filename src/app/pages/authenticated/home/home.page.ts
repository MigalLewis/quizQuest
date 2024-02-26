import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController } from '@ionic/angular';
import { QuizItemComponent } from 'src/app/components/quiz-item/quiz-item.component';
import { QuizItem } from 'src/app/model/quiz.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule,
    QuizItemComponent
  ]
})
export class HomePage implements OnInit {
  quizItem: QuizItem;

  constructor(private loadingCtrl: LoadingController) {
    this.quizItem = {
      id: '12',
      no: 4,
      total: 12,
      question: 'What is the smallest country in the world by land area?',
      options: [
        'Monaco',
        'Nauru',
        'Vatican City',
        'Liechtenstein'
      ],
      time: 60
    }
   }

  async ngOnInit() {

    
    // const loading = await this.loadingCtrl.create({
    //   message: 'Loading your folders ...'
    // });
    // loading.present();

    // this.loadingCtrl.dismiss();
  }

}
