'use client'

import type React from 'react'

import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'
import { useEffect, useState } from 'react'

interface PlanetSwitchProps {
  leftPlanet?: string
  rightPlanet?: string
  initialPlanet?: 'left' | 'right'
  onChange?: (planet: string) => void
  className?: string
}

export default function PlanetSwitch({
  leftPlanet = 'Earth',
  rightPlanet = 'Mars',
  initialPlanet = 'left',
  onChange,
  className,
}: PlanetSwitchProps) {
  const [selectedPlanet, setSelectedPlanet] = useState(initialPlanet)
  const isRightSelected = selectedPlanet === 'right'
  const [stars, setStars] = useState<React.ReactNode[]>([])

  // Generate stars on the client side only
  useEffect(() => {
    const starsArray = [...Array(15)].map((_, i) => (
      <Star
        key={i}
        className="absolute text-white opacity-70"
        size={i % 3 === 0 ? 10 : 8}
        fill="white"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          transform: `rotate(${Math.random() * 360}deg)`,
        }}
      />
    ))
    setStars(starsArray)
  }, [])

  const handleToggle = () => {
    const newPlanet = isRightSelected ? 'left' : 'right'
    setSelectedPlanet(newPlanet)
    onChange?.(newPlanet === 'left' ? leftPlanet : rightPlanet)
  }

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span
        className={cn(
          'text-sm transition-colors',
          !isRightSelected
            ? 'text-md font-bold text-blue-300'
            : 'text-muted-foreground',
        )}
      >
        {leftPlanet}
      </span>

      <button
        type="button"
        role="switch"
        aria-checked={isRightSelected}
        className={cn(
          'focus-visible:ring-ring relative h-12 w-24 rounded-full p-1.5 transition-colors focus-visible:ring-2 focus-visible:outline-none',
          'bg-slate-900',
        )}
        onClick={handleToggle}
      >
        {/* Stars background */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          {stars}
        </div>

        {/* The planet that moves */}
        <div
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-full shadow-md transition-transform',
            isRightSelected
              ? 'translate-x-12 bg-gradient-to-br from-red-500 to-orange-600' // Mars
              : 'translate-x-0 bg-gradient-to-br from-blue-500 to-green-500', // Earth
          )}
        >
          {/* Planet details */}
          {isRightSelected ? (
            // Mars craters
            <>
              <div className="absolute h-2 w-2 -translate-x-1.5 -translate-y-1 rounded-full bg-red-800" />
              <div className="absolute h-1.5 w-1.5 translate-x-2 translate-y-1.5 rounded-full bg-red-800" />
              <div className="absolute h-1 w-2 -translate-x-0.5 translate-y-2 rounded-full bg-red-800" />
            </>
          ) : (
            // Earth continents and oceans
            <>
              <div className="absolute h-3 w-4 -translate-x-1 -translate-y-0.5 rounded-full bg-green-600 opacity-80" />
              <div className="absolute h-2 w-3 translate-x-1.5 translate-y-1.5 rounded-full bg-green-600 opacity-80" />
              <div className="absolute h-1.5 w-1.5 translate-x-0 translate-y-0 rounded-full bg-blue-600 opacity-30" />
            </>
          )}
        </div>
      </button>

      <span
        className={cn(
          'text-md transition-colors',
          isRightSelected ? 'font-bold text-red-400' : 'text-muted-foreground',
        )}
      >
        {rightPlanet}
      </span>
    </div>
  )
}
