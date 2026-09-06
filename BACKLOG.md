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
| F1-MVP-07 | Tarea técnica | P0 | QA | S | F1-MVP-02, F1-MVP-04, F1-MVP-05, F1-MVP-06 | Por hacer | Smoke desktop/móvil, consola limpia, sin overflow; pasan `npm run typecheck`, `npm run build` y tests existentes. |

## Bugs prioritarios

| ID | Tipo | Prioridad | Responsable | Tamaño | Dependencias | Estado | Criterios de aceptación |
|---|---|---|---|---|---|---|---|
| F1-BUG-01 | Bug | P0 | Tú + IA de código, función Frontend/Gameplay | M | F1-MVP-03 | En progreso | En móvil, un joystick circular permite acelerar, frenar y girar con precisión usando un dedo y no se solapa; la cámara y controles de escritorio conservan su comportamiento actual. |
| F1-BUG-02 | Bug | P0 | Tú + IA de código, función Frontend | S | F1-BUG-01 | Terminado | En móvil vertical, el joystick no tapa el minimapa ni información importante de la carrera. Confirmado en teléfono real. Evidencia: [captura vertical](screenshots/qa-track/mobile-portrait-joystick-minimap-pause.png). |
| F1-BUG-03 | Bug | P0 | Tú + IA de código, función Frontend | S | F1-BUG-01 | Terminado | En móvil vertical, el jugador puede identificar y activar la pausa sin teclado ni abandonar la carrera. Confirmado en teléfono real. Evidencia: [captura vertical](screenshots/qa-track/mobile-portrait-joystick-minimap-pause.png). |

## Investigación y usabilidad

| ID | Tipo | Prioridad | Responsable | Tamaño | Dependencias | Estado | Criterios de aceptación |
|---|---|---|---|---|---|---|---|
| F1-UX-01 | Investigación de usabilidad | P1 | Tú + IA de código, función QA/Gameplay | M | F1-BUG-01 | Por hacer | Se prueba con varios usuarios si al doblar se pierde aceleración de forma injustificada o si es una curva de aprendizaje esperable; no se modifica la física sin evidencia repetida. |
| F1-UX-02 | Observación de rendimiento | P2 | Tú + IA de código, función QA | S | F1-TECH-01 | Por hacer | Investigar una posible mini latencia ocasional observada en móvil. La prueba local actual no la reproduce: 421 frames, máximo 17.7 ms, cero pausas mayores a 50 ms durante 7 segundos. Comparar luego con teléfono real y registrar modelo, navegador, orientación y momento. |
| F1-MOB-01 | Historia técnica | P0 | Tú + IA de código, función Frontend/QA | M | F1-BUG-01, F1-BUG-02, F1-BUG-03 | Por hacer | Móvil vertical permite iniciar, conducir, pausar y finalizar una carrera en un teléfono real, sin solapamientos ni pérdida de controles. |

## Plataforma y telemetría

| ID | Tipo | Prioridad | Responsable | Tamaño | Dependencias | Estado | Criterios de aceptación |
|---|---|---|---|---|---|---|---|
| F1-TECH-01 | Tarea técnica | P1 | Tú + IA de código, función Gameplay/QA | M | F1-MVP-04 | Terminado | Jugador y rivales exponen sensores de velocidad, progreso, posición lateral, despeje a ambos lados, estado fuera de pista, error de dirección y sondas de curvatura futura mediante `window.__raceSensors`; tests y typecheck pasan, sin cambios visibles en HUD, controles ni comportamiento de desktop o móvil. |
| F1-TECH-02 | Tarea técnica | P2 | Tú + IA de código, función DevOps | M | F1-TECH-01 | Idea | Vercel construye y publica directamente desde el código fuente del repositorio; `/` y `/backlog` funcionan en Production y Preview; el juego se puede compartir y probar online; `.vercel/output` deja de ser necesario solo después de validar el flujo completo. |

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
- `.vercel/output` se mantiene versionado temporalmente porque Vercel lo está usando como output preconstruido.
- F1-TECH-02 será el siguiente nivel de infraestructura: migrar Vercel a build directo desde `src/` para publicar, testear y compartir el juego, sin cambiar el flujo de desarrollo local.
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
