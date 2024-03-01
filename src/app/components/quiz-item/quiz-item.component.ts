import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
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

  constructor() { 
  }

  ngOnInit() {
  }

  handleChange(option: string) {
    if (this.formGroup) {
      this.formGroup.patchValue({
        selectedOption: option
      });
    }
  }

}
