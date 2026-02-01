import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useTournament } from "@/context/TournamentContext";
import { Gender, WeightCategory, District } from "@/types/tournament";
import { UserPlus, CheckCircle } from "lucide-react";

const districts: District[] = [
  "Thiruvananthapuram",
  "Kollam",
  "Pathanamthitta",
  "Alappuzha",
  "Kottayam",
  "Idukki",
  "Ernakulam",
  "Thrissur",
  "Palakkad",
  "Malappuram",
  "Kozhikode",
  "Wayanad",
  "Kannur",
  "Kasaragod",
];

const weightCategories: WeightCategory[] = [
  "Fin",
  "Fly",
  "Bantam",
  "Feather",
  "Light",
  "Welter",
  "Middle",
  "Heavy",
];

const PlayerRegistration = () => {
  const { addPlayer, players } = useTournament();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "" as Gender | "",
    district: "" as District | "",
    weightCategory: "" as WeightCategory | "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.age ||
      !formData.gender ||
      !formData.district ||
      !formData.weightCategory
    ) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    addPlayer({
      name: formData.name,
      age: parseInt(formData.age),
      gender: formData.gender as Gender,
      district: formData.district as District,
      weightCategory: formData.weightCategory as WeightCategory,
    });

    toast({
      title: "Success!",
      description: `${formData.name} has been registered successfully.`,
    });

    setFormData({
      name: "",
      age: "",
      gender: "",
      district: "",
      weightCategory: "",
    });
  };

  const recentPlayers = players.slice(-5).reverse();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Player Registration</h1>
        <p className="text-muted-foreground mt-1">
          Register players for the Taekwondo tournament
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Registration Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Register New Player
            </CardTitle>
            <CardDescription>Fill in the player details below</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Player Name</Label>
                <Input
                  id="name"
                  placeholder="Enter player name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter age"
                  min="10"
                  max="50"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value: Gender) => setFormData({ ...formData, gender: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>District</Label>
                <Select
                  value={formData.district}
                  onValueChange={(value: District) => setFormData({ ...formData, district: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Weight Category</Label>
                <Select
                  value={formData.weightCategory}
                  onValueChange={(value: WeightCategory) =>
                    setFormData({ ...formData, weightCategory: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select weight category" />
                  </SelectTrigger>
                  <SelectContent>
                    {weightCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full">
                <UserPlus className="mr-2 h-4 w-4" />
                Register Player
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Recently Registered */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Recently Registered
            </CardTitle>
            <CardDescription>Latest player registrations</CardDescription>
          </CardHeader>
          <CardContent>
            {recentPlayers.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No players registered yet
              </p>
            ) : (
              <div className="space-y-3">
                {recentPlayers.map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div>
                      <p className="font-medium">{player.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {player.gender} • {player.age} years • {player.weightCategory}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{player.district}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground text-center">
                Total registered: <span className="font-medium">{players.length}</span> players
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlayerRegistration;
