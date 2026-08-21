import { useState } from "react";
import { Paperclip, X } from "lucide-react";
import { uploadApplicationFile } from "@/lib/uploads";

type Props = {
  label: string;
  folder: string;
  multiple?: boolean;
  required?: boolean;
  hint?: string;
  onChange: (paths: string[]) => void;
};

export function FileInput({ label, folder, multiple, required, hint, onChange }: Props) {
  const [files, setFiles] = useState<{ name: string; path: string }[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handle(list: FileList | null) {
    if (!list?.length) return;
    setBusy(true);
    setError("");
    try {
      const uploaded: { name: string; path: string }[] = [];
      for (const file of Array.from(list).slice(0, multiple ? 8 : 1)) {
        const path = await uploadApplicationFile(file, folder);
        uploaded.push({ name: file.name, path });
      }
      const next = multiple ? [...files, ...uploaded] : uploaded;
      setFiles(next);
      onChange(next.map((f) => f.path));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  function remove(path: string) {
    const next = files.filter((f) => f.path !== path);
    setFiles(next);
    onChange(next.map((f) => f.path));
  }

  return (
    <div>
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label} {required && <span className="text-gold">*</span>}
      </span>
      <label className="mt-1.5 flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-border bg-surface px-3 py-3 text-sm text-muted-foreground transition-colors hover:border-gold/50">
        <Paperclip className="size-4 shrink-0 text-gold" />
        <span className="truncate">
          {busy ? "Uploading…" : multiple ? "Choose files (max 8)" : "Choose a file"}
        </span>
        <input
          type="file"
          className="hidden"
          multiple={multiple ?? false}
          accept="image/*,application/pdf"
          onChange={(e) => void handle(e.target.files)}
        />
      </label>
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
      {files.length > 0 && (
        <ul className="mt-2 space-y-1">
          {files.map((f) => (
            <li
              key={f.path}
              className="flex items-center justify-between gap-2 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs"
            >
              <span className="truncate">{f.name}</span>
              <button
                type="button"
                onClick={() => remove(f.path)}
                aria-label={`Remove ${f.name}`}
                className="shrink-0 text-muted-foreground hover:text-destructive"
              >
                <X className="size-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
