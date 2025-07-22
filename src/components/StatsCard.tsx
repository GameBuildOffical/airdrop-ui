'use client'

import { ReactNode } from 'react'
import { cn, formatNumber } from '@/lib/utils'

interface StatsCardProps {
  icon: ReactNode
  title: string
  value: string | number
  suffix?: string
  isLoading?: boolean
  className?: string
}

export function StatsCard({ 
  icon, 
  title, 
  value, 
  suffix = '', 
  isLoading = false,
  className = ''
}: StatsCardProps) {
  const displayValue = typeof value === 'number' ? formatNumber(value) : value

  return (
    <div className="card p-6 text-center transform hover:scale-105 transition-all duration-300">
      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4", className)}>
        {icon}
      </div>
      <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
      {isLoading ? (
        <div className="h-8 bg-white/10 rounded-lg animate-pulse"></div>
      ) : (
        <div className="text-2xl font-bold text-white">
          {displayValue} {suffix && <span className="text-lg text-white/70">{suffix}</span>}
        </div>
      )}
    </div>
  )
}
