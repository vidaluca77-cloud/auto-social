#!/bin/bash

# Auto Social - Netlify Deployment Script
# This script prepares the application for Netlify deployment

set -e

echo "🚀 Preparing Auto Social for Netlify deployment..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Navigate to the web directory
cd "$(dirname "$0")/content_repurposer_ia/web"

echo -e "${YELLOW}📋 Checking prerequisites...${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+ first.${NC}"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js version 18+ is required. Current version: $(node --version)${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node --version) is installed${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ npm $(npm --version) is installed${NC}"

echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install

echo -e "${YELLOW}🔧 Running build process...${NC}"
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build completed successfully!${NC}"
else
    echo -e "${RED}❌ Build failed. Please check the errors above.${NC}"
    exit 1
fi

# Check if out directory exists
if [ -d "out" ]; then
    echo -e "${GREEN}✅ Static files generated in 'out' directory${NC}"
    echo -e "${BLUE}📊 Build statistics:${NC}"
    echo -e "${BLUE}   - Total files: $(find out -type f | wc -l)${NC}"
    echo -e "${BLUE}   - Total size: $(du -sh out | cut -f1)${NC}"
else
    echo -e "${RED}❌ Output directory 'out' not found${NC}"
    exit 1
fi

echo -e "${YELLOW}🔍 Validating build...${NC}"

# Check for essential files
ESSENTIAL_FILES=(
    "out/index.html"
    "out/manifest.json"
    "out/_next"
)

for file in "${ESSENTIAL_FILES[@]}"; do
    if [ -e "$file" ]; then
        echo -e "${GREEN}✅ Found: $file${NC}"
    else
        echo -e "${RED}❌ Missing: $file${NC}"
        exit 1
    fi
done

echo -e "${YELLOW}📋 Netlify configuration check...${NC}"

# Go back to root to check netlify.toml
cd ../../

if [ -f "netlify.toml" ]; then
    echo -e "${GREEN}✅ netlify.toml configuration found${NC}"
    
    # Check if functions directory exists
    if [ -d "netlify/functions" ]; then
        echo -e "${GREEN}✅ Netlify Functions directory found${NC}"
        echo -e "${BLUE}   - Functions: $(ls netlify/functions/*.js 2>/dev/null | wc -l)${NC}"
    else
        echo -e "${RED}❌ Netlify Functions directory missing${NC}"
        exit 1
    fi
else
    echo -e "${RED}❌ netlify.toml configuration missing${NC}"
    exit 1
fi

echo -e "${YELLOW}🎯 Final preparation...${NC}"

# Create deployment summary
cat > deployment-summary.md << EOF
# 🚀 Auto Social - Deployment Summary

## Build Information
- **Build Date**: $(date)
- **Node.js Version**: $(node --version)
- **npm Version**: $(npm --version)
- **Build Status**: ✅ Success

## Files Generated
- **Static Files**: $(find content_repurposer_ia/web/out -type f | wc -l) files
- **Total Size**: $(du -sh content_repurposer_ia/web/out | cut -f1)
- **Netlify Functions**: $(ls netlify/functions/*.js 2>/dev/null | wc -l) functions

## Deployment Configuration
- **Build Command**: \`npm run build\`
- **Publish Directory**: \`content_repurposer_ia/web/out\`
- **Functions Directory**: \`netlify/functions\`

## Next Steps for Netlify
1. Connect this repository to Netlify
2. Set build command: \`npm run build\`
3. Set publish directory: \`content_repurposer_ia/web/out\`
4. Deploy automatically on push

## Features Ready
✅ Modern React/Next.js application  
✅ AI-powered content processing  
✅ Progressive Web App (PWA)  
✅ Responsive design with animations  
✅ Serverless functions for backend  
✅ Optimized for performance  

**Your revolutionary content repurposing platform is ready for deployment! 🎉**
EOF

echo -e "${GREEN}🎉 Deployment preparation completed successfully!${NC}"
echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}🚀 AUTO SOCIAL - READY FOR NETLIFY DEPLOYMENT 🚀${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${GREEN}✅ Build completed successfully${NC}"
echo -e "${GREEN}✅ Static files ready in: content_repurposer_ia/web/out${NC}"
echo -e "${GREEN}✅ Netlify Functions ready in: netlify/functions${NC}"
echo -e "${GREEN}✅ Configuration ready: netlify.toml${NC}"
echo ""
echo -e "${YELLOW}📋 Netlify Settings:${NC}"
echo -e "${YELLOW}   • Build command: npm run build${NC}"
echo -e "${YELLOW}   • Publish directory: content_repurposer_ia/web/out${NC}"
echo -e "${YELLOW}   • Functions directory: netlify/functions${NC}"
echo ""
echo -e "${BLUE}🌐 Features included:${NC}"
echo -e "${BLUE}   • Revolutionary AI-powered interface${NC}"
echo -e "${BLUE}   • Progressive Web App (PWA) capabilities${NC}"
echo -e "${BLUE}   • Serverless functions for content processing${NC}"
echo -e "${BLUE}   • Modern responsive design with animations${NC}"
echo -e "${BLUE}   • Optimized performance and SEO${NC}"
echo ""
echo -e "${GREEN}🎯 Ready to revolutionize content creation with AI! 🎯${NC}"
echo ""

# Show deployment summary
if [ -f "deployment-summary.md" ]; then
    echo -e "${YELLOW}📊 Deployment summary created: deployment-summary.md${NC}"
fi

echo -e "${YELLOW}🔗 To deploy: Push this repository to GitHub and connect to Netlify${NC}"