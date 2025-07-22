'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract, useChainId } from 'wagmi'
import { parseEther } from 'viem'
import { mainnet } from 'wagmi/chains'
import { Gift, Loader2, CheckCircle, AlertCircle, Copy, Coins } from 'lucide-react'
import { GAME_DROP_ADDRESS, DEFAULT_CHAIN_ID } from '@/lib/constants'
import { GAME_DROP_ABI } from '@/lib/abi'
import { useClaimEligibility } from '@/hooks/useClaimEligibility'
import { copyToClipboard } from '@/lib/utils'

export function AirdropCard() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const [copied, setCopied] = useState(false)

  // Check if user is on the correct network
  const isCorrectNetwork = chainId === DEFAULT_CHAIN_ID

  const { eligibilityData, isLoading, error: eligibilityError, refetch } = useClaimEligibility(isCorrectNetwork ? address : undefined)
  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  // Check if user has already claimed from the contract
  const { data: hasClaimedFromContract, isLoading: isCheckingClaim } = useReadContract({
    address: GAME_DROP_ADDRESS as `0x${string}`,
    abi: GAME_DROP_ABI,
    functionName: 'hasUserClaimed',
    args: [address as `0x${string}`],
    query: {
      enabled: !!address && isConnected && isCorrectNetwork,
    },
  })

  const handleClaim = async () => {
    if (!eligibilityData || !address || !isCorrectNetwork) return

    try {
      await writeContract({
        address: GAME_DROP_ADDRESS as `0x${string}`,
        abi: GAME_DROP_ABI,
        functionName: 'claim',
        args: [
          parseEther(eligibilityData.token_amount),
          eligibilityData.nonce,
          eligibilityData.signature as `0x${string}`,
        ],
        gas: BigInt(200000),
      })
    } catch (error) {
      console.error('Claim error:', error)
    }
  }

  const handleCopySignature = async () => {
    if (eligibilityData?.signature) {
      await copyToClipboard(eligibilityData.signature)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleCopyTonAddress = async () => {
    if (eligibilityData?.ton_address) {
      await copyToClipboard(eligibilityData.ton_address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!isConnected) {
    return (
      <div className="card p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Gift className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h3>
        <p className="text-white/70 mb-6">
          Please connect your wallet to claim your GameDrop tokens
        </p>
        <div className="text-sm text-white/50">
          Make sure you're connected to the correct network
        </div>
      </div>
    )
  }

  if (isLoading || isCheckingClaim) {
    return (
      <div className="card p-8 text-center">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin mx-auto mb-4" />
        <p className="text-white/70">Checking eligibility...</p>
      </div>
    )
  }

  // Show claimed status if user has already claimed from contract
  if (hasClaimedFromContract) {
    return (
      <div className="card p-8 text-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Already Claimed!</h3>
        <p className="text-white/70 mb-6">
          You have already claimed your $GAME tokens from this contract
        </p>
        <div className="text-sm text-white/50">
          Each wallet can only claim once
        </div>
      </div>
    )
  }

  if (eligibilityError || !eligibilityData) {
    return (
      <div className="card p-8 text-center">
        <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-red-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Not Eligible</h3>
        <p className="text-white/70 mb-6">
          {eligibilityError || 'This address is not eligible for the airdrop'}
        </p>
        <button
          onClick={refetch}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
        >
          Check Again
        </button>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="card p-8 text-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Claim Successful!</h3>
        <p className="text-white/70 mb-6">
          Your {eligibilityData.token_amount} $GAME tokens have been claimed successfully
        </p>
        {hash && (
          <div className="text-sm text-white/50">
            Transaction: {hash.slice(0, 6)}...{hash.slice(-4)}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="card p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Coins className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">You're Eligible!</h3>
        <p className="text-white/70">
          You can claim your $GAME tokens
        </p>
      </div>

      {/* Claim Details */}
      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center py-3 px-4 bg-white/5 rounded-xl">
          <span className="text-white/70">Claim Amount</span>
          <span className="text-white font-bold">{eligibilityData.token_amount} $GAME</span>
        </div>
        
        <div className="flex justify-between items-center py-3 px-4 bg-white/5 rounded-xl">
          <span className="text-white/70">TON Address</span>
          <div className="flex items-center space-x-2">
            <span className="text-white text-sm">
              {eligibilityData.ton_address.slice(0, 6)}...{eligibilityData.ton_address.slice(-4)}
            </span>
            <button
              onClick={handleCopyTonAddress}
              className="p-1 hover:bg-white/10 rounded text-white/50 hover:text-white transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center py-3 px-4 bg-white/5 rounded-xl">
          <span className="text-white/70">Nonce</span>
          <span className="text-white font-mono text-sm">{eligibilityData.nonce}</span>
        </div>

        <div className="py-3 px-4 bg-white/5 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/70">Signature</span>
            <button
              onClick={handleCopySignature}
              className="flex items-center space-x-1 px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-white/70 hover:text-white transition-colors text-sm"
            >
              <Copy className="w-3 h-3" />
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
          <div className="text-white font-mono text-xs break-all bg-black/20 p-2 rounded">
            {eligibilityData.signature}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleClaim}
        disabled={isPending || isConfirming || !isCorrectNetwork}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
      >
        {!isCorrectNetwork ? (
          'Wrong Network - Switch to Continue'
        ) : isPending || isConfirming ? (
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>{isPending ? 'Confirming...' : 'Processing...'}</span>
          </div>
        ) : (
          'Claim Tokens'
        )}
      </button>

      {writeError && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
          <div className="flex items-center space-x-2 text-red-400">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">Transaction failed. Please try again.</span>
          </div>
        </div>
      )}

      <div className="mt-6 text-center text-sm text-white/50">
        Each wallet can only claim once
      </div>
    </div>
  )
}
