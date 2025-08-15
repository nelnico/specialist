# 🚀 Hobby Project

A modern full-stack web application built with a TurboRepo monorepo setup, leveraging TypeScript, NestJS, Prisma, PostgreSQL, Next.js, TailwindCSS, ShadCN, and TanStack Query.

---

## 📖 Project Description

This platform enables **specialists** to advertise their services, making it easy for **clients** to discover, evaluate, and connect with them.

Key features include:
- **Specialist Profiles** – Specialists can create detailed service listings with descriptions, skills, and contact information.
- **Advanced Search & Filtering** – Clients can search, filter, and view specialists based on categories, ratings, or location.
- **Direct Communication** – Clients can contact specialists directly through the platform.
- **User Reviews** – Clients can leave ratings and reviews for specialists.
- **Role-Based Authentication** – Ensures secure and tailored experiences for both specialists and clients.
- **Membership Tiers** – Clients can choose from Free, Basic, Premium, or All Access memberships, unlocking additional features at each tier.

---

## 📦 Tech Stack

### **Monorepo & Project Structure**
- **[TurboRepo](https://turbo.build/repo)** – Monorepo build and task orchestration

### **Backend**
- **[NestJS](https://nestjs.com/)** – Scalable backend application framework
- **[Prisma](https://www.prisma.io/)** – Type-safe ORM for database access
- **[PostgreSQL](https://www.postgresql.org/)** – Relational database

### **Frontend**
- **[Next.js](https://nextjs.org/)** – React framework for server-side rendering and routing

### **Styling & UI**
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS framework
- **[ShadCN](https://ui.shadcn.com/)** – Pre-built UI components built on TailwindCSS

### **Data Fetching & State**
- **[TanStack Query](https://tanstack.com/query)** – Data fetching, caching, and synchronization for frontend

### **Language**
- **[TypeScript](https://www.typescriptlang.org/)** – Strongly typed JavaScript for frontend and backend

---

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/yourproject.git

cd yourproject

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env