// Contract addresses - Update these with your deployed contract addresses
export const GAME_DROP_ADDRESS = process.env.NEXT_PUBLIC_GAME_DROP_ADDRESS || "0x" // Replace with your GameDrop contract address
export const GAME_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_GAME_TOKEN_ADDRESS || "0x" // Replace with your GameToken contract address

// Backend API endpoint for signature generation
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'

// Chain configuration
export const DEFAULT_CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID) || 1 // Default to mainnet, but allow override via env
// Common chain IDs: 1 = Ethereum Mainnet, 11155111 = Sepolia Testnet, 137 = Polygon, 56 = BSC

// Token configuration
export const TOKEN_DECIMALS = 18
export const TOKEN_SYMBOL = 'GAME'
export const TOKEN_NAME = 'Gamebuild'

// UI configuration
export const MOBILE_BREAKPOINT = 768
