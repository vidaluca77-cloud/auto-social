# Content Repurposer IA

Transforme automatiquement une vidéo en transcription + preview (MVP).

## Démarrage rapide

### API
cd api
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload --port 8000

### Web
cd web
npm install
cp .env.example .env.local
npm run dev
