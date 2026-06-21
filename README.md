# Resume Parser & AI Job Matching System

## Overview

This project is a full-stack application that allows users to upload resumes, automatically parse candidate information, and match candidates against available job listings using a custom AI-based scoring algorithm.

The system extracts candidate details from uploaded resumes and calculates a fitment score against jobs based on skills and experience.

---

## Tech Stack

Frontend
React 18
Vite
TailwindCSS

Backend
Node.js
Express.js

Database
MongoDB (Mongoose)

Resume Parsing
pdf-parse (PDF)
mammoth (DOCX)
Regex extraction

---

## Features

### 1. Resume Upload

* Drag and drop resume upload
* File picker support
* Accepts PDF and DOCX files
* Maximum file size: 5MB
* Upload progress indicator
* Resume stored on server

---

### 2. Resume Parsing

Extracted fields include:

* Name
* Email
* Phone
* Skills
* Years of Experience
* Education
* Current / Last Company

Parsed data is displayed in an editable form before saving.

Candidate data is saved to MongoDB.

---

### 3. Job Listing

The system seeds job listings in the database.

Job fields include:

* Title
* Code
* Skills
* Experience
* Location
* Description

Jobs are displayed in the UI for candidate matching.

---

### 4. AI Fitment Scoring

Candidate-job matching is calculated based on:

Skill Match Percentage
Experience Match
Overall Fitment Score

Score Formula:

SkillScore = MatchedSkills / JobSkills
ExperienceScore = CandidateExp / RequiredExp

Overall Score =
( SkillScore × 70 ) + ( ExperienceScore × 30 )

---

### 5. Match Result Visualization

Score Color Coding:

Green → Score > 70%
Yellow → Score 40–70%
Red → Score < 40%

Additional Insights:

Matched Skills
Missing Skills
Experience Gap

Users can click **“Match Against Job”** to evaluate candidate-job compatibility.

---

### 6. Candidate Database

Features:

* Candidate listing
* Search and filtering
* View full candidate profile
* Job match analysis

Displayed fields:

Name
Email
Skills
Experience
Date Added

---

## Project Structure

```
project-root
 ├ frontend
 │   ├ components
 │   ├ pages
 │   ├ services
 │   └ App.tsx
 │
 ├ backend
 │   ├ models
 │   ├ controllers
 │   ├ routes
 │   └ server.js
 │
 ├ uploads
 ├ README.md
 └ AILOG.md
```

---

## Setup Instructions

### Backend

```
cd backend
npm install
node server.js
```

Backend runs on:

```
http://localhost:5000
```

---

### Frontend

```
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## Database

MongoDB collections used:

```
candidates
jobs
```

---

## Seed Jobs

Run the seed script:

```
node seedJobs.js
```

This inserts sample job data for matching.

## project live 

https://resume-parser-chi.vercel.app/

---

## Future Improvements

AI-based NLP skill extraction
Semantic job matching
Resume ranking system
Advanced candidate analytics
