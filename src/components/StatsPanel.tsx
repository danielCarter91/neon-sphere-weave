import { Card } from "@/components/ui/card";

export const StatsPanel = () => {
  const stats = [
    {
      label: "Encrypted Connections",
      value: "1,247",
      color: "text-primary",
      glow: "glow-primary"
    },
    {
      label: "Active Nodes",
      value: "342",
      color: "text-secondary",
      glow: "glow-secondary"
    },
    {
      label: "Privacy Score",
      value: "98.7%",
      color: "text-accent",
      glow: "glow-accent"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className={`p-6 bg-card/50 backdrop-blur-sm border-border/50 ${stat.glow} transition-all duration-300 hover:scale-105`}>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color} text-glow`}>{stat.value}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};