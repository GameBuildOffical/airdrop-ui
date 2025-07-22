'use client'

import { useChainId, useAccount } from 'wagmi'
import { DEFAULT_CHAIN_ID } from '@/lib/constants'
import { CheckCircle, AlertTriangle } from 'lucide-react'

export function NetworkIndicator() {
  const chainId = useChainId()
  const { isConnected } = useAccount()

  if (!isConnected) {
    return null
  }

  const getNetworkName = (id: number) => {
    switch (id) {
      case 1:
        return 'Mainnet'
      case 11155111:
        return 'Sepolia'
      case 5:
        return 'Goerli'
      case 137:
        return 'Polygon'
      case 80001:
        return 'Mumbai'
      case 56:
        return 'BSC'
      case 97:
        return 'BSC Testnet'
      default:
        return `Chain ${id}`
    }
  }

  const isCorrectNetwork = chainId === DEFAULT_CHAIN_ID

  return (
    <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm ${
      isCorrectNetwork 
        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
        : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
    }`}>
      {isCorrectNetwork ? (
        <CheckCircle className="w-4 h-4" />
      ) : (
        <AlertTriangle className="w-4 h-4" />
      )}
      <span className="font-medium">
        {getNetworkName(chainId)}
      </span>
    </div>
  )
}
