"use client"

import type React from "react"
import { useState } from "react"
import { PersonalInfoSection } from "./sections/PersonalInfoSection"
import { SummarySection } from "./sections/SummarySection"
import { ExperienceSection } from "./sections/ExperienceSection"
import { EducationSection } from "./sections/EducationSection"
import { SkillsSection } from "./sections/SkillsSection"
import type { ResumeData } from "../types/resume"
import { saveResume } from "../services/api"

interface ResumeEditorProps {
  initialData: ResumeData
  onBack: () => void
}

export const ResumeEditor: React.FC<ResumeEditorProps> = ({ initialData, onBack }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveMessage("")

    try {
      const response = await saveResume(resumeData)
      setSaveMessage(`Resume saved successfully! ID: ${response.resume_id}`)
    } catch (error) {
      setSaveMessage("Failed to save resume. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDownload = () => {
    const dataStr = JSON.stringify(resumeData, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = `resume_${resumeData.personal_info.name || "untitled"}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  return (
    <div className="resume-editor">
      <div className="editor-header">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <div className="editor-actions">
          <button className="save-btn" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Resume"}
          </button>
          <button className="download-btn" onClick={handleDownload}>
            Download JSON
          </button>
        </div>
      </div>

      {saveMessage && (
        <div className={`save-message ${saveMessage.includes("Failed") ? "error" : "success"}`}>{saveMessage}</div>
      )}

      <div className="editor-content">
        <PersonalInfoSection
          data={resumeData.personal_info}
          onChange={(data) => updateResumeData("personal_info", data)}
        />

        <SummarySection data={resumeData.summary} onChange={(data) => updateResumeData("summary", data)} />

        <ExperienceSection data={resumeData.experience} onChange={(data) => updateResumeData("experience", data)} />

        <EducationSection data={resumeData.education} onChange={(data) => updateResumeData("education", data)} />

        <SkillsSection data={resumeData.skills} onChange={(data) => updateResumeData("skills", data)} />
      </div>
    </div>
  )
}
