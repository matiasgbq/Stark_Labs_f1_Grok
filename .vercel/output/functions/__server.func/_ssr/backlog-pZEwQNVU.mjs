import { i as __toESM } from "../_runtime.mjs";
import { g as require_react, h as require_jsx_runtime } from "../_libs/@react-three/fiber+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Funnel, d as CircleAlert, f as ArrowLeft, l as CircleDot, n as Search, o as LockKeyhole, r as Radar, s as ListTodo, u as CircleCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/backlog-pZEwQNVU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BACKLOG_default = "# Backlog del juego F1 3D\n\n> Fuente única de verdad del trabajo. El Scrum Master IA debe leer y actualizar este archivo antes de planificar o cambiar el alcance.\n\n## Equipo y roles\n\n| Rol | Responsable |\n|---|---|\n| Product Owner | Tú |\n| Gameplay | Tú + IA de código |\n| Frontend | Tú + IA de código |\n| 3D/Visual | Tú + IA de código |\n| QA | Tú + IA de código |\n\n> Equipo unipersonal: los roles representan funciones, no personas distintas. Tú\n> mantienes la decisión final y los asistentes de IA ayudan a analizar, diseñar,\n> implementar o validar según la tarea.\n\n## Objetivo actual\n\nEntregar una experiencia inicial clara, controles confiables y una lectura inmediata de la carrera, manteniendo una base preparada para vueltas, tiempos y rivales más completos.\n\n## Sprint actual\n\n- **Estado:** Por planificar\n- **Objetivo:** Definir y ejecutar el MVP de experiencia jugable.\n- **Capacidad:** Una persona, con apoyo de asistentes de IA; por confirmar por sprint\n- **Criterio de salida:** flujo completo validado en desktop y móvil, sin errores de consola, overflow ni regresiones.\n\n## MVP\n\n| ID | Tipo | Prioridad | Responsable | Tamaño | Dependencias | Estado | Criterios de aceptación |\n|---|---|---|---|---|---|---|---|\n| F1-MVP-01 | Tarea técnica | P0 | QA | S | Ninguna | Por hacer | Escenarios de menú, inicio, conducción, pausa, llegada y reinicio documentados; baseline desktop/móvil conservado. |\n| F1-MVP-02 | Historia | P0 | Frontend | S | F1-MVP-01 | Por hacer | El menú muestra título, objetivo, controles, pilotos y acción principal para iniciar sin dudas. |\n| F1-MVP-03 | Historia | P0 | Gameplay | M | F1-MVP-01 | Por hacer | A/izquierda gira a la izquierda, D/derecha a la derecha, W/arriba acelera y S/abajo frena; táctil equivalente. |\n| F1-MVP-04 | Tarea técnica | P0 | Gameplay | M | F1-MVP-03 | Por hacer | Velocidad, giro, frenado, derrape, boost y límites permiten completar una vuelta sin comportamiento errático. |\n| F1-MVP-05 | Historia | P0 | Frontend | M | F1-MVP-03 | Por hacer | HUD legible en menos de 2 segundos: posición, vuelta, tiempo, velocidad, estado, rivales y minimapa; sin tapar controles en móvil. |\n| F1-MVP-06 | Historia | P1 | 3D/Visual | M | F1-MVP-04 | Por hacer | Límites, trazada, curvas, salida y entorno son reconocibles; cámara y vehículo permanecen legibles. |\n| F1-MVP-07 | Tarea técnica | P0 | QA | S | F1-MVP-02, F1-MVP-04, F1-MVP-05, F1-MVP-06 | Por hacer | Smoke desktop/móvil, consola limpia, sin overflow; pasan `npm run typecheck`, `npm run build` y tests existentes. |\n\n## Bugs prioritarios\n\n| ID | Tipo | Prioridad | Responsable | Tamaño | Dependencias | Estado | Criterios de aceptación |\n|---|---|---|---|---|---|---|---|\n| F1-BUG-01 | Bug | P0 | Tú + IA de código, función Frontend/Gameplay | M | F1-MVP-03 | Terminado | En móvil, un joystick circular permite acelerar, frenar y girar con precisión usando un dedo y no se solapa; la cámara y controles de escritorio conservan su comportamiento actual. Aceptado en pruebas local y online. |\n| F1-BUG-02 | Bug | P0 | Tú + IA de código, función Frontend | S | F1-BUG-01 | Terminado | En móvil vertical, el joystick no tapa el minimapa ni información importante de la carrera. Confirmado en teléfono real. Evidencia: [captura vertical](screenshots/qa-track/mobile-portrait-joystick-minimap-pause.png). |\n| F1-BUG-03 | Bug | P0 | Tú + IA de código, función Frontend | S | F1-BUG-01 | Terminado | En móvil vertical, el jugador puede identificar y activar la pausa sin teclado ni abandonar la carrera. Confirmado en teléfono real. Evidencia: [captura vertical](screenshots/qa-track/mobile-portrait-joystick-minimap-pause.png). |\n\n## Investigación y usabilidad\n\n| ID | Tipo | Prioridad | Responsable | Tamaño | Dependencias | Estado | Criterios de aceptación |\n|---|---|---|---|---|---|---|---|\n| F1-UX-01 | Investigación de usabilidad | P1 | Tú + IA de código, función QA/Gameplay | M | F1-BUG-01 | Por hacer | Se prueba con varios usuarios si al doblar se pierde aceleración de forma injustificada o si es una curva de aprendizaje esperable; no se modifica la física sin evidencia repetida. |\n| F1-UX-02 | Observación de rendimiento | P2 | Tú + IA de código, función QA | S | F1-TECH-01 | Por hacer | Investigar una posible mini latencia ocasional observada en móvil. La prueba local actual no la reproduce: 421 frames, máximo 17.7 ms, cero pausas mayores a 50 ms durante 7 segundos. Comparar luego con teléfono real y registrar modelo, navegador, orientación y momento. |\n| F1-MOB-01 | Historia técnica | P0 | Tú + IA de código, función Frontend/QA | M | F1-BUG-01, F1-BUG-02, F1-BUG-03 | Terminado | Móvil vertical permite iniciar, conducir, pausar y finalizar una carrera en un teléfono real, sin solapamientos ni pérdida de controles. Aceptado por el Product Owner. |\n\n## Plataforma y telemetría\n\n| ID | Tipo | Prioridad | Responsable | Tamaño | Dependencias | Estado | Criterios de aceptación |\n|---|---|---|---|---|---|---|---|\n| F1-TECH-01 | Tarea técnica | P1 | Tú + IA de código, función Gameplay/QA | M | F1-MVP-04 | Terminado | Jugador y rivales exponen sensores de velocidad, progreso, posición lateral, despeje a ambos lados, estado fuera de pista, error de dirección y sondas de curvatura futura mediante `window.__raceSensors`; tests y typecheck pasan, sin cambios visibles en HUD, controles ni comportamiento de desktop o móvil. |\n| F1-TECH-02 | Tarea técnica | P2 | Tú + IA de código, función DevOps | M | F1-TECH-01 | Idea | Vercel construye y publica directamente desde el código fuente del repositorio; `/` y `/backlog` funcionan en Production y Preview; el juego se puede compartir y probar online; `.vercel/output` deja de ser necesario solo después de validar el flujo completo. |\n\n## Siguiente horizonte\n\n| ID | Tipo | Prioridad | Responsable | Tamaño | Dependencias | Estado | Criterios de aceptación |\n|---|---|---|---|---|---|---|---|\n| F1-NXT-01 | Historia | P0 | Gameplay | M | F1-MVP-04, F1-MVP-07 | Por hacer | Cada paso por meta incrementa una vuelta; se muestran última vuelta, mejor vuelta y tiempo total coherentes. |\n| F1-NXT-02 | Tarea técnica | P0 | Gameplay | M | F1-NXT-01 | Por hacer | El estado separa fase, progreso, vueltas, tiempos y clasificación; admite más vueltas sin reescribir el flujo principal. |\n| F1-NXT-03 | Historia | P1 | Gameplay | M | F1-NXT-02 | Por hacer | Rivales con progreso, posición, diferencia y comportamiento reproducibles; datos coherentes en HUD y resultado. |\n| F1-NXT-04 | Historia | P1 | Frontend + Gameplay | S | F1-NXT-01 | Por hacer | Pausa detiene simulación y audio; resultado muestra clasificación, tiempos y acciones para repetir o volver. |\n| F1-NXT-05 | Tarea técnica | P1 | QA | S | F1-MVP-03, F1-NXT-01 | Por hacer | Matriz de teclado, táctil, foco, pausa, reinicio, límites y tres vueltas en desktop y móvil. |\n\n## Futuro\n\n| ID | Tipo | Prioridad | Responsable | Tamaño | Dependencias | Estado |\n|---|---|---|---|---|---|---|\n| F1-FUT-01 | Historia | P2 | Frontend + Gameplay | M | F1-NXT-02 | Idea |\n| F1-FUT-02 | Historia | P2 | Gameplay | L | F1-NXT-03 | Idea |\n| F1-FUT-03 | Historia | P2 | Gameplay + Frontend | M | F1-NXT-01 | Idea |\n| F1-FUT-04 | Historia | P3 | 3D/Visual | L | F1-MVP-06, F1-NXT-02 | Idea |\n| F1-FUT-05 | Épica de investigación | P2 | Tú + IA de código, función UX/Frontend | M | F1-MOB-01 | Idea | Definir HUD, joystick, mapa, pausa y uso de pantalla completa en horizontal. Evidencia inicial: [captura horizontal](screenshots/qa-track/mobile-landscape-no-joystick.png). |\n| F1-FUT-06 | Historia técnica | P2 | Tú + IA de código, función Gameplay/IA | L | F1-TECH-01 | Idea |\n\n## Decisiones y bloqueos\n\n- Falta confirmar la capacidad y duración del sprint.\n- La versión web de escritorio funciona correctamente y queda protegida contra cambios en este trabajo.\n- El alcance actual del arreglo se limita a la experiencia móvil y sus controles táctiles.\n- Móvil vertical es la orientación soportada prioritariamente en esta etapa.\n- Móvil horizontal queda para una etapa posterior de diseño; hay que decidir la ubicación del HUD, joystick, mapa, pausa y el tratamiento de la barra del navegador.\n- Los sensores y la telemetría son una capacidad interna compartida por desktop y móvil; no deben modificar la usabilidad actual.\n- La asistencia inteligente para conducir queda fuera del alcance actual y se conversará más adelante usando la telemetría de F1-TECH-01.\n- `.vercel/output` se mantiene versionado temporalmente porque Vercel lo está usando como output preconstruido.\n- F1-TECH-02 será el siguiente nivel de infraestructura: migrar Vercel a build directo desde `src/` para publicar, testear y compartir el juego, sin cambiar el flujo de desarrollo local.\n- No se inicia implementación del MVP hasta que el Product Owner confirme el alcance de F1-MVP-01 a F1-MVP-07 y F1-BUG-01.\n\n## Registro de cambios\n\n| Fecha | Cambio | Motivo | Decidido por |\n|---|---|---|---|\n| 2026-09-06 | Se creó el backlog inicial y se definió como fuente única de verdad. | Organizar mejoras, cambios y planificación futura. | Product Owner |\n| 2026-09-06 | Se agregó F1-BUG-01 y se limitó el alcance a controles táctiles móviles. | La versión de escritorio funciona bien; móvil es difícil de controlar. | Product Owner |\n| 2026-09-06 | Se reemplazó el volante táctil por botones grandes Left/Right y se ampliaron Brake/Throttle. | Mejorar la precisión y facilidad de uso en móvil sin tocar desktop. | Product Owner |\n| 2026-09-06 | Se probó un joystick circular de un dedo; activa aceleración y dirección simultáneas. | Unificar acelerar y doblar en un solo control táctil. La prueba reveló que la sensibilidad/curva aún requiere ajuste. | Product Owner |\n| 2026-09-06 | Se agregaron F1-BUG-02, F1-BUG-03, F1-UX-01, F1-MOB-01 y F1-FUT-05. | Registrar solapamiento del joystick, pausa móvil, pruebas con usuarios, prioridad vertical y discusión futura de horizontal. | Product Owner |\n| 2026-09-06 | Se inició F1-TECH-01 y se dejó F1-FUT-06 como mejora futura. | Preparar sensores y telemetría compartidos para analizar conducción humana y habilitar futuras pruebas de IA sin alterar la experiencia. | Product Owner |\n| 2026-09-06 | F1-TECH-01 se marcó como Terminado. | La capa de sensores, el probe de telemetría, los tests y el typecheck fueron validados localmente. | Product Owner |\n| 2026-09-06 | Se vincularon capturas de evidencia a F1-BUG-02, F1-BUG-03 y F1-FUT-05. | Documentar solapamiento del joystick, pausa no visible en vertical y ausencia de joystick en horizontal. | Product Owner |\n| 2026-09-06 | Se implementó una primera corrección para F1-BUG-02 y F1-BUG-03. | El minimapa sube en móvil vertical y la pausa se vuelve visible; falta validar en teléfono real antes de cerrar. | Product Owner |\n| 2026-09-06 | F1-BUG-02 y F1-BUG-03 se marcaron como Terminado. | El Product Owner confirmó la corrección en teléfono real. | Product Owner |\n| 2026-09-06 | Se agregó F1-UX-02 por una posible mini latencia móvil. | La prueba local no reprodujo pausas; queda pendiente comparar contra teléfono real antes de clasificarlo como bug. | Product Owner |\n| 2026-09-06 | Se agregó F1-TECH-02 y se decidió mantener `.vercel/output` por ahora. | Separar el desarrollo local de la futura migración de Vercel a publicación directa desde código fuente. | Product Owner |\n| 2026-09-06 | F1-BUG-01 y F1-MOB-01 se marcaron como Terminado. | El Product Owner confirmó que la experiencia móvil vertical publicada funciona correctamente. | Product Owner |\n";
function splitRow(line) {
	return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
}
function isTableSeparator(line) {
	return /^\|?\s*:?-{3,}/.test(line.trim());
}
function parseTable(lines, start, section) {
	const header = splitRow(lines[start]);
	if (header[0] !== "ID") return {
		items: [],
		next: start + 1
	};
	let cursor = start + 1;
	if (cursor < lines.length && isTableSeparator(lines[cursor])) cursor += 1;
	const items = [];
	while (cursor < lines.length && lines[cursor].trim().startsWith("|")) {
		const cells = splitRow(lines[cursor]);
		if (cells.length >= 2 && cells[0]) {
			const get = (name) => {
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
				section
			});
		}
		cursor += 1;
	}
	return {
		items,
		next: cursor
	};
}
function parseBacklog(markdown = BACKLOG_default) {
	const lines = markdown.split(/\r?\n/);
	const sections = [];
	let section = "Backlog";
	let cursor = 0;
	while (cursor < lines.length) {
		const heading = lines[cursor].match(/^##\s+(.+)$/);
		if (heading) {
			section = heading[1].trim();
			if (!sections.some((entry) => entry.title === section)) sections.push({
				title: section,
				items: []
			});
			cursor += 1;
			continue;
		}
		if (lines[cursor].trim().startsWith("| ID |")) {
			const parsed = parseTable(lines, cursor, section);
			const target = sections.find((entry) => entry.title === section) ?? {
				title: section,
				items: []
			};
			target.items.push(...parsed.items);
			if (!sections.includes(target)) sections.push(target);
			cursor = parsed.next;
			continue;
		}
		cursor += 1;
	}
	return sections.filter((entry) => entry.items.length > 0);
}
var backlogSections = parseBacklog();
var backlogItems = backlogSections.flatMap((section) => section.items);
var statusFilters = [
	"Todos",
	"Por hacer",
	"En progreso",
	"Bloqueado",
	"Terminado",
	"Idea"
];
function cleanMarkdown(value) {
	return value.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/`([^`]+)`/g, "$1");
}
function statusTone(status) {
	if (status === "En progreso") return "border-alpine/40 bg-alpine/10 text-alpine";
	if (status === "Terminado") return "border-good/40 bg-good/10 text-good";
	if (status === "Bloqueado") return "border-bull/40 bg-bull/10 text-bull";
	if (status === "Idea") return "border-papaya/40 bg-papaya/10 text-papaya";
	return "border-border bg-panel text-muted";
}
function statusIcon(status) {
	if (status === "En progreso") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleDot, { className: "size-4" });
	if (status === "Terminado") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" });
	if (status === "Bloqueado") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-4" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleDot, { className: "size-4" });
}
function priorityTone(priority) {
	if (priority === "P0") return "text-bull";
	if (priority === "P1") return "text-warn";
	if (priority === "P2") return "text-alpine";
	return "text-muted";
}
function BacklogCard({ item }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "group rounded-[14px] border border-border bg-elevated/80 p-4 transition-colors hover:border-alpine/50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] font-semibold tracking-[0.12em] text-alpine",
					children: item.id
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 text-sm font-semibold leading-snug text-fg",
					children: item.type
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `font-mono text-xs font-bold ${priorityTone(item.priority)}`,
					children: item.priority || "—"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs leading-relaxed text-muted",
				children: cleanMarkdown(item.acceptance || "Sin criterio de aceptación definido todavía.")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2 text-[11px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full border border-border px-2 py-1 text-subtle",
					children: item.owner || "Sin responsable"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full border border-border px-2 py-1 text-subtle",
					children: item.size || "Sin tamaño"
				})]
			}),
			item.dependencies && item.dependencies !== "Ninguna" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 border-t border-border pt-3 text-[11px] text-subtle",
				children: ["Depende de ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-muted",
					children: item.dependencies
				})]
			})
		]
	});
}
function BacklogPage() {
	const [filter, setFilter] = (0, import_react.useState)("Todos");
	const [query, setQuery] = (0, import_react.useState)("");
	const [section, setSection] = (0, import_react.useState)("Todas las áreas");
	const areas = ["Todas las áreas", ...backlogSections.map((entry) => entry.title)];
	const normalizedQuery = query.trim().toLowerCase();
	const filteredItems = (0, import_react.useMemo)(() => backlogItems.filter((item) => {
		const matchesStatus = filter === "Todos" || item.status === filter;
		const matchesSection = section === "Todas las áreas" || item.section === section;
		const haystack = `${item.id} ${item.type} ${item.owner} ${item.acceptance}`.toLowerCase();
		return matchesStatus && matchesSection && (!normalizedQuery || haystack.includes(normalizedQuery));
	}), [
		filter,
		normalizedQuery,
		section
	]);
	const counts = {
		total: backlogItems.length,
		active: backlogItems.filter((item) => item.status === "En progreso").length,
		todo: backlogItems.filter((item) => item.status === "Por hacer").length,
		ideas: backlogItems.filter((item) => item.status === "Idea").length
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "h-dvh overflow-y-auto overscroll-contain bg-asphalt text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1440px] px-5 py-6 sm:px-8 sm:py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex flex-col gap-6 border-b border-border pb-7 lg:flex-row lg:items-end lg:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted transition-colors hover:text-fg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Volver al juego"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 text-alpine",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListTodo, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold uppercase tracking-[0.24em]",
								children: "Stark F1 / Operations"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 font-display text-6xl leading-[0.85] text-fg sm:text-7xl",
							children: "BACKLOG"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 max-w-2xl text-sm leading-relaxed text-muted",
							children: [
								"La vista humana de la fuente única de verdad del trabajo. Esta pantalla se alimenta directamente de ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-fg",
									children: "BACKLOG.md"
								}),
								"."
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-[12px] border border-good/30 bg-good/10 px-3 py-2 text-xs text-good",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Fuente sincronizada con el repositorio" })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid gap-3 py-6 sm:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							label: "Total items",
							value: counts.total,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListTodo, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							label: "En progreso",
							value: counts.active,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, { className: "size-4" }),
							tone: "blue"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							label: "Por hacer",
							value: counts.todo,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleDot, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							label: "Ideas futuras",
							value: counts.ideas,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-4" }),
							tone: "orange"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "flex flex-col gap-3 border-y border-border py-4 lg:flex-row lg:items-center lg:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "mr-1 size-4 text-muted" }), statusFilters.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setFilter(value),
							className: `rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${filter === value ? "border-alpine bg-alpine text-asphalt" : "border-border text-muted hover:border-fg/40 hover:text-fg"}`,
							children: value
						}, value))]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "relative block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: query,
								onChange: (event) => setQuery(event.target.value),
								placeholder: "Buscar ID, área o tarea",
								className: "h-9 w-full rounded-[8px] border border-border bg-panel pl-9 pr-3 text-xs text-fg outline-none placeholder:text-subtle focus:border-alpine sm:w-56"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: section,
							onChange: (event) => setSection(event.target.value),
							className: "h-9 rounded-[8px] border border-border bg-panel px-3 text-xs text-fg outline-none focus:border-alpine",
							children: areas.map((area) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: area }, area))
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "grid gap-5 py-7 lg:grid-cols-4",
					children: statusFilters.filter((value) => value !== "Todos").map((status) => {
						const items = filteredItems.filter((item) => item.status === status);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${statusTone(status)}`,
									children: [
										statusIcon(status),
										" ",
										status
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs text-subtle",
									children: items.length
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-3",
								children: items.length > 0 ? items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BacklogCard, { item }, item.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-[14px] border border-dashed border-border px-4 py-8 text-center text-xs text-subtle",
									children: "Sin elementos visibles"
								})
							})]
						}, status);
					})
				})
			]
		})
	});
}
function Metric({ label, value, icon, tone = "neutral" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between rounded-[12px] border border-border bg-panel px-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] uppercase tracking-[0.16em] text-subtle",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-display text-4xl leading-none text-fg",
			children: value
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: tone === "blue" ? "text-alpine" : tone === "orange" ? "text-papaya" : "text-muted",
			children: icon
		})]
	});
}
//#endregion
export { BacklogPage as component };
