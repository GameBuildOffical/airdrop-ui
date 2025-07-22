'use client'

import { useState, useEffect } from 'react'

interface ClaimEligibilityData {
  success: boolean
  message: string
  token_amount: string
  nonce: number
  signature: string
  contract_address: string
  ton_address: string
}

interface UseClaimEligibilityReturn {
  eligibilityData: ClaimEligibilityData | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useClaimEligibility(address: string | undefined): UseClaimEligibilityReturn {
  const [eligibilityData, setEligibilityData] = useState<ClaimEligibilityData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'

  const fetchEligibility = async () => {
    if (!address) {
      setEligibilityData(null)
      setError(null)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // First check eligibility
      const eligibilityResponse = await fetch(`${API_BASE_URL}/eligibility/${address}`)
      
      if (!eligibilityResponse.ok) {
        throw new Error('Failed to check eligibility')
      }

      const eligibilityResult = await eligibilityResponse.json()
      
      if (!eligibilityResult.success) {
        setEligibilityData(null)
        setError(eligibilityResult.message || 'Not eligible for airdrop')
        return
      }

      setEligibilityData(eligibilityResult)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
      setEligibilityData(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchEligibility()
  }, [address])

  return {
    eligibilityData,
    isLoading,
    error,
    refetch: fetchEligibility,
  }
}
