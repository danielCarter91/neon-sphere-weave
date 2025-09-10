import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Wallet, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export const WalletConnect = () => {
  return (
    <div className="flex items-center gap-4">
      {/* FHE Security Badge */}
      <Badge variant="outline" className="holographic-border glow-primary">
        <Shield className="h-3 w-3 mr-1" />
        FHE Secured
      </Badge>
      
      {/* Wallet Connection Button */}
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus ||
              authenticationStatus === 'authenticated');

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                'style': {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <Button 
                      onClick={openConnectModal} 
                      variant="outline"
                      className="holographic-border hover:glow-primary transition-all duration-300"
                    >
                      <Wallet className="h-4 w-4 mr-2" />
                      Connect Wallet
                    </Button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <Button 
                      onClick={openChainModal} 
                      variant="destructive"
                      className="holographic-border"
                    >
                      Wrong network
                    </Button>
                  );
                }

                return (
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={openChainModal}
                      variant="outline"
                      size="sm"
                      className="holographic-border"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            overflow: 'hidden',
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              style={{ width: 12, height: 12 }}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </Button>

                    <Button
                      onClick={openAccountModal}
                      variant="outline"
                      className="holographic-border hover:glow-primary transition-all duration-300"
                    >
                      {account.displayName}
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ''}
                    </Button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
};