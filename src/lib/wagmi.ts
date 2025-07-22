import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import {
  mainnet,
  sepolia,
} from 'wagmi/chains'
import {
  metaMaskWallet,
  walletConnectWallet,
  coinbaseWallet,
  rainbowWallet,
  phantomWallet,
  trustWallet,
  ledgerWallet,
  argentWallet,
  safeWallet,
  injectedWallet,
  binanceWallet,
  bitgetWallet
} from '@rainbow-me/rainbowkit/wallets'

export const config = getDefaultConfig({
  appName: 'GameDrop Airdrop',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '527de541d4b188d607e7af87a42738de',
  chains: [mainnet, sepolia],
  wallets: [
    {
      groupName: 'Popular',
      wallets: [
        metaMaskWallet,
        coinbaseWallet,
        walletConnectWallet,
        phantomWallet,
        binanceWallet,
        bitgetWallet
      ],
    },
    {
      groupName: 'More',
      wallets: [
        trustWallet,
        rainbowWallet,
        ledgerWallet,
        argentWallet,
        safeWallet,
        injectedWallet,
      ],
    },
  ],
  ssr: true,
})
