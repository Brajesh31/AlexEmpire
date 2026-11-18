# 👑 AlexEmpire

<p align="center"><strong>A React-powered storefront for product discovery, account screens, cart management, and administration workflows.</strong></p>

<p align="center">
<a href="https://github.com/Brajesh31/AlexEmpire/stargazers"><img src="https://img.shields.io/github/stars/Brajesh31/AlexEmpire?style=for-the-badge" alt="Stars"></a>
<a href="https://github.com/Brajesh31/AlexEmpire/issues"><img src="https://img.shields.io/github/issues/Brajesh31/AlexEmpire?style=for-the-badge" alt="Issues"></a>
<a href="LICENSE"><img src="https://img.shields.io/github/license/Brajesh31/AlexEmpire?style=for-the-badge" alt="MIT License"></a>
</p>

## 📚 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Technology](#-technology)
- [Architecture](#-architecture)
- [Routes](#-routes)
- [Structure](#-structure)
- [Setup](#-setup)
- [Environment](#-environment)
- [Commands](#-commands)
- [Backend boundary](#-backend-boundary)
- [Security](#-security)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Documentation](#-documentation)
- [Known limitations](#-known-limitations)
- [Contributing](#-contributing)
- [License and maintainer](#-license-and-maintainer)

## 🌟 Overview
AlexEmpire is a browser-based storefront built with React 19 and Vite 6. It brings together a landing experience, product collections, category and product-detail views, a client-side shopping cart, favorites, customer account screens, and an administration interface.

**Repository scope:** this project contains the frontend only. It communicates with a separately hosted customer/product service. Backend source, database migrations, payment-provider implementation, and production infrastructure are not included here. Documentation distinguishes observed frontend behavior from service behavior that must be verified elsewhere.

## ✨ Features

### 🏬 Storefront and catalogue
- Landing and promotional sections, product collections, product search UI.
- Product listing, category selection, product detail route, product imagery.
- Responsive presentation using Bootstrap, Material UI, and project styles.

### 🛒 Shopping experience
- Shared cart state through `CartContext`.
- Add/remove items and adjust quantities.
- Browser persistence through `localStorage`.
- Favorites maintained as product identifiers in browser storage.
- Checkout billing form and order-summary presentation.

### 👤 Account and administration
- Registration, login, dashboard, profile, and password-recovery screens.
- Token-bearing requests to the external customer service.
- Admin interface for product creation, editing, deletion, and image selection.
- Profile image upload UI.

> The presence of a screen does not prove that the whole workflow is complete. The checkout UI does not, by itself, implement secure payment processing or a complete order lifecycle.

## 🧰 Technology

| Technology | Role |
|---|---|
| React 19 | UI components |
| Vite 6 | Dev server and production build |
| React Router 7 | Browser navigation |
| Axios | HTTP requests |
| Material UI 6 / Emotion | UI components and styling |
| Bootstrap 5 / React Bootstrap | Layout and utilities |
| Formik / Yup | Form state and validation |
| Framer Motion / GSAP | Animation |
| Lucide React | Icons |
| tsParticles | Particle effects |
| jwt-decode | Client-side JWT claim decoding |
| ESLint 9 | Static analysis |
| npm | Dependency management |

Exact dependency resolution is recorded in `package-lock.json`.

## 🏗️ Architecture

```text
index.html
  -> src/main.jsx
      -> StrictMode
      -> BrowserRouter
      -> CartProvider
          -> App.jsx (route table)
              -> src/components/*
                  -> Axios requests
                      -> External customer/product service
```

The entry module mounts the router and shared cart provider. The route table is in `src/App.jsx`. Screen-level components live in `src/components/`. The external service owns durable customer/product operations. See [Architecture](docs/architecture.md).

## 🧭 Routes

Paths currently declared by `src/App.jsx`:

| Path | Screen |
|---|---|
| `/` | Welcome |
| `/signup` | Customer registration |
| `/login` | Customer login |
| `/dash` | Profile-image dashboard |
| `/dash2` | Main storefront dashboard |
| `/profile` | Profile |
| `/admin` | Admin product management |
| `/carous` | Carousel |
| `/product/:id` | Product detail |
| `/products-by-category` | Category page |
| `/loginad` | Admin login screen |
| `/list` | Product listing |
| `/lists` | Animation background |
| `/about` | About |
| `/contact` | Contact |
| `/checkout` | Checkout presentation |
| `/cart` | Cart |
| `/forgot-password` | Password recovery |
| `/reset/:token` | Password reset |
| `/favorites` | Favorites |

Route visibility is not authorization. Protected actions must be enforced by the backend.

## 📁 Structure

```text
AlexEmpire/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── workflows/
│   └── PULL_REQUEST_TEMPLATE.md
├── docs/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .env.example
├── .gitignore
├── CHANGELOG.md
├── CITATION.cff
├── CODEOWNERS
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
├── ROADMAP.md
├── SECURITY.md
├── SUPPORT.md
└── vite.config.js
```

## 🚀 Setup

### Prerequisites
- Supported Node.js LTS compatible with Vite 6.
- npm and Git.
- Modern browser.
- Access to the external backend for data-driven workflows.

Check versions:

```bash
node --version
npm --version
git --version
```

### Clone and install

```bash
git clone https://github.com/Brajesh31/AlexEmpire.git
cd AlexEmpire
npm ci
```

### Local environment file

macOS/Linux:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Start the app:

```bash
npm run dev
```

Vite prints the local URL, normally `http://localhost:5173`.

## 🔐 Environment

The example file lists Cloudinary-related names:

| Variable | Purpose | Sensitivity |
|---|---|---|
| `CLOUDINARY_CLOUD_NAME` | Cloud identifier | Configuration |
| `CLOUDINARY_API_KEY` | Provider API key | Sensitive |
| `CLOUDINARY_API_SECRET` | Provider secret | Secret, server-side only |
| `CLOUDINARY_URL` | Credential-bearing connection URL | Secret |

Vite-delivered code is visible to visitors. Do not expose privileged credentials in `VITE_*` variables or import them into React components. Signing and privileged media operations belong on a trusted backend.

The currently embedded external API hostname is not controlled by these Cloudinary variables. See [Configuration](docs/configuration.md).

## ⚙️ Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Run Vite locally |
| `npm run lint` | Run ESLint |
| `npm run build` | Build production files into `dist/` |
| `npm run preview` | Preview the production build |

Typical validation:

```bash
npm ci
npm run lint
npm run build
npm run preview
```

## 🔌 Backend boundary

Frontend source currently calls an external service hosted at `backend-details-0xik.onrender.com`. Observed service areas include customer login/verification, product listing/detail, admin product operations, cart retrieval, profile upload, and password reset.

These are observed client request paths, not a verified OpenAPI contract. The backend source and database schema are not present here. See [API Integration](docs/api.md) and [Database Boundary](docs/database.md).

## 🛡️ Security

A tracked `.env` file containing Cloudinary credential fields was removed from the current branch and local env files are now ignored. **Rotate the associated Cloudinary secret and credential-bearing URL immediately.** Removing a file in a new commit does not erase it from Git history, old clones, forks, or caches.

Other critical boundaries:
- Client-side route checks do not secure backend endpoints.
- Decoding a JWT does not validate it.
- Cart and favorites data in local storage can be modified.
- The backend must recalculate prices, stock, and order totals.
- Never store payment card details or privileged credentials in browser storage.

See [Security Policy](SECURITY.md) and [Security Guide](docs/security.md).

## ✅ Testing

The repository currently provides lint and build checks, not a dedicated unit or end-to-end test suite. Manually verify direct route refresh, product loading, authentication, cart persistence, favorites, admin authorization, image upload failures, and checkout behavior against a dedicated test service.

See [Testing Strategy](docs/testing.md).

## 🚢 Deployment

Run `npm ci`, `npm run lint`, and `npm run build`, then publish `dist/` to a static host configured to rewrite nested SPA paths to `index.html`. The repository includes `public/_redirects` for compatible hosts.

The backend deploys separately. Production needs HTTPS, restrictive CORS, backend-managed secrets, server-side authorization, monitoring, and a verified payment/order service. See [Deployment](docs/deployment.md).

## 📚 Documentation

| Guide | Description |
|---|---|
| [Documentation Index](docs/README.md) | All project guides |
| [Installation](docs/installation.md) | Local setup |
| [Architecture](docs/architecture.md) | Entry points and data flow |
| [Configuration](docs/configuration.md) | Environment and secrets |
| [Development](docs/development.md) | Contribution workflow |
| [User Flows](docs/user-flows.md) | Storefront and account journeys |
| [API Integration](docs/api.md) | External service boundary |
| [Database](docs/database.md) | Data ownership boundary |
| [Security](docs/security.md) | Trust model and mitigations |
| [Testing](docs/testing.md) | Automated and manual checks |
| [Deployment](docs/deployment.md) | Static hosting |
| [Release Process](docs/release-process.md) | Release checklist |
| [Troubleshooting](docs/troubleshooting.md) | Common failures |
| [FAQ](docs/faq.md) | Common questions |

## ⚠️ Known Limitations

- Backend source and schema are maintained elsewhere.
- No database migrations or payment-provider implementation are included.
- Checkout is UI, not a demonstrated end-to-end secure payment lifecycle.
- The app currently has lint/build scripts but no dedicated unit or browser test suite.
- Cart and favorites rely on browser storage.
- API base URLs are embedded in components and remote flows require end-to-end verification.

These limitations should be resolved through separately scoped and tested engineering work, not by treating documentation as proof of functionality.

## 🤝 Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md). Submit focused changes, include validation evidence, and never commit credentials or customer data.

## 📄 License and Maintainer

MIT License. See [LICENSE](LICENSE).

Maintained by **Brajesh Kumar**: [@Brajesh31](https://github.com/Brajesh31).

Last updated: 2026-11-18 20:57 UTC
