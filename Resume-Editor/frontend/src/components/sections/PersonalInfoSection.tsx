"use client"

import type React from "react"
import type { PersonalInfo } from "../../types/resume"

interface PersonalInfoSectionProps {
  data: PersonalInfo
  onChange: (data: PersonalInfo) => void
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({
      ...data,
      [field]: value,
    })
  }

  return (
    <div className="resume-section">
      <h2>Personal Information</h2>
      <div className="form-grid">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="John Doe"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="john@example.com"
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="San Francisco, CA"
          />
        </div>
        <div className="form-group">
          <label>LinkedIn</label>
          <input
            type="url"
            value={data.linkedin}
            onChange={(e) => handleChange("linkedin", e.target.value)}
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
        <div className="form-group">
          <label>GitHub</label>
          <input
            type="url"
            value={data.github}
            onChange={(e) => handleChange("github", e.target.value)}
            placeholder="github.com/johndoe"
          />
        </div>
      </div>
    </div>
  )
}
