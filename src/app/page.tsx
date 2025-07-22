'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { AirdropCard } from '@/components/AirdropCard'
import { NetworkChecker } from '@/components/NetworkChecker'
import { NetworkIndicator } from '@/components/NetworkIndicator'
import Image from 'next/image'

export default function HomePage() {

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image src="/airdrop/assets/logo.svg" alt="GameBuild Logo" width={32} height={32} className="w-8 h-8" />
              <div>
                <h1 className="text-xl font-bold text-white">GameBuild</h1>
                <p className="text-sm text-white/60">$GAME Airdrop</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <NetworkIndicator />
              <ConnectButton chainStatus="none" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-8 pb-12 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Claim Your{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                $GAME
              </span>{' '}
              airdrop 
            </h2>
          </div>
        </div>
      </section>


      {/* Main Airdrop Card */}
      <section className="px-4 pb-12">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto space-y-6">
            <NetworkChecker />
            <AirdropCard />
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-white/50">
            Copyright © 2025 GameBuild. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
