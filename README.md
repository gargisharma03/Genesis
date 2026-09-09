# Genesis OS — Unified Research Operating System

> From literature survey to collaborative annotation — unified in a single high-density workspace.

Genesis OS is an end-to-end research workspace designed to replace fragmented academic toolchains (Google Scholar, Zotero, Notion) with a unified, high-density collaborative environment. Built for researchers, engineers, and academic teams, it unifies automated paper metadata ingestion, PDF management, multi-modal annotation, and real-time co-editing.

---

## 🛠 Tech Stack

| Layer | Technology | Key Usage / Implementation |
| :--- | :--- | :--- |
| **Frontend Framework** | React 18 (Vite) + React Router v6 | High-density client architecture with sub-100ms render pipeline |
| **Styling & UI** | Tailwind CSS + Lucide Icons + gsap | Custom theme, glassmorphism, compact data views |
| **Backend Runtime** | Node.js + Express.js | RESTful API backend & modular async pipeline orchestration |
| **Database** | MongoDB Atlas + Mongoose | Multi-tenant schema design with compound indexing for paper graphs |
| **Authentication** | JWT + bcrypt | Stateless access/refresh token authentication with workspace-level RBAC |
| **Realtime Engine** | Socket.IO | High-throughput presence engine, activity feeds |
| **Storage & Parsing** | Cloudinary + `pdf-parse` | Secure PDF blob hosting and server-side text stream extraction |

---

## 🚀 Key Features

### 1. Ingress & Library Collection (`/collect`)
* **Auto-Metadata Extraction:** Instant resolution of paper titles, authors, publication venues, and abstracts via **Crossref API** and **Semantic Scholar API** using DOIs or raw paper URLs.
* **PDF Ingestion & Storage:** Streamlined drag-and-drop PDF upload pipeline with server-side text extraction and secure file storage via Cloudinary.
* **Granular Organization:** Categorize research literature with custom workspace-wide tags, search filters, and reading statuses (`Unread`, `Reading`, `Read`).

### 2. Contextual Annotation Engine (`/read`)
* **Semantic Highlighting:** Multi-modal highlight classification supporting targeted semantic tags: `Support`, `Contradict`, `Gap`, or `Note`.
* **Interactive Whiteboard & Side Notes:** Attach freeform research notes, LaTeX equations, inline code snippets, and page-pinned markers to specific coordinates on paper previews.
* **Real-Time Workspace Sync:** Live workspace presence, activity updates, and collaborative note-taking across active team members using Socket.IO and Yjs CRDTs.

---


## ⚡ Quickstart & Local Development

### Prerequisites
* Node.js $\ge$ v18.0.0
* MongoDB Atlas instance or local MongoDB server
* Redis instance (optional, for scaled WebSocket messaging)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/genesis-os.git
   cd genesis-os
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/genesis_os
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_URL=your_cloudinary_url
   ```
   Start the server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```
   Create a `.env` file in the `frontend/` directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_SOCKET_URL=http://localhost:5000
   ```
   Start the client:
   ```bash
   npm run dev
   ```

---
