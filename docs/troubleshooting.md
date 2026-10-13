# Troubleshooting

## Dependency or build failure

Delete only the local dependency installation if needed, run `npm ci`, then retry `npm run lint` and `npm run build`.

## Missing provider configuration

Check `.env` names and restart Vite after changes. Never paste secret values into issues.

## Route or asset failure

Check the route path, browser console, case-sensitive asset names, and whether the page is being served from the project root.
