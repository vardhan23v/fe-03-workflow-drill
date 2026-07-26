## Project rules

1. Forms in this repo must use a schema-backed flow with `react-hook-form` and Zod instead of ad hoc `useState` submit handlers.
2. Allowed values, defaults, and summary helpers belong in `src/lib/alertPreferences.ts` so the UI does not duplicate validation rules inline.
3. Any validation or formatting helper added under `src/lib` must ship with an automated test and a runnable `npm test` command before the task is considered done.
