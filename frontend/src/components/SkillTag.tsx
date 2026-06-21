interface SkillTagProps {
  skill: string;
  variant?: "default" | "matched" | "missing";
}

export default function SkillTag({ skill, variant = "default" }: SkillTagProps) {
  const styles = {
    default: "bg-secondary text-secondary-foreground",
    matched: "bg-primary/15 text-primary border border-primary/30",
    missing: "bg-destructive/15 text-destructive border border-destructive/30",
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[variant]}`}>
      {skill}
    </span>
  );
}
