# Genesis OS — AI-Powered Research Operating System

> **From literature survey to manuscript — unified in a single high-density workspace.**

---

## 📌 Overview

**Genesis OS** is an end-to-end research operating system designed to replace fragmented toolchains (Google Scholar, Zotero, Notion, ChatGPT, and Overleaf) with a unified, high-density collaborative environment.

Instead of treating research as isolated documents, Genesis OS structures every workspace around the 8 stages of the research lifecycle:
$$\text{Collect} \longrightarrow \text{Read/Annotate} \longrightarrow \text{Compare} \longrightarrow \text{Synthesis Matrix} \longrightarrow \text{Insights} \longrightarrow \text{Manuscript} \longrightarrow \text{Collaborate} \longrightarrow \text{Export}$$

---

## 🛠 Tech Stack

| Layer | Technology | Key Usage / Implementation |
| :--- | :--- | :--- |
| **Frontend Framework** | **React (Vite)** + **React Router** | Fast, high-density client architecture |
| **Styling & UI** | **Tailwind CSS** + **Lucide Icons** | Minimalist obsidian dark theme (`#080B11`) with glassmorphism |
| **State & Caching** | **Zustand** + **TanStack Query (React Query)** | UI local state management & optimistic server-state caching |
| **Backend Runtime** | **Node.js** + **Express.js** | RESTful API backend & pipeline orchestration |
| **Database** | **MongoDB Atlas** + **Mongoose** | Multi-tenant schema design with indexed querying |
| **Authentication** | **JWT** + **bcrypt** | Stateless access/refresh token auth with workspace RBAC |
| **Realtime Engine** | **Socket.io** + **Yjs (CRDT)** | Live workspace presence, activity feeds, and co-editing |
| **AI Integration** | **Gemini / OpenAI API** | Contextual summaries, jargon explanation, and matrix cell drafting |
| **Storage & Parsing** | **AWS S3 / Cloudflare R2** + **pdf-parse** | PDF document hosting and server-side text extraction |

---

## 🚀 Key Features

### 1. Ingress & Library Collection (`Collect`)
* **Auto-Metadata Extraction**: Fetch paper titles, authors, venues, and abstracts instantly via **Crossref API** and **Semantic Scholar API** using DOIs or URLs.
* **PDF Ingestion & Storage**: Drag-and-drop PDF uploads with automatic text extraction and secure S3 storage.
* **Tagging & Filtering**: Categorize research literature with custom workspace-wide tags and reading statuses (`Unread`, `Reading`, `Read`).

### 2. Contextual Annotation Engine (`Read & Annotate`)
* **Multi-Modal Highlighting**: Classify paper highlights under semantic types: `Support`, `Contradict`, `Gap`, or `Note`.
* **Interactive Whiteboard & Side Notes**: Attach freeform notes, equations, code snippets, and page-specific pins.
* **On-Demand AI Copilot**: Generate plain-language summaries and demystify complex technical jargon.

### 3. Comparison & Synthesis Matrix (`Compare & Synthesize`)
* **Side-by-Side Paper Comparison**: Create custom comparison criteria across 2–4 selected papers.
* **Automated Evidence Cells**: AI-drafted synthesis matrix cells populated directly from paper annotations.
* **Matrix CSV Export**: Export structured synthesis matrix comparisons for reporting and publication.

### 4. AI Insight Discovery (`Insights`)
* **Pattern Detection**: Automatically identify convergent findings, conflicting evidence, and literature gaps across all ingested papers.
* **Draft Injection**: One-click acceptance to convert AI insights into citations and manuscript paragraphs.

### 5. 3-Pane Manuscript Authoring (`Manuscript & Collaborate`)
* **Outliner Tree (Left Pane)**: Drag-and-drop section reordering (Abstract, Intro, Methodology, etc.).
* **Writing Canvas (Center Pane)**: Rich-text markdown/LaTeX editor with section word counts and citation insertions.
* **Context Sidecar (Right Pane)**: AI assistant panel that dynamically queries your workspace knowledge graph to display matching notes and diagrams as your cursor moves through the manuscript.
* **Team Collaboration**: Workspace presence avatars, section assignment, and inline comment threads with `@mentions`.

### 6. Export & Submission Engine (`Export`)
* **Venue Checklists**: Target venue rules, word limits, and citation integrity checks.
* **Multi-Format Compilation**: One-click exports to DOCX, PDF, and complete LaTeX `.zip` bundles for Overleaf integration.

---

## 📁 Repository Directory Structure

```directory
genesis-os/
├── client/                     # React Frontend (Vite)
│   ├── src/
│   │   ├── assets/             # SVGs, static assets
│   │   ├── components/         # Reusable UI Components
│   │   │   ├── common/         # Buttons, Modals, Inputs, Cards
│   │   │   ├── dashboard/      # Workspace list & activity feed
│   │   │   ├── reader/         # PDF reader & text viewer
│   │   │   ├── matrix/         # Synthesis matrix table components
│   │   │   └── workspace/      # 3-Pane manuscript editor shell
│   │   ├── context/            # React Context Providers (Auth, Theme)
│   │   ├── hooks/              # Custom hooks (useSocket, useAuth, usePaper)
│   │   ├── pages/              # Landing, Login, Dashboard, Workspace pages
│   │   ├── services/           # Axios API client modules
│   │   └── store/              # Zustand state stores
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Express.js REST API Backend
│   ├── src/
│   │   ├── config/             # DB (Mongoose) & Cloudinary/S3 config
│   │   ├── controllers/        # Express route controllers
│   │   ├── middleware/         # Auth JWT, RBAC, & validation middleware
│   │   ├── models/             # Mongoose Schemas (User, Paper, Workspace, etc.)
│   │   ├── routes/             # REST API endpoints (/api/workspaces, /api/papers, etc.)
│   │   ├── services/           # AI (Gemini/OpenAI) & Metadata fetchers
│   │   └── utils/              # Helper functions & custom errors
│   ├── .env.example
│   ├── package.json
│   └── server.js               # Entry point & Socket.io server
│
├── docker-compose.yml          # Containerized deployment config
└── README.md