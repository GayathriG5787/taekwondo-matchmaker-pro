import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTournament } from "@/context/TournamentContext";
import { Settings, Users, Play, RotateCcw, ArrowRight } from "lucide-react";
import { WeightCategory } from "@/types/tournament";

const AdminDashboard = () => {
  const {
    players,
    rules,
    updateRules,
    generateMatches,
    resetTournament,
    tournamentStarted,
  } = useTournament();

  // Calculate stats by weight category
  const categoryStats = players.reduce((acc, player) => {
    acc[player.weightCategory] = (acc[player.weightCategory] || 0) + 1;
    return acc;
  }, {} as Record<WeightCategory, number>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage players and tournament rules
          </p>
        </div>
        <div className="flex gap-2">
          {tournamentStarted ? (
            <>
              <Button variant="outline" onClick={resetTournament}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Tournament
              </Button>
              <Button asChild>
                <Link to="/matches">
                  View Matches
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </>
          ) : (
            <Button onClick={generateMatches} disabled={players.length < 2}>
              <Play className="mr-2 h-4 w-4" />
              Generate Matches
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Rules Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Tournament Rules
            </CardTitle>
            <CardDescription>Configure match allocation rules</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="gender-matching">Gender Matching</Label>
                <p className="text-sm text-muted-foreground">
                  Match players of same gender only
                </p>
              </div>
              <Switch
                id="gender-matching"
                checked={rules.genderMatching}
                onCheckedChange={(checked) => updateRules({ genderMatching: checked })}
                disabled={tournamentStarted}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="weight-matching">Weight Category Matching</Label>
                <p className="text-sm text-muted-foreground">
                  Match players in same weight class
                </p>
              </div>
              <Switch
                id="weight-matching"
                checked={rules.weightCategoryMatching}
                onCheckedChange={(checked) => updateRules({ weightCategoryMatching: checked })}
                disabled={tournamentStarted}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="district-restriction">District Restriction</Label>
                <p className="text-sm text-muted-foreground">
                  Prevent same-district matchups
                </p>
              </div>
              <Switch
                id="district-restriction"
                checked={rules.districtRestriction}
                onCheckedChange={(checked) => updateRules({ districtRestriction: checked })}
                disabled={tournamentStarted}
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats Panel */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Players by Weight Category</CardTitle>
            <CardDescription>Distribution of registered players</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              {(
                ["Fin", "Fly", "Bantam", "Feather", "Light", "Welter", "Middle", "Heavy"] as WeightCategory[]
              ).map((category) => (
                <div
                  key={category}
                  className="text-center p-3 rounded-lg bg-muted/50"
                >
                  <p className="text-2xl font-bold">{categoryStats[category] || 0}</p>
                  <p className="text-xs text-muted-foreground">{category}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Players Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Registered Players
          </CardTitle>
          <CardDescription>
            {players.length} players registered for the tournament
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Weight Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No players registered yet
                  </TableCell>
                </TableRow>
              ) : (
                players.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell className="font-medium">{player.name}</TableCell>
                    <TableCell>{player.age}</TableCell>
                    <TableCell>{player.gender}</TableCell>
                    <TableCell>{player.district}</TableCell>
                    <TableCell>{player.weightCategory}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
