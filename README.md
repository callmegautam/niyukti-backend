# 🛑 ARCHIVED – Niyukti Backend

> This repository is no longer maintained. It was part of an experimental project to connect Tier 3 students with companies and provide learning resources. Feel free to explore the codebase.

---

## 🔗 Project: Niyukti

**Niyukti** was envisioned as a platform to **bridge the gap between Tier 3 college students and companies** seeking fresh talent. In addition to providing job opportunities, it aimed to offer **learning resources** to help students become more industry-ready.

This repository contains the **backend code** for Niyukti.

---

## 🚀 Features (Planned / Partially Implemented)

- 🔐 User Authentication (Students & Companies)
- 🧑‍🎓 Student Profiles and Skills
- 🏢 Company Job Postings
- 📚 Learning Resource Listings
- 🔎 Matchmaking between Students and Companies
- 🛠 Admin Panel for Moderation

---

## ⚙️ Tech Stack

- **Node.js** with **Express**
- **PostgreSQL** (via ORM – possibly Drizzle or Prisma)
- **JWT** for authentication
- **Zod** for schema validation
- **Redis** (optional for caching or sessions)
- REST API structure

---

## 🧑‍💻 Setup Instructions (If you want to explore locally)

```bash
# Clone the repository
git clone https://github.com/callmegautam/old-niyukti-backend.git
cd old-niyukti-backend

# Install dependencies
npm install

# Add your .env configuration
cp .env.example .env
# Fill in your DB, JWT secrets, etc.

# Run the development server
npm run dev
```
