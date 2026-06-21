import type { Candidate, Job, MatchResult } from "@/types";

export function matchCandidateToJob(
  candidate: Candidate,
  job: Job
): MatchResult {
  const candidateSkillsLower = candidate.skills.map((s) =>
    s.toLowerCase().trim()
  );

  const jobSkillsLower = job.skills.map((s) =>
    s.toLowerCase().trim()
  );

  const matchedSkills = job.skills.filter((s) =>
    candidateSkillsLower.includes(s.toLowerCase().trim())
  );

  const missingSkills = job.skills.filter((s) =>
    !candidateSkillsLower.includes(s.toLowerCase().trim())
  );

  const skillScore =
    jobSkillsLower.length > 0
      ? (matchedSkills.length / jobSkillsLower.length) * 100
      : 0;

  let experienceScore = 100;
  let experienceGap = 0;

  if (candidate.experience < job.experience) {
    experienceGap = job.experience - candidate.experience;
    experienceScore =
      (candidate.experience / job.experience) * 100;
  }

  const overallScore = Math.round(
    skillScore * 0.6 + experienceScore * 0.4
  );

  return {
    candidateId: candidate.id,
    jobId: job.id || job._id || "",
    overallScore,
    skillScore: Math.round(skillScore),
    experienceScore: Math.round(experienceScore),
    matchedSkills,
    missingSkills,
    experienceGap,
  };
}