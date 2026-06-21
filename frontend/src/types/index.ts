export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  experience: number;
  education: string;
  company: string;
  resumeFile: string;
  createdAt: string;
}

export interface Job {
  _id?: string;
  id?: string;
  title: string;
  location: string;
  skills: string[];
  experience: number;
}

export interface MatchResult {
  candidateId: string;
  jobId: string;
  overallScore: number;
  skillScore: number;
  experienceScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  experienceGap: number;
}