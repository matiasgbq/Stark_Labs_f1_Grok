import{c as e,i as t,n,o as r,t as i}from"./index-BG4Qnq_9.js";var a=i(`arrow-left`,[[`path`,{d:`m12 19-7-7 7-7`,key:`1l729n`}],[`path`,{d:`M19 12H5`,key:`x3x0zl`}]]),o=i(`circle-alert`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`line`,{x1:`12`,x2:`12`,y1:`8`,y2:`12`,key:`1pkeuh`}],[`line`,{x1:`12`,x2:`12.01`,y1:`16`,y2:`16`,key:`4dfq90`}]]),s=i(`circle-check`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`m9 12 2 2 4-4`,key:`dzmm74`}]]),c=i(`circle-dot`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`circle`,{cx:`12`,cy:`12`,r:`1`,key:`41hilf`}]]),l=i(`funnel`,[[`path`,{d:`M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z`,key:`sc7q7i`}]]),u=i(`list-todo`,[[`rect`,{x:`3`,y:`5`,width:`6`,height:`6`,rx:`1`,key:`1defrl`}],[`path`,{d:`m3 17 2 2 4-4`,key:`1jhpwq`}],[`path`,{d:`M13 6h8`,key:`15sg57`}],[`path`,{d:`M13 12h8`,key:`h98zly`}],[`path`,{d:`M13 18h8`,key:`oe0vm4`}]]),d=i(`lock-keyhole`,[[`circle`,{cx:`12`,cy:`16`,r:`1`,key:`1au0dj`}],[`rect`,{x:`3`,y:`10`,width:`18`,height:`12`,rx:`2`,key:`6s8ecr`}],[`path`,{d:`M7 10V7a5 5 0 0 1 10 0v3`,key:`1pqi11`}]]),f=i(`radar`,[[`path`,{d:`M19.07 4.93A10 10 0 0 0 6.99 3.34`,key:`z3du51`}],[`path`,{d:`M4 6h.01`,key:`oypzma`}],[`path`,{d:`M2.29 9.62A10 10 0 1 0 21.31 8.35`,key:`qzzz0`}],[`path`,{d:`M16.24 7.76A6 6 0 1 0 8.23 16.67`,key:`1yjesh`}],[`path`,{d:`M12 18h.01`,key:`mhygvu`}],[`path`,{d:`M17.99 11.66A6 6 0 0 1 15.77 16.67`,key:`1u2y91`}],[`circle`,{cx:`12`,cy:`12`,r:`2`,key:`1c9p78`}],[`path`,{d:`m13.41 10.59 5.66-5.66`,key:`mhq4k0`}]]),p=i(`search`,[[`path`,{d:`m21 21-4.34-4.34`,key:`14j7rj`}],[`circle`,{cx:`11`,cy:`11`,r:`8`,key:`4ej97u`}]]),m=e(r()),h=`# Backlog del juego F1 3D

> Fuente única de verdad del trabajo. El Scrum Master IA debe leer y actualizar este archivo antes de planificar o cambiar el alcance.

## Equipo y roles

| Rol | Responsable |
|---|---|
| Product Owner | Tú |
| Gameplay | Tú + IA de código |
| Frontend | Tú + IA de código |
| 3D/Visual | Tú + IA de código |
| QA | Tú + IA de código |

> Equipo unipersonal: los roles representan funciones, no personas distintas. Tú
> mantienes la decisión final y los asistentes de IA ayudan a analizar, diseñar,
> implementar o validar según la tarea.

## Objetivo actual

Entregar una experiencia inicial clara, controles confiables y una lectura inmediata de la carrera, manteniendo una base preparada para vueltas, tiempos y rivales más completos.

## Sprint actual

- **Estado:** Por planificar
- **Objetivo:** Definir y ejecutar el MVP de experiencia jugable.
- **Capacidad:** Una persona, con apoyo de asistentes de IA; por confirmar por sprint
- **Criterio de salida:** flujo completo validado en desktop y móvil, sin errores de consola, overflow ni regresiones.

## MVP

| ID | Tipo | Prioridad | Responsable | Tamaño | Dependencias | Estado | Criterios de aceptación |
|---|---|---|---|---|---|---|---|
| F1-MVP-01 | Tarea técnica | P0 | QA | S | Ninguna | Por hacer | Escenarios de menú, inicio, conducción, pausa, llegada y reinicio documentados; baseline desktop/móvil conservado. |
| F1-MVP-02 | Historia | P0 | Frontend | S | F1-MVP-01 | Por hacer | El menú muestra título, objetivo, controles, pilotos y acción principal para iniciar sin dudas. |
| F1-MVP-03 | Historia | P0 | Gameplay | M | F1-MVP-01 | Por hacer | A/izquierda gira a la izquierda, D/derecha a la derecha, W/arriba acelera y S/abajo frena; táctil equivalente. |
| F1-MVP-04 | Tarea técnica | P0 | Gameplay | M | F1-MVP-03 | Por hacer | Velocidad, giro, frenado, derrape, boost y límites permiten completar una vuelta sin comportamiento errático. |
| F1-MVP-05 | Historia | P0 | Frontend | M | F1-MVP-03 | Por hacer | HUD legible en menos de 2 segundos: posición, vuelta, tiempo, velocidad, estado, rivales y minimapa; sin tapar controles en móvil. |
| F1-MVP-06 | Historia | P1 | 3D/Visual | M | F1-MVP-04 | Por hacer | Límites, trazada, curvas, salida y entorno son reconocibles; cámara y vehículo permanecen legibles. |
| F1-MVP-07 | Tarea técnica | P0 | QA | S | F1-MVP-02, F1-MVP-04, F1-MVP-05, F1-MVP-06 | Por hacer | Smoke desktop/móvil, consola limpia, sin overflow; pasan \`npm run typecheck\`, \`npm run build\` y tests existentes. |

## Bugs prioritarios

| ID | Tipo | Prioridad | Responsable | Tamaño | Dependencias | Estado | Criterios de aceptación |
|---|---|---|---|---|---|---|---|
| F1-BUG-01 | Bug | P0 | Tú + IA de código, función Frontend/Gameplay | M | F1-MVP-03 | Terminado | En móvil, un joystick circular permite acelerar, frenar y girar con precisión usando un dedo y no se solapa; la cámara y controles de escritorio conservan su comportamiento actual. Aceptado en pruebas local y online. |
| F1-BUG-02 | Bug | P0 | Tú + IA de código, función Frontend | S | F1-BUG-01 | Terminado | En móvil vertical, el joystick no tapa el minimapa ni información importante de la carrera. Confirmado en teléfono real. Evidencia: [captura vertical](screenshots/qa-track/mobile-portrait-joystick-minimap-pause.png). |
| F1-BUG-03 | Bug | P0 | Tú + IA de código, función Frontend | S | F1-BUG-01 | Terminado | En móvil vertical, el jugador puede identificar y activar la pausa sin teclado ni abandonar la carrera. Confirmado en teléfono real. Evidencia: [captura vertical](screenshots/qa-track/mobile-portrait-joystick-minimap-pause.png). |

## Investigación y usabilidad

| ID | Tipo | Prioridad | Responsable | Tamaño | Dependencias | Estado | Criterios de aceptación |
|---|---|---|---|---|---|---|---|
| F1-UX-01 | Investigación de usabilidad | P1 | Tú + IA de código, función QA/Gameplay | M | F1-BUG-01 | Por hacer | Se prueba con varios usuarios si al doblar se pierde aceleración de forma injustificada o si es una curva de aprendizaje esperable; no se modifica la física sin evidencia repetida. |
| F1-UX-02 | Observación de rendimiento | P2 | Tú + IA de código, función QA | S | F1-TECH-01 | Por hacer | Investigar una posible mini latencia ocasional observada en móvil. La prueba local actual no la reproduce: 421 frames, máximo 17.7 ms, cero pausas mayores a 50 ms durante 7 segundos. Comparar luego con teléfono real y registrar modelo, navegador, orientación y momento. |
| F1-MOB-01 | Historia técnica | P0 | Tú + IA de código, función Frontend/QA | M | F1-BUG-01, F1-BUG-02, F1-BUG-03 | Terminado | Móvil vertical permite iniciar, conducir, pausar y finalizar una carrera en un teléfono real, sin solapamientos ni pérdida de controles. Aceptado por el Product Owner. |

## Plataforma y telemetría

| ID | Tipo | Prioridad | Responsable | Tamaño | Dependencias | Estado | Criterios de aceptación |
|---|---|---|---|---|---|---|---|
| F1-TECH-01 | Tarea técnica | P1 | Tú + IA de código, función Gameplay/QA | M | F1-MVP-04 | Terminado | Jugador y rivales exponen sensores de velocidad, progreso, posición lateral, despeje a ambos lados, estado fuera de pista, error de dirección y sondas de curvatura futura mediante \`window.__raceSensors\`; tests y typecheck pasan, sin cambios visibles en HUD, controles ni comportamiento de desktop o móvil. |
| F1-TECH-02 | Tarea técnica | P2 | Tú + IA de código, función DevOps | M | F1-TECH-01 | Idea | Vercel construye y publica directamente desde el código fuente del repositorio; \`/\` y \`/backlog\` funcionan en Production y Preview; el juego se puede compartir y probar online; \`.vercel/output\` deja de ser necesario solo después de validar el flujo completo. |

## Siguiente horizonte

| ID | Tipo | Prioridad | Responsable | Tamaño | Dependencias | Estado | Criterios de aceptación |
|---|---|---|---|---|---|---|---|
| F1-NXT-01 | Historia | P0 | Gameplay | M | F1-MVP-04, F1-MVP-07 | Por hacer | Cada paso por meta incrementa una vuelta; se muestran última vuelta, mejor vuelta y tiempo total coherentes. |
| F1-NXT-02 | Tarea técnica | P0 | Gameplay | M | F1-NXT-01 | Por hacer | El estado separa fase, progreso, vueltas, tiempos y clasificación; admite más vueltas sin reescribir el flujo principal. |
| F1-NXT-03 | Historia | P1 | Gameplay | M | F1-NXT-02 | Por hacer | Rivales con progreso, posición, diferencia y comportamiento reproducibles; datos coherentes en HUD y resultado. |
| F1-NXT-04 | Historia | P1 | Frontend + Gameplay | S | F1-NXT-01 | Por hacer | Pausa detiene simulación y audio; resultado muestra clasificación, tiempos y acciones para repetir o volver. |
| F1-NXT-05 | Tarea técnica | P1 | QA | S | F1-MVP-03, F1-NXT-01 | Por hacer | Matriz de teclado, táctil, foco, pausa, reinicio, límites y tres vueltas en desktop y móvil. |

## Futuro

| ID | Tipo | Prioridad | Responsable | Tamaño | Dependencias | Estado |
|---|---|---|---|---|---|---|
| F1-FUT-01 | Historia | P2 | Frontend + Gameplay | M | F1-NXT-02 | Idea |
| F1-FUT-02 | Historia | P2 | Gameplay | L | F1-NXT-03 | Idea |
| F1-FUT-03 | Historia | P2 | Gameplay + Frontend | M | F1-NXT-01 | Idea |
| F1-FUT-04 | Historia | P3 | 3D/Visual | L | F1-MVP-06, F1-NXT-02 | Idea |
| F1-FUT-05 | Épica de investigación | P2 | Tú + IA de código, función UX/Frontend | M | F1-MOB-01 | Idea | Definir HUD, joystick, mapa, pausa y uso de pantalla completa en horizontal. Evidencia inicial: [captura horizontal](screenshots/qa-track/mobile-landscape-no-joystick.png). |
| F1-FUT-06 | Historia técnica | P2 | Tú + IA de código, función Gameplay/IA | L | F1-TECH-01 | Idea |

## Decisiones y bloqueos

- Falta confirmar la capacidad y duración del sprint.
- La versión web de escritorio funciona correctamente y queda protegida contra cambios en este trabajo.
- El alcance actual del arreglo se limita a la experiencia móvil y sus controles táctiles.
- Móvil vertical es la orientación soportada prioritariamente en esta etapa.
- Móvil horizontal queda para una etapa posterior de diseño; hay que decidir la ubicación del HUD, joystick, mapa, pausa y el tratamiento de la barra del navegador.
- Los sensores y la telemetría son una capacidad interna compartida por desktop y móvil; no deben modificar la usabilidad actual.
- La asistencia inteligente para conducir queda fuera del alcance actual y se conversará más adelante usando la telemetría de F1-TECH-01.
- \`.vercel/output\` se mantiene versionado temporalmente porque Vercel lo está usando como output preconstruido.
- F1-TECH-02 será el siguiente nivel de infraestructura: migrar Vercel a build directo desde \`src/\` para publicar, testear y compartir el juego, sin cambiar el flujo de desarrollo local.
- No se inicia implementación del MVP hasta que el Product Owner confirme el alcance de F1-MVP-01 a F1-MVP-07 y F1-BUG-01.

## Registro de cambios

| Fecha | Cambio | Motivo | Decidido por |
|---|---|---|---|
| 2026-09-06 | Se creó el backlog inicial y se definió como fuente única de verdad. | Organizar mejoras, cambios y planificación futura. | Product Owner |
| 2026-09-06 | Se agregó F1-BUG-01 y se limitó el alcance a controles táctiles móviles. | La versión de escritorio funciona bien; móvil es difícil de controlar. | Product Owner |
| 2026-09-06 | Se reemplazó el volante táctil por botones grandes Left/Right y se ampliaron Brake/Throttle. | Mejorar la precisión y facilidad de uso en móvil sin tocar desktop. | Product Owner |
| 2026-09-06 | Se probó un joystick circular de un dedo; activa aceleración y dirección simultáneas. | Unificar acelerar y doblar en un solo control táctil. La prueba reveló que la sensibilidad/curva aún requiere ajuste. | Product Owner |
| 2026-09-06 | Se agregaron F1-BUG-02, F1-BUG-03, F1-UX-01, F1-MOB-01 y F1-FUT-05. | Registrar solapamiento del joystick, pausa móvil, pruebas con usuarios, prioridad vertical y discusión futura de horizontal. | Product Owner |
| 2026-09-06 | Se inició F1-TECH-01 y se dejó F1-FUT-06 como mejora futura. | Preparar sensores y telemetría compartidos para analizar conducción humana y habilitar futuras pruebas de IA sin alterar la experiencia. | Product Owner |
| 2026-09-06 | F1-TECH-01 se marcó como Terminado. | La capa de sensores, el probe de telemetría, los tests y el typecheck fueron validados localmente. | Product Owner |
| 2026-09-06 | Se vincularon capturas de evidencia a F1-BUG-02, F1-BUG-03 y F1-FUT-05. | Documentar solapamiento del joystick, pausa no visible en vertical y ausencia de joystick en horizontal. | Product Owner |
| 2026-09-06 | Se implementó una primera corrección para F1-BUG-02 y F1-BUG-03. | El minimapa sube en móvil vertical y la pausa se vuelve visible; falta validar en teléfono real antes de cerrar. | Product Owner |
| 2026-09-06 | F1-BUG-02 y F1-BUG-03 se marcaron como Terminado. | El Product Owner confirmó la corrección en teléfono real. | Product Owner |
| 2026-09-06 | Se agregó F1-UX-02 por una posible mini latencia móvil. | La prueba local no reprodujo pausas; queda pendiente comparar contra teléfono real antes de clasificarlo como bug. | Product Owner |
| 2026-09-06 | Se agregó F1-TECH-02 y se decidió mantener \`.vercel/output\` por ahora. | Separar el desarrollo local de la futura migración de Vercel a publicación directa desde código fuente. | Product Owner |
| 2026-09-06 | F1-BUG-01 y F1-MOB-01 se marcaron como Terminado. | El Product Owner confirmó que la experiencia móvil vertical publicada funciona correctamente. | Product Owner |
`;function g(e){return e.trim().replace(/^\|/,``).replace(/\|$/,``).split(`|`).map(e=>e.trim())}function _(e){return/^\|?\s*:?-{3,}/.test(e.trim())}function v(e,t,n){let r=g(e[t]);if(r[0]!==`ID`)return{items:[],next:t+1};let i=t+1;i<e.length&&_(e[i])&&(i+=1);let a=[];for(;i<e.length&&e[i].trim().startsWith(`|`);){let t=g(e[i]);if(t.length>=2&&t[0]){let e=e=>{let n=r.indexOf(e);return n>=0?t[n]??``:``};a.push({id:e(`ID`),type:e(`Tipo`),priority:e(`Prioridad`),owner:e(`Responsable`),size:e(`Tamaño`),dependencies:e(`Dependencias`),status:e(`Estado`),acceptance:e(`Criterios de aceptación`),section:n})}i+=1}return{items:a,next:i}}function y(e=h){let t=e.split(/\r?\n/),n=[],r=`Backlog`,i=0;for(;i<t.length;){let e=t[i].match(/^##\s+(.+)$/);if(e){r=e[1].trim(),n.some(e=>e.title===r)||n.push({title:r,items:[]}),i+=1;continue}if(t[i].trim().startsWith(`| ID |`)){let e=v(t,i,r),a=n.find(e=>e.title===r)??{title:r,items:[]};a.items.push(...e.items),n.includes(a)||n.push(a),i=e.next;continue}i+=1}return n.filter(e=>e.items.length>0)}var b=y(),x=b.flatMap(e=>e.items),S=t(),C=[`Todos`,`Por hacer`,`En progreso`,`Bloqueado`,`Terminado`,`Idea`];function w(e){return e.replace(/\[([^\]]+)\]\([^)]*\)/g,`$1`).replace(/`([^`]+)`/g,`$1`)}function T(e){return e===`En progreso`?`border-alpine/40 bg-alpine/10 text-alpine`:e===`Terminado`?`border-good/40 bg-good/10 text-good`:e===`Bloqueado`?`border-bull/40 bg-bull/10 text-bull`:e===`Idea`?`border-papaya/40 bg-papaya/10 text-papaya`:`border-border bg-panel text-muted`}function E(e){return e===`En progreso`?(0,S.jsx)(c,{className:`size-4`}):e===`Terminado`?(0,S.jsx)(s,{className:`size-4`}):e===`Bloqueado`?(0,S.jsx)(o,{className:`size-4`}):(0,S.jsx)(c,{className:`size-4`})}function D(e){return e===`P0`?`text-bull`:e===`P1`?`text-warn`:e===`P2`?`text-alpine`:`text-muted`}function O({item:e}){return(0,S.jsxs)(`article`,{className:`group rounded-[14px] border border-border bg-elevated/80 p-4 transition-colors hover:border-alpine/50`,children:[(0,S.jsxs)(`div`,{className:`flex items-start justify-between gap-3`,children:[(0,S.jsxs)(`div`,{children:[(0,S.jsx)(`p`,{className:`font-mono text-[11px] font-semibold tracking-[0.12em] text-alpine`,children:e.id}),(0,S.jsx)(`h3`,{className:`mt-1 text-sm font-semibold leading-snug text-fg`,children:e.type})]}),(0,S.jsx)(`span`,{className:`font-mono text-xs font-bold ${D(e.priority)}`,children:e.priority||`—`})]}),(0,S.jsx)(`p`,{className:`mt-3 text-xs leading-relaxed text-muted`,children:w(e.acceptance||`Sin criterio de aceptación definido todavía.`)}),(0,S.jsxs)(`div`,{className:`mt-4 flex flex-wrap gap-2 text-[11px]`,children:[(0,S.jsx)(`span`,{className:`rounded-full border border-border px-2 py-1 text-subtle`,children:e.owner||`Sin responsable`}),(0,S.jsx)(`span`,{className:`rounded-full border border-border px-2 py-1 text-subtle`,children:e.size||`Sin tamaño`})]}),e.dependencies&&e.dependencies!==`Ninguna`&&(0,S.jsxs)(`p`,{className:`mt-3 border-t border-border pt-3 text-[11px] text-subtle`,children:[`Depende de `,(0,S.jsx)(`span`,{className:`font-mono text-muted`,children:e.dependencies})]})]})}function k(){let[e,t]=(0,m.useState)(`Todos`),[r,i]=(0,m.useState)(``),[s,h]=(0,m.useState)(`Todas las áreas`),g=[`Todas las áreas`,...b.map(e=>e.title)],_=r.trim().toLowerCase(),v=(0,m.useMemo)(()=>x.filter(t=>{let n=e===`Todos`||t.status===e,r=s===`Todas las áreas`||t.section===s,i=`${t.id} ${t.type} ${t.owner} ${t.acceptance}`.toLowerCase();return n&&r&&(!_||i.includes(_))}),[e,_,s]),y={total:x.length,active:x.filter(e=>e.status===`En progreso`).length,todo:x.filter(e=>e.status===`Por hacer`).length,ideas:x.filter(e=>e.status===`Idea`).length};return(0,S.jsx)(`main`,{className:`h-dvh overflow-y-auto overscroll-contain bg-asphalt text-fg`,children:(0,S.jsxs)(`div`,{className:`mx-auto max-w-[1440px] px-5 py-6 sm:px-8 sm:py-8`,children:[(0,S.jsxs)(`header`,{className:`flex flex-col gap-6 border-b border-border pb-7 lg:flex-row lg:items-end lg:justify-between`,children:[(0,S.jsxs)(`div`,{children:[(0,S.jsxs)(n,{to:`/`,className:`mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted transition-colors hover:text-fg`,children:[(0,S.jsx)(a,{className:`size-4`}),` Volver al juego`]}),(0,S.jsxs)(`div`,{className:`flex items-center gap-3 text-alpine`,children:[(0,S.jsx)(u,{className:`size-5`}),(0,S.jsx)(`span`,{className:`text-xs font-semibold uppercase tracking-[0.24em]`,children:`Stark F1 / Operations`})]}),(0,S.jsx)(`h1`,{className:`mt-3 font-display text-6xl leading-[0.85] text-fg sm:text-7xl`,children:`BACKLOG`}),(0,S.jsxs)(`p`,{className:`mt-4 max-w-2xl text-sm leading-relaxed text-muted`,children:[`La vista humana de la fuente única de verdad del trabajo. Esta pantalla se alimenta directamente de `,(0,S.jsx)(`span`,{className:`font-mono text-fg`,children:`BACKLOG.md`}),`.`]})]}),(0,S.jsxs)(`div`,{className:`flex items-center gap-2 rounded-[12px] border border-good/30 bg-good/10 px-3 py-2 text-xs text-good`,children:[(0,S.jsx)(d,{className:`size-4`}),(0,S.jsx)(`span`,{children:`Fuente sincronizada con el repositorio`})]})]}),(0,S.jsxs)(`section`,{className:`grid gap-3 py-6 sm:grid-cols-4`,children:[(0,S.jsx)(A,{label:`Total items`,value:y.total,icon:(0,S.jsx)(u,{className:`size-4`})}),(0,S.jsx)(A,{label:`En progreso`,value:y.active,icon:(0,S.jsx)(f,{className:`size-4`}),tone:`blue`}),(0,S.jsx)(A,{label:`Por hacer`,value:y.todo,icon:(0,S.jsx)(c,{className:`size-4`})}),(0,S.jsx)(A,{label:`Ideas futuras`,value:y.ideas,icon:(0,S.jsx)(o,{className:`size-4`}),tone:`orange`})]}),(0,S.jsxs)(`section`,{className:`flex flex-col gap-3 border-y border-border py-4 lg:flex-row lg:items-center lg:justify-between`,children:[(0,S.jsxs)(`div`,{className:`flex flex-wrap items-center gap-2`,children:[(0,S.jsx)(l,{className:`mr-1 size-4 text-muted`}),C.map(n=>(0,S.jsx)(`button`,{type:`button`,onClick:()=>t(n),className:`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${e===n?`border-alpine bg-alpine text-asphalt`:`border-border text-muted hover:border-fg/40 hover:text-fg`}`,children:n},n))]}),(0,S.jsxs)(`div`,{className:`flex flex-col gap-2 sm:flex-row`,children:[(0,S.jsxs)(`label`,{className:`relative block`,children:[(0,S.jsx)(p,{className:`pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle`}),(0,S.jsx)(`input`,{value:r,onChange:e=>i(e.target.value),placeholder:`Buscar ID, área o tarea`,className:`h-9 w-full rounded-[8px] border border-border bg-panel pl-9 pr-3 text-xs text-fg outline-none placeholder:text-subtle focus:border-alpine sm:w-56`})]}),(0,S.jsx)(`select`,{value:s,onChange:e=>h(e.target.value),className:`h-9 rounded-[8px] border border-border bg-panel px-3 text-xs text-fg outline-none focus:border-alpine`,children:g.map(e=>(0,S.jsx)(`option`,{children:e},e))})]})]}),(0,S.jsx)(`section`,{className:`grid gap-5 py-7 lg:grid-cols-4`,children:C.filter(e=>e!==`Todos`).map(e=>{let t=v.filter(t=>t.status===e);return(0,S.jsxs)(`div`,{className:`min-w-0`,children:[(0,S.jsxs)(`div`,{className:`mb-3 flex items-center justify-between`,children:[(0,S.jsxs)(`div`,{className:`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${T(e)}`,children:[E(e),` `,e]}),(0,S.jsx)(`span`,{className:`font-mono text-xs text-subtle`,children:t.length})]}),(0,S.jsx)(`div`,{className:`space-y-3`,children:t.length>0?t.map(e=>(0,S.jsx)(O,{item:e},e.id)):(0,S.jsx)(`div`,{className:`rounded-[14px] border border-dashed border-border px-4 py-8 text-center text-xs text-subtle`,children:`Sin elementos visibles`})})]},e)})})]})})}function A({label:e,value:t,icon:n,tone:r=`neutral`}){return(0,S.jsxs)(`div`,{className:`flex items-center justify-between rounded-[12px] border border-border bg-panel px-4 py-3`,children:[(0,S.jsxs)(`div`,{children:[(0,S.jsx)(`p`,{className:`text-[11px] uppercase tracking-[0.16em] text-subtle`,children:e}),(0,S.jsx)(`p`,{className:`mt-1 font-display text-4xl leading-none text-fg`,children:t})]}),(0,S.jsx)(`span`,{className:r===`blue`?`text-alpine`:r===`orange`?`text-papaya`:`text-muted`,children:n})]})}export{k as component};