#!/bin/bash

# Content Repurposer IA - Health Monitoring Script

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

API_URL="${API_URL:-http://localhost:8000}"
WEB_URL="${WEB_URL:-http://localhost:3000}"

check_service() {
    local service_name=$1
    local url=$2
    local expected_status=$3
    
    echo -e "${YELLOW}Checking $service_name...${NC}"
    
    if response=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null); then
        if [ "$response" = "$expected_status" ]; then
            echo -e "${GREEN}✅ $service_name is healthy (HTTP $response)${NC}"
            return 0
        else
            echo -e "${RED}❌ $service_name returned HTTP $response (expected $expected_status)${NC}"
            return 1
        fi
    else
        echo -e "${RED}❌ $service_name is unreachable${NC}"
        return 1
    fi
}

echo "🔍 Health Check for Content Repurposer IA"
echo "=========================================="

# Check API health
check_service "API" "$API_URL/health" "200"
api_status=$?

# Check Web app
check_service "Web App" "$WEB_URL" "200"
web_status=$?

echo ""
echo "=========================================="

if [ $api_status -eq 0 ] && [ $web_status -eq 0 ]; then
    echo -e "${GREEN}✅ All services are healthy!${NC}"
    exit 0
else
    echo -e "${RED}❌ Some services are unhealthy. Check the logs.${NC}"
    exit 1
fi