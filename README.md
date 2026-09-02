# Genesis OS — AI-Powered Research Operating System

> **From literature survey to manuscript — unified in a single high-density workspace.**

---

## 📌 Overview

**Genesis OS** is an end-to-end research operating system designed to replace fragmented toolchains (Google Scholar, Zotero, Notion and ChatGPT) with a unified, high-density collaborative environment.



---

## 🛠 Tech Stack

| Layer | Technology | Key Usage / Implementation |
| :--- | :--- | :--- |
| **Frontend Framework** | **React (Vite)** + **React Router** | Fast, high-density client architecture |
| **Styling & UI** | **Tailwind CSS** + **Lucide Icons** | Minimalist obsidian dark theme (`#080B11`) with glassmorphism |
| **Backend Runtime** | **Node.js** + **Express.js** | RESTful API backend & pipeline orchestration |
| **Database** | **MongoDB Atlas** + **Mongoose** | Multi-tenant schema design with indexed querying |
| **Authentication** | **JWT** + **bcrypt** | Stateless access/refresh token auth with workspace RBAC |
| **Realtime Engine** | **Socket.io** + **Yjs (CRDT)** | Live workspace presence, activity feeds, and co-editing |
| **AI Integration** | **Gemini / OpenAI API** | Contextual summaries, jargon explanation, and matrix cell drafting |
| **Storage & Parsing** | **cloudinary** +**pdf-parse** | PDF document hosting and server-side text extraction |

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


---

