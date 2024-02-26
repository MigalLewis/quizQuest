export interface QuizItem {
    id: string;
    question:string;
    no:number;
    total:number;
    time:number;
    options: string[];
    selectedOption: string;
    correct?: boolean;
}
