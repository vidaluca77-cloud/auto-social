#!/bin/bash

# Content Repurposer IA - Development Setup Script

set -e

echo "🚀 Setting up Content Repurposer IA for development..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

# Navigate to the content_repurposer_ia directory
cd "$(dirname "$0")"

echo -e "${YELLOW}📋 Setting up environment files...${NC}"

# Copy environment files if they don't exist
if [ ! -f api/.env ]; then
    cp api/.env.example api/.env
    echo -e "${GREEN}✅ Created api/.env from example${NC}"
else
    echo -e "${YELLOW}⚠️  api/.env already exists, skipping...${NC}"
fi

if [ ! -f web/.env.local ]; then
    cp web/.env.example web/.env.local
    echo -e "${GREEN}✅ Created web/.env.local from example${NC}"
else
    echo -e "${YELLOW}⚠️  web/.env.local already exists, skipping...${NC}"
fi

echo -e "${YELLOW}🔨 Building Docker containers...${NC}"
docker-compose build

echo -e "${YELLOW}🚀 Starting services...${NC}"
docker-compose up -d

echo -e "${YELLOW}⏳ Waiting for services to be healthy...${NC}"
sleep 10

# Check if services are running
if docker-compose ps | grep -q "Up (healthy)"; then
    echo -e "${GREEN}✅ Services are running successfully!${NC}"
    echo -e "${GREEN}🌐 Web app: http://localhost:3000${NC}"
    echo -e "${GREEN}🔧 API: http://localhost:8000${NC}"
    echo -e "${GREEN}📊 API Health: http://localhost:8000/health${NC}"
    echo ""
    echo -e "${YELLOW}To view logs: docker-compose logs -f${NC}"
    echo -e "${YELLOW}To stop services: docker-compose down${NC}"
else
    echo -e "${RED}❌ Some services failed to start. Check logs with: docker-compose logs${NC}"
    exit 1
fi