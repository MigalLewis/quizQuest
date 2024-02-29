import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SessionService } from 'src/app/service/session.service';
import { QuizSession } from 'src/app/model/quiz.model';
import { switchMap } from 'rxjs';
import { UserDetail } from 'src/app/model/user-detail.model';

@Component({
  selector: 'app-pre-game',
  templateUrl: './pre-game.page.html',
  styleUrls: ['./pre-game.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PreGamePage {
  session!: QuizSession;
  users!: UserDetail[];


  constructor(private sessionService: SessionService) { }


  @Input()
  set gameCode(code: string) {
    this.sessionService.getSessionByGameCode(code)
      .pipe(
        switchMap(session => {
        this.session = session;
        const uids = session.users!;
        return this.sessionService.getSessionUsersByUids(uids);
      }))
      .subscribe(users => this.users = users);
  }

}
