import type { Candidate, Job } from "@/types";

const API_URL = "https://resume-parser-qfvf.onrender.com/api";

export async function getJobs(): Promise<Job[]> {
  const res = await fetch(`${API_URL}/jobs`);
  return res.json();
}

export async function getJob(id: string): Promise<Job> {
  const res = await fetch(`${API_URL}/jobs/${id}`);
  return res.json();
}

export async function getCandidates(): Promise<Candidate[]> {
  const res = await fetch(`${API_URL}/candidates`);
  return res.json();
}

export async function getCandidate(id: string): Promise<Candidate> {
  const res = await fetch(`${API_URL}/candidates/${id}`);
  return res.json();
}

export async function saveCandidate(candidate: Candidate) {
  const res = await fetch(`${API_URL}/candidates`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(candidate),
  });

  if (!res.ok) {
    throw new Error("Failed to save candidate");
  }

  return await res.json();
}