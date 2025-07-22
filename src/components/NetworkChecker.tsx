'use client'

import { useChainId, useAccount, useSwitchChain } from 'wagmi'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { DEFAULT_CHAIN_ID } from '@/lib/constants'
import { mainnet } from 'wagmi/chains'

export function NetworkChecker() {
  const chainId = useChainId()
  const { isConnected } = useAccount()
  const { switchChain, isPending } = useSwitchChain()

  // Don't show if not connected
  if (!isConnected) {
    return null
  }

  // Don't show if on correct network
  if (chainId === DEFAULT_CHAIN_ID) {
    return null
  }

  const getNetworkName = (id: number) => {
    switch (id) {
      case 1:
        return 'Ethereum Mainnet'
      case 11155111:
        return 'Sepolia Testnet'
      case 5:
        return 'Goerli Testnet'
      case 137:
        return 'Polygon Mainnet'
      case 80001:
        return 'Polygon Mumbai'
      case 56:
        return 'BSC Mainnet'
      case 97:
        return 'BSC Testnet'
      default:
        return `Chain ID ${id}`
    }
  }

  const handleSwitchNetwork = () => {
    if (switchChain) {
      switchChain({ chainId: DEFAULT_CHAIN_ID })
    }
  }

  return (
    <div className="card p-6 border-2 border-orange-500/30 bg-orange-500/10">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-orange-400" />
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-2">Wrong Network</h3>
          <p className="text-white/70 mb-4">
            You're currently connected to <span className="font-medium text-white">{getNetworkName(chainId)}</span>.
            Please switch to <span className="font-medium text-white">{getNetworkName(DEFAULT_CHAIN_ID)}</span> to claim your tokens.
          </p>
          
          <button
            onClick={handleSwitchNetwork}
            disabled={isPending}
            className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-600/50 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Switching...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                <span>Switch Network</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}