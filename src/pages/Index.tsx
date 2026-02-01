import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Trophy, UserPlus, Settings, ArrowRight } from "lucide-react";
import { useTournament } from "@/context/TournamentContext";

const Index = () => {
  const { players, matches, tournamentStarted } = useTournament();

  const completedMatches = matches.filter((m) => m.status === "Completed").length;
  const totalMatches = matches.length;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Rule-Based Sports Tournament
          <br />
          <span className="text-primary">Management System</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          An automated system for player registration and match allocation in sports tournaments.
          This prototype demonstrates the system flow for Taekwondo tournaments.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Players</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{players.length}</div>
            <p className="text-xs text-muted-foreground">Registered for tournament</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Matches</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedMatches} / {totalMatches || "-"}
            </div>
            <p className="text-xs text-muted-foreground">Completed matches</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tournament Status</CardTitle>
            <div
              className={`h-3 w-3 rounded-full ${
                tournamentStarted ? "bg-green-500" : "bg-yellow-500"
              }`}
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tournamentStarted ? "In Progress" : "Not Started"}
            </div>
            <p className="text-xs text-muted-foreground">
              {tournamentStarted ? "Matches are being played" : "Awaiting match generation"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <UserPlus className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Player Registration</CardTitle>
                <CardDescription>Register new players for the tournament</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Add players with their details including name, age, gender, district, and weight category.
            </p>
            <Button asChild>
              <Link to="/registration">
                Go to Registration
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Admin Dashboard</CardTitle>
                <CardDescription>Manage tournament rules and generate matches</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              View all players, configure matching rules, and generate tournament brackets.
            </p>
            <Button asChild variant="outline">
              <Link to="/admin">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Info */}
      <Card>
        <CardHeader>
          <CardTitle>About This System</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <p className="text-muted-foreground">
            This Rule-Based Sports Tournament Management System automates the process of organizing
            sports tournaments. The system handles:
          </p>
          <ul className="text-muted-foreground space-y-1 mt-2">
            <li>• Player registration with validation</li>
            <li>• Automatic match allocation based on configurable rules</li>
            <li>• Gender-based and weight category matching</li>
            <li>• District restriction to prevent same-district matchups</li>
            <li>• Round-wise tournament progression</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
