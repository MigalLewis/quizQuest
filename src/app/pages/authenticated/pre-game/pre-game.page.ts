import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SessionService } from 'src/app/service/session.service';
import { QuizSession } from 'src/app/model/quiz.model';
import { switchMap } from 'rxjs';
import { UserDetail, UserPlayerProfile } from 'src/app/model/user-detail.model';

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

  isChampion(profile: UserPlayerProfile | undefined) {
    if (profile?.numberOfSessionsWon === undefined) {
      return false;
    } else 
      return profile.numberOfSessionsWon! > 0;
  }

  isFirstTimePlayer(profile: UserPlayerProfile | undefined) {
    if (profile?.numberOfCompletedSessions === undefined) {
      return true;
    } else 
      return profile.numberOfCompletedSessions! === 0;
  }
}
