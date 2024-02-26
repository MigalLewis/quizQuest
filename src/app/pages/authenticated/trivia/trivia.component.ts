import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { QuizItemComponent } from 'src/app/components/quiz-item/quiz-item.component';
import { Quiz, QuizItem } from 'src/app/model/quiz.model';
import { SessionService } from 'src/app/service/session.service';


@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule,
    ReactiveFormsModule,
    QuizItemComponent
  ]
})
export class TriviaPage  implements OnInit, OnDestroy {

  quiz!: Quiz;
  subscriptions: Subscription[];
  currentQuizItem: QuizItem | undefined;

  constructor(private sessionService: SessionService) { 
    this.subscriptions = [];
  }

  ngOnInit() {
    this.subscriptions.push(
      // TODO: X0zysjnjj3Ms2EK5WhHd should come from the session that the user joined
      this.sessionService.getQuiz('X0zysjnjj3Ms2EK5WhHd').subscribe(data => {
        this.quiz = data;
        this.nextQuestion(1);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  nextQuestion(no: number) {
    this.currentQuizItem = this.quiz.quizItems.find(qi => qi.no === no);
  }

  onSelect(answer: any) {
    console.log(answer);
  }

}
