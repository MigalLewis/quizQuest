
export interface RankedPlayer {
    position: number;
    name: string;
    photoUrl?: string;
    points?: number;
    completionTime?: string;
  }
  
  export interface UserResponse {
    userID: string;
    sessionID: string;
    questionID: string;
    selectedOption: string;
    isCorrect: boolean;
  }