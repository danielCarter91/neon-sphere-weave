# Deployment Guide for Neon Sphere Weave

This guide will help you deploy the Neon Sphere Weave application to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your code to GitHub
3. **WalletConnect Project ID**: Get one from [WalletConnect Cloud](https://cloud.walletconnect.com)
4. **Contract Deployment**: Deploy the smart contract first

## Step 1: Deploy Smart Contract

### Install Dependencies

```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox @fhevm/hardhat-plugin
```

### Configure Environment Variables

Create a `.env` file in the project root:

```env
PRIVATE_KEY=your_private_key_here
ETHERSCAN_API_KEY=your_etherscan_api_key_here
```

### Deploy Contract

```bash
npx hardhat compile
npx hardhat run scripts/deploy.ts --network sepolia
```

Save the deployed contract address for the next step.

## Step 2: Deploy Frontend to Vercel

### Method 1: Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

### Method 2: GitHub Integration

1. **Connect Repository**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**:
   - Go to Project Settings > Environment Variables
   - Add the following variables:
     ```
     VITE_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
     VITE_CONTRACT_ADDRESS=0x... (from contract deployment)
     VITE_FHE_NETWORK_RPC=https://rpc.fhenix.xyz
     VITE_FHE_NETWORK_CHAIN_ID=42069
     ```

3. **Deploy**:
   - Click "Deploy" button
   - Vercel will automatically build and deploy your application

## Step 3: Configure Custom Domain (Optional)

1. **Add Domain**:
   - Go to Project Settings > Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **SSL Certificate**:
   - Vercel automatically provides SSL certificates
   - No additional configuration needed

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_WALLET_CONNECT_PROJECT_ID` | WalletConnect project ID | `abc123...` |
| `VITE_CONTRACT_ADDRESS` | Deployed contract address | `0x1234...` |
| `VITE_FHE_NETWORK_RPC` | FHE network RPC URL | `https://rpc.fhenix.xyz` |
| `VITE_FHE_NETWORK_CHAIN_ID` | FHE network chain ID | `42069` |

## Build Configuration

The project is configured with:

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework**: Vite
- **Node Version**: 18.x

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check that all dependencies are in `package.json`
   - Ensure environment variables are set correctly
   - Check build logs in Vercel dashboard

2. **Wallet Connection Issues**:
   - Verify WalletConnect Project ID is correct
   - Check network configuration
   - Ensure contract address is valid

3. **Contract Interaction Issues**:
   - Verify contract is deployed and verified
   - Check network compatibility
   - Ensure user has sufficient gas

### Support

For deployment issues:
- Check [Vercel Documentation](https://vercel.com/docs)
- Review build logs in Vercel dashboard
- Contact support through GitHub issues

## Security Considerations

1. **Environment Variables**:
   - Never commit `.env` files to version control
   - Use Vercel's environment variable system
   - Rotate keys regularly

2. **Contract Security**:
   - Audit smart contracts before deployment
   - Use verified contract addresses
   - Implement proper access controls

3. **Frontend Security**:
   - Validate all user inputs
   - Implement proper error handling
   - Use HTTPS in production

## Monitoring and Analytics

1. **Vercel Analytics**:
   - Enable in Project Settings
   - Monitor performance metrics
   - Track user interactions

2. **Error Tracking**:
   - Consider integrating Sentry or similar
   - Monitor contract interaction errors
   - Track wallet connection issues

## Updates and Maintenance

1. **Automatic Deployments**:
   - Vercel automatically deploys on git push
   - Configure branch protection rules
   - Use preview deployments for testing

2. **Contract Updates**:
   - Deploy new contract versions
   - Update contract address in environment variables
   - Test thoroughly before production deployment
