"use client"

import type React from "react"
import { useRef } from "react"
import type { ResumeData } from "../types/resume"

interface FileUploadProps {
  onFileUpload: (data: ResumeData) => void
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Mock file parsing - in a real app, you'd parse the actual file
    const mockResumeData: ResumeData = {
      personal_info: {
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        linkedin: "linkedin.com/in/johndoe",
        github: "github.com/johndoe",
      },
      summary:
        "Experienced software developer with 5+ years of experience in full-stack development. Passionate about creating efficient and scalable solutions.",
      experience: [
        {
          id: "1",
          title: "Senior Software Engineer",
          company: "Tech Corp",
          location: "San Francisco, CA",
          startDate: "2021-01",
          endDate: "Present",
          description:
            "Led development of web applications using React and Node.js. Managed a team of 4 developers and improved system performance by 40%.",
        },
        {
          id: "2",
          title: "Software Developer",
          company: "StartupXYZ",
          location: "San Francisco, CA",
          startDate: "2019-06",
          endDate: "2020-12",
          description:
            "Developed and maintained multiple client projects. Worked with React, Python, and PostgreSQL to deliver high-quality solutions.",
        },
      ],
      education: [
        {
          id: "1",
          degree: "Bachelor of Science in Computer Science",
          school: "University of California",
          location: "Berkeley, CA",
          graduationDate: "2019-05",
          gpa: "3.8",
        },
      ],
      skills: [
        "JavaScript",
        "React",
        "Node.js",
        "Python",
        "PostgreSQL",
        "AWS",
        "Docker",
        "Git",
        "Agile Development",
        "Team Leadership",
      ],
    }

    // Simulate file processing delay
    setTimeout(() => {
      onFileUpload(mockResumeData)
    }, 1000)
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    const files = event.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file.type === "application/pdf" || file.name.endsWith(".docx")) {
        // Trigger the same mock parsing
        handleFileSelect({ target: { files: [file] } } as any)
      }
    }
  }

  return (
    <div className="file-upload">
      <div
        className="upload-area"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="upload-icon">📄</div>
        <h3>Upload Your Resume</h3>
        <p>Drag and drop your resume here, or click to browse</p>
        <p className="file-types">Supports PDF and DOCX files</p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileSelect}
          style={{ display: "none" }}
        />
      </div>
    </div>
  )
}
