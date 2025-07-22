'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Copy } from 'lucide-react'
import { copyToClipboard } from '@/lib/utils'
import { useState } from 'react'

export function CustomConnectButton() {
  const { address, isConnected } = useAccount()
  const [copied, setCopied] = useState(false)

  const handleCopyAddress = async () => {
    if (address) {
      await copyToClipboard(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
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
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated')

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
                  <button 
                    onClick={openConnectModal} 
                    type="button"
                    className="btn-primary"
                  >
                    Connect Wallet
                  </button>
                )
              }

              if (chain.unsupported) {
                return (
                  <button 
                    onClick={openChainModal} 
                    type="button"
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                  >
                    Wrong network
                  </button>
                )
              }

              return (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={openChainModal}
                    className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-3 rounded-lg transition-colors border border-white/30 hover:border-white/50"
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 16,
                          height: 16,
                          borderRadius: 999,
                          overflow: 'hidden',
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 16, height: 16 }}
                          />
                        )}
                      </div>
                    )}
                    <span className="text-sm">{chain.name}</span>
                  </button>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={openAccountModal}
                      type="button"
                      className="bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-3 rounded-lg transition-colors border border-white/30 hover:border-white/50"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">
                          {account.displayName}
                        </span>
                        <span className="text-xs text-white/70">
                          {account.displayBalance}
                        </span>
                      </div>
                    </button>
                    
                    {address && (
                      <button
                        onClick={handleCopyAddress}
                        className="p-2 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-colors"
                        title="Copy address"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
