# Architecture

The Vite entry point mounts a React application under `BrowserRouter`. `App.jsx` defines the route table, while components under `src/components` implement account, catalog, cart, checkout, and promotional views. `CartContext` and local state provide client-side cart behavior.

The application currently behaves as a frontend. Product, authentication, administration, media upload, and checkout operations should use authenticated server APIs before production use.
