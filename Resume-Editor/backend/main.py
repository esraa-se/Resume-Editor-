from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, List, Optional
import json
import os
from datetime import datetime

app = FastAPI(title="Resume Editor API", version="1.0.0")

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for resumes (in production, use a database)
resume_storage = {}

class AIEnhanceRequest(BaseModel):
    section: str
    content: str

class AIEnhanceResponse(BaseModel):
    enhanced_content: str

class ResumeData(BaseModel):
    id: Optional[str] = None
    personal_info: Dict[str, Any]
    summary: str
    experience: List[Dict[str, Any]]
    education: List[Dict[str, Any]]
    skills: List[str]
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

@app.get("/")
async def root():
    return {"message": "Resume Editor API is running!"}

@app.post("/ai-enhance", response_model=AIEnhanceResponse)
async def ai_enhance(request: AIEnhanceRequest):
    """Mock AI enhancement endpoint"""
    
    # Mock AI enhancements based on section type
    enhancements = {
        "summary": {
            "keywords": ["results-driven", "innovative", "collaborative", "strategic"],
            "improvements": [
                "Quantify achievements with specific metrics",
                "Highlight leadership and problem-solving skills",
                "Emphasize industry-relevant technologies"
            ]
        },
        "experience": {
            "keywords": ["achieved", "implemented", "optimized", "led", "developed"],
            "improvements": [
                "Use action verbs to start bullet points",
                "Include quantifiable results and impact",
                "Highlight relevant technologies and methodologies"
            ]
        },
        "education": {
            "keywords": ["graduated", "specialized", "focused", "achieved"],
            "improvements": [
                "Include relevant coursework and projects",
                "Mention academic achievements and honors",
                "Highlight applicable skills gained"
            ]
        },
        "skills": {
            "keywords": ["proficient", "experienced", "advanced", "certified"],
            "improvements": [
                "Group skills by category (Technical, Soft Skills, etc.)",
                "Include proficiency levels",
                "Add relevant certifications"
            ]
        }
    }
    
    section_type = request.section.lower()
    original_content = request.content
    
    if not original_content.strip():
        raise HTTPException(status_code=400, detail="Content cannot be empty")
    
    # Mock enhancement logic
    if section_type in enhancements:
        enhancement_data = enhancements[section_type]
        
        # Simple mock enhancement: add power words and suggestions
        enhanced_content = f"""**AI-Enhanced Version:**

{original_content}

**Suggested Improvements:**
{chr(10).join(f"• {improvement}" for improvement in enhancement_data['improvements'])}

**Recommended Keywords:** {', '.join(enhancement_data['keywords'])}

**Enhanced Example:**
{_generate_enhanced_example(section_type, original_content)}
"""
    else:
        enhanced_content = f"""**AI-Enhanced Version:**

{original_content}

**General Suggestions:**
• Use strong action verbs
• Include specific metrics and achievements
• Tailor content to target job requirements
• Ensure clarity and conciseness
"""
    
    return AIEnhanceResponse(enhanced_content=enhanced_content)

def _generate_enhanced_example(section_type: str, original: str) -> str:
    """Generate a mock enhanced example based on section type"""
    examples = {
        "summary": "Results-driven software engineer with 5+ years of experience developing scalable web applications. Led cross-functional teams of 8+ members, resulting in 40% faster project delivery. Expertise in React, Python, and cloud technologies with a proven track record of optimizing system performance by 60%.",
        
        "experience": "• Developed and deployed 15+ responsive web applications using React and Node.js, serving 10,000+ daily active users\n• Optimized database queries and API performance, reducing response time by 45%\n• Led agile development team of 6 engineers, delivering projects 30% ahead of schedule",
        
        "education": "Bachelor of Science in Computer Science - University of Technology (2019)\n• Relevant Coursework: Data Structures, Algorithms, Database Systems, Software Engineering\n• Senior Project: Built an AI-powered recommendation system with 85% accuracy\n• Dean's List: Fall 2018, Spring 2019",
        
        "skills": "**Technical Skills:** JavaScript, Python, React, Node.js, PostgreSQL, AWS, Docker\n**Soft Skills:** Leadership, Problem-solving, Team Collaboration, Project Management\n**Certifications:** AWS Certified Developer, Google Cloud Professional"
    }
    
    return examples.get(section_type, "Enhanced version with improved formatting and stronger language.")

@app.post("/save-resume")
async def save_resume(resume: ResumeData):
    """Save resume data"""
    try:
        # Generate ID if not provided
        if not resume.id:
            resume.id = f"resume_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        
        # Add timestamps
        current_time = datetime.now().isoformat()
        if not resume.created_at:
            resume.created_at = current_time
        resume.updated_at = current_time
        
        # Store in memory (in production, save to database)
        resume_storage[resume.id] = resume.dict()
        
        # Also save to file for persistence
        os.makedirs("saved_resumes", exist_ok=True)
        with open(f"saved_resumes/{resume.id}.json", "w") as f:
            json.dump(resume.dict(), f, indent=2)
        
        return {
            "message": "Resume saved successfully",
            "resume_id": resume.id,
            "saved_at": resume.updated_at
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save resume: {str(e)}")

@app.get("/resume/{resume_id}")
async def get_resume(resume_id: str):
    """Retrieve a saved resume"""
    if resume_id in resume_storage:
        return resume_storage[resume_id]
    
    # Try to load from file
    try:
        with open(f"saved_resumes/{resume_id}.json", "r") as f:
            resume_data = json.load(f)
            resume_storage[resume_id] = resume_data  # Cache in memory
            return resume_data
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Resume not found")

@app.get("/resumes")
async def list_resumes():
    """List all saved resumes"""
    resumes = []
    
    # Get from memory
    for resume_id, resume_data in resume_storage.items():
        resumes.append({
            "id": resume_id,
            "name": resume_data.get("personal_info", {}).get("name", "Unknown"),
            "updated_at": resume_data.get("updated_at")
        })
    
    # Also check saved files
    if os.path.exists("saved_resumes"):
        for filename in os.listdir("saved_resumes"):
            if filename.endswith(".json"):
                resume_id = filename[:-5]  # Remove .json extension
                if resume_id not in resume_storage:
                    try:
                        with open(f"saved_resumes/{filename}", "r") as f:
                            resume_data = json.load(f)
                            resumes.append({
                                "id": resume_id,
                                "name": resume_data.get("personal_info", {}).get("name", "Unknown"),
                                "updated_at": resume_data.get("updated_at")
                            })
                    except:
                        continue
    
    return {"resumes": resumes}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
