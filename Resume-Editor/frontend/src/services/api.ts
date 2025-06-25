import type { ResumeData, AIEnhanceResponse, SaveResumeResponse } from "../types/resume"

const API_BASE_URL = "http://localhost:8000"

export const enhanceWithAI = async (section: string, content: string): Promise<AIEnhanceResponse> => {
  const response = await fetch(`${API_BASE_URL}/ai-enhance`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ section, content }),
  })

  if (!response.ok) {
    throw new Error("Failed to enhance content")
  }

  return response.json()
}

export const saveResume = async (resumeData: ResumeData): Promise<SaveResumeResponse> => {
  const response = await fetch(`${API_BASE_URL}/save-resume`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resumeData),
  })

  if (!response.ok) {
    throw new Error("Failed to save resume")
  }

  return response.json()
}

export const getResume = async (resumeId: string): Promise<ResumeData> => {
  const response = await fetch(`${API_BASE_URL}/resume/${resumeId}`)

  if (!response.ok) {
    throw new Error("Failed to fetch resume")
  }

  return response.json()
}

export const listResumes = async () => {
  const response = await fetch(`${API_BASE_URL}/resumes`)

  if (!response.ok) {
    throw new Error("Failed to fetch resumes")
  }

  return response.json()
}
