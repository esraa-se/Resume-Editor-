"use client"

import type React from "react"
import { useState } from "react"
import type { Education } from "../../types/resume"
import { enhanceWithAI } from "../../services/api"

interface EducationSectionProps {
  data: Education[]
  onChange: (data: Education[]) => void
}

export const EducationSection: React.FC<EducationSectionProps> = ({ data, onChange }) => {
  const [isEnhancing, setIsEnhancing] = useState(false)
  const [enhancedContent, setEnhancedContent] = useState("")
  const [showEnhanced, setShowEnhanced] = useState(false)

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: "",
      school: "",
      location: "",
      graduationDate: "",
      gpa: "",
    }
    onChange([...data, newEducation])
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(data.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)))
  }

  const removeEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id))
  }

  const handleEnhance = async () => {
    const educationText = data
      .map((edu) => `${edu.degree} from ${edu.school}, ${edu.location} (${edu.graduationDate})`)
      .join("\n")

    if (!educationText.trim()) {
      alert("Please add some education entries to enhance")
      return
    }

    setIsEnhancing(true)
    try {
      const response = await enhanceWithAI("education", educationText)
      setEnhancedContent(response.enhanced_content)
      setShowEnhanced(true)
    } catch (error) {
      alert("Failed to enhance content. Please try again.")
    } finally {
      setIsEnhancing(false)
    }
  }

  return (
    <div className="resume-section">
      <div className="section-header">
        <h2>Education</h2>
        <div className="section-actions">
          <button className="enhance-btn" onClick={handleEnhance} disabled={isEnhancing}>
            {isEnhancing ? "Enhancing..." : "✨ Enhance with AI"}
          </button>
          <button className="add-btn" onClick={addEducation}>
            + Add Education
          </button>
        </div>
      </div>

      {data.map((education) => (
        <div key={education.id} className="education-item">
          <div className="item-header">
            <h3>Education Entry</h3>
            <button className="remove-btn" onClick={() => removeEducation(education.id)}>
              Remove
            </button>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Degree</label>
              <input
                type="text"
                value={education.degree}
                onChange={(e) => updateEducation(education.id, "degree", e.target.value)}
                placeholder="Bachelor of Science in Computer Science"
              />
            </div>
            <div className="form-group">
              <label>School</label>
              <input
                type="text"
                value={education.school}
                onChange={(e) => updateEducation(education.id, "school", e.target.value)}
                placeholder="University of California"
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={education.location}
                onChange={(e) => updateEducation(education.id, "location", e.target.value)}
                placeholder="Berkeley, CA"
              />
            </div>
            <div className="form-group">
              <label>Graduation Date</label>
              <input
                type="month"
                value={education.graduationDate}
                onChange={(e) => updateEducation(education.id, "graduationDate", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>GPA (Optional)</label>
              <input
                type="text"
                value={education.gpa}
                onChange={(e) => updateEducation(education.id, "gpa", e.target.value)}
                placeholder="3.8"
              />
            </div>
          </div>
        </div>
      ))}

      {data.length === 0 && (
        <div className="empty-state">
          <p>No education entries added yet.</p>
          <button onClick={addEducation}>Add Your First Education</button>
        </div>
      )}

      {showEnhanced && (
        <div className="ai-enhancement">
          <h3>AI Enhancement Suggestions</h3>
          <div className="enhanced-content">
            <pre>{enhancedContent}</pre>
          </div>
          <div className="enhancement-actions">
            <button onClick={() => setShowEnhanced(false)}>Dismiss</button>
          </div>
        </div>
      )}
    </div>
  )
}
