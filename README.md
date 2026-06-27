# JSON to TypeScript Interface Converter

A highly efficient, IDE-style web tool designed to instantly translate JSON objects into fully formatted, production-ready TypeScript interfaces or type aliases in real-time. 

**Demo Link:** [https://json-to-ts-converter-xi.vercel.app/]

---

## 🚀 Features

- **Real-time Conversion:** Instantly maps JSON keys, types, objects, arrays, and null values to appropriate TypeScript structures as you type.
- **VS Code Aesthetic:** Clean, developer-centric IDE interface built with custom dark styling, standard layout panels, and status bars.
- **Power of Monaco Editor:** Features syntax highlighting, line numbering, auto-formatting, and horizontal/vertical scrollbars on both input and output blocks.
- **Fine-Grained Controls:**
  - Convert to `interface` or `type` alias.
  - Prefix structures with `export`.
  - Mark properties as optional (`?`).
  - Make attributes read-only (`readonly`).
  - Customize the root object identifier name.
- **Quick Templates:** Insert deep, multi-line mock payloads (User Profiles, E-Commerce Orders, Analytics Feeds) instantly.
- **One-Click Actions:** Auto-format JSON syntax and copy type definitions directly to your clipboard.

---

## 🛠️ Tech Stack

- **Framework:** React + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (Vite plugin integration)
- **Editor Engine:** `@monaco-editor/react` (Monaco Editor wrapper)
- **Icons:** `lucide-react`

---

## 📦 Local Installation & Setup

Follow these steps to run the environment locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mmy-lana/json-to-ts-converter.git
   cd json-to-ts-converter
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173` to view the application in action.

---

## 🏗️ Project Structure

```text
src/
├── components/
│   ├── EditorContainer.tsx     # Contains both side-by-side Monaco editors & copy buttons
│   ├── Header.tsx              # Application header & mock data loading actions
│   └── SettingsPanel.tsx       # Sidebar configurations for output interface tweaking
├── hooks/
│   └── useConverter.ts         # Handles React states, defaults, options, and mock injection
├── utils/
│   └── converter.ts            # Recursive generator compiler that maps JSON types to TS structures
├── App.tsx                     # Top-level layout controller
├── main.tsx                    # React mounting portal
└── index.css                   # Custom global scrollbars & styling declarations
```

---

## ⚡ Deployment

This repository is optimized for quick, zero-config compilation and deployment on both **Vercel** and **Netlify**.

### Build Output Compilation
To compile a static, minified production build:
```bash
npm run build
```
The optimized files will build directly into the `/dist` folder.
```