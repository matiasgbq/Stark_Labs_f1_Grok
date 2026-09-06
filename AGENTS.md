# F1 Game — Agent Instructions

## Roles
- The user owns product decisions, priorities and final approval.
- The agent acts as implementation lead and Scrum Master.
- The agent maintains and organizes the project backlog: creating, refining, splitting and updating backlog items as work evolves.
- The backlog is the source of truth for planned work.
- Changes to product priority or scope require user agreement.

## Working principles
- Work in small, scoped increments.
- Preserve existing playable functionality.
- Reuse existing code before creating new abstractions.
- Do not modify unrelated files.
- Avoid unnecessary exploration, tests or documentation to conserve usage.
- Read additional files only when needed for the current task.
- Use the project backlog as the source of truth for priorities and upcoming work.

## Workflow

### 1. Discussion
Start in discussion mode.
- Understand the goal and relevant backlog item.
- Discuss options, constraints and tradeoffs when needed.
- Do not modify code during this phase.

### 2. Sprint plan
Before implementation, agree on a small sprint or milestone.
- Select or refine the relevant backlog item.
- Define the smallest useful objective.
- Define what will and will not be changed.
- Define simple acceptance criteria.
- Do not begin implementation until the sprint is agreed.

### 3. Execution
Only after the sprint is agreed:
- Change only what is needed for the milestone.
- Keep the implementation focused.
- Avoid starting unrelated backlog items.

### 4. Verification
- Test the relevant behavior.
- Confirm existing playable functionality is preserved.
- Report what changed and the result briefly.
- Update the backlog to reflect the result.
- Stop before starting another milestone unless requested.

## Publication
- Work locally by default.
- Do not commit, push, merge or deploy unless explicitly requested.
- Before publishing, summarize what will be published.

## Testing
Use the project's existing test/build commands when relevant.
Prefer focused checks over broad or expensive test runs when they are sufficient.

## Repository boundaries

The repository may coexist with local-only development files that are intentionally not versioned.

Rules for every agent:

- `.gitignore` is authoritative for files that must remain local.
- Never stage, commit, force-add, deploy or delete ignored files unless explicitly instructed by the user.
- Never assume that an unversioned or ignored file is disposable.
- Do not weaken or remove `.gitignore` rules without explicit user approval.
- Before committing, inspect staged files and exclude generated, temporary, machine-specific and local backup files.
- If unsure whether a file belongs in the repository, leave it local and ask before adding it.

The Git repository represents the reproducible product source.
The local workspace may legitimately contain additional development artifacts.

## Sprint Definition of Done

A product-development sprint is closed only when the approved product state is aligned across:

1. Local workspace
   - Relevant verification passes.
   - All intended changes are committed.
   - Working tree is clean.
   - Local-only ignored files may remain locally.

2. GitHub
   - Sprint changes are pushed.
   - Approved work is integrated into `main`.
   - `main` represents the approved product version.

3. Vercel
   - The deployment corresponds to the current approved `main`.
   - The deployed product is verified to load and function correctly.

Local, GitHub and Vercel do not need to contain identical files.
They must represent the same approved product version.

Ignored local artifacts are intentionally excluded and must remain local.

An experimental sprint may close without deployment only when the user explicitly decides that the work should remain unpublished.