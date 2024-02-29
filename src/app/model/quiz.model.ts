import { Timestamp } from '@angular/fire/firestore';

export interface QuizItem {
    question:string;
    no:number;
    total:number;
    time:number;
    options: string[];
    correctAnswer: string;
}

export interface Quiz {
    id: string;
    topic: string;
    quizItems: QuizItem[];
}

export interface UserAnswer {
    questionID: string;
    answer: string;
    timestamp: Timestamp;
    correct: boolean;
}

export interface QuizSession {
    gameCode: string;
    users?: string[];
    quiz?: string;
    host?: string;
    status: SessionStatus;
}

export enum SessionStatus {
    WaitingPlayers = 'WaitingPlayers',
    Running = 'Running',
    Finnished = 'Finnished',
}
