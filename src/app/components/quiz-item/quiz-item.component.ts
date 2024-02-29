import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { QuizItem } from 'src/app/model/quiz.model';

@Component({
  selector: 'app-quiz-item',
  templateUrl: './quiz-item.component.html',
  styleUrls: ['./quiz-item.component.scss'],
  standalone: true,
  imports: [ IonicModule,
              ReactiveFormsModule,
              CommonModule],
})
export class QuizItemComponent  implements OnInit {

  @Input() quizItem: QuizItem | undefined;
  @Input() formGroup!: FormGroup;
  correct!: boolean;
  selectedOption: string | undefined;


  constructor() { 
  }

  ngOnInit() {
  }

  handleChange(option: string) {
    this.selectedOption = option;
    this.isCorrect();
    if (this.formGroup) {
      this.formGroup.patchValue({
        selectedOption: {
          correct: this.correct,
          id: this.quizItem?.question? this.quizItem.question: '',
          selectedOption: option
        }
      });
    }
  }

  isCorrect() {
    if(this.quizItem && this.selectedOption === this.quizItem.correctAnswer) {
      this.correct = true;
    }
    this.correct = false;
  }

}
