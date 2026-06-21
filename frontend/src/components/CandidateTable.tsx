import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import SkillTag from "@/components/SkillTag";
import type { Candidate } from "@/types";
import { motion } from "framer-motion";

interface CandidateTableProps {
  candidates: Candidate[];
}

export default function CandidateTable({ candidates }: CandidateTableProps) {
  const [search, setSearch] = useState("");
  const [skillFilter, setSkillFilter] = useState("");

  const allSkills = useMemo(() => {
    const set = new Set<string>();
    candidates.forEach(c => c.skills.forEach(s => set.add(s)));
    return Array.from(set).sort();
  }, [candidates]);

  const filtered = useMemo(() => {
    return candidates.filter(c => {
      const matchesSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
      const matchesSkill = !skillFilter || c.skills.some(s => s.toLowerCase() === skillFilter.toLowerCase());
      return matchesSearch && matchesSkill;
    });
  }, [candidates, search, skillFilter]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or email…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 bg-secondary border-border"
          />
        </div>
        <select
          value={skillFilter}
          onChange={e => setSkillFilter(e.target.value)}
          className="rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground"
        >
          <option value="">All Skills</option>
          {allSkills.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden sm:table-cell">Email</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Skills</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden md:table-cell">Exp</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden lg:table-cell">Added</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <motion.tr
                key={c.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-foreground">{c.name}</td>
                <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{c.email}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {c.skills.slice(0, 3).map(s => <SkillTag key={s} skill={s} />)}
                    {c.skills.length > 3 && <span className="text-xs text-muted-foreground">+{c.skills.length - 3}</span>}
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{c.experience} yrs</td>
                <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{new Date(c.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-right">
                  <Link to={`/candidate/${c.id}`} className="inline-flex items-center gap-1 text-primary hover:underline text-xs font-medium">
                    <Eye className="h-3.5 w-3.5" /> View
                  </Link>
                </td>
              </motion.tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">No candidates found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
