"use client"

import type React from "react"
import { useState } from "react"
import { enhanceWithAI } from "../../services/api"

interface SummarySectionProps {
  data: string
  onChange: (data: string) => void
}

export const SummarySection: React.FC<SummarySectionProps> = ({ data, onChange }) => {
  const [isEnhancing, setIsEnhancing] = useState(false)
  const [enhancedContent, setEnhancedContent] = useState("")
  const [showEnhanced, setShowEnhanced] = useState(false)

  const handleEnhance = async () => {
    if (!data.trim()) {
      alert("Please add some content to enhance")
      return
    }

    setIsEnhancing(true)
    try {
      const response = await enhanceWithAI("summary", data)
      setEnhancedContent(response.enhanced_content)
      setShowEnhanced(true)
    } catch (error) {
      alert("Failed to enhance content. Please try again.")
    } finally {
      setIsEnhancing(false)
    }
  }

  const applyEnhancement = () => {
    // For demo purposes, we'll just show the enhanced content
    // In a real app, you might parse and apply specific improvements
    setShowEnhanced(false)
  }

  return (
    <div className="resume-section">
      <div className="section-header">
        <h2>Professional Summary</h2>
        <button className="enhance-btn" onClick={handleEnhance} disabled={isEnhancing}>
          {isEnhancing ? "Enhancing..." : "✨ Enhance with AI"}
        </button>
      </div>

      <div className="form-group">
        <textarea
          value={data}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write a brief summary of your professional background, key skills, and career objectives..."
          rows={4}
        />
      </div>

      {showEnhanced && (
        <div className="ai-enhancement">
          <h3>AI Enhancement Suggestions</h3>
          <div className="enhanced-content">
            <pre>{enhancedContent}</pre>
          </div>
          <div className="enhancement-actions">
            <button onClick={applyEnhancement}>Apply Suggestions</button>
            <button onClick={() => setShowEnhanced(false)}>Dismiss</button>
          </div>
        </div>
      )}
    </div>
  )
}
