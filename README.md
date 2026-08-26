# CampusAI — Placement & Career Portal

The Placement & Career Portal module of **CampusAI**, built as a standalone,
integration-ready application. It connects to the main CampusAI system
(EduNex, developed separately) via a simple link/redirect rather than shared
database access — this app owns its own student, drive, and application data.

## What's Implemented (Working End-to-End)

- **Placement Profile** — students record career preferences, CGPA, backlog
  status, department, graduation year, and coding profile links.
- **Companies & Drives** — placement officers can create companies and post
  drives with full job descriptions, eligibility criteria, and timelines.
  Drives can be filtered by status (upcoming/active/closed).
- **Eligibility Engine** — a real backend-enforced check comparing a
  student's profile against a drive's CGPA, backlog, department, and
  graduation-year requirements, with a clear pass/fail breakdown per
  criterion.
- **Applications** — students can apply to drives they're eligible for
  (enforced server-side, not just in the UI), with duplicate-application
  prevention and a full status-change history log.
- **Resumes (minimal)** — students can create resume records to apply with;
  the full resume builder/editor/templates/PDF generation is designed but
  not yet built (see below).
- **Frontend** — a Next.js app with a landing page, drives list, and a
  drive detail page showing the job description, live eligibility check,
  and an apply button wired to the real backend.

## What's Designed but Not Yet Implemented

The full database architecture for the module (17 tables) is documented in
`docs/placement-database.md`, covering all originally planned features.
Given project timeline constraints, the following were designed at the
schema level but not built out:

- Full Resume Builder/Editor (education, projects, experience,
  certifications, achievements sections; multiple templates; PDF export)
- ATS Compatibility Analyzer (resume-vs-JD scoring)
- Preparation Journey timeline
- Placement Stories & Interview Experiences (with visibility controls)
- Placement Officer Dashboard & Analytics
- AI Career Assistant (resume improvement, skill-gap analysis, interview
  prep)
- Real authentication (JWT) — the current build uses fixed placeholder
  IDs for the logged-in student/officer, clearly marked in code as
  temporary, to be replaced with real signup/login for standalone
  deployment
- Automated test suite

## Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Backend:** FastAPI (Python), SQLAlchemy, Alembic (migrations)
- **Database:** PostgreSQL

## Running Locally

### Backend