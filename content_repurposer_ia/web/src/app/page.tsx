'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Video, 
  Brain, 
  Zap, 
  Target, 
  Globe,
  ArrowRight,
  Play,
  Users,
  TrendingUp
} from 'lucide-react'
import FileUpload from '../components/FileUpload'
import ResultsDisplay from '../components/ResultsDisplay'
import LoadingSpinner, { AIProcessingIndicator } from '../components/LoadingSpinner'

const api = process.env.NEXT_PUBLIC_API_BASE || '/api'

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [processingStep, setProcessingStep] = useState(0)

  const handleFileUpload = async (uploadedFile: File) => {
    setFile(uploadedFile)
    setLoading(true)
    setError(null)
    setResult(null)
    setProcessingStep(0)
    
    try {
      const formData = new FormData()
      formData.append('file', uploadedFile)
      
      // Simulate processing steps for better UX
      const steps = [
        'Analyse de la vidéo',
        'Extraction audio', 
        'Transcription IA',
        'Analyse sémantique',
        'Génération de contenu',
        'Optimisation finale'
      ]
      
      // Simulate step progression
      const stepInterval = setInterval(() => {
        setProcessingStep(prev => {
          if (prev < steps.length - 1) {
            return prev + 1
          }
          clearInterval(stepInterval)
          return prev
        })
      }, 500)
      
      const response = await axios.post(`${api}/transcribe`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 300000, // 5 minutes
      })
      
      clearInterval(stepInterval)
      setProcessingStep(steps.length - 1)
      
      // Small delay to show completion
      setTimeout(() => {
        setResult(response.data)
      }, 500)
      
    } catch (err: any) {
      console.error('Erreur lors de la transcription:', err)
      if (err.response?.data?.error) {
        setError(err.response.data.error)
      } else if (err.code === 'ECONNABORTED') {
        setError('Timeout - le fichier est trop volumineux ou la connexion est lente')
      } else {
        setError('Erreur lors de la transcription. Veuillez réessayer.')
      }
    } finally {
      setLoading(false)
    }
  }

  const startNewUpload = () => {
    setFile(null)
    setResult(null)
    setError(null)
    setProcessingStep(0)
  }

  const features = [
    {
      icon: Brain,
      title: 'IA Révolutionnaire',
      description: 'Technologie d\'intelligence artificielle de pointe pour une analyse approfondie de vos contenus'
    },
    {
      icon: Zap,
      title: 'Traitement Ultra-Rapide',
      description: 'Transformation de vos vidéos en quelques secondes avec une précision inégalée'
    },
    {
      icon: Target,
      title: 'Optimisation Ciblée',
      description: 'Contenu optimisé pour chaque plateforme avec recommandations personnalisées'
    },
    {
      icon: Globe,
      title: 'Multi-Plateforme',
      description: 'Génération automatique de posts pour tous vos réseaux sociaux préférés'
    }
  ]

  const stats = [
    { number: '99%', label: 'Précision IA' },
    { number: '10x', label: 'Plus Rapide' },
    { number: '50+', label: 'Formats Supportés' },
    { number: '24/7', label: 'Disponible' }
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-white bg-opacity-20 rounded-2xl backdrop-blur-sm">
                <Sparkles className="h-12 w-12" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="block">Auto Social</span>
              <span className="block gradient-text bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Révolution IA
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
              Transformez vos vidéos en contenu viral avec l'intelligence artificielle la plus avancée. 
              Transcription, analyse, optimisation et génération automatique de posts sociaux.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-4 py-2 backdrop-blur-sm">
                <Video className="h-5 w-5" />
                <span>Vidéos</span>
              </div>
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-4 py-2 backdrop-blur-sm">
                <Brain className="h-5 w-5" />
                <span>IA Avancée</span>
              </div>
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-4 py-2 backdrop-blur-sm">
                <TrendingUp className="h-5 w-5" />
                <span>Contenu Viral</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold mb-1">{stat.number}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="max-w-lg mx-auto space-y-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                IA en action 🚀
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Notre intelligence artificielle révolutionnaire analyse votre vidéo 
                pour créer du contenu viral optimisé.
              </p>
              
              <AIProcessingIndicator currentStep={processingStep} />
              
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <Brain className="h-6 w-6 text-primary-600" />
                  <span className="text-lg font-semibold text-gray-900">
                    Traitement de: {file?.name}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Taille: {file ? (file.size / (1024 * 1024)).toFixed(1) : '0'}MB
                </div>
              </div>
            </div>
          </motion.section>
        ) : !result ? (
          <div className="space-y-12">
            {/* Upload Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Commencez votre révolution du contenu
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Uploadez votre vidéo et laissez notre IA révolutionnaire créer du contenu viral 
                optimisé pour toutes vos plateformes sociales.
              </p>
              
              <div className="max-w-2xl mx-auto">
                <FileUpload 
                  onFileUpload={handleFileUpload}
                  isLoading={loading}
                />
              </div>
              
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-error-50 border border-error-200 rounded-lg max-w-2xl mx-auto"
                >
                  <p className="text-error-700">{error}</p>
                </motion.div>
              )}
            </motion.section>

            {/* Features */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="py-12"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Pourquoi choisir Auto Social ?
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Notre plateforme révolutionnaire combine les dernières avancées en IA 
                  pour transformer votre façon de créer du contenu.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="card text-center group hover:shadow-lg transition-all duration-300"
                  >
                    <div className="mb-4">
                      <div className="inline-flex p-4 bg-primary-100 rounded-2xl group-hover:bg-primary-200 transition-colors">
                        <feature.icon className="h-8 w-8 text-primary-600" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* How it works */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="py-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl"
            >
              <div className="max-w-4xl mx-auto px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Comment ça marche ?
                  </h2>
                  <p className="text-lg text-gray-600">
                    3 étapes simples pour révolutionner votre contenu
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      step: '1',
                      title: 'Uploadez',
                      description: 'Glissez-déposez votre vidéo sur notre plateforme sécurisée',
                      icon: Video
                    },
                    {
                      step: '2',
                      title: 'IA Analyse',
                      description: 'Notre IA révolutionnaire analyse et transcrit votre contenu',
                      icon: Brain
                    },
                    {
                      step: '3',
                      title: 'Contenu Viral',
                      description: 'Recevez du contenu optimisé pour toutes vos plateformes',
                      icon: Sparkles
                    }
                  ].map((item, index) => (
                    <div key={index} className="text-center relative">
                      <div className="mb-6">
                        <div className="inline-flex p-4 bg-white rounded-2xl shadow-lg">
                          <item.icon className="h-8 w-8 text-primary-600" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {item.step}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">
                        {item.description}
                      </p>
                      {index < 2 && (
                        <div className="hidden md:block absolute top-8 left-full w-8 text-gray-300">
                          <ArrowRight className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          </div>
        ) : (
          <ResultsDisplay 
            result={result} 
            onNewUpload={startNewUpload}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="p-2 bg-primary-600 rounded-xl">
                <Sparkles className="h-8 w-8" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Auto Social</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Révolutionnez votre création de contenu avec l'intelligence artificielle la plus avancée. 
              Transformez vos vidéos en contenu viral en quelques secondes.
            </p>
            <div className="text-sm text-gray-500">
              © 2024 Auto Social. Propulsé par l'IA révolutionnaire.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}