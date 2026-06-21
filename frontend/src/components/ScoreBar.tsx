import { motion } from "framer-motion";

interface ScoreBarProps {
  score: number;
  label: string;
  showPercentage?: boolean;
}

export default function ScoreBar({ score, label, showPercentage = true }: ScoreBarProps) {
  const color = score > 70 ? "var(--gradient-score-high)" : score >= 40 ? "var(--gradient-score-mid)" : "var(--gradient-score-low)";
  const textColor = score > 70 ? "text-score-high" : score >= 40 ? "text-score-mid" : "text-score-low";

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        {showPercentage && <span className={`font-semibold ${textColor}`}>{score}%</span>}
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
