# Placement & Career Portal — Database Architecture

Status: Design complete, not yet migrated to actual tables.

## Integration Principle

This module does NOT duplicate EduNex's `users` or `students` tables.
All placement tables reference `students.student_id` (which is itself
`users.user_id` — students are a 1:1 extension of users, not a separate
identity space) and `college_id` for multi-tenant scoping.

## ⚠️ Open Assumption — CGPA / Backlog Source

EduNex's `students` table has no `cgpa` or `backlog` column. CGPA and
backlog status are likely derivable from the `results`/`marks_records`
tables, but the exact structure hasn't been confirmed with the EduNex
owner yet.

**Current placeholder approach:** `placement_profiles` stores its own
`cgpa`, `has_active_backlog`, and `cgpa_verified_at` fields, self-reported
by the student and validated by the backend. `cgpa_verified_at` being
NULL means "unverified." When EduNex exposes a real CGPA source, the
Eligibility Engine's data source swaps — its logic does not change.

**TODO:** confirm with EduNex owner how CGPA/backlogs are computed from
`results`, then decide whether to sync into these fields or query live.

## Tables

### 1. placement_profiles
One row per student. Career preferences, links, CGPA/backlog placeholder.

| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| student_id | UUID FK → students.student_id | UNIQUE, NOT NULL |
| college_id | UUID FK → colleges.college_id | NOT NULL |
| linkedin_url / github_url / portfolio_url | TEXT | |
| preferred_role / preferred_location / preferred_industry / work_preference | TEXT | |
| cgpa | NUMERIC(4,2) | placeholder, see assumption above |
| has_active_backlog | BOOLEAN | placeholder |
| cgpa_verified_at | TIMESTAMP | NULL = unverified |
| leetcode_url / codechef_url / hackerrank_url | TEXT | |
| created_at / updated_at | TIMESTAMP | |

Does NOT duplicate name/department/year — joined from `students`.

### 2. placement_skills
Many rows per profile. One row per skill (not comma-separated) for queryability.

| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| profile_id | UUID FK → placement_profiles.id | NOT NULL |
| skill_name | TEXT | NOT NULL |
| category | TEXT | language/framework/database/tool |
| proficiency | TEXT | nullable |
| created_at | TIMESTAMP | |

UNIQUE (profile_id, skill_name)

### 3. placement_companies
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| college_id | UUID FK → colleges.college_id | NOT NULL |
| name | TEXT | NOT NULL |
| logo_url / website / industry | TEXT | |
| created_at | TIMESTAMP | |

UNIQUE (name, college_id)

### 4. placement_drives
Core entity — job posting with JD, eligibility, timeline.

| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| college_id | UUID FK | NOT NULL |
| company_id | UUID FK → placement_companies.id | NOT NULL |
| role / job_description | TEXT | NOT NULL |
| responsibilities | TEXT | |
| required_skills / preferred_skills | TEXT[] | |
| salary / location / job_type | TEXT | |
| eligible_departments | TEXT[] | |
| eligible_graduation_years | INTEGER[] | |
| min_cgpa | NUMERIC(4,2) | |
| allow_active_backlogs | BOOLEAN | DEFAULT false |
| selection_process | TEXT | |
| announcement_date / application_start_date / application_deadline / drive_date | DATE | |
| status | TEXT | 'upcoming'\|'active'\|'closed', stored not derived |
| created_by | UUID FK → users.user_id | placement officer |
| created_at / updated_at | TIMESTAMP | |

### 5. placement_applications
Student ↔ drive join. Edit-in-place, never re-inserted.

| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| drive_id | UUID FK → placement_drives.id | NOT NULL |
| student_id | UUID FK → students.student_id | NOT NULL |
| resume_id | UUID FK → resumes.id | NOT NULL |
| college_id | UUID FK | NOT NULL |
| status | TEXT | applied\|shortlisted\|aptitude\|technical_round\|hr_round\|selected\|rejected\|withdrawn |
| applied_at / updated_at | TIMESTAMP | |

UNIQUE (drive_id, student_id) — one application per student per drive, always edited not recreated.

### 6. placement_application_status_history
Append-only audit log/timeline. Never updated or deleted.

| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| application_id | UUID FK → placement_applications.id | NOT NULL |
| status | TEXT | same values as applications.status |
| changed_by | UUID FK → users.user_id | NOT NULL |
| notes | TEXT | |
| changed_at | TIMESTAMP | |

On application creation: insert both the application row AND the first history row in one transaction.

### 7. resumes
Container for one resume version. Student can have many.

| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| profile_id | UUID FK → placement_profiles.id | NOT NULL |
| college_id | UUID FK | NOT NULL |
| title | TEXT | NOT NULL |
| template | TEXT | ats_minimal\|software_developer\|data_ai\|fresh_graduate |
| is_default | BOOLEAN | enforced single-default in backend, not DB constraint |
| career_summary | TEXT | |
| created_at / updated_at | TIMESTAMP | |

### 8. resume_education
| id, resume_id FK, degree, institution, department, cgpa, start_year, end_year, display_order |

### 9. resume_projects
| id, resume_id FK, title, description, tech_stack TEXT[], project_url, github_url, start_date, end_date, display_order |

### 10. resume_experience
Covers internships and full/part-time work (same shape).
| id, resume_id FK, role_title, organization, experience_type, description, start_date, end_date (nullable = present), display_order |

### 11. resume_certifications
| id, resume_id FK, name, issuing_org, issue_date, credential_url, display_order |

### 12. resume_achievements
| id, resume_id FK, title, description, display_order |

(Tables 8-12 are separate from `resumes` because each is a repeating list with its own fields; `display_order` supports drag-and-drop reordering in the editor.)

### 13. ats_analyses
Result of running a resume through ATS scoring against a JD.

| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| resume_id | UUID FK → resumes.id | NOT NULL |
| drive_id | UUID FK → placement_drives.id | NULLABLE — null if analyzed against pasted JD |
| college_id | UUID FK | NOT NULL |
| jd_text_snapshot | TEXT | NOT NULL — JD text as analyzed, so later JD edits don't retroactively change past results |
| overall_score | NUMERIC(5,2) | NOT NULL — framed as "ATS compatibility score," never "chance of selection" |
| sub_scores | JSONB | keyword_match, skills_match, education_match, experience_match, formatting, job_title_match, project_relevance, achievements |
| matched_keywords / missing_keywords | TEXT[] | |
| improvement_suggestions | JSONB | array of {section, weak_text, suggested_text} |
| analyzed_at | TIMESTAMP | |

### 14. preparation_journeys + preparation_entries
One journey per student, many dated entries.

**preparation_journeys:** id, profile_id (UNIQUE FK), college_id, created_at

**preparation_entries:** id, journey_id FK, entry_date, topic, description, resources TEXT[], problems_solved INTEGER, created_at

Projects/certifications are NOT duplicated here — already covered by resume_projects/resume_certifications.

### 15. placement_stories
"How I Got Placed" — with privacy controls.

| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| profile_id | UUID FK | NOT NULL |
| application_id | UUID FK → placement_applications.id | NULLABLE |
| college_id | UUID FK | NOT NULL |
| company_name / role | TEXT | NOT NULL |
| package / preparation_duration | TEXT | |
| topics_prepared / resources_used | TEXT[] | |
| interview_experience_text / advice_for_juniors | TEXT | |
| visibility | TEXT | 'public'\|'department_only'\|'anonymous'\|'private', default department_only |
| created_at / updated_at | TIMESTAMP | |

`anonymous` visibility is enforced by the backend query layer stripping identity before returning to other students — the FK to profile_id is always kept internally for the student's own view and officer records. Never bypass this via AI/API (Phase 27 rule).

### 16. interview_experiences
Round-by-round interview data. Not gated on being placed.

| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| profile_id | UUID FK | NOT NULL |
| drive_id | UUID FK → placement_drives.id | NULLABLE |
| college_id | UUID FK | NOT NULL |
| company_name / role / round_name | TEXT | NOT NULL |
| questions_asked / experience_notes / tips | TEXT | |
| difficulty | TEXT | easy\|medium\|hard |
| visibility | TEXT | same values as placement_stories.visibility |
| created_at | TIMESTAMP | |

### 17. placement_attachments
Shared file-upload table for stories and interview experiences (PDF/PPT).

| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| college_id | UUID FK | NOT NULL |
| story_id | UUID FK → placement_stories.id | NULLABLE |
| interview_experience_id | UUID FK → interview_experiences.id | NULLABLE |
| file_name | TEXT | NOT NULL |
| file_type | TEXT | 'pdf'\|'ppt'\|'pptx' |
| file_url | TEXT | NOT NULL — storage location, not the file itself |
| file_size_bytes | INTEGER | NOT NULL |
| uploaded_by | UUID FK → users.user_id | NOT NULL |
| uploaded_at | TIMESTAMP | |

CHECK: exactly one of story_id / interview_experience_id is set, never both, never neither.

File bytes live in file storage (local disk in dev, cloud storage later) — this table only tracks metadata + location. File type/size/MIME validated per Phase 31 rules, never trusting filename alone.

## Relationship Overview
