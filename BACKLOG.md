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

## Decisiones y bloqueos

- Falta confirmar la capacidad y duración del sprint.
- No se inicia implementación del MVP hasta que el Product Owner confirme el alcance de F1-MVP-01 a F1-MVP-07.

## Registro de cambios

| Fecha | Cambio | Motivo | Decidido por |
|---|---|---|---|
| 2026-09-06 | Se creó el backlog inicial y se definió como fuente única de verdad. | Organizar mejoras, cambios y planificación futura. | Product Owner |
