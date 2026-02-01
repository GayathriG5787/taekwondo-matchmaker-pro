export type Gender = "Male" | "Female";

export type WeightCategory = 
  | "Fin" 
  | "Fly" 
  | "Bantam" 
  | "Feather" 
  | "Light" 
  | "Welter" 
  | "Middle" 
  | "Heavy";

export type District = 
  | "Thiruvananthapuram"
  | "Kollam"
  | "Pathanamthitta"
  | "Alappuzha"
  | "Kottayam"
  | "Idukki"
  | "Ernakulam"
  | "Thrissur"
  | "Palakkad"
  | "Malappuram"
  | "Kozhikode"
  | "Wayanad"
  | "Kannur"
  | "Kasaragod";

export interface Player {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  district: District;
  weightCategory: WeightCategory;
  registeredAt: Date;
}

export type MatchStatus = "Upcoming" | "In Progress" | "Completed";

export interface Match {
  id: string;
  player1: Player;
  player2: Player;
  winner?: Player;
  status: MatchStatus;
  round: number;
  matchNumber: number;
  weightCategory: WeightCategory;
}

export interface TournamentRules {
  genderMatching: boolean;
  weightCategoryMatching: boolean;
  districtRestriction: boolean;
}

export interface TournamentState {
  players: Player[];
  matches: Match[];
  rules: TournamentRules;
  tournamentStarted: boolean;
}
