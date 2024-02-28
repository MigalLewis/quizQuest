import { Injectable } from '@angular/core';
import { Quiz, QuizItem, QuizSession } from '../model/quiz.model';
import { Firestore, collection, collectionData, doc, docData, setDoc, query, where } from '@angular/fire/firestore';
import { Observable, of, take } from 'rxjs';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { UserDetail } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  SESSION_COLLECTION = 'sessions';
  QUIZ_COLLECTION = 'quiz';

  constructor(private firestore: Firestore,
              private alertService: NotificationService,
              private router: Router
    ) { }

  joinSession(gameCode: string, userID: string) {
    let sessionRef = doc(this.firestore, 'sessions/'+gameCode);
    docData(sessionRef)
    .pipe(take(1)).subscribe((session: any) => {
      if (session) {
        const users = session.users || [];
        users.push(userID);
        setDoc(sessionRef, { users }, { merge: true });
        this.router.navigate(['authenticated', 'pre', 'game', session.gameCode ])
      } else {
        this.alertService.presentToast(
          'top',
          'Session not found!',
          'toast-class-error');
      }
    });
  }

  getQuiz(id: string): Observable<Quiz> {
    return docData(doc(this.firestore, 'quiz/'+ id)) as Observable<Quiz>;
  }

  getAllQuiz(): Observable<Quiz[]> {
    return collectionData(collection(this.firestore, 'quiz')) as Observable<Quiz[]>;
  }

  getSessionByGameCode(gameCode: string){
    return docData(doc(this.firestore, 'sessions/'+gameCode)) as Observable<QuizSession>;
  }

  getSessionUsersByUids(uids: string[]) {
    const q  = query(collection(this.firestore, 'users'), where('uid', 'in',uids));
    return collectionData(q) as Observable<UserDetail[]>;
  }
}
