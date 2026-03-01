Product Requirements Document (PRD)
Feedback Collection Application
1. Product Overview

The Feedback Collection App is a modern web application that allows users to submit feedback with a name, message, and rating, optionally anonymously. All submitted feedback is stored in a database, visible to multiple users in real time, and summarized using an average rating.

The product is designed to be:

Simple and lovable for users

Scalable and API-driven

Production-ready for deployment on Vercel

2. Goals & Objectives

Primary Goals

Collect structured user feedback

Display all feedback publicly

Show average rating dynamically

Support anonymous submissions

Secondary Goals

Enable feedback updates

Maintain clean UI/UX

Ensure data persistence and reliability

Success Metrics

Successful feedback submissions

Accurate average rating calculation

Zero data loss

Smooth deployment on Vercel

3. Target Users

Website owners collecting feedback

SaaS founders validating features

Students building portfolio projects

Users submitting feedback anonymously or openly

4. Core Features
4.1 Submit Feedback

Users can submit feedback with:

Name (optional if anonymous)

Message (required)

Rating (1–5 stars)

Anonymous Toggle (on/off)

Validation rules:

Rating must be between 1 and 5

Message cannot be empty

Name required only when anonymous = false

4.2 Anonymous Mode

Toggle switch to submit feedback anonymously

When enabled:

Name field is disabled or hidden

Stored as "Anonymous" in database

Can be toggled before submission

4.3 View All Feedback

All feedback entries visible to all users

Display:

Name / Anonymous

Message

Rating

Timestamp

Real-time refresh after submission

4.4 Average Rating Display

Average rating calculated from all feedbacks

Displayed prominently (e.g. ⭐ 4.3 / 5)

Automatically updates after every submission or update

4.5 Update Feedback (Plus Point Feature)

Users can update feedback records

Updateable fields:

Message

Rating

Name cannot be changed

Update handled via REST API

5. Functional Requirements
5.1 Frontend

Built using Next.js (App Router)

Responsive UI (mobile + desktop)

Components:

Feedback Form

Feedback List

Average Rating Card

Anonymous Toggle

Client-side validation

Toast notifications for success/error

5.2 Backend (REST APIs)
API Endpoints

POST /api/feedback

Create new feedback

{
  "name": "Rujuta",
  "message": "Great app!",
  "rating": 5,
  "anonymous": false
}

GET /api/feedback

Fetch all feedback records

PUT /api/feedback/:id

Update feedback message or rating

GET /api/feedback/average

Returns average rating

6. Database Design
Database: PostgreSQL / MongoDB (Vercel-compatible)

Feedback Table / Collection

Field	Type
id	UUID
name	String
message	String
rating	Number (1–5)
anonymous	Boolean
createdAt	Timestamp
updatedAt	Timestamp
7. Non-Functional Requirements

API response time < 300ms

Secure input handling (XSS prevention)

Scalable architecture

Clean error handling

Environment variables for secrets

8. Deployment Requirements (Vercel)
Deployment Stack

Frontend: Next.js

Backend: Next.js API Routes

Database: Neon / Supabase / MongoDB Atlas

Hosting: Vercel

Environment Variables
DATABASE_URL=
NEXT_PUBLIC_APP_URL=
Deployment Steps

Push code to GitHub

Import project into Vercel

Add environment variables

Deploy production build

Verify APIs and database connectivity

9. Security & Data Handling

Input sanitization

No authentication required (public feedback)

Rate limiting (optional enhancement)

Secure DB access via environment variables

10. Future Enhancements (Optional)

Authentication (Admin dashboard)

Delete feedback

Pagination & filters

Sentiment analysis

Export feedback as CSV

Dark mode

11. Assumptions & Constraints

Internet connectivity required

No user authentication in MVP

Public visibility of feedback

Anonymous feedback allowed

12. Final Notes

This application is:

Portfolio-ready

Interview-ready

Production-deployable

Lovable + modern

It demonstrates:

Full-stack development

REST API design

Database integration

Deployment skills