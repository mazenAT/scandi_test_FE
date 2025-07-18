# Vite + React + GraphQL Frontend

## Project Info

This is a modern frontend built with Vite, React, TypeScript, Tailwind CSS, and Apollo Client for GraphQL.

## Getting Started

### Prerequisites
- Node.js 20+
- npm 9+

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173).

3. **Connect to the backend:**
   - Make sure your backend GraphQL server is running at `http://localhost:8000/graphql` (or update the URI in `src/lib/apolloClient.ts` if different).

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Technologies Used
- Vite
- React
- TypeScript
- Apollo Client (GraphQL)
- Tailwind CSS
- shadcn/ui

## Deployment
Deploy the `dist/` folder to your preferred static hosting provider (e.g., Vercel, Netlify, GitHub Pages, etc.).

## Customization
- Update the GraphQL endpoint in `src/lib/apolloClient.ts` if your backend URL changes.
- Tailwind and shadcn/ui can be customized via their respective config files.
