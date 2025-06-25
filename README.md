# Resume Editor

A full-stack web application for creating, editing, and enhancing resumes with AI assistance.

## Features

### Frontend (React + TypeScript)
- **File Upload**: Upload PDF or DOCX resume files (mock parsing with dummy content)
- **Resume Editor**: Edit personal information, summary, experience, education, and skills
- **Add/Remove Entries**: Dynamically add or remove experience and education entries
- **AI Enhancement**: Get AI-powered suggestions for improving resume sections
- **Save Resume**: Save resume data to the backend
- **Download Resume**: Export resume as JSON file
- **Responsive Design**: Works on desktop and mobile devices

### Backend (FastAPI + Python)
- **AI Enhancement API**: Mock AI service that provides content improvement suggestions
- **Resume Storage**: Save and retrieve resume data (in-memory + file storage)
- **CORS Support**: Configured for frontend communication
- **RESTful API**: Clean API design with proper error handling

## Project Structure

\`\`\`
resume-editor/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   └── saved_resumes/       # Stored resume files (created automatically)
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── FileUpload.tsx
│   │   │   ├── ResumeEditor.tsx
│   │   │   └── sections/
│   │   │       ├── PersonalInfoSection.tsx
│   │   │       ├── SummarySection.tsx
│   │   │       ├── ExperienceSection.tsx
│   │   │       ├── EducationSection.tsx
│   │   │       └── SkillsSection.tsx
│   │   ├── services/
│   │   │   └── api.ts       # API service functions
│   │   ├── types/
│   │   │   └── resume.ts    # TypeScript interfaces
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── index.tsx
│   └── package.json
└── README.md
\`\`\`

## Setup Instructions

### Prerequisites
- Python 3.8+ 
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
\`\`\`bash
cd backend
\`\`\`

2. Create a virtual environment:
\`\`\`bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate
\`\`\`

3. Install dependencies:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

4. Run the FastAPI server:
\`\`\`bash
python main.py
\`\`\`

The backend will be available at \`http://localhost:8000\`

### Frontend Setup

1. Navigate to the frontend directory:
\`\`\`bash
cd frontend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm start
\`\`\`

The frontend will be available at \`http://localhost:3000\`

## API Endpoints

### POST /ai-enhance
Enhance resume section content with AI suggestions.

**Request:**
\`\`\`json
{
  "section": "summary",
  "content": "Experienced developer with 5 years of experience..."
}
\`\`\`

**Response:**
\`\`\`json
{
  "enhanced_content": "AI-enhanced version with suggestions..."
}
\`\`\`

### POST /save-resume
Save complete resume data.

**Request:**
\`\`\`json
{
  "personal_info": {...},
  "summary": "...",
  "experience": [...],
  "education": [...],
  "skills": [...]
}
\`\`\`

**Response:**
\`\`\`json
{
  "message": "Resume saved successfully",
  "resume_id": "resume_20231201_143022",
  "saved_at": "2023-12-01T14:30:22"
}
\`\`\`

### GET /resume/{resume_id}
Retrieve a saved resume by ID.

### GET /resumes
List all saved resumes.

## Usage

1. **Start the Application**: Run both backend and frontend servers
2. **Upload or Create**: Either upload an existing resume file or start from scratch
3. **Edit Content**: Fill in your personal information, summary, experience, education, and skills
4. **Enhance with AI**: Click the "✨ Enhance with AI" button on any section to get improvement suggestions
5. **Save Resume**: Click "Save Resume" to store your data on the backend
6. **Download**: Use "Download JSON" to export your resume data

## Features in Detail

### File Upload
- Accepts PDF and DOCX files
- Mock parsing generates sample resume data
- Drag-and-drop support

### AI Enhancement
- Section-specific suggestions
- Keyword recommendations
- Formatting improvements
- Best practice tips

### Resume Sections
- **Personal Info**: Name, contact details, social profiles
- **Summary**: Professional summary with AI enhancement
- **Experience**: Work history with detailed descriptions
- **Education**: Academic background
- **Skills**: Technical and soft skills with tagging

### Data Persistence
- Resumes saved to backend storage
- JSON export functionality
- Resume retrieval by ID

## Development Notes

- Frontend uses React with TypeScript for type safety
- Backend uses FastAPI with Pydantic for data validation
- Mock AI enhancement provides realistic suggestions
- Responsive design works on all screen sizes
- CORS configured for local development

## Future Enhancements

- **Real File Parsing**: Integrate actual PDF/DOCX parsing libraries
- **Advanced AI Integration**: Connect to real AI services (OpenAI, Claude, etc.)
- **Resume Templates**: Multiple professional resume templates
- **PDF Export**: Generate PDF resumes from the editor
- **User Authentication**: User accounts and resume management
- **Collaboration**: Share and collaborate on resumes
- **ATS Optimization**: Applicant Tracking System compatibility checks
- **Real-time Preview**: Live preview of formatted resume

## Technologies Used

### Frontend
- React 18 with TypeScript
- CSS3 with Flexbox/Grid
- Fetch API for HTTP requests
- File API for upload handling

### Backend
- FastAPI (Python web framework)
- Pydantic for data validation
- Uvicorn ASGI server
- JSON file storage

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
\`\`\`

Now let's create the final script to run both servers:

```python file="scripts/start_servers.py"
#!/usr/bin/env python3
"""
Script to start both backend and frontend servers for the Resume Editor application.
"""

import subprocess
import sys
import os
import time
import signal
from pathlib import Path

def start_backend():
    """Start the FastAPI backend server."""
    backend_dir = Path(__file__).parent.parent / "backend"
    os.chdir(backend_dir)
    
    print("🚀 Starting FastAPI backend server...")
    return subprocess.Popen([
        sys.executable, "main.py"
    ], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

def start_frontend():
    """Start the React frontend development server."""
    frontend_dir = Path(__file__).parent.parent / "frontend"
    os.chdir(frontend_dir)
    
    print("🚀 Starting React frontend server...")
    return subprocess.Popen([
        "npm", "start"
    ], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

def main():
    """Main function to start both servers."""
    backend_process = None
    frontend_process = None
    
    try:
        # Start backend
        backend_process = start_backend()
        print("✅ Backend server started on http://localhost:8000")
        
        # Wait a moment for backend to start
        time.sleep(2)
        
        # Start frontend
        frontend_process = start_frontend()
        print("✅ Frontend server starting on http://localhost:3000")
        
        print("\n" + "="*50)
        print("🎉 Resume Editor is running!")
        print("📱 Frontend: http://localhost:3000")
        print("🔧 Backend API: http://localhost:8000")
        print("📚 API Docs: http://localhost:8000/docs")
        print("="*50)
        print("\nPress Ctrl+C to stop both servers")
        
        # Keep the script running
        while True:
            time.sleep(1)
            
            # Check if processes are still running
            if backend_process.poll() is not None:
                print("❌ Backend process stopped unexpectedly")
                break
            if frontend_process.poll() is not None:
                print("❌ Frontend process stopped unexpectedly")
                break
                
    except KeyboardInterrupt:
        print("\n🛑 Shutting down servers...")
        
    finally:
        # Clean up processes
        if backend_process:
            backend_process.terminate()
            backend_process.wait()
            print("✅ Backend server stopped")
            
        if frontend_process:
            frontend_process.terminate()
            frontend_process.wait()
            print("✅ Frontend server stopped")
        
        print("👋 Resume Editor stopped successfully")

if __name__ == "__main__":
    main()
