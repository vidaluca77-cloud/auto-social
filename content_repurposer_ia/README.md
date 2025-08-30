# Content Repurposer IA

Transforme automatiquement une vidéo en transcription + preview (MVP).

## 🚀 Démarrage rapide avec Docker

### Développement

```bash
cd content_repurposer_ia
./setup-dev.sh
```

Cela va :
- Créer les fichiers d'environnement
- Construire les conteneurs Docker
- Démarrer les services
- Afficher les URLs d'accès

**URLs :**
- Interface web : http://localhost:3000
- API : http://localhost:8000
- Santé de l'API : http://localhost:8000/health

### Production

```bash
cd content_repurposer_ia
# Configurer les fichiers .env (voir section Configuration)
./deploy-prod.sh
```

## 📋 Configuration

### API (.env)
Copiez `api/.env.example` vers `api/.env` et modifiez selon vos besoins :

```bash
# Configuration de base
HOST=0.0.0.0
PORT=8000
DEBUG=false

# CORS (domaines autorisés)
CORS_ORIGINS="https://votre-domaine.com"

# Upload de fichiers
MAX_UPLOAD_SIZE=100MB
UPLOAD_DIR="/tmp/uploads"
```

### Web (.env.local)
Copiez `web/.env.example` vers `web/.env.local` :

```bash
# URL de l'API
NEXT_PUBLIC_API_BASE=https://votre-api-domaine.com

# Configuration app
NEXT_PUBLIC_APP_NAME="Content Repurposer IA"
```

## 🏗️ Développement manuel

### API
```bash
cd api
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload --port 8000
```

### Web
```bash
cd web
npm install
cp .env.example .env.local
npm run dev
```

## 🐳 Déploiement Docker

### Développement
```bash
docker-compose up -d
```

### Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🌐 Configuration Production

### Nginx (Reverse Proxy)
Le fichier `nginx/nginx.conf` est préconfiguré avec :
- Rate limiting
- Headers de sécurité
- Proxy vers API et Web
- Support HTTPS (à décommenter)

### SSL/HTTPS
Pour activer HTTPS :
1. Obtenez des certificats SSL (Let's Encrypt recommandé)
2. Placez-les dans `nginx/ssl/`
3. Décommentez la section HTTPS dans `nginx/nginx.conf`
4. Redémarrez nginx

### Domaine
Modifiez `server_name` dans `nginx/nginx.conf` avec votre domaine.

## 🔧 API Endpoints

- `GET /health` - Vérification de santé
- `POST /transcribe` - Upload et transcription de vidéo

## 📁 Structure du projet

```
content_repurposer_ia/
├── api/                    # Backend FastAPI
│   ├── main.py            # Application principale
│   ├── requirements.txt   # Dépendances Python
│   ├── Dockerfile         # Container API
│   └── .env.example       # Variables d'environnement
├── web/                   # Frontend Next.js
│   ├── src/               # Code source
│   ├── package.json       # Dépendances Node.js
│   ├── Dockerfile         # Container Web
│   ├── next.config.js     # Configuration Next.js
│   └── .env.example       # Variables d'environnement
├── worker/                # Services de traitement
├── nginx/                 # Configuration reverse proxy
├── docker-compose.yml     # Développement
├── docker-compose.prod.yml # Production
├── setup-dev.sh          # Script développement
└── deploy-prod.sh        # Script production
```

## 🛠️ Commandes utiles

```bash
# Voir les logs
docker-compose logs -f

# Redémarrer un service
docker-compose restart api

# Stopper tous les services
docker-compose down

# Reconstruire les containers
docker-compose build --no-cache

# Production
docker-compose -f docker-compose.prod.yml [command]
```

## 🔒 Sécurité

- CORS configuré par environnement
- Rate limiting sur nginx
- Headers de sécurité
- Validation des types de fichiers
- Timeouts configurés pour uploads

## 📊 Monitoring

- Health checks intégrés dans Docker
- Endpoints de santé pour monitoring externe
- Logs structurés pour analyse

## 🚨 Dépannage

### Les services ne démarrent pas
```bash
docker-compose logs
```

### Erreur de CORS
Vérifiez `CORS_ORIGINS` dans `api/.env`

### Erreur de connexion API
Vérifiez `NEXT_PUBLIC_API_BASE` dans `web/.env.local`

### Upload de fichiers échoue
- Vérifiez `MAX_UPLOAD_SIZE`
- Vérifiez les permissions du dossier `UPLOAD_DIR`
