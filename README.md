# GameDrop Frontend

A beautiful, mobile-first frontend for the GameDrop airdrop contract built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Beautiful UI** - Modern glassmorphism design with gradient backgrounds
- 📱 **Mobile-First** - Optimized for mobile devices with responsive design
- 🔗 **Web3 Integration** - Connect wallet and interact with smart contracts
- 🔐 **Signature Verification** - Secure token claims with cryptographic signatures
- ⚡ **Real-time Updates** - Live contract statistics and claim status
- 🌟 **Smooth Animations** - Engaging user experience with Tailwind animations

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Web3**: Wagmi + RainbowKit + Viem
- **State Management**: TanStack Query
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm
- A deployed GameDrop contract
- WalletConnect Project ID

### Installation

1. Clone the repository:
\`\`\`bash
cd frontend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

3. Copy environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Update the environment variables in \`.env.local\`:
\`\`\`env
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_GAME_DROP_ADDRESS=0x... # Your GameDrop contract address
NEXT_PUBLIC_GAME_TOKEN_ADDRESS=0x... # Your GameToken contract address
NEXT_PUBLIC_CHAIN_ID=1 # Network chain ID (1=Mainnet, 11155111=Sepolia)
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api # Backend API URL
SIGNER_PRIVATE_KEY=0x... # Private key for signature generation
\`\`\`

5. Update contract addresses in \`src/lib/constants.ts\`

6. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

### Contract Setup

1. Deploy your GameDrop and GameToken contracts
2. Update the contract addresses in \`src/lib/constants.ts\`
3. Ensure your signer wallet has the correct permissions in the contract

### Network Configuration

The application automatically detects the user's network and prompts them to switch if they're not on the correct chain. 

**Supported Networks:**
- Ethereum Mainnet (Chain ID: 1)
- Sepolia Testnet (Chain ID: 11155111)
- Polygon Mainnet (Chain ID: 137)
- BSC Mainnet (Chain ID: 56)

**To configure the target network:**
1. Set `NEXT_PUBLIC_CHAIN_ID` in your `.env.local` file
2. Make sure your wagmi configuration includes the target chain
3. Deploy your contracts to the target network

**Features:**
- ✅ Network detection in header
- ✅ Automatic network switching prompts
- ✅ Prevents claiming on wrong networks
- ✅ Clear error messages for users

### WalletConnect Setup

1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Create a new project
3. Copy the Project ID to your environment variables

## Project Structure

\`\`\`
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   └── providers.tsx      # Web3 providers
├── components/            # React components
│   ├── AirdropCard.tsx   # Main airdrop interface
│   └── StatsCard.tsx     # Statistics display
├── hooks/                # Custom React hooks
│   ├── useClaimStatus.ts # Check if user has claimed
│   └── useContractStats.ts # Contract statistics
└── lib/                  # Utilities and configuration
    ├── abi.ts           # Contract ABI
    ├── constants.ts     # Configuration constants
    ├── utils.ts         # Utility functions
    └── wagmi.ts         # Wagmi configuration
\`\`\`

## API Routes

### POST /api/generate-signature

Generates a cryptographic signature for token claims.

**Request Body:**
\`\`\`json
{
  "address": "0x...",
  "amount": "100",
  "nonce": 1234567890
}
\`\`\`

**Response:**
\`\`\`json
{
  "signature": "0x...",
  "messageHash": "0x...",
  "signer": "0x..."
}
\`\`\`

## Security Considerations

1. **Private Key Management**: Keep your signer private key secure and never commit it to version control
2. **Environment Variables**: Use proper environment variable management in production
3. **Rate Limiting**: Consider implementing rate limiting for the signature generation API
4. **Input Validation**: All user inputs are validated both client and server-side

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

## Mobile Experience

The frontend is designed mobile-first with:
- Touch-friendly buttons and inputs
- Responsive design that works on all screen sizes
- Optimized for mobile wallets like MetaMask Mobile
- Smooth animations and transitions

## Customization

### Styling

Update \`tailwind.config.js\` and \`src/app/globals.css\` to customize:
- Color schemes
- Animations
- Typography
- Component styles

### Branding

Replace the following to match your brand:
- Logo and icons in the header
- Color gradients and themes
- Text content and messaging
- Metadata in \`layout.tsx\`

## Troubleshooting

### Common Issues

1. **Wallet Connection Issues**: Ensure you're on the correct network
2. **Signature Generation Fails**: Check your signer private key and contract address
3. **Contract Interaction Fails**: Verify contract is deployed and ABI is correct
4. **Mobile Wallet Issues**: Ensure deep linking is properly configured

### Debug Mode

Set \`NODE_ENV=development\` to enable additional logging and error details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on mobile and desktop
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
