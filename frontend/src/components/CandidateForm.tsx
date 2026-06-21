import { useState } from "react";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SkillTag from "@/components/SkillTag";

interface CandidateFormData {
  name: string;
  email: string;
  phone: string;
  skills: string[];
  experience: number;
  education: string;
  company: string;
}

interface CandidateFormProps {
  initialData: CandidateFormData;
  onSave: (data: CandidateFormData) => void;
  isSaving: boolean;
}

export default function CandidateForm({ initialData, onSave, isSaving }: CandidateFormProps) {
  const [data, setData] = useState(initialData);
  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !data.skills.includes(s)) {
      setData(d => ({ ...d, skills: [...d.skills, s] }));
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setData(d => ({ ...d, skills: d.skills.filter(s => s !== skill) }));
  };

  const field = (label: string, key: keyof CandidateFormData, type = "text") => (
    <div className="space-y-2">
      <Label className="text-muted-foreground">{label}</Label>
      <Input
        type={type}
        value={data[key] as string | number}
        onChange={e => setData(d => ({ ...d, [key]: type === "number" ? Number(e.target.value) : e.target.value }))}
        className="bg-secondary border-border"
      />
    </div>
  );

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(data); }} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        {field("Name", "name")}
        {field("Email", "email", "email")}
        {field("Phone", "phone")}
        {field("Experience (years)", "experience", "number")}
        {field("Education", "education")}
        {field("Company", "company")}
      </div>

      <div className="space-y-2">
        <Label className="text-muted-foreground">Skills</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {data.skills.map(s => (
            <span key={s} className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary">
              {s}
              <button type="button" onClick={() => removeSkill(s)}>
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={skillInput}
            onChange={e => setSkillInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addSkill())}
            placeholder="Add a skill…"
            className="bg-secondary border-border"
          />
          <Button type="button" size="icon" variant="outline" onClick={addSkill}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Button type="submit" disabled={isSaving} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
        {isSaving ? "Saving…" : "Save Candidate"}
      </Button>
    </form>
  );
}
