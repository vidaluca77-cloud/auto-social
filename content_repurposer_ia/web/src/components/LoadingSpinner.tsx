'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Sparkles, Video } from 'lucide-react'

interface LoadingSpinnerProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function LoadingSpinner({ 
  message = 'Traitement en cours...', 
  size = 'md' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  }

  const iconSize = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6', 
    lg: 'h-8 w-8'
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        {/* Outer spinning ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className={`${sizeClasses[size]} border-4 border-primary-200 border-t-primary-600 rounded-full`}
        />
        
        {/* Inner pulsing icon */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Brain className={`${iconSize[size]} text-primary-600`} />
        </motion.div>
      </div>
      
      {message && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-2"
        >
          <p className="text-gray-700 font-medium">{message}</p>
          <div className="flex items-center justify-center space-x-1 text-sm text-gray-500">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
            >
              IA
            </motion.div>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            >
              analyse
            </motion.div>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            >
              votre
            </motion.div>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            >
              contenu...
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

interface AIProcessingIndicatorProps {
  steps?: string[]
  currentStep?: number
}

export function AIProcessingIndicator({ 
  steps = [
    'Analyse de la vidéo',
    'Extraction audio',
    'Transcription IA',
    'Analyse sémantique',
    'Génération de contenu',
    'Optimisation finale'
  ],
  currentStep = 0
}: AIProcessingIndicatorProps) {
  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="text-center">
        <motion.div
          className="inline-flex items-center space-x-2 bg-primary-100 rounded-full px-4 py-2"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="h-5 w-5 text-primary-600" />
          </motion.div>
          <span className="text-primary-700 font-medium">IA en action</span>
        </motion.div>
      </div>
      
      <div className="space-y-3">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: index <= currentStep ? 1 : 0.5,
              x: 0
            }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center space-x-3 p-3 rounded-lg ${
              index <= currentStep ? 'bg-primary-50 border border-primary-200' : 'bg-gray-50'
            }`}
          >
            <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
              index < currentStep 
                ? 'bg-primary-600 text-white' 
                : index === currentStep
                ? 'bg-primary-600 text-white animate-pulse'
                : 'bg-gray-300 text-gray-600'
            }`}>
              {index < currentStep ? (
                '✓'
              ) : index === currentStep ? (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2 h-2 bg-white rounded-full"
                />
              ) : (
                index + 1
              )}
            </div>
            <span className={`text-sm ${
              index <= currentStep ? 'text-gray-900 font-medium' : 'text-gray-500'
            }`}>
              {step}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}