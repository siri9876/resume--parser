import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCandidate, getJobs } from "@/services/store";
import { matchCandidateToJob } from "@/services/matchService";
import SkillTag from "@/components/SkillTag";
import ScoreBar from "@/components/ScoreBar";
import {
  Mail,
  Phone,
  Building,
  GraduationCap,
  Briefcase,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import type { Candidate, Job } from "@/types";

export default function CandidateProfilePage() {
  const { id } = useParams();

  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        if (!id) return;

        const candidateData = await getCandidate(id);
        const jobsData = await getJobs();

        setCandidate(candidateData);
        setJobs(jobsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-16 text-center">
        Loading...
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="container py-16 text-center">
        <p className="text-muted-foreground">
          Candidate not found.
        </p>

        <Link
          to="/candidates"
          className="text-primary hover:underline text-sm mt-2 inline-block"
        >
          Back to candidates
        </Link>
      </div>
    );
  }

  const matches = jobs
    .map((j) => ({
      job: j,
      result: matchCandidateToJob(candidate, j),
    }))
    .sort(
      (a, b) =>
        b.result.overallScore - a.result.overallScore
    );

  const info = [
    { icon: Mail, label: "Email", value: candidate.email },
    { icon: Phone, label: "Phone", value: candidate.phone },
    { icon: Building, label: "Company", value: candidate.company },
    {
      icon: GraduationCap,
      label: "Education",
      value: candidate.education,
    },
    {
      icon: Briefcase,
      label: "Experience",
      value: `${candidate.experience} years`,
    },
  ];

  return (
    <div className="container max-w-4xl py-8 space-y-8">
      <Link
        to="/candidates"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to candidates
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
      >
        <h1 className="font-display text-2xl font-bold text-foreground mb-1">
          {candidate.name}
        </h1>

        <p className="text-sm text-muted-foreground mb-6">
          Added{" "}
          {new Date(candidate.createdAt).toLocaleDateString()}
        </p>

        <div className="grid gap-3 sm:grid-cols-2 mb-6">
          {info.map(
            ({ icon: Icon, label, value }) =>
              value && (
                <div
                  key={label}
                  className="flex items-center gap-2 text-sm"
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {label}:
                  </span>
                  <span className="text-foreground">
                    {value}
                  </span>
                </div>
              )
          )}
        </div>

        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">
            Skills
          </p>

          <div className="flex flex-wrap gap-1.5">
            {candidate.skills.map((s) => (
              <SkillTag key={s} skill={s} />
            ))}
          </div>
        </div>
      </motion.div>

      <div className="space-y-4">
        <h2 className="font-display text-xl font-bold text-foreground">
          Job Match Scores
        </h2>

        <div className="grid gap-4">
          {matches.map(({ job, result }, i) => {
            const scoreColor =
              result.overallScore > 70
                ? "text-score-high"
                : result.overallScore >= 40
                ? "text-score-mid"
                : "text-score-low";

            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-display font-semibold text-foreground">
                      {job.title}
                    </h3>

                    <p className="text-xs text-muted-foreground">
                      {job.location}
                    </p>
                  </div>

                  <span
                    className={`text-2xl font-display font-bold ${scoreColor}`}
                  >
                    {result.overallScore}%
                  </span>
                </div>

                <div className="space-y-2">
                  <ScoreBar
                    score={result.skillScore}
                    label="Skills"
                  />
                  <ScoreBar
                    score={result.experienceScore}
                    label="Experience"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}