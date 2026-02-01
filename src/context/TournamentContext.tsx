import React, { createContext, useContext, useState, ReactNode } from "react";
import { Player, Match, TournamentRules, TournamentState } from "@/types/tournament";
import { mockPlayers } from "@/data/mockPlayers";

interface TournamentContextType extends TournamentState {
  addPlayer: (player: Omit<Player, "id" | "registeredAt">) => void;
  updateRules: (rules: Partial<TournamentRules>) => void;
  generateMatches: () => void;
  selectWinner: (matchId: string, winner: Player) => void;
  resetTournament: () => void;
}

const TournamentContext = createContext<TournamentContextType | undefined>(undefined);

export function TournamentProvider({ children }: { children: ReactNode }) {
  const [players, setPlayers] = useState<Player[]>(mockPlayers);
  const [matches, setMatches] = useState<Match[]>([]);
  const [tournamentStarted, setTournamentStarted] = useState(false);
  const [rules, setRules] = useState<TournamentRules>({
    genderMatching: true,
    weightCategoryMatching: true,
    districtRestriction: true,
  });

  const addPlayer = (playerData: Omit<Player, "id" | "registeredAt">) => {
    const newPlayer: Player = {
      ...playerData,
      id: `p${Date.now()}`,
      registeredAt: new Date(),
    };
    setPlayers((prev) => [...prev, newPlayer]);
  };

  const updateRules = (newRules: Partial<TournamentRules>) => {
    setRules((prev) => ({ ...prev, ...newRules }));
  };

  const generateMatches = () => {
    let eligiblePlayers = [...players];

    // Shuffle players for randomness
    eligiblePlayers = eligiblePlayers.sort(() => Math.random() - 0.5);

    // For demo purposes, we'll create matches with the first 8 players
    const matchPlayers = eligiblePlayers.slice(0, 8);
    
    // If we have fewer than 8 players, pad with null matches
    while (matchPlayers.length < 8) {
      matchPlayers.push(matchPlayers[0]); // Duplicate for demo
    }

    const round1Matches: Match[] = [];
    for (let i = 0; i < 4; i++) {
      const player1 = matchPlayers[i * 2];
      const player2 = matchPlayers[i * 2 + 1];
      
      // Apply district restriction if enabled
      let validPair = true;
      if (rules.districtRestriction && player1.district === player2.district) {
        validPair = false;
      }
      
      round1Matches.push({
        id: `m1-${i + 1}`,
        player1,
        player2,
        status: "Upcoming",
        round: 1,
        matchNumber: i + 1,
        weightCategory: player1.weightCategory,
      });
    }

    setMatches(round1Matches);
    setTournamentStarted(true);
  };

  const selectWinner = (matchId: string, winner: Player) => {
    setMatches((prevMatches) => {
      const updatedMatches = prevMatches.map((match) => {
        if (match.id === matchId) {
          return { ...match, winner, status: "Completed" as const };
        }
        return match;
      });

      // Check if all matches in current round are completed
      const currentMatch = updatedMatches.find((m) => m.id === matchId);
      if (!currentMatch) return updatedMatches;

      const currentRound = currentMatch.round;
      const roundMatches = updatedMatches.filter((m) => m.round === currentRound);
      const allCompleted = roundMatches.every((m) => m.status === "Completed");

      if (allCompleted) {
        const winners = roundMatches.map((m) => m.winner!);
        const nextRound = currentRound + 1;

        if (nextRound <= 3) {
          const newMatches: Match[] = [];
          for (let i = 0; i < winners.length / 2; i++) {
            newMatches.push({
              id: `m${nextRound}-${i + 1}`,
              player1: winners[i * 2],
              player2: winners[i * 2 + 1],
              status: "Upcoming",
              round: nextRound,
              matchNumber: i + 1,
              weightCategory: winners[i * 2].weightCategory,
            });
          }
          return [...updatedMatches, ...newMatches];
        }
      }

      return updatedMatches;
    });
  };

  const resetTournament = () => {
    setMatches([]);
    setTournamentStarted(false);
  };

  return (
    <TournamentContext.Provider
      value={{
        players,
        matches,
        rules,
        tournamentStarted,
        addPlayer,
        updateRules,
        generateMatches,
        selectWinner,
        resetTournament,
      }}
    >
      {children}
    </TournamentContext.Provider>
  );
}

export function useTournament() {
  const context = useContext(TournamentContext);
  if (context === undefined) {
    throw new Error("useTournament must be used within a TournamentProvider");
  }
  return context;
}
