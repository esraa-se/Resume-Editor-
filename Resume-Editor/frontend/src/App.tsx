"use client"

import { useState } from "react"
import { ResumeEditor } from "./components/ResumeEditor"
import { FileUpload } from "./components/FileUpload"
import type { ResumeData } from "./types/resume"
import "./App.css"

const initialResumeData: ResumeData = {
  personal_info: {
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
}

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData)
  const [hasUploadedFile, setHasUploadedFile] = useState(false)

  const handleFileUpload = (mockData: ResumeData) => {
    setResumeData(mockData)
    setHasUploadedFile(true)
  }

  const handleStartFromScratch = () => {
    setResumeData(initialResumeData)
    setHasUploadedFile(true)
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>Resume Editor</h1>
        <p>Upload your resume or start from scratch to create a professional resume</p>
      </header>

      {!hasUploadedFile ? (
        <div className="upload-section">
          <FileUpload onFileUpload={handleFileUpload} />
          <div className="or-divider">
            <span>OR</span>
          </div>
          <button className="start-scratch-btn" onClick={handleStartFromScratch}>
            Start from Scratch
          </button>
        </div>
      ) : (
        <ResumeEditor initialData={resumeData} onBack={() => setHasUploadedFile(false)} />
      )}
    </div>
  )
}

export default App
