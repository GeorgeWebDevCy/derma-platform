# DermaConnect - Global Dermatology Platform

A scalable, high-performance platform connecting patients with dermatologists worldwide. Built with Next.js, MySQL, and Prisma.

## 🚀 Tech Stack

-   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
-   **Database**: [MySQL](https://www.mysql.com/)
-   **ORM**: [Prisma](https://www.prisma.io/)
-   **Authentication**: [Auth.js](https://authjs.dev/) (Magic Links)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [Radix UI](https://www.radix-ui.com/) / [Shadcn UI](https://ui.shadcn.com/)

## 🛠️ Prerequisites

-   **Node.js**: v18 or higher
-   **MySQL**: A running MySQL instance (local or cloud)

## 🏁 Getting Started

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd derma-platform
npm install
```

### 2. Configure Environment
Copy the example environment file and update it with your credentials:
```bash
cp .env.example .env
```
Open `.env` and update `DATABASE_URL`:
```env
DATABASE_URL="mysql://user:password@localhost:3306/derma_platform"
```
> **Note**: Ensure your MySQL server is running and accessible. If using Docker, ensure the port is mapped correctly.

### 3. Setup Database
Generate the Prisma client and push the schema to your database:
```bash
npx prisma generate
npx prisma db push
```

### 4. Run the App
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

-   `src/app`: Next.js App Router pages and layouts.
-   `src/components`: Reusable UI components.
-   `src/lib`: Utilities and library configurations (Prisma, Supabase, etc.).
-   `prisma/schema.prisma`: Database schema definition.

## 🔑 Authentication

The app uses **Magic Links** for authentication.
-   **Development**: Emails are logged to the console (if using a mock provider) or sent via Resend if configured.
-   **Roles**: Users are `patient` by default. You can manually update a user to `doctor` in the database to access the Doctor Dashboard.

## 🚑 Troubleshooting

**Error: P1001: Can't reach database server**
-   Check if MySQL is running.
-   Verify the `DATABASE_URL` in `.env` is correct.
-   If using a cloud provider (PlanetScale, AWS), ensure your IP is whitelisted.

## Feature & Route Status

-   Landing page (`/`) with marketing sections
-   Magic-link login (`/auth/login`) wired to Auth.js + Resend provider
-   Authenticated dashboards: patient (`/dashboard/patient`) and doctor (`/dashboard/doctor`) with placeholder UI
-   **Planned / not yet implemented:**
    -   Doctor onboarding (`/auth/doctor/signup`) and profile verification flow
    -   Patient onboarding/intake, symptoms + photo upload, and richer consultation request UI
    -   Consultation list, filtering, and matching logic in dashboards
    -   Notifications/email templates for magic links and consultation updates
    -   Billing/payments (Stripe) and doctor availability toggles
    -   File storage for images (S3/Cloudflare R2) and CDN delivery
    -   Role-based `/dashboard` landing redirect and consultation API routes

## Implemented Features

-   Magic-link auth via Auth.js/Resend (`/auth/login`)
-   Multilingual (EN/ES) language switcher persisted in cookie; landing, login, and dashboards translated
-   Landing page with highlights, steps, outcomes, CTA, and specialty-aware messaging
-   Patient dashboard: create consultations with description, symptoms, duration, optional image URLs, requested specialty select; view status, doctor assignment/availability, doctor notes, and images; cancel pending
-   Doctor dashboard: availability toggle (requires specialty), pending queue filtered by specialty and online status, accept, release to queue, complete, add notes; hides cancelled from “My Consultations”
-   Doctor profile onboarding/editing with specialty dropdown and bio persistence
-   Consultation API with auth/role gating; server actions for request/accept/complete/release/cancel/notes/availability/profile/language
-   Prisma schema: consultations include symptoms, duration, images, notes, requestedSpecialty; doctor profiles include isAvailable, specialty
