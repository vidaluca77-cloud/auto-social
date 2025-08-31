'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { 
  Clock, 
  Languages, 
  TrendingUp, 
  Users, 
  Hash, 
  MessageCircle,
  Share2,
  Download,
  Copy,
  CheckCircle
} from 'lucide-react'

interface TranscriptionResult {
  project_id: string
  transcription: {
    text: string
    duration: string
    language: string
    confidence: number
    filename: string
    speakers: Array<{ id: number; name: string; segments: number }>
    keywords: string[]
    summary: string
    sentiment: string
    topics: string[]
    socialPosts: {
      twitter: string
      linkedin: string
      facebook: string
    }
  }
  status: string
  processing_time: string
  file_info: {
    filename: string
    estimated_size: string
    estimated_duration: string
    format: string
  }
  ai_analysis: {
    content_type: string
    engagement_score: number
    viral_potential: string
    recommended_platforms: string[]
    best_posting_times: string[]
  }
  next_steps: string[]
}

interface ResultsDisplayProps {
  result: TranscriptionResult
  onNewUpload: () => void
}

export default function ResultsDisplay({ result, onNewUpload }: ResultsDisplayProps) {
  const [copiedText, setCopiedText] = React.useState<string | null>(null)

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(type)
      setTimeout(() => setCopiedText(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const downloadTranscription = () => {
    const dataStr = JSON.stringify(result, null, 2)
    const dataBlob = new Blob([dataStr], {type: 'application/json'})
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `transcription-${result.project_id}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive': return 'text-success-600 bg-success-100'
      case 'negative': return 'text-error-600 bg-error-100'
      case 'neutral': return 'text-gray-600 bg-gray-100'
      default: return 'text-primary-600 bg-primary-100'
    }
  }

  const getEngagementColor = (score: number) => {
    if (score >= 8) return 'text-success-600'
    if (score >= 6) return 'text-warning-600'
    return 'text-error-600'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Résultats de l'analyse IA</h2>
          <p className="text-gray-600">Fichier traité en {result.processing_time}</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={downloadTranscription}
            className="btn-secondary flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Télécharger</span>
          </button>
          <button
            onClick={onNewUpload}
            className="btn-primary"
          >
            Nouvelle vidéo
          </button>
        </div>
      </div>

      {/* File Info */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Informations du fichier</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">{result.file_info.format}</div>
            <div className="text-sm text-gray-600">Format</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">{result.file_info.estimated_size}</div>
            <div className="text-sm text-gray-600">Taille</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">{result.transcription.duration}</div>
            <div className="text-sm text-gray-600">Durée</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">{Math.round(result.transcription.confidence * 100)}%</div>
            <div className="text-sm text-gray-600">Précision</div>
          </div>
        </div>
      </div>

      {/* AI Analysis */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-primary-600" />
          Analyse IA avancée
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Score d'engagement</span>
              <span className={`text-lg font-bold ${getEngagementColor(result.ai_analysis.engagement_score)}`}>
                {result.ai_analysis.engagement_score}/10
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${result.ai_analysis.engagement_score * 10}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="text-sm text-gray-600 mb-1">Potentiel viral</div>
            <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
              result.ai_analysis.viral_potential === 'high' 
                ? 'bg-success-100 text-success-700'
                : result.ai_analysis.viral_potential === 'medium'
                ? 'bg-warning-100 text-warning-700'
                : 'bg-gray-100 text-gray-700'
            }`}>
              {result.ai_analysis.viral_potential}
            </span>
          </div>
          
          <div>
            <div className="text-sm text-gray-600 mb-1">Sentiment</div>
            <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(result.transcription.sentiment)}`}>
              {result.transcription.sentiment}
            </span>
          </div>
        </div>
        
        <div className="mt-4 space-y-3">
          <div>
            <div className="text-sm text-gray-600 mb-2">Plateformes recommandées</div>
            <div className="flex flex-wrap gap-2">
              {result.ai_analysis.recommended_platforms.map((platform, index) => (
                <span key={index} className="inline-flex px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                  {platform}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <div className="text-sm text-gray-600 mb-2">Meilleurs créneaux de publication</div>
            <div className="flex flex-wrap gap-2">
              {result.ai_analysis.best_posting_times.map((time, index) => (
                <span key={index} className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  <Clock className="h-3 w-3 mr-1" />
                  {time}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transcription */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Transcription complète</h3>
          <button
            onClick={() => copyToClipboard(result.transcription.text, 'transcription')}
            className="btn-secondary flex items-center space-x-2"
          >
            {copiedText === 'transcription' ? (
              <CheckCircle className="h-4 w-4 text-success-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span>{copiedText === 'transcription' ? 'Copié!' : 'Copier'}</span>
          </button>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 max-h-60 overflow-y-auto">
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {result.transcription.text}
          </p>
        </div>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center text-gray-600">
            <Languages className="h-4 w-4 mr-2" />
            Langue: {result.transcription.language.toUpperCase()}
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            {result.transcription.speakers.length} locuteur(s)
          </div>
          <div className="flex items-center text-gray-600">
            <Hash className="h-4 w-4 mr-2" />
            {result.transcription.keywords.length} mots-clés
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Résumé intelligent</h3>
        <p className="text-gray-700 leading-relaxed mb-4">{result.transcription.summary}</p>
        
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Sujets principaux</h4>
            <div className="flex flex-wrap gap-2">
              {result.transcription.topics.map((topic, index) => (
                <span key={index} className="inline-flex px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {topic}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Mots-clés</h4>
            <div className="flex flex-wrap gap-2">
              {result.transcription.keywords.map((keyword, index) => (
                <span key={index} className="inline-flex px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  #{keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Posts */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Share2 className="h-5 w-5 mr-2 text-primary-600" />
          Posts pour réseaux sociaux
        </h3>
        <div className="space-y-4">
          {Object.entries(result.transcription.socialPosts).map(([platform, post]) => (
            <div key={platform} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium capitalize">{platform}</h4>
                <button
                  onClick={() => copyToClipboard(post, platform)}
                  className="btn-secondary btn text-xs"
                >
                  {copiedText === platform ? (
                    <CheckCircle className="h-3 w-3 text-success-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </button>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{post}</p>
              <div className="text-xs text-gray-500">
                {post.length} caractères
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Prochaines étapes recommandées</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {result.next_steps.map((step, index) => (
            <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">
                {index + 1}
              </div>
              <span className="text-gray-700">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}