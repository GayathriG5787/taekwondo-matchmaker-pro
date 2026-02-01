import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useTournament } from "@/context/TournamentContext";
import { Trophy, ArrowRight, Users } from "lucide-react";
import { Match, Player } from "@/types/tournament";

const getRoundName = (round: number): string => {
  switch (round) {
    case 1:
      return "Quarter Finals";
    case 2:
      return "Semi Finals";
    case 3:
      return "Final";
    default:
      return `Round ${round}`;
  }
};

const getStatusColor = (status: Match["status"]): string => {
  switch (status) {
    case "Upcoming":
      return "secondary";
    case "In Progress":
      return "default";
    case "Completed":
      return "outline";
    default:
      return "secondary";
  }
};

const MatchAllocation = () => {
  const { matches, selectWinner, tournamentStarted } = useTournament();

  // Group matches by round
  const matchesByRound = matches.reduce((acc, match) => {
    if (!acc[match.round]) {
      acc[match.round] = [];
    }
    acc[match.round].push(match);
    return acc;
  }, {} as Record<number, Match[]>);

  const totalMatches = matches.length;
  const completedMatches = matches.filter((m) => m.status === "Completed").length;
  const progressPercent = totalMatches > 0 ? (completedMatches / totalMatches) * 100 : 0;

  // Find the tournament winner
  const finalMatch = matches.find((m) => m.round === 3 && m.status === "Completed");
  const tournamentWinner = finalMatch?.winner;

  const handleWinnerSelect = (match: Match, winner: Player) => {
    selectWinner(match.id, winner);
  };

  if (!tournamentStarted || matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Trophy className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">No Matches Generated</h1>
        <p className="text-muted-foreground mb-6 max-w-md">
          Go to the Admin Dashboard to configure tournament rules and generate matches.
        </p>
        <Button asChild>
          <Link to="/admin">
            Go to Admin Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Match Allocation</h1>
        <p className="text-muted-foreground mt-1">
          Tournament bracket and match progression
        </p>
      </div>

      {/* Progress Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tournament Progress</CardTitle>
              <CardDescription>
                {completedMatches} of {totalMatches} matches completed
              </CardDescription>
            </div>
            {tournamentWinner && (
              <div className="flex items-center gap-2 text-primary">
                <Trophy className="h-5 w-5" />
                <span className="font-semibold">Winner: {tournamentWinner.name}</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercent} className="h-2" />
        </CardContent>
      </Card>

      {/* Rounds */}
      {Object.entries(matchesByRound)
        .sort(([a], [b]) => parseInt(a) - parseInt(b))
        .map(([round, roundMatches]) => (
          <Card key={round}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{round}</span>
                </div>
                {getRoundName(parseInt(round))}
              </CardTitle>
              <CardDescription>
                {roundMatches.length} match{roundMatches.length > 1 ? "es" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {roundMatches.map((match) => (
                  <div
                    key={match.id}
                    className="border rounded-lg p-4 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">
                        Match {match.matchNumber}
                      </span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{match.weightCategory}</Badge>
                        <Badge variant={getStatusColor(match.status) as "default" | "secondary" | "outline"}>
                          {match.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Player 1 */}
                      <button
                        onClick={() => handleWinnerSelect(match, match.player1)}
                        disabled={match.status === "Completed"}
                        className={`flex-1 p-3 rounded-lg border-2 transition-all text-left ${
                          match.winner?.id === match.player1.id
                            ? "border-primary bg-primary/10"
                            : "border-transparent bg-muted/50 hover:bg-muted"
                        } ${match.status === "Completed" ? "cursor-default" : "cursor-pointer"}`}
                      >
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{match.player1.name}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {match.player1.district}
                        </p>
                      </button>

                      <span className="text-sm font-bold text-muted-foreground">VS</span>

                      {/* Player 2 */}
                      <button
                        onClick={() => handleWinnerSelect(match, match.player2)}
                        disabled={match.status === "Completed"}
                        className={`flex-1 p-3 rounded-lg border-2 transition-all text-left ${
                          match.winner?.id === match.player2.id
                            ? "border-primary bg-primary/10"
                            : "border-transparent bg-muted/50 hover:bg-muted"
                        } ${match.status === "Completed" ? "cursor-default" : "cursor-pointer"}`}
                      >
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{match.player2.name}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {match.player2.district}
                        </p>
                      </button>
                    </div>

                    {match.status !== "Completed" && (
                      <p className="text-xs text-center text-muted-foreground">
                        Click on a player to select as winner
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default MatchAllocation;
