import { useEffect, useState } from "react";
import { getJobs, getCandidates } from "@/services/store";
import { matchCandidateToJob } from "../services/matchService";
import JobCard from "@/components/JobCard";
import MatchResultCard from "@/components/MatchResultCard";
import type { MatchResult, Job, Candidate } from "@/types";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [matchResults, setMatchResults] = useState<{
    jobId: string;
    results: MatchResult[];
  } | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const jobsData = await getJobs();
      const candidatesData = await getCandidates();

      setJobs(jobsData);
      setCandidates(candidatesData);
    };

    loadData();
  }, []);

  const handleMatch = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return;

    const results = candidates
      .map((c) => matchCandidateToJob(c, job))
      .sort((a, b) => b.overallScore - a.overallScore);

    setMatchResults({ jobId, results });
  };

  const activeJob = matchResults
    ? jobs.find((j) => j.id === matchResults.jobId)
    : null;

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">
          Job Listings
        </h1>
        <p className="text-muted-foreground mt-1">
          {jobs.length} open positions
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job, i) => (
          <JobCard
            key={job.id}
            job={job}
            index={i}
            onMatch={() => handleMatch(job.id)}
          />
        ))}
      </div>

      {matchResults && activeJob && (
        <div className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Match Results — {activeJob.title}
          </h2>

          {matchResults.results.length === 0 ? (
            <p className="text-muted-foreground">
              No candidates in database. Upload resumes first.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {matchResults.results.map((r, i) => {
                const candidate = candidates.find(
                  (c) => c.id === r.candidateId
                );

                if (!candidate) return null;

                return (
                  <MatchResultCard
                    key={r.candidateId}
                    result={r}
                    job={activeJob}
                    candidate={candidate}
                    index={i}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}