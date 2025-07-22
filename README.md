# GameDrop Frontend

A beautiful, mobile-first frontend for the GameDrop airdrop contract built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Beautiful UI** - Modern glassmorphism design with gradient backgrounds
- 📱 **Mobile-First** - Optimized for mobile devices with responsive design
- 🔗 **Web3 Integration** - Connect wallet and interact with smart contracts
- 🔐 **Signature Verification** - Secure token claims with cryptographic signatures
- ⚡ **Real-time Updates** - Live contract statistics and claim status
- 🌟 **Smooth Animations** - Engaging user experience with Tailwind animations


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


## License

MIT License - see LICENSE file for details.
