import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Input() quizItem: QuizItem | undefined;
  @Output() select!: EventEmitter<{
    id: string, 
    selectedOption: string | undefined, 
    correct: boolean}>;
  correct!: boolean;
  selectedOption: string | undefined;


  constructor() { 
    this.select = new EventEmitter();
  }

  ngOnInit() {}

  handleChange(ev: any) {
    console.log('Current value:', JSON.stringify(ev.target.value));
    this.isCorrect();
    this.select.emit(
      {
        correct: this.correct,
        id: this.quizItem?.question? this.quizItem.question: '',
        selectedOption: this.selectedOption
      }
    )
  }

  isCorrect() {
    if(this.quizItem && this.selectedOption === this.quizItem.correctAnswer) {
      this.correct = true;
    }
    this.correct = false;
  }

}
