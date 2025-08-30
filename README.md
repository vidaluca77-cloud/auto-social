# auto-social

Outil IA pour transformer automatiquement vidéos/podcasts en clips, posts et visuels.

## 🚀 Applications

### Content Repurposer IA (MVP)
Application de transcription automatique de vidéos.

**Démarrage rapide :**
```bash
cd content_repurposer_ia
./setup-dev.sh
```

**URLs de développement :**
- Interface web : http://localhost:3000
- API : http://localhost:8000

**Voir :** [content_repurposer_ia/README.md](content_repurposer_ia/README.md) pour la documentation complète.

## 🏗️ Architecture

- **API Backend** : FastAPI avec Python
- **Frontend Web** : Next.js avec React
- **Déploiement** : Docker + Docker Compose
- **Reverse Proxy** : Nginx (production)

## 📋 Fonctionnalités

- ✅ Upload de vidéos
- ✅ Transcription automatique (MVP avec mock)
- ✅ Interface web responsive
- ✅ API REST documentée
- ✅ Déploiement Docker
- ✅ Configuration production
- 🔄 Intégration IA réelle (à venir)
- 🔄 Génération de clips (à venir)
- 🔄 Création de posts sociaux (à venir)
