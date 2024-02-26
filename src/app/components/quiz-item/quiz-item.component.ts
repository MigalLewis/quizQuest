import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { QuizItem } from 'src/app/model/quiz.model';

@Component({
  selector: 'app-quiz-item',
  templateUrl: './quiz-item.component.html',
  styleUrls: ['./quiz-item.component.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule],
})
export class QuizItemComponent  implements OnInit {

  @Input() quizItem!: QuizItem;
  time: string;

  constructor() { 
    this.time = 'assets/images/icons/time.svg';
  }

  ngOnInit() {}

  handleChange(ev: any) {
    console.log('Current value:', JSON.stringify(ev.target.value));
  }

}
