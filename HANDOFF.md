## HANDOFF — Juego F1

### Estado actual
- `AGENTS.md` fue simplificado para reducir contexto/usage.
- `AGENTS_BACKUP.md` conserva el archivo original y queda solo local.
- El flujo acordado es:
  Discussion → Sprint plan → Execution → Verification.
- El agente/Scrum Master mantiene y organiza el backlog.
- El usuario mantiene decisiones de producto, prioridades y aprobación final.

### Higiene Git
`.gitignore` ahora excluye:
- screenshots/
- .DS_Store
- .vercel/
- AGENTS_BACKUP.md

Esto evita que QA, outputs y backups ensucien Source Control.

### GitHub
- Se creó un checkpoint del estado actual del proyecto.
- Commit:
  `Checkpoint: cleanup Git metadata and current project state`
- Push completado correctamente en la rama de trabajo actual.
- Working tree quedó limpio.
- No se hizo merge.
- No se abrió PR.
- No se desplegó a Vercel.

### Estado del producto
El juego ya es jugable y compartible.
No tratarlo como un MVP inicial.
Las prioridades y próximos desarrollos viven en `BACKLOG.md`, no en `AGENTS.md`.

### Próxima sesión
Empezar en Discussion.
Revisar backlog y elegir el próximo sprint pequeño.

Si el objetivo es publicar el estado actual:
1. revisar rama actual vs `main`,
2. decidir PR/merge,
3. verificar Vercel,
4. recién entonces publicar.

No hacer estos pasos automáticamente sin aprobación.

No modifiques ningún otro archivo.
No hagas commit ni push.
Cuando termines, confirmá que HANDOFF.md quedó creado y frená.