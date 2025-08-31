'use client'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileVideo, X, CheckCircle, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface FileUploadProps {
  onFileUpload: (file: File) => void
  isLoading?: boolean
  maxSize?: number
  accept?: string[]
}

export default function FileUpload({ 
  onFileUpload, 
  isLoading = false, 
  maxSize = 100 * 1024 * 1024,
  accept = ['video/*']
}: FileUploadProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setError(null)
    
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0]
      if (rejection.errors?.[0]?.code === 'file-too-large') {
        setError(`Fichier trop volumineux. Taille maximale: ${Math.round(maxSize / (1024 * 1024))}MB`)
      } else if (rejection.errors?.[0]?.code === 'file-invalid-type') {
        setError('Format de fichier non supporté. Veuillez sélectionner une vidéo.')
      } else {
        setError('Erreur lors de la sélection du fichier.')
      }
      return
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      setUploadedFile(file)
      onFileUpload(file)
    }
  }, [onFileUpload, maxSize])

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: { 'video/*': ['.mp4', '.avi', '.mov', '.webm', '.mkv', '.flv'] },
    maxSize,
    multiple: false,
    disabled: isLoading
  })

  const removeFile = () => {
    setUploadedFile(null)
    setError(null)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="w-full">
      <AnimatePresence>
        {!uploadedFile ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`upload-area relative cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all duration-300 ${
              isDragActive && !isDragReject
                ? 'border-primary-500 bg-primary-50'
                : isDragReject
                ? 'border-error-500 bg-error-50'
                : 'border-gray-300 bg-gray-50 hover:border-primary-400 hover:bg-primary-50'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              
              <div className="mx-auto mb-4">
                <Upload className={`h-12 w-12 mx-auto ${
                  isDragActive && !isDragReject
                    ? 'text-primary-500'
                    : isDragReject
                    ? 'text-error-500'
                    : 'text-gray-400'
                }`} />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {isDragActive && !isDragReject
                    ? 'Déposez votre vidéo ici'
                    : isDragReject
                    ? 'Format non supporté'
                    : 'Glissez-déposez votre vidéo'}
                </h3>
                
                <p className="text-sm text-gray-600">
                  ou <span className="text-primary-600 font-medium">cliquez pour parcourir</span>
                </p>
                
                <div className="text-xs text-gray-500 space-y-1">
                  <p>Formats supportés: MP4, AVI, MOV, WebM, MKV, FLV</p>
                  <p>Taille maximale: {Math.round(maxSize / (1024 * 1024))}MB</p>
                </div>
              </div>
            </div>
            
            {isLoading && (
              <div className="absolute inset-0 bg-white bg-opacity-75 rounded-xl flex items-center justify-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                  <p className="text-sm text-gray-600">Traitement en cours...</p>
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <FileVideo className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{uploadedFile.name}</h4>
                  <p className="text-sm text-gray-600">{formatFileSize(uploadedFile.size)}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {!isLoading && (
                  <CheckCircle className="h-5 w-5 text-success-500" />
                )}
                <button
                  onClick={removeFile}
                  disabled={isLoading}
                  className="p-1 text-gray-400 hover:text-error-500 transition-colors disabled:opacity-50"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {isLoading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Analyse IA en cours...</span>
                  <span className="text-primary-600">Processing</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-4 bg-error-50 border border-error-200 rounded-lg flex items-start space-x-3"
          >
            <AlertCircle className="h-5 w-5 text-error-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-error-800">Erreur</h4>
              <p className="text-sm text-error-700">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}