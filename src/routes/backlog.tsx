import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, CircleAlert, CircleDot, Filter, ListTodo, LockKeyhole, Radar, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { backlogItems, backlogSections, type BacklogItem } from "@/lib/backlog";

export const Route = createFileRoute("/backlog")({
  component: BacklogPage,
});

type StatusFilter = "Todos" | "Por hacer" | "En progreso" | "Bloqueado" | "Terminado" | "Idea";

const statusFilters: StatusFilter[] = ["Todos", "Por hacer", "En progreso", "Bloqueado", "Terminado", "Idea"];

function cleanMarkdown(value: string) {
  return value.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/`([^`]+)`/g, "$1");
}

function statusTone(status: string) {
  if (status === "En progreso") return "border-alpine/40 bg-alpine/10 text-alpine";
  if (status === "Terminado") return "border-good/40 bg-good/10 text-good";
  if (status === "Bloqueado") return "border-bull/40 bg-bull/10 text-bull";
  if (status === "Idea") return "border-papaya/40 bg-papaya/10 text-papaya";
  return "border-border bg-panel text-muted";
}

function statusIcon(status: string) {
  if (status === "En progreso") return <CircleDot className="size-4" />;
  if (status === "Terminado") return <CheckCircle2 className="size-4" />;
  if (status === "Bloqueado") return <CircleAlert className="size-4" />;
  return <CircleDot className="size-4" />;
}

function priorityTone(priority: string) {
  if (priority === "P0") return "text-bull";
  if (priority === "P1") return "text-warn";
  if (priority === "P2") return "text-alpine";
  return "text-muted";
}

function BacklogCard({ item }: { item: BacklogItem }) {
  return (
    <article className="group rounded-[14px] border border-border bg-elevated/80 p-4 transition-colors hover:border-alpine/50">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] font-semibold tracking-[0.12em] text-alpine">{item.id}</p>
          <h3 className="mt-1 text-sm font-semibold leading-snug text-fg">{item.type}</h3>
        </div>
        <span className={`font-mono text-xs font-bold ${priorityTone(item.priority)}`}>{item.priority || "—"}</span>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted">{cleanMarkdown(item.acceptance || "Sin criterio de aceptación definido todavía.")}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
        <span className="rounded-full border border-border px-2 py-1 text-subtle">{item.owner || "Sin responsable"}</span>
        <span className="rounded-full border border-border px-2 py-1 text-subtle">{item.size || "Sin tamaño"}</span>
      </div>
      {item.dependencies && item.dependencies !== "Ninguna" && (
        <p className="mt-3 border-t border-border pt-3 text-[11px] text-subtle">
          Depende de <span className="font-mono text-muted">{item.dependencies}</span>
        </p>
      )}
    </article>
  );
}

function BacklogPage() {
  const [filter, setFilter] = useState<StatusFilter>("Todos");
  const [query, setQuery] = useState("");
  const [section, setSection] = useState("Todas las áreas");
  const areas = ["Todas las áreas", ...backlogSections.map((entry) => entry.title)];
  const normalizedQuery = query.trim().toLowerCase();

  const filteredItems = useMemo(() => backlogItems.filter((item) => {
    const matchesStatus = filter === "Todos" || item.status === filter;
    const matchesSection = section === "Todas las áreas" || item.section === section;
    const haystack = `${item.id} ${item.type} ${item.owner} ${item.acceptance}`.toLowerCase();
    return matchesStatus && matchesSection && (!normalizedQuery || haystack.includes(normalizedQuery));
  }), [filter, normalizedQuery, section]);

  const counts = {
    total: backlogItems.length,
    active: backlogItems.filter((item) => item.status === "En progreso").length,
    todo: backlogItems.filter((item) => item.status === "Por hacer").length,
    ideas: backlogItems.filter((item) => item.status === "Idea").length,
  };

  return (
    <main className="h-dvh overflow-y-auto overscroll-contain bg-asphalt text-fg">
      <div className="mx-auto max-w-[1440px] px-5 py-6 sm:px-8 sm:py-8">
        <header className="flex flex-col gap-6 border-b border-border pb-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link to="/" className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted transition-colors hover:text-fg">
              <ArrowLeft className="size-4" /> Volver al juego
            </Link>
            <div className="flex items-center gap-3 text-alpine">
              <ListTodo className="size-5" />
              <span className="text-xs font-semibold uppercase tracking-[0.24em]">Stark F1 / Operations</span>
            </div>
            <h1 className="mt-3 font-display text-6xl leading-[0.85] text-fg sm:text-7xl">BACKLOG</h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
              La vista humana de la fuente única de verdad del trabajo. Esta pantalla se alimenta directamente de <span className="font-mono text-fg">BACKLOG.md</span>.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-[12px] border border-good/30 bg-good/10 px-3 py-2 text-xs text-good">
            <LockKeyhole className="size-4" />
            <span>Fuente sincronizada con el repositorio</span>
          </div>
        </header>

        <section className="grid gap-3 py-6 sm:grid-cols-4">
          <Metric label="Total items" value={counts.total} icon={<ListTodo className="size-4" />} />
          <Metric label="En progreso" value={counts.active} icon={<Radar className="size-4" />} tone="blue" />
          <Metric label="Por hacer" value={counts.todo} icon={<CircleDot className="size-4" />} />
          <Metric label="Ideas futuras" value={counts.ideas} icon={<CircleAlert className="size-4" />} tone="orange" />
        </section>

        <section className="flex flex-col gap-3 border-y border-border py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="mr-1 size-4 text-muted" />
            {statusFilters.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${filter === value ? "border-alpine bg-alpine text-asphalt" : "border-border text-muted hover:border-fg/40 hover:text-fg"}`}
              >
                {value}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar ID, área o tarea"
                className="h-9 w-full rounded-[8px] border border-border bg-panel pl-9 pr-3 text-xs text-fg outline-none placeholder:text-subtle focus:border-alpine sm:w-56"
              />
            </label>
            <select value={section} onChange={(event) => setSection(event.target.value)} className="h-9 rounded-[8px] border border-border bg-panel px-3 text-xs text-fg outline-none focus:border-alpine">
              {areas.map((area) => <option key={area}>{area}</option>)}
            </select>
          </div>
        </section>

        <section className="grid gap-5 py-7 lg:grid-cols-4">
          {statusFilters.filter((value) => value !== "Todos").map((status) => {
            const items = filteredItems.filter((item) => item.status === status);
            return (
              <div key={status} className="min-w-0">
                <div className="mb-3 flex items-center justify-between">
                  <div className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${statusTone(status)}`}>
                    {statusIcon(status)} {status}
                  </div>
                  <span className="font-mono text-xs text-subtle">{items.length}</span>
                </div>
                <div className="space-y-3">
                  {items.length > 0 ? items.map((item) => <BacklogCard key={item.id} item={item} />) : <div className="rounded-[14px] border border-dashed border-border px-4 py-8 text-center text-xs text-subtle">Sin elementos visibles</div>}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}

function Metric({ label, value, icon, tone = "neutral" }: { label: string; value: number; icon: React.ReactNode; tone?: "neutral" | "blue" | "orange" }) {
  const color = tone === "blue" ? "text-alpine" : tone === "orange" ? "text-papaya" : "text-muted";
  return (
    <div className="flex items-center justify-between rounded-[12px] border border-border bg-panel px-4 py-3">
      <div><p className="text-[11px] uppercase tracking-[0.16em] text-subtle">{label}</p><p className="mt-1 font-display text-4xl leading-none text-fg">{value}</p></div>
      <span className={color}>{icon}</span>
    </div>
  );
}
