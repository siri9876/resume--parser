import SkillTag from "@/components/SkillTag";
import ScoreBar from "@/components/ScoreBar";
import type { MatchResult, Job, Candidate } from "@/types";
import { motion } from "framer-motion";

interface MatchResultCardProps {
  result: MatchResult;
  job: Job;
  candidate: Candidate;
  index: number;
}

export default function MatchResultCard({ result, job, candidate, index }: MatchResultCardProps) {
  const scoreColor = result.overallScore > 70 ? "text-score-high" : result.overallScore >= 40 ? "text-score-mid" : "text-score-low";
  const scoreBorder = result.overallScore > 70 ? "border-score-high/30" : result.overallScore >= 40 ? "border-score-mid/30" : "border-score-low/30";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`rounded-xl border bg-card p-6 shadow-[var(--shadow-card)] ${scoreBorder}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">{job.title}</h3>
          <p className="text-sm text-muted-foreground">{candidate.name}</p>
        </div>
        <div className={`text-3xl font-display font-bold ${scoreColor}`}>
          {result.overallScore}%
        </div>
      </div>

      <div className="mb-4 space-y-3">
        <ScoreBar score={result.skillScore} label="Skill Match" />
        <ScoreBar score={result.experienceScore} label="Experience Match" />
      </div>

      <div className="space-y-3">
        {result.matchedSkills.length > 0 && (
          <div>
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">Matched Skills</p>
            <div className="flex flex-wrap gap-1.5">
              {result.matchedSkills.map(s => <SkillTag key={s} skill={s} variant="matched" />)}
            </div>
          </div>
        )}
        {result.missingSkills.length > 0 && (
          <div>
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">Missing Skills</p>
            <div className="flex flex-wrap gap-1.5">
              {result.missingSkills.map(s => <SkillTag key={s} skill={s} variant="missing" />)}
            </div>
          </div>
        )}
        {result.experienceGap > 0 && (
          <p className="text-xs text-muted-foreground">
            Experience gap: <span className="text-destructive font-semibold">{result.experienceGap} year(s)</span>
          </p>
        )}
      </div>
    </motion.div>
  );
}
