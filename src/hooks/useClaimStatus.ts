'use client'

import { useReadContract } from 'wagmi'
import { GAME_DROP_ADDRESS } from '@/lib/constants'
import { GAME_DROP_ABI } from '@/lib/abi'

export function useClaimStatus(address?: string) {
  const { data: hasClaimed, isLoading, error } = useReadContract({
    address: GAME_DROP_ADDRESS as `0x${string}`,
    abi: GAME_DROP_ABI,
    functionName: 'hasUserClaimed',
    args: address ? [address as `0x${string}`] : undefined,
    query: {
      enabled: !!address,
    },
  })

  return {
    hasClaimed: hasClaimed as boolean,
    isLoading,
    error,
  }
}
