import { useCallback, useState } from "react";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FileUploadProps {
  onFileSelected: (file: File) => void;
  isUploading: boolean;
  progress: number;
  status: "idle" | "uploading" | "success" | "error";
  errorMessage?: string;
}

export default function FileUpload({ onFileSelected, isUploading, progress, status, errorMessage }: FileUploadProps) {
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) onFileSelected(file);
  }, [onFileSelected]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelected(file);
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`relative flex min-h-[240px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all ${
          dragOver
            ? "border-primary bg-primary/5"
            : "border-border bg-card hover:border-primary/50 hover:bg-card/80"
        }`}
      >
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={handleChange}
          className="absolute inset-0 cursor-pointer opacity-0"
          disabled={isUploading}
        />
        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-foreground">Drop your resume here</p>
                <p className="text-sm text-muted-foreground">or click to browse · PDF, DOCX up to 5MB</p>
              </div>
            </motion.div>
          )}
          {status === "uploading" && (
            <motion.div key="uploading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-3">
              <FileText className="h-10 w-10 text-primary animate-pulse" />
              <p className="text-sm font-medium text-foreground">Parsing resume…</p>
              <div className="h-2 w-48 overflow-hidden rounded-full bg-secondary">
                <motion.div className="h-full rounded-full bg-primary" animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
              </div>
            </motion.div>
          )}
          {status === "success" && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-2">
              <CheckCircle className="h-12 w-12 text-score-high" />
              <p className="text-sm font-semibold text-score-high">Resume parsed successfully!</p>
            </motion.div>
          )}
          {status === "error" && (
            <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-2">
              <AlertCircle className="h-12 w-12 text-destructive" />
              <p className="text-sm font-medium text-destructive">{errorMessage || "Something went wrong"}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
