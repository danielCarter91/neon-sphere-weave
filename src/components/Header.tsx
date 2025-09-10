import { WalletConnect } from "./WalletConnect";

export const Header = () => {
  return (
    <header className="w-full border-b border-border/50 bg-card/50 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <div className="text-sm text-muted-foreground font-medium">Project</div>
              <div className="text-lg font-semibold text-primary">FHE Social Network</div>
            </div>
            <div className="w-8 h-8 bg-gradient-neon rounded-full glow-primary animate-pulse-glow"></div>
            <h1 className="text-2xl font-bold text-glow bg-gradient-neon bg-clip-text text-transparent">
              Social Privacy by FHE
            </h1>
          </div>
          <WalletConnect />
        </div>
      </div>
    </header>
  );
};