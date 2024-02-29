
export interface UserDetail {
  uid: string;
  name?: string;
  surname?: string;
  dateOfBirth?: string;
  profileImageUrl?: string;
  hasCompletedRegistration?: boolean;
  email?: string;
  playerProfile?: UserPlayerProfile;
}

export interface UserPlayerProfile {
  numberOfCompletedSessions?: number;
  numberOfSessionsWon?: number;
}
