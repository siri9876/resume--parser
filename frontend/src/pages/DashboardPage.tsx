import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Upload,
  Briefcase,
  Users,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { getCandidates, getJobs } from "@/services/store";
import { motion } from "framer-motion";
import type { Candidate, Job } from "@/types";

export default function DashboardPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const candidatesData = await getCandidates();
        const jobsData = await getJobs();

        setCandidates(candidatesData);
        setJobs(jobsData);
      } catch (error) {
        console.error("Dashboard load failed:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="container py-8">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  const avgSkills =
    candidates.length > 0
      ? Math.round(
          candidates.reduce(
            (sum, c) => sum + c.skills.length,
            0
          ) / candidates.length
        )
      : 0;

  const stats = [
    {
      label: "Candidates",
      value: candidates.length,
      icon: Users,
      color: "text-primary",
    },
    {
      label: "Open Jobs",
      value: jobs.length,
      icon: Briefcase,
      color: "text-accent",
    },
    {
      label: "Avg Skills",
      value: avgSkills,
      icon: TrendingUp,
      color: "text-score-high",
    },
  ];

  const quickActions = [
    {
      label: "Upload Resume",
      description: "Parse and add a new candidate",
      to: "/upload",
      icon: Upload,
    },
    {
      label: "View Jobs",
      description: "Browse open positions",
      to: "/jobs",
      icon: Briefcase,
    },
    {
      label: "Candidates",
      description: "Search the candidate database",
      to: "/candidates",
      icon: Users,
    },
  ];

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          AI Resume Matcher — Overview
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {s.label}
                </p>
                <p
                  className={`text-3xl font-display font-bold ${s.color}`}
                >
                  {s.value}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {quickActions.map((a, i) => (
          <motion.div
            key={a.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            <Link
              to={a.to}
              className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:border-primary/30 hover:shadow-[var(--shadow-glow)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <a.icon className="h-6 w-6 text-primary" />
              </div>

              <div className="flex-1">
                <p className="font-display font-semibold text-foreground">
                  {a.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {a.description}
                </p>
              </div>

              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          </motion.div>
        ))}
      </div>

      {candidates.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">
            Recent Candidates
          </h2>

          <div className="space-y-3">
            {candidates
              .slice(-5)
              .reverse()
              .map((c) => (
                <Link
                  key={c.id}
                  to={`/candidate/${c.id}`}
                  className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3 hover:bg-secondary transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {c.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {c.email}
                    </p>
                  </div>

                  <span className="text-xs text-muted-foreground">
                    {c.skills.length} skills · {c.experience} yrs
                  </span>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}