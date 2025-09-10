# Neon Sphere Weave

A private social network built with fully homomorphic encryption (FHE) technology, enabling truly private social connections while maintaining full functionality.

## Features

- **End-to-End Encryption**: All connections and interactions are protected by FHE technology
- **Zero-Knowledge Proofs**: Verify connections and relationships without revealing sensitive data
- **3D Social Graph Visualization**: Interactive visualization of encrypted social connections
- **Wallet Integration**: Connect with Web3 wallets for secure authentication
- **Privacy-First Design**: Complete privacy without sacrificing social functionality

## Technologies Used

This project is built with:

- **Frontend**: Vite, TypeScript, React
- **UI Components**: shadcn-ui, Tailwind CSS
- **3D Graphics**: Three.js, React Three Fiber
- **Blockchain**: FHE-enabled smart contracts
- **Encryption**: Fully Homomorphic Encryption (FHE)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/danielCarter91/neon-sphere-weave.git
cd neon-sphere-weave
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn-ui components
│   ├── Header.tsx      # Application header
│   ├── SocialGraph.tsx # 3D social graph visualization
│   ├── SocialImport.tsx # Social data import functionality
│   ├── StatsPanel.tsx  # Statistics display panel
│   └── WalletConnect.tsx # Wallet connection component
├── pages/              # Application pages
│   ├── Index.tsx       # Main application page
│   └── NotFound.tsx    # 404 error page
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── main.tsx           # Application entry point
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

This project can be deployed to various platforms:

- **Vercel**: Recommended for easy deployment
- **Netlify**: Alternative deployment option
- **GitHub Pages**: For static hosting

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy automatically on every push to main branch

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Security

This project uses fully homomorphic encryption to ensure complete privacy. All social connections and interactions are encrypted end-to-end, providing the highest level of privacy protection.

## Support

For support and questions, please open an issue on GitHub or contact the development team.