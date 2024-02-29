import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { QuizItemComponent } from 'src/app/components/quiz-item/quiz-item.component';
import { Quiz, QuizItem } from 'src/app/model/quiz.model';
import { SessionService } from 'src/app/service/session.service';
import { TimerService } from 'src/app/service/timer-service.service';


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
  timer!: number;
  timerSubscription: Subscription;
  allowSelection: boolean;
  timeIcon: string;

  constructor(private sessionService: SessionService,
              private timerService: TimerService) { 
    this.subscriptions = [];
    this.timeIcon = 'assets/images/icons/time.svg';
    this.allowSelection = true;
    this.timerSubscription = this.timerService.getTimer().subscribe(timer => {
      this.timer = timer;
      if (timer === 0) {
        this.allowSelection = false;
        console.log(this.allowSelection);
      }
    });
  }

  ngOnInit() {
    let session = this.sessionService.getSession();
    if(session && session.quiz) {
      this.subscriptions.push(
        this.sessionService.getQuiz(session.quiz).subscribe(data => {
          this.quiz = data;
          this.nextQuestion(1);
        })
      );
    }

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  nextQuestion(no: number) {
    this.currentQuizItem = this.quiz.quizItems.find(qi => qi.no === no);
    if(this.currentQuizItem) {
      this.timerService.startTimer(this.currentQuizItem.time);
    }
  }

  onSelect(answer: any) {
    console.log(answer);
  }

  getTime():number {
    if(this.timer) {
      return this.timer * 1000;
    }
    return 0;
  }

}
