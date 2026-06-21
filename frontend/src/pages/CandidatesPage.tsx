import { useEffect, useState } from "react";
import CandidateTable from "@/components/CandidateTable";
import { Users } from "lucide-react";
import { getCandidates } from "@/services/store";
import type { Candidate } from "@/types";

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCandidates() {
      try {
        const data = await getCandidates();
        setCandidates(data);
      } catch (error) {
        console.error("Failed to load candidates:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCandidates();
  }, []);

  if (loading) {
    return (
      <div className="container py-8">
        <p>Loading candidates...</p>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Candidates
          </h1>
          <p className="text-muted-foreground mt-1">
            {candidates.length} candidates in database
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <Users className="h-6 w-6 text-primary" />
        </div>
      </div>

      <CandidateTable candidates={candidates} />
    </div>
  );
}