# Myportfolio-amanyatan

A personal portfolio built with React + TypeScript + Vite, featuring smooth scroll animations, draggable cards, WebGL shaders, and interactive project showcases.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Framer Motion** / **Motion** (animations)
- **Lenis** (smooth scrolling)
- **Styled Components**

## Getting Started

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
```

## React + TypeScript + Vite Notes

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```
