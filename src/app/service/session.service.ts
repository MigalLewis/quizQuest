import { Injectable } from '@angular/core';
import { QuizItem } from '../model/quiz.model';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  SESSION_COLLECTION = 'sessions';

  constructor(private firestore: Firestore,
              private alertService: NotificationService
    ) { }

  joinSession(gameCode: string, userID: string) {
    let sessionRef = doc(this.firestore, `${this.SESSION_COLLECTION}/${gameCode}`);
    docData(sessionRef).subscribe((session: any) => {
      console.log('session');
      console.log(session);
      if (session) {
        const users = session.users || [];
        users.push(userID);
        setDoc(sessionRef, { users });
      } else {
        this.alertService.presentToast(
          'top',
          'Session not found!',
          'toast-class-error');
      }
    });
  }

  getNextQuizItems(): Observable<QuizItem[]> {
    return of([
      {
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
    ])
  }
}
