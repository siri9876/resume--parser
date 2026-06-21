import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUpload from "@/components/FileUpload";
import CandidateForm from "@/components/CandidateForm";
import { parseResumeFile, extractFields } from "@/services/parserService";
import { saveCandidate } from "@/services/store";
import { toast } from "sonner";
import { CandidateFormData } from "@/types/candidate";

export default function UploadPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [parsedData, setParsedData] = useState<ReturnType<typeof extractFields> | null>(null);
  const [fileName, setFileName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleFile = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setStatus("error");
      setErrorMsg("File too large. Max 5MB.");
      return;
    }
    if (!file.name.endsWith(".pdf") && !file.name.endsWith(".docx")) {
      setStatus("error");
      setErrorMsg("Only PDF and DOCX files are supported.");
      return;
    }

    setStatus("uploading");
    setProgress(20);
    setFileName(file.name);

    try {
      setProgress(40);
      const text = await parseResumeFile(file);
      setProgress(70);
      const fields = extractFields(text);
      setProgress(100);
      setParsedData(fields);
      setStatus("success");
    }catch (err: unknown) {
  setStatus("error");

  if (err instanceof Error) {
    setErrorMsg(err.message);
  } else {
    setErrorMsg("Failed to parse resume");
  }
}
  };

  const handleSave = (data: CandidateFormData) => {
    setIsSaving(true);
    const candidate = {
      id: crypto.randomUUID(),
      ...data,
      resumeFile: fileName,
      createdAt: new Date().toISOString(),
    };
    saveCandidate(candidate);
    toast.success("Candidate saved successfully!");
    setTimeout(() => navigate(`/candidate/${candidate.id}`), 500);
  };

  return (
    <div className="container max-w-3xl py-8 space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Upload Resume</h1>
        <p className="text-muted-foreground mt-1">Upload a PDF or DOCX resume to automatically extract candidate information.</p>
      </div>

      <FileUpload
        onFileSelected={handleFile}
        isUploading={status === "uploading"}
        progress={progress}
        status={status}
        errorMessage={errorMsg}
      />

      {parsedData && (
        <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">Parsed Information</h2>
          <p className="text-sm text-muted-foreground mb-4">Review and edit the extracted fields before saving.</p>
          <CandidateForm initialData={parsedData} onSave={handleSave} isSaving={isSaving} />
        </div>
      )}

      {status === "error" && (
        <button onClick={() => { setStatus("idle"); setErrorMsg(""); }} className="text-sm text-primary hover:underline">
          Try again
        </button>
      )}
    </div>
  );
}
