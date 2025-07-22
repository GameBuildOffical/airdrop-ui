'use client'

import { useReadContract } from 'wagmi'
import { formatEther } from 'viem'
import { GAME_DROP_ADDRESS } from '@/lib/constants'
import { GAME_DROP_ABI } from '@/lib/abi'

export function useContractStats() {
  const { data: totalDistributedRaw, isLoading: totalLoading } = useReadContract({
    address: GAME_DROP_ADDRESS as `0x${string}`,
    abi: GAME_DROP_ABI,
    functionName: 'totalDistributed',
  })

  const { data: contractBalanceRaw, isLoading: balanceLoading } = useReadContract({
    address: GAME_DROP_ADDRESS as `0x${string}`,
    abi: GAME_DROP_ABI,
    functionName: 'getContractBalance',
  })

  const totalDistributed = totalDistributedRaw 
    ? parseFloat(formatEther(totalDistributedRaw as bigint)).toFixed(2)
    : '0'

  const contractBalance = contractBalanceRaw 
    ? parseFloat(formatEther(contractBalanceRaw as bigint)).toFixed(2)
    : '0'

  return {
    totalDistributed,
    contractBalance,
    isLoading: totalLoading || balanceLoading,
  }
}
