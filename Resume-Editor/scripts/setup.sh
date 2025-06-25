#!/bin/bash

# Resume Editor Setup Script
echo "🚀 Setting up Resume Editor..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed."
    exit 1
fi

# Setup Backend
echo "📦 Setting up backend..."
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

echo "✅ Backend setup complete"

# Setup Frontend
echo "📦 Setting up frontend..."
cd ../frontend

# Install Node.js dependencies
npm install

echo "✅ Frontend setup complete"

echo "🎉 Setup complete! Run the following commands to start:"
echo "Backend: cd backend && source venv/bin/activate && python main.py"
echo "Frontend: cd frontend && npm start"
echo ""
echo "Or use the start script: python scripts/start_servers.py"
