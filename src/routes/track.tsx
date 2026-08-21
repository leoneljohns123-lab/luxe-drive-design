import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Field, inputClass } from "@/components/site/form-bits";
import { trackApplication } from "@/lib/applications.functions";
import { applicationStatusClass, statusLabel } from "@/lib/vehicle-status";
import { BRAND } from "@/data/site";

type SearchParams = { ref?: string | undefined };

export const Route = createFileRoute("/track")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    ref: typeof search["ref"] === "string" ? search["ref"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: `Track Your Application | ${BRAND.name}` },
      {
        name: "description",
        content:
          "Check the status of your Dama Royal Safaris lease or driver application using your reference number and email address.",
      },
      { property: "og:title", content: `Track Your Application | ${BRAND.name}` },
      {
        property: "og:description",
        content: "Enter your reference and email to see your application status.",
      },
    ],
  }),
  component: TrackPage,
});

type Result = {
  reference: string;
  kind: string;
  status: string;
  submitted_at: string;
  last_update: string;
};

function TrackPage() {
  const { ref } = Route.useSearch();
  const lookup = useServerFn(trackApplication);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<Result[] | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setResults(null);
    const fd = new FormData(e.currentTarget);
    try {
      const rows = (await lookup({
        data: {
          reference: String(fd.get("reference") ?? ""),
          email: String(fd.get("email") ?? ""),
        },
      })) as Result[];
      setResults(rows);
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn't look that up.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="eyebrow">Application status</p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Track your application</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Enter the reference we sent you along with the email address you applied with.
        </p>

        <form onSubmit={onSubmit} className="surface-card mt-8 grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
          <Field label="Reference" required>
            <input
              name="reference"
              required
              defaultValue={ref ?? ""}
              placeholder="LSE-2601-A1B2C3"
              className={inputClass}
            />
          </Field>
          <Field label="Email" required>
            <input name="email" type="email" required className={inputClass} />
          </Field>
          <div className="sm:col-span-2">
            <Button type="submit" variant="gold" disabled={busy}>
              {busy ? "Checking…" : "Check status"}
            </Button>
          </div>
        </form>

        {error && <p className="mt-6 text-sm text-destructive">{error}</p>}

        {results && results.length === 0 && (
          <p className="mt-6 text-sm text-muted-foreground">
            No application matched that reference and email. Double-check both and try again.
          </p>
        )}

        {results && results.length > 0 && (
          <div className="mt-8 space-y-4">
            {results.map((r) => (
              <div key={r.reference} className="surface-card p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                      {r.kind === "driver" ? "Driver application" : "Lease application"}
                    </p>
                    <p className="mt-1 font-display text-xl font-semibold text-gold">
                      {r.reference}
                    </p>
                  </div>
                  <span
                    className={
                      "rounded-full border px-3 py-1 text-xs font-semibold " +
                      applicationStatusClass(r.status)
                    }
                  >
                    {statusLabel(r.status)}
                  </span>
                </div>
                <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-xs text-muted-foreground">Submitted</dt>
                    <dd>{new Date(r.submitted_at).toLocaleDateString()}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Last update</dt>
                    <dd>{new Date(r.last_update).toLocaleDateString()}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
