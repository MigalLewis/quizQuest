import { Injectable } from '@angular/core';
import { Quiz, QuizItem, QuizSession } from '../model/quiz.model';
import { Firestore, collection, collectionData, doc, docData, setDoc, query, where } from '@angular/fire/firestore';
import { Observable, Subject, of, take, takeUntil } from 'rxjs';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { UserDetail } from '../model/user-detail.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  SESSION_COLLECTION = 'sessions';
  QUIZ_COLLECTION = 'quiz';
  dataArrived: Subject<void>;
  private session: QuizSession | null = null;

  constructor(private firestore: Firestore,
              private alertService: NotificationService,
              private router: Router
    ) { 
      this.dataArrived = new Subject<void>();
    }

  joinSession(gameCode: string, userID: string) {
    let sessionRef = doc(this.firestore, 'sessions/'+gameCode);
    docData(sessionRef)
    .pipe(takeUntil(this.dataArrived)).subscribe((session: any) => {
      if (session) {
        const users = session.users || [];
        const hasUser = users.find((u:string) => u === userID);
        if(!hasUser) {
          users.push(userID);
          setDoc(sessionRef, { users }, { merge: true });
        }
        this.setSession(session);
        this.router.navigate(['authenticated', 'pre', 'game', session.gameCode ]);
        this.dataArrived.next();
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
    const sessionUsersQuery  = query(collection(this.firestore, 'users'), where('uid', 'in',uids));
    return collectionData(sessionUsersQuery) as Observable<UserDetail[]>;
  }

  setSession(session: QuizSession) {
    this.session = session;
  }

  getSession(): QuizSession | null {
    return this.session;
  }

  clearSession() {
    this.session = null;
  }
}
