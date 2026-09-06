import backlogMarkdown from "../../BACKLOG.md?raw";

export type BacklogItem = {
  id: string;
  type: string;
  priority: string;
  owner: string;
  size: string;
  dependencies: string;
  status: string;
  acceptance: string;
  section: string;
};

export type BacklogSection = {
  title: string;
  items: BacklogItem[];
};

function splitRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isTableSeparator(line: string) {
  return /^\|?\s*:?-{3,}/.test(line.trim());
}

function parseTable(lines: string[], start: number, section: string) {
  const header = splitRow(lines[start]);
  if (header[0] !== "ID") return { items: [], next: start + 1 };
  let cursor = start + 1;
  if (cursor < lines.length && isTableSeparator(lines[cursor])) cursor += 1;
  const items: BacklogItem[] = [];
  while (cursor < lines.length && lines[cursor].trim().startsWith("|")) {
    const cells = splitRow(lines[cursor]);
    if (cells.length >= 2 && cells[0]) {
      const get = (name: string) => {
        const index = header.indexOf(name);
        return index >= 0 ? cells[index] ?? "" : "";
      };
      items.push({
        id: get("ID"),
        type: get("Tipo"),
        priority: get("Prioridad"),
        owner: get("Responsable"),
        size: get("Tamaño"),
        dependencies: get("Dependencias"),
        status: get("Estado"),
        acceptance: get("Criterios de aceptación"),
        section,
      });
    }
    cursor += 1;
  }
  return { items, next: cursor };
}

export function parseBacklog(markdown = backlogMarkdown): BacklogSection[] {
  const lines = markdown.split(/\r?\n/);
  const sections: BacklogSection[] = [];
  let section = "Backlog";
  let cursor = 0;

  while (cursor < lines.length) {
    const heading = lines[cursor].match(/^##\s+(.+)$/);
    if (heading) {
      section = heading[1].trim();
      if (!sections.some((entry) => entry.title === section)) sections.push({ title: section, items: [] });
      cursor += 1;
      continue;
    }
    if (lines[cursor].trim().startsWith("| ID |")) {
      const parsed = parseTable(lines, cursor, section);
      const target = sections.find((entry) => entry.title === section) ?? { title: section, items: [] };
      target.items.push(...parsed.items);
      if (!sections.includes(target)) sections.push(target);
      cursor = parsed.next;
      continue;
    }
    cursor += 1;
  }

  return sections.filter((entry) => entry.items.length > 0);
}

export const backlogSections = parseBacklog();
export const backlogItems = backlogSections.flatMap((section) => section.items);
