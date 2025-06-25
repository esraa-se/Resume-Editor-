"use client"

import type React from "react"
import { useState } from "react"
import type { Experience } from "../../types/resume"
import { enhanceWithAI } from "../../services/api"

interface ExperienceSectionProps {
  data: Experience[]
  onChange: (data: Experience[]) => void
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ data, onChange }) => {
  const [isEnhancing, setIsEnhancing] = useState(false)
  const [enhancedContent, setEnhancedContent] = useState("")
  const [showEnhanced, setShowEnhanced] = useState(false)

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    }
    onChange([...data, newExperience])
  }

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    onChange(data.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)))
  }

  const removeExperience = (id: string) => {
    onChange(data.filter((exp) => exp.id !== id))
  }

  const handleEnhance = async () => {
    const experienceText = data.map((exp) => `${exp.title} at ${exp.company}\n${exp.description}`).join("\n\n")

    if (!experienceText.trim()) {
      alert("Please add some experience entries to enhance")
      return
    }

    setIsEnhancing(true)
    try {
      const response = await enhanceWithAI("experience", experienceText)
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
        <h2>Work Experience</h2>
        <div className="section-actions">
          <button className="enhance-btn" onClick={handleEnhance} disabled={isEnhancing}>
            {isEnhancing ? "Enhancing..." : "✨ Enhance with AI"}
          </button>
          <button className="add-btn" onClick={addExperience}>
            + Add Experience
          </button>
        </div>
      </div>

      {data.map((experience) => (
        <div key={experience.id} className="experience-item">
          <div className="item-header">
            <h3>Experience Entry</h3>
            <button className="remove-btn" onClick={() => removeExperience(experience.id)}>
              Remove
            </button>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Job Title</label>
              <input
                type="text"
                value={experience.title}
                onChange={(e) => updateExperience(experience.id, "title", e.target.value)}
                placeholder="Senior Software Engineer"
              />
            </div>
            <div className="form-group">
              <label>Company</label>
              <input
                type="text"
                value={experience.company}
                onChange={(e) => updateExperience(experience.id, "company", e.target.value)}
                placeholder="Tech Corp"
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={experience.location}
                onChange={(e) => updateExperience(experience.id, "location", e.target.value)}
                placeholder="San Francisco, CA"
              />
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="month"
                value={experience.startDate}
                onChange={(e) => updateExperience(experience.id, "startDate", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="month"
                value={experience.endDate}
                onChange={(e) => updateExperience(experience.id, "endDate", e.target.value)}
                placeholder="Leave empty if current"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={experience.description}
              onChange={(e) => updateExperience(experience.id, "description", e.target.value)}
              placeholder="Describe your responsibilities and achievements..."
              rows={3}
            />
          </div>
        </div>
      ))}

      {data.length === 0 && (
        <div className="empty-state">
          <p>No work experience added yet.</p>
          <button onClick={addExperience}>Add Your First Experience</button>
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
