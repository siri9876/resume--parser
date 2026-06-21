import { MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SkillTag from "@/components/SkillTag";
import type { Job } from "@/types";
import { motion } from "framer-motion";

interface JobCardProps {
  job: Job;
  index: number;
  onMatch?: () => void;
}

export default function JobCard({ job, index, onMatch }: JobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-all hover:border-primary/30 hover:shadow-[var(--shadow-glow)]"
    >
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            {job.title}
          </h3>
        </div>
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          {job.location}
        </span>

        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {job.experience}+ years
        </span>
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {job.skills?.map((s) => (
          <SkillTag key={s} skill={s} />
        ))}
      </div>

      {onMatch && (
        <Button
          onClick={onMatch}
          variant="outline"
          className="w-full border-primary/30 text-primary hover:bg-primary/10"
        >
          Match Candidates
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      )}
    </motion.div>
  );
}