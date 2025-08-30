from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import tempfile, os, json
from typing import List
import uvicorn

# Environment configuration
API_TITLE = os.getenv("API_TITLE", "Content Repurposer IA API")
API_VERSION = os.getenv("API_VERSION", "1.0.0")
DEBUG = os.getenv("DEBUG", "false").lower() == "true"
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
MAX_UPLOAD_SIZE = os.getenv("MAX_UPLOAD_SIZE", "100MB")
UPLOAD_DIR = os.getenv("UPLOAD_DIR", "/tmp/uploads")

app = FastAPI(
    title=API_TITLE,
    version=API_VERSION,
    debug=DEBUG
)

# Configure CORS
app.add_middleware(
    CORSMiddleware, 
    allow_origins=CORS_ORIGINS, 
    allow_methods=["*"], 
    allow_headers=["*"],
    allow_credentials=True
)

# Ensure upload directory exists
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get('/health')
def health():
    return {
        'status': 'ok',
        'service': API_TITLE,
        'version': API_VERSION,
        'debug': DEBUG
    }

@app.post('/transcribe')
async def transcribe(file: UploadFile = File(...)):
    # Validate file type
    if not file.content_type or not file.content_type.startswith('video/'):
        return {'error': 'Invalid file type. Please upload a video file.'}
    
    # Create project directory
    project_id = tempfile.mkdtemp(dir=UPLOAD_DIR).split('/')[-1]
    project_dir = os.path.join(UPLOAD_DIR, project_id)
    
    # Save uploaded file
    file_path = os.path.join(project_dir, file.filename or 'video.mp4')
    with open(file_path, 'wb') as f:
        content = await file.read()
        f.write(content)
    
    # Mock transcription (replace with actual AI service)
    data = {
        'text': 'Ceci est une transcription mock générée pour le fichier uploadé.',
        'duration': '00:02:30',
        'language': 'fr',
        'confidence': 0.95,
        'filename': file.filename
    }
    
    # Save transcription result
    transcription_path = os.path.join(project_dir, 'transcription.json')
    with open(transcription_path, 'w') as f:
        json.dump(data, f, indent=2)
    
    return {
        'project_id': project_id,
        'transcription': data,
        'status': 'completed'
    }

if __name__ == "__main__":
    HOST = os.getenv("HOST", "127.0.0.1")
    PORT = int(os.getenv("PORT", "8000"))
    uvicorn.run(app, host=HOST, port=PORT, reload=DEBUG)
