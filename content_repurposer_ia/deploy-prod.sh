#!/bin/bash

# Content Repurposer IA - Production Deployment Script

set -e

echo "🚀 Deploying Content Repurposer IA to production..."

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

echo -e "${YELLOW}📋 Checking production environment files...${NC}"

# Check if production environment files exist
if [ ! -f api/.env ]; then
    echo -e "${RED}❌ api/.env not found. Please create it based on api/.env.example${NC}"
    exit 1
fi

if [ ! -f web/.env.local ]; then
    echo -e "${RED}❌ web/.env.local not found. Please create it based on web/.env.example${NC}"
    exit 1
fi

echo -e "${YELLOW}🔨 Building production Docker containers...${NC}"
docker-compose -f docker-compose.prod.yml build --no-cache

echo -e "${YELLOW}🚀 Starting production services...${NC}"
docker-compose -f docker-compose.prod.yml up -d

echo -e "${YELLOW}⏳ Waiting for services to be healthy...${NC}"
sleep 15

# Check if services are running
if docker-compose -f docker-compose.prod.yml ps | grep -q "Up (healthy)"; then
    echo -e "${GREEN}✅ Production services are running successfully!${NC}"
    echo -e "${GREEN}🌐 Application: http://localhost${NC}"
    echo -e "${GREEN}🔧 API: http://localhost/api${NC}"
    echo -e "${GREEN}📊 Health Check: http://localhost/health${NC}"
    echo ""
    echo -e "${YELLOW}To view logs: docker-compose -f docker-compose.prod.yml logs -f${NC}"
    echo -e "${YELLOW}To stop services: docker-compose -f docker-compose.prod.yml down${NC}"
    echo ""
    echo -e "${YELLOW}📝 Remember to:${NC}"
    echo -e "${YELLOW}   - Configure your domain in nginx/nginx.conf${NC}"
    echo -e "${YELLOW}   - Set up SSL certificates if using HTTPS${NC}"
    echo -e "${YELLOW}   - Configure firewall rules${NC}"
    echo -e "${YELLOW}   - Set up monitoring and logging${NC}"
else
    echo -e "${RED}❌ Some services failed to start. Check logs with: docker-compose -f docker-compose.prod.yml logs${NC}"
    exit 1
fi