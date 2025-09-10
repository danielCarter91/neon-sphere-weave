import { Header } from "@/components/Header";
import { SocialGraph } from "@/components/SocialGraph";
import { StatsPanel } from "@/components/StatsPanel";
import { SocialImport } from "@/components/SocialImport";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-cyber bg-clip-text text-transparent">
            Private Social Network
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Experience truly private social connections with fully homomorphic encryption. 
            Your relationships remain encrypted while maintaining full functionality.
          </p>
        </div>
        
        <StatsPanel />
        
        {/* Animated Wave Separator */}
        <div className="my-12 h-1 bg-wave-gradient animate-wave rounded-full opacity-60"></div>
        
        <div className="mb-12">
          <SocialImport />
        </div>
        
        <div className="mb-12">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold text-primary mb-2">
              Your Encrypted Social Graph
            </h3>
            <p className="text-muted-foreground">
              Interact with the 3D visualization below. Green rings indicate encrypted connections.
            </p>
          </div>
          <SocialGraph />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="p-6 bg-card/30 rounded-xl border border-primary/20">
            <h4 className="text-xl font-semibold text-primary mb-4">🔒 End-to-End Encryption</h4>
            <p className="text-muted-foreground">
              All connections and interactions are protected by FHE technology, 
              ensuring complete privacy without sacrificing functionality.
            </p>
          </div>
          
          <div className="p-6 bg-card/30 rounded-xl border border-secondary/20">
            <h4 className="text-xl font-semibold text-secondary mb-4">⚡ Zero-Knowledge Proofs</h4>
            <p className="text-muted-foreground">
              Verify connections and relationships without revealing sensitive data, 
              maintaining privacy while enabling social features.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
