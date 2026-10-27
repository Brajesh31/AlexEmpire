# AlexEmpire

AlexEmpire is a React 19 and Vite storefront for browsing products, viewing product details, managing a cart, checking out, and using account and administration screens. The interface uses React Router, Material UI, Bootstrap, animation libraries, and local image assets.

## Features

- Product browsing, categories, search, details, and favorites
- Cart quantity and removal controls
- Checkout and profile screens
- Login, signup, password reset, and administrator routes
- Responsive UI with Material UI, Bootstrap, custom CSS, and animations

## Setup

```powershell
npm ci
Copy-Item .env.example .env
npm run dev
```

Available scripts:

```powershell
npm run dev
npm run build
npm run lint
npm run preview
```

The current `.env` contains Cloudinary credentials and must remain local. Rotate any credentials that have ever been committed or shared, and use restricted server-side configuration for production.

See [docs/architecture.md](docs/architecture.md), [docs/development.md](docs/development.md), and [docs/security.md](docs/security.md).

Maintained by Brajesh Kumar (`brajesh31`).

Last updated: 2026-10-27 12:56 UTC
