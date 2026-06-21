# AI Development Log

## Tools Used

ChatGPT

Lovable AI

VS Code AI extensions

---

## AI Assistance Usage

AI tools were used to accelerate development and assist in debugging, architecture design, and feature implementation.

---

## Prompts Used

Build a complete production-ready Full Stack AI Resume Parser & Job Matching System with a modern recruiter dashboard UI.

Project Name: AI Resume Matcher Dashboard

The project must be fully functional and follow clean architecture.

TECH STACK

Frontend

React 18 with Vite

React Router

Axios

Tailwind CSS (preferred)

Responsive recruiter dashboard UI

Backend

Node.js

Express.js

MongoDB using Mongoose

Resume Parsing

pdf-parse for PDF files

mammoth for DOCX files

Regex extraction for structured fields

Upload Handling

Multer

Max file size: 5MB

Store files inside /uploads

Matching Algorithm

Custom scoring algorithm based on skills and experience.

UI DESIGN

Create a modern SaaS recruiter dashboard UI similar to ATS platforms like LinkedIn Recruiter or Greenhouse.

Design requirements

Dark theme Soft shadows Rounded cards Gradient navbar Skill tags Animated progress bars Modern job cards Clean table UI Responsive layout

PAGES

Upload Resume Page

Job Listings Page

Candidates Database Page

Candidate Profile Page

Job Match Results Page

FEATURE 1 — Resume Upload

UI

Large drag & drop upload box File picker option Accept PDF and DOCX files Maximum size 5MB Show upload progress bar Show success notification

Backend

Upload resume file Store file in /uploads Automatically parse resume after upload.

FEATURE 2 — Resume Parsing

Extract these fields from resume text

Name Email Phone Skills (array) Experience (years) Education Current or Last Company

Display parsed result in editable form UI.

User can edit fields before saving.

Save candidate data to MongoDB.

Candidate Schema

name email phone skills [] experience education company resumeFile createdAt

FEATURE 3 — Job Listings

Seed database with 3–5 jobs.

Job Fields

title jobCode requiredSkills [] experienceRequired location description

Display jobs using modern job cards.

Each card shows

Title Location Experience required Skill tags Description

Include button

“Match Candidate”

FEATURE 4 — AI Fitment Scoring

Create scoring algorithm.

Skill Match

(skill matches / required skills) × 100

Experience Check

If candidate experience ≥ required → full score Otherwise reduce score proportionally.

Overall Score

Combine skill match and experience match.

DISPLAY RESULTS

Create Match Result Card UI displaying

Match Score (%) Matched Skills Missing Skills Experience Gap

Color Coding

Green → score >70% Yellow → 40–70% Red → <40%

Use animated progress bars.

FEATURE 5 — Candidate Database

Create Candidates Page.

Display table with

Name Email Skills Experience Date Added

Features

Search by name Filter by skills Click candidate to view full profile.

FEATURE 6 — Candidate Profile

Show full candidate information

Name Email Phone Skills as tags Experience Education Company

Also display

Matching jobs Match scores for each job

Show progress bars for each job match.

FRONTEND STRUCTURE

src/

components/

FileUpload.jsx CandidateForm.jsx MatchResult.jsx CandidateTable.jsx JobCard.jsx SkillTag.jsx

pages/

UploadPage.jsx JobsPage.jsx CandidatesPage.jsx CandidateProfile.jsx

services/

api.js candidateService.js

App.jsx main.jsx

BACKEND STRUCTURE

backend/

controllers/

candidateController.js jobController.js matchController.js

models/

Candidate.js Job.js

routes/

uploadRoutes.js candidateRoutes.js jobRoutes.js matchRoutes.js

services/

parserService.js matchService.js

seed/

seedJobs.js

uploads/

server.js .env

API ENDPOINTS

POST /api/upload GET /api/candidates GET /api/jobs GET /api/candidate/:id POST /api/match/:candidateId/:jobId

OUTPUT REQUIREMENTS

Generate:

Complete backend code Complete frontend code Seed job script Resume parser service Matching algorithm service Professional dashboard UI

The project must run using

Backend

npm install npm run dev

Frontend

npm install npm run dev

Provide all files with code.

---

## Changes Made After AI Suggestions

* Improved resume parsing accuracy using regex refinement.
* Implemented skill extraction using a predefined skill dictionary.
* Added experience extraction using pattern matching.
* Introduced color-coded job matching score visualization.
* Added matched and missing skills display in the UI.
* Refactored frontend services to call backend APIs instead of local storage.
* Implemented MongoDB integration with Express backend.

---

## Development Decisions

* React + Vite used for fast development and UI responsiveness.
* Node.js + Express selected for lightweight backend APIs.
* MongoDB chosen for flexible document storage of resume data.
* Regex-based parsing used for simplicity and performance.

---

## Limitations

Resume parsing may not extract fields perfectly for all resume formats.

Skill detection relies on a predefined list and may miss uncommon technologies.

---

## Future Improvements

Integrate NLP models for smarter skill extraction.

Implement AI-based semantic job matching using embeddings.

Add recruiter dashboard and analytics.

Enable resume ranking based on job relevance.
