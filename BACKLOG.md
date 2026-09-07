# Backlog del juego F1 3D

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

- **Estado:** Cerrado — 2026-09-06.
- **Objetivo:** Completar la cadena de vueltas, tiempos y rivales con Hamilton como tercer piloto.
- **Alcance:** F1-NXT-01 → F1-NXT-02 → F1-NXT-03 → F1-RIV-01, en ese orden. No se reprioriza el resto del backlog.
- **Capacidad:** Matías con una IA ejecutora, funciones Gameplay/Frontend/QA; un frente activo y tres cortes de revisión. Fechas y duración por confirmar.
- **Fuera de alcance:** F1-TECH-02 (Vercel), F1-FUT-05 (horizontal), F1-UX-02 (latencia móvil), nuevos rivales distintos a Hamilton, física de neumáticos, DRS activo.
- **Criterio de salida:** 3 vueltas completas con tiempos coherentes en HUD, clasificación en tiempo real con Hamilton (Ferrari #44), y sin regresiones en desktop/móvil vertical.
- **Resultado:** ✅ Completado — 4/4 items terminados, build OK, deploy OK.

### Instrucciones de ejecución — Sprint vueltas y rivales

**Responsable:** Matías + IA de código, funciones Gameplay/Frontend/QA. El Scrum Master mantiene este archivo; el Product Owner autoriza cambios y publicaciones.

**Orden sugerido:** F1-NXT-01 → F1-NXT-02 → F1-NXT-03 → F1-RIV-01.

1. **F1-NXT-01 — Vueltas (entrada por meta)**
   - Contador de vueltas que incrementa al cruzar la línea de meta.
   - Mostrar última vuelta, mejor vuelta y tiempo total en el HUD.
   - Criterio: 3 vueltas incrementan el contador, tiempos coherentes (vuelta 1 > 0, mejor vuelta actualizable).

2. **F1-NXT-02 — State de carrera**
   - Separar estado en fase (pre-carrera, en carrera, finalizada), progreso, vueltas, tiempos y clasificación.
   - Criterio: admite 3+ vueltas sin reescribir el flujo principal; F1-NXT-01 sigue funcionando.

3. **F1-NXT-03 — Rivales con comportamiento reproducibles**
   - Rivales (Verstappen, Piastri) con progreso, posición, diferencia y datos coherentes en HUD/clasificación.
   - Criterio: clasificación refleja posiciones reales; sin comportamiento errático.

4. **F1-RIV-01 — Hamilton (Ferrari #44)**
   - Tercer rival con personalidad: conducción conservadora (95% trazada ideal), agresividad 0.4, bloqueo predictivo, modo caza (0.7 + 3% potencia en DRS), consistencia ±0.050s, tiempos base (VER 1:15.000, HAM 1:15.300, PIA 1:15.700).
   - Datos: `hud="HAM"`, `team="Ferrari"`, `number=44`, `color_ui="#EF1A2D"`.
   - Criterio: Hamilton aparece en la clasificación, respeta su personalidad documentada, no colisiona limpiamente con el jugador.

**Siguiente acción propuesta:** autorizar el sprint y comenzar con F1-NXT-01.

## MVP

| ID | Tipo | Prioridad | Responsable | Tamaño | Dependencias | Estado | Criterios de aceptación |
|---|---|---|---|---|---|---|---|
| F1-MVP-01 | Tarea técnica | P0 | QA | S | Ninguna | Terminado | Escenarios de menú, inicio, conducción, pausa, llegada y reinicio documentados; baseline desktop/móvil conservado. |
| F1-MVP-02 | Historia | P0 | Frontend | S | F1-MVP-01 | Terminado | El menú muestra título, objetivo, controles, pilotos y acción principal para iniciar sin dudas. |
| F1-MVP-03 | Historia | P0 | Gameplay | M | F1-MVP-01 | Terminado | A/izquierda gira a la izquierda, D/derecha a la derecha, W/arriba acelera y S/abajo frena; táctil equivalente. |
| F1-MVP-04 | Tarea técnica | P0 | Gameplay | M | F1-MVP-03 | Terminado | Velocidad, giro, frenado, derrape, boost y límites permiten completar una vuelta sin comportamiento errático. |
| F1-MVP-05 | Historia | P0 | Frontend | M | F1-MVP-03 | Terminado | HUD legible en menos de 2 segundos: posición, vuelta, tiempo, velocidad, estado, rivales y minimapa; sin tapar controles en móvil. |
| F1-MVP-06 | Historia | P1 | 3D/Visual | M | F1-MVP-04 | Terminado | Límites, trazada, curvas, salida y entorno son reconocibles; cámara y vehículo permanecen legibles. |
| F1-MVP-07 | Tarea técnica | P0 | QA | S | F1-MVP-02, F1-MVP-04, F1-MVP-05, F1-MVP-06 | Terminado | Smoke desktop/móvil, consola limpia, sin overflow; pasan `npm run typecheck`, `npm run build` y tests existentes. |

## Bugs prioritarios

| ID | Tipo | Prioridad | Responsable | Tamaño | Dependencias | Estado | Criterios de aceptación |
|---|---|---|---|---|---|---|---|
| F1-BUG-01 | Bug | P0 | Tú + IA de código, función Frontend/Gameplay | M | F1-MVP-03 | Terminado | En móvil, un joystick circular permite acelerar, frenar y girar con precisión usando un dedo y no se solapa; la cámara y controles de escritorio conservan su comportamiento actual. Aceptado en pruebas local y online. |
| F1-BUG-02 | Bug | P0 | Tú + IA de código, función Frontend | S | F1-BUG-01 | Terminado | En móvil vertical, el joystick no tapa el minimapa ni información importante de la carrera. Confirmado en teléfono real. Evidencia: [captura vertical](screenshots/qa-track/mobile-portrait-joystick-minimap-pause.png). |
| F1-BUG-03 | Bug | P0 | Tú + IA de código, función Frontend | S | F1-BUG-01 | Terminado | En móvil vertical, el jugador puede identificar y activar la pausa sin teclado ni abandonar la carrera. Confirmado en teléfono real. Evidencia: [captura vertical](screenshots/qa-track/mobile-portrait-joystick-minimap-pause.png). |
| F1-BUG-04 | Bug | P1 | Tú + IA de código, función Gameplay | M | F1-RIV-01 | Por hacer | Hamilton es considerablemente más lento que Verstappen y Piastri. Idea: explorar un sistema de aprendizaje autónomo usando la telemetría existente (`window.__raceSensors`). Hamilton como piloto experimental para simular aprendizaje de auto autónomo/carreras. |
| F1-BUG-05 | Bug | P0 | Tú + IA de código, función Gameplay | M | F1-NXT-02 | Por hacer | Los tiempos de los rivales al final de la carrera muestran `world.time` (el tiempo del jugador) en lugar de su propio `finishTime`. Cuando un rival cruza segundo, su tiempo se registra bien, pero los que cruzan después del jugador muestran el tiempo del mundo. Root cause: fase "finish" no actualiza `gateCheck` para rivales. |

## Investigación y usabilidad

| ID | Tipo | Prioridad | Responsable | Tamaño | Dependencias | Estado | Criterios de aceptación |
|---|---|---|---|---|---|---|---|
| F1-UX-01 | Investigación de usabilidad | P1 | Tú + IA de código, función QA/Gameplay | M | F1-BUG-01 | Por hacer | Se prueba con varios usuarios si al doblar se pierde aceleración de forma injustificada o si es una curva de aprendizaje esperable; no se modifica la física sin evidencia repetida. |
| F1-UX-02 | Observación de rendimiento | P2 | Tú + IA de código, función QA | S | F1-TECH-01 | Por hacer | Investigar una posible mini latencia ocasional observada en móvil. La prueba local actual no la reproduce: 421 frames, máximo 17.7 ms, cero pausas mayores a 50 ms durante 7 segundos. Comparar luego con teléfono real y registrar modelo, navegador, orientación y momento. |
| F1-MOB-01 | Historia técnica | P0 | Tú + IA de código, función Frontend/QA | M | F1-BUG-01, F1-BUG-02, F1-BUG-03 | Terminado | Móvil vertical permite iniciar, conducir, pausar y finalizar una carrera en un teléfono real, sin solapamientos ni pérdida de controles. Aceptado por el Product Owner. |

## Plataforma y telemetría

| ID | Tipo | Prioridad | Responsable | Tamaño | Dependencias | Estado | Criterios de aceptación |
|---|---|---|---|---|---|---|---|
| F1-TECH-01 | Tarea técnica | P1 | Tú + IA de código, función Gameplay/QA | M | F1-MVP-04 | Terminado | Jugador y rivales exponen sensores de velocidad, progreso, posición lateral, despeje a ambos lados, estado fuera de pista, error de dirección y sondas de curvatura futura mediante `window.__raceSensors`; tests y typecheck pasan, sin cambios visibles en HUD, controles ni comportamiento de desktop o móvil. |
| F1-TECH-02 | Tarea técnica | P2 | Tú + IA de código, función DevOps | M | F1-TECH-01 | Pendiente | Vercel construye y publica directamente desde el código fuente del repositorio; `/` y `/backlog` funcionan en Production y Preview; el juego se puede compartir y probar online; `.vercel/output` deja de ser necesario solo después de validar el flujo completo. |

## Operación del backlog

| ID | Tipo | Prioridad | Responsable | Tamaño | Dependencias | Estado | Criterios de aceptación |
|---|---|---|---|---|---|---|---|
| F1-OPS-01 | Tarea de handoff Scrum | P0 | Scrum Master IA | S | Ninguna | Terminado | Al comenzar cada sesión de planificación, revisar `BACKLOG.md`, el estado de Git, los tests recientes y la evidencia disponible; corregir estados desactualizados, registrar decisiones y dejar una siguiente acción clara antes de planificar trabajo nuevo. |

## Siguiente horizonte

| ID | Tipo | Prioridad | Responsable | Tamaño | Dependencias | Estado | Criterios de aceptación |
|---|---|---|---|---|---|---|---|
| F1-NXT-01 | Historia | P0 | Gameplay | M | F1-MVP-04, F1-MVP-07 | Terminado | Cada paso por meta incrementa una vuelta; se muestran última vuelta, mejor vuelta y tiempo total coherentes. |
| F1-NXT-02 | Tarea técnica | P0 | Gameplay | M | F1-NXT-01 | Terminado | El estado separa fase, progreso, vueltas, tiempos y clasificación; admite más vueltas sin reescribir el flujo principal. |
| F1-NXT-03 | Historia | P1 | Gameplay | M | F1-NXT-02 | Terminado | Rivales con progreso, posición, diferencia y comportamiento reproducibles; datos coherentes en HUD y resultado. |
| F1-NXT-04 | Historia | P1 | Frontend + Gameplay | S | F1-NXT-01 | Por hacer | Pausa detiene simulación y audio; resultado muestra clasificación, tiempos y acciones para repetir o volver. |
| F1-NXT-05 | Tarea técnica | P1 | QA | S | F1-MVP-03, F1-NXT-01 | Por hacer | Matriz de teclado, táctil, foco, pausa, reinicio, límites y tres vueltas en desktop y móvil. |

## Rivales

| ID | Tipo | Prioridad | Responsable | Tamaño | Dependencias | Estado | Criterios de aceptación |
|---|---|---|---|---|---|---|---|
| F1-RIV-01 | Historia | P0 | Gameplay | M | F1-NXT-03 | Terminado | Hamilton (Ferrari #44) como tercer rival con personalidad propia: conducción conservadora y precisa (95% trazada ideal), agresividad base 0.4, lógica de bloqueo predictivo (cubre interior 1s antes ante sobrepaso), multiplicador de estrés (2% microerror si jugador a <0.5s por 2+ vueltas), modo "caza" con agresividad 0.7 y +3% potencia cuando está detrás en zona DRS. Tiempos base: Verstappen 1:15.000, Hamilton 1:15.300, Piastri 1:15.700. Consistencia: variación Hamilton +/-0.050s (máquina), Piastri +/-0.200s. Datos JSON: `hud="HAM"`, `team="Ferrari"`, `number=44`, `color_ui="#EF1A2D"`. |

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
- El arreglo móvil anterior se limitó a los controles táctiles; el siguiente sprint propuesto aborda únicamente F1-TECH-02, sin modificar esa experiencia.
- Móvil vertical es la orientación soportada prioritariamente en esta etapa.
- Móvil horizontal queda para una etapa posterior de diseño; hay que decidir la ubicación del HUD, joystick, mapa, pausa y el tratamiento de la barra del navegador.
- Los sensores y la telemetría son una capacidad interna compartida por desktop y móvil; no deben modificar la usabilidad actual.
- La asistencia inteligente para conducir queda fuera del alcance actual y se conversará más adelante usando la telemetría de F1-TECH-01.
- `.vercel/output` se mantiene versionado temporalmente porque Vercel lo está usando como output preconstruido.
- F1-TECH-02 será el siguiente nivel de infraestructura: migrar Vercel a build directo desde `src/` para publicar, testear y compartir el juego, sin cambiar el flujo de desarrollo local.
- F1-OPS-01 es obligatoria como primera acción del próximo Scrum Master: reconciliar el backlog con el estado real antes de crear o asignar nuevas tareas.
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
| 2026-09-06 | Se agregó F1-TECH-02 y se decidió mantener `.vercel/output` por ahora. | Separar el desarrollo local de la futura migración de Vercel a publicación directa desde código fuente. | Product Owner |
| 2026-09-06 | F1-BUG-01 y F1-MOB-01 se marcaron como Terminado. | El Product Owner confirmó que la experiencia móvil vertical publicada funciona correctamente. | Product Owner |
| 2026-09-06 | Se planificó F1-TECH-02 en tres cortes: diagnóstico, cambio local mínimo y publicación/validación autorizada. Se actualizó el foco del sprint; F1-TECH-02 conserva Pendiente y no se cambiaron estados de otras tareas. | Pedido del Product Owner de preparar instrucciones quirúrgicas antes de ejecutar. Se reutilizará el build existente si es apto, verificando primero la configuración remota; horizontal, latencia y gameplay quedan fuera. | Product Owner (selección); Scrum Master IA (plan propuesto) |
