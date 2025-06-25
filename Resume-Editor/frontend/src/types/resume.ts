export interface PersonalInfo {
  name: string
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
}

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  description: string
}

export interface Education {
  id: string
  degree: string
  school: string
  location: string
  graduationDate: string
  gpa: string
}

export interface ResumeData {
  id?: string
  personal_info: PersonalInfo
  summary: string
  experience: Experience[]
  education: Education[]
  skills: string[]
  created_at?: string
  updated_at?: string
}

export interface AIEnhanceRequest {
  section: string
  content: string
}

export interface AIEnhanceResponse {
  enhanced_content: string
}

export interface SaveResumeResponse {
  message: string
  resume_id: string
  saved_at: string
}
