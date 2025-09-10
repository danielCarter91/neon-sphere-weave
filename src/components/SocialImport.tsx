import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Twitter, MessageCircle, Send, Users, Shield, Download } from "lucide-react";
import { useState } from "react";
import { useToast } from "./ui/use-toast";

interface Platform {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  status: 'available' | 'coming-soon' | 'connected';
}

const platforms: Platform[] = [
  {
    id: 'twitter',
    name: 'Twitter/X',
    icon: <Twitter className="w-5 h-5" />,
    color: 'text-blue-400',
    description: 'Import your Twitter connections and followers',
    status: 'available'
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: <MessageCircle className="w-5 h-5" />,
    color: 'text-indigo-400',
    description: 'Import your Discord server connections',
    status: 'available'
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: <Send className="w-5 h-5" />,
    color: 'text-blue-300',
    description: 'Import your Telegram contacts securely',
    status: 'available'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: <Users className="w-5 h-5" />,
    color: 'text-blue-600',
    description: 'Professional network connections',
    status: 'coming-soon'
  }
];

export const SocialImport = () => {
  const { toast } = useToast();
  const [importing, setImporting] = useState<string | null>(null);

  const handleImport = async (platform: Platform) => {
    if (platform.status !== 'available') return;

    setImporting(platform.id);
    
    // Simulate import process
    toast({
      title: `Connecting to ${platform.name}`,
      description: "Initializing secure encrypted import...",
    });

    setTimeout(() => {
      toast({
        title: `${platform.name} Import Complete`,
        description: `Successfully imported encrypted relationship data from ${platform.name}`,
      });
      setImporting(null);
    }, 3000);
  };

  return (
    <Card className="bg-card/30 border border-primary/20 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-neon rounded-lg glow-primary">
            <Download className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-xl text-primary">Social Relationship Import</CardTitle>
            <CardDescription className="text-muted-foreground">
              Import your existing social connections with end-to-end encryption
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 p-3 bg-accent/10 rounded-lg border border-accent/20">
          <Shield className="w-4 h-4 text-accent" />
          <span className="text-sm text-accent">All imports are encrypted using FHE technology</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {platforms.map((platform) => (
            <div 
              key={platform.id}
              className="p-4 bg-card/50 rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-300 hover:glow-primary"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={platform.color}>
                    {platform.icon}
                  </div>
                  <span className="font-medium text-foreground">{platform.name}</span>
                </div>
                
                {platform.status === 'coming-soon' && (
                  <Badge variant="secondary" className="text-xs">
                    Coming Soon
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">
                {platform.description}
              </p>
              
              <Button
                onClick={() => handleImport(platform)}
                disabled={platform.status !== 'available' || importing === platform.id}
                className="w-full"
                variant={platform.status === 'available' ? 'default' : 'outline'}
              >
                {importing === platform.id ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    Importing...
                  </div>
                ) : platform.status === 'available' ? (
                  'Import Connections'
                ) : (
                  'Coming Soon'
                )}
              </Button>
            </div>
          ))}
        </div>
        
        <div className="text-center pt-4">
          <p className="text-xs text-muted-foreground">
            Your relationship data remains encrypted and private at all times
          </p>
        </div>
      </CardContent>
    </Card>
  );
};