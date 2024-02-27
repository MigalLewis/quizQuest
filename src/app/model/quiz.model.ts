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
