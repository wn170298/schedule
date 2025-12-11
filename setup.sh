#!/bin/bash

# Setup script for Sapienza Schedule application
# This script helps with initial configuration and setup

set -e

echo "🚀 Sapienza Schedule - Setup Script"
echo "=================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Check git
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git."
    exit 1
fi

echo "✅ Git is installed"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Dependencies installed"
echo ""

# Check for environment file
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from template..."
    cp .env.local.example .env.local
    echo "⚠️  Please update .env.local with your Supabase credentials"
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "=========================================="
echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with Supabase credentials"
echo "2. Set up database tables (see docs/SETUP_INSTRUCTIONS.md)"
echo "3. Run: npm run dev"
echo "4. Visit: http://localhost:3000"
echo ""
echo "For detailed setup instructions, see: docs/SETUP_INSTRUCTIONS.md"
echo "=========================================="
