'use client'

import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { useEffect, useState } from 'react'

type StatusType = 'success' | 'error' | null

interface StatusModalProps {
  status: StatusType
  message: string
  isOpen: boolean
  onClose: () => void
  autoCloseDelay?: number
}

export default function StatusModal({
  status,
  message,
  isOpen,
  onClose,
  autoCloseDelay = 3000,
}: StatusModalProps) {
  const [shouldRender, setShouldRender] = useState(isOpen)

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)

      // Auto close after delay if provided
      if (autoCloseDelay > 0) {
        const timer = setTimeout(() => {
          onClose()
        }, autoCloseDelay)

        return () => clearTimeout(timer)
      }
    }
  }, [isOpen, autoCloseDelay, onClose])

  const handleAnimationComplete = () => {
    if (!isOpen) {
      setShouldRender(false)
    }
  }

  if (!shouldRender) return null

  return (
    <AnimatePresence mode="wait" onExitComplete={handleAnimationComplete}>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300,
            }}
            className="relative z-50 w-full max-w-md overflow-hidden rounded-lg bg-white p-6 shadow-xl dark:bg-slate-900"
          >
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: 'spring',
                  delay: 0.1,
                  damping: 15,
                  stiffness: 300,
                }}
                className={cn(
                  'mb-4 flex h-16 w-16 items-center justify-center rounded-full',
                  status === 'success'
                    ? 'bg-green-100 dark:bg-green-900/30'
                    : 'bg-red-100 dark:bg-red-900/30',
                )}
              >
                {status === 'success' ? (
                  <motion.div
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <Check
                      className="h-8 w-8 text-green-600 dark:text-green-400"
                      strokeWidth={3}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    <X
                      className="h-8 w-8 text-red-600 dark:text-red-400"
                      strokeWidth={3}
                    />
                  </motion.div>
                )}
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={cn(
                  'mb-2 text-xl font-semibold',
                  status === 'success'
                    ? 'text-green-700 dark:text-green-400'
                    : 'text-red-700 dark:text-red-400',
                )}
              >
                {status === 'success' ? 'Success' : 'Error'}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 dark:text-gray-300"
              >
                {message}
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="mt-6 rounded-md bg-slate-200 px-4 py-2 font-medium text-slate-800 transition-colors hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
