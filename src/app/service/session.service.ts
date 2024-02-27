import { Injectable } from '@angular/core';
import { Quiz, QuizItem } from '../model/quiz.model';
import { Firestore, collection, collectionData, doc, docData, setDoc } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  SESSION_COLLECTION = 'sessions';
  QUIZ_COLLECTION = 'quiz';

  constructor(private firestore: Firestore,
              private alertService: NotificationService
    ) { }

  joinSession(gameCode: string, userID: string) {
    let sessionRef = doc(this.firestore, 'sessions/'+gameCode);
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

  getQuiz(id: string): Observable<Quiz> {
    return docData(doc(this.firestore, 'quiz/'+ id)) as Observable<Quiz>;
  }

  getAllQuiz(): Observable<Quiz[]> {
    return collectionData(collection(this.firestore, 'quiz')) as Observable<Quiz[]>;
  }
}
