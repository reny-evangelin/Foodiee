#!/usr/bin/env bash
set -e

echo "🚀 Starting DevOps Foodiee Deployment..."

# 1. Pull latest git code
echo "📥 Step 1: Pulling latest changes from repository..."
git pull origin main || true

# 2. Build Docker images
echo "🔨 Step 2: Building Docker images for Backend and Frontend..."
docker-compose build --no-cache

# 3. Stop old containers and bring up new deployment
echo "🔄 Step 3: Launching updated Docker containers..."
docker-compose down
docker-compose up -d

# 4. Verify deployment health
echo "🩺 Step 4: Checking container status..."
docker-compose ps

echo "✅ Foodiee deployment complete!"
echo "🌐 Frontend running on http://localhost"
echo "⚙️ Backend API running on http://localhost:8000"
