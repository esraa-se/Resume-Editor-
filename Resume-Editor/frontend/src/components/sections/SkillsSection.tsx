"use client"

import type React from "react"
import { useState } from "react"
import { enhanceWithAI } from "../../services/api"

interface SkillsSectionProps {
  data: string[]
  onChange: (data: string[]) => void
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState("")
  const [isEnhancing, setIsEnhancing] = useState(false)
  const [enhancedContent, setEnhancedContent] = useState("")
  const [showEnhanced, setShowEnhanced] = useState(false)

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    onChange(data.filter((skill) => skill !== skillToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addSkill()
    }
  }

  const handleEnhance = async () => {
    const skillsText = data.join(", ")

    if (!skillsText.trim()) {
      alert("Please add some skills to enhance")
      return
    }

    setIsEnhancing(true)
    try {
      const response = await enhanceWithAI("skills", skillsText)
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
        <h2>Skills</h2>
        <button className="enhance-btn" onClick={handleEnhance} disabled={isEnhancing}>
          {isEnhancing ? "Enhancing..." : "✨ Enhance with AI"}
        </button>
      </div>

      <div className="skills-input">
        <div className="form-group">
          <label>Add Skill</label>
          <div className="skill-input-group">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter a skill (e.g., JavaScript, Project Management)"
            />
            <button onClick={addSkill} disabled={!newSkill.trim()}>
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="skills-list">
        {data.map((skill, index) => (
          <div key={index} className="skill-tag">
            <span>{skill}</span>
            <button className="remove-skill" onClick={() => removeSkill(skill)}>
              ×
            </button>
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <div className="empty-state">
          <p>No skills added yet.</p>
          <p>Add your technical and soft skills to showcase your expertise.</p>
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
