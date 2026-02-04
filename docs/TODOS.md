# Project To-Do List — Acadify MVP ✅

This file is a detailed, actionable to-do list for finishing the MVP. Each task includes the feature summary, UI components to implement or update, backend endpoints/models, acceptance criteria, and a rough effort estimate (S/M/L).

> How to use this file: pick one high-priority item, open an issue for it, assign an owner and an estimate, then create small PRs that implement one subtask at a time.

---

## High Priority (MVP Must-haves) 🔥

### 1) Auth & Enrollment (S -> M)
- Feature summary: Register/Login for Students & Teachers, JWT authentication, role-based access, enroll flow for courses.
- UI to implement:
  - `frontend/src/pages/Login.js` — Login form, error states, redirect after login
  - `frontend/src/pages/Sign-Up/RegisterStudent.js` & `RegisterTeacher.js` — Signup flows with role selection
  - Auth-aware nav (show Login/Register when unauthenticated, Profile/Logout when authenticated)
- Backend endpoints/models:
  - POST `/api/auth/register` (role: student|teacher)
  - POST `/api/auth/login` -> returns JWT
  - Middleware `backend/src/middleware/authenticateJWT.js` to protect routes and attach `req.user`
  - Add `role` to `User` model
- Acceptance:
  - New users can sign up and login; token stored securely; protected routes return 401 for unauthenticated users; role-based routes blocked for wrong roles.

### 2) Course Catalog & Public Course Preview (S)
- Feature summary: Course listing (public) and public preview page with CTA to enroll/login.
- UI to implement:
  - `frontend/src/pages/Home/BrowseCourses.js` — list grid with filters and search
  - `frontend/src/pages/CoursePreview.js` — public view, syllabus summary, instructor card, reviews section (static)
- Backend endpoints:
  - GET `/api/courses` (public fields)
  - GET `/api/courses/:id` (public preview)
- Acceptance: Public users can browse courses and open previews; enroll CTA redirects to login for unauthenticated users.

### 3) Course Enrollment & Private Course View (M)
- Feature summary: Enroll API and gated course content for enrolled students.
- UI to implement:
  - `frontend/src/pages/CoursePreview.js` — Enroll button (requires auth)
  - `frontend/src/components/student/CourseView.js` — Course outline, lessons list, progress tracking
  - Update `StudentLayout` breadcrumbs and navigation
- Backend endpoints:
  - POST `/api/courses/:id/enroll` (requires auth)
  - GET `/api/courses/:id/content` (requires auth + enrollment)
- Acceptance: Student can enroll and access course content; non-enrolled users are blocked and prompted to enroll.

### 4) Student Dashboard & Assignments Overview (M)
- Feature summary: Dashboard showing enrolled courses, upcoming assignments, progress, quick actions.
- UI to implement:
  - `frontend/src/components/student/StudentDashboard.js` — finish styling, link cards to course pages
  - Create route `/student/assignments` with `frontend/src/components/student/Assignment.js` (detailed list view)
- Backend endpoints:
  - GET `/api/users/:id/courses` (student enrolled courses)
  - GET `/api/users/:id/assignments` (assignments due)
- Acceptance: Dashboard shows correct data, links work, assignments page lists items with statuses.

### 5) Assignment Submission & Teacher Grading (M -> L)
- Feature summary: Teacher creates assignments, students submit (file or text), teachers grade and leave feedback.
- UI to implement:
  - Teacher: `frontend/src/pages/teacher/CreateAssignment.js` / modal component to add assignments
  - Teacher: `frontend/src/pages/teacher/Submissions.js` — list submissions, grading UI
  - Student: `frontend/src/pages/student/AssignmentDetail.js` — submission form (file upload, text), view grade & feedback
- Backend endpoints/models:
  - POST `/api/courses/:courseId/assignments` (teacher)
  - GET `/api/assignments/:id/submissions` (teacher)
  - POST `/api/assignments/:id/submissions` (student) — use multer+limits
  - POST `/api/submissions/:submissionId/grade` (teacher)
  - Models: Assignment, Submission (file path, text, grade, feedback)
- Acceptance: Student can submit; teacher can view and grade; student sees grade and feedback.

### 6) Multer & File Upload Safety (S)
- Feature summary: Prevent DoS/crashes via malformed uploads and enforce file type/size limits.
- Tasks:
  - Create `backend/src/config/multer.js` with centralized config: `limits`, `fileFilter`, storage strategy, error handling middleware
  - Update submission endpoints to use that config
  - Add tests for large & malformed uploads
- Acceptance: Uploads over limit rejected cleanly with proper errors; malformed requests do not crash server.

### 7) Teacher Course Creation & Management (M)
- Feature summary: Teachers can author courses with modules and lessons, upload resources, save draft and publish.
- UI to implement:
  - `frontend/src/pages/teacher/createcourse.js` — multi-step form (Basic Info, Curriculum, Resources, Pricing/Publish)
  - Components: `CourseStructureBuilder.js`, `LessonModal.js`, `CourseResourcesUploader.js`
- Backend endpoints:
  - POST `/api/courses` (create), PUT `/api/courses/:id` (edit)
  - POST `/api/courses/:id/lessons`, POST `/api/courses/:id/resources`
- Acceptance: Teacher can create and publish a course; course content shows correctly in student view after publish.

### 8) Profile & Account Settings (S)
- Feature summary: View & edit profile, change password, upload avatar
- UI to implement:
  - `frontend/src/pages/accountsettings.js` — profile edit, change password modal
- Backend endpoints:
  - GET/PUT `/api/users/:id/profile`, POST `/api/auth/change-password`
- Acceptance: Users can update profile and change password; validations in place.

### 9) Routing, Redirect Safety & React Router Upgrade (S)
- Tasks:
  - Upgrade `react-router` packages to patched versions
  - Implement safe redirect helper (whitelist or relative-only redirects)
  - Sanitize any renderer props passed to ScrollRestoration
- Acceptance: Redirects cannot be used as open-redirects; audit shows react-router vulnerabilities addressed.

### 10) Security & Input Validation (S)
- Tasks:
  - Add `express-validator` checks for all inputs (auth, enroll, assignment creation, upload)
  - Add rate limiting middleware to auth and upload endpoints
  - Add sanitization on fields that will be rendered as HTML (e.g., lesson descriptions)
- Acceptance: Validation errors return 400 with clear messages; rate limits prevent abuse.

---

## Medium Priority (Important but not blocking) ⚙️

### 11) Tests (Backend & Frontend) (M)
- Tasks:
  - Backend: unit tests for auth, enroll, assignment submission (using Jest + supertest)
  - Frontend: component and route tests (React Testing Library)
  - Integration tests for key flows
- Acceptance: CI runs tests and they pass; critical flows have coverage.

### 12) CI & GitHub Actions (S)
- Tasks:
  - Add `.github/workflows/ci.yml` to run: install, lint, tests, build on PRs to main
  - Add job to run `npm audit` to detect regressions
- Acceptance: PRs trigger CI and it gates merging when tests fail.

### 13) Dev tooling & Vulnerability fixes (S)
- Tasks:
  - Add `overrides` in `frontend/package.json` to force fixed transitive versions (nth-check, postcss, jsonpath)
  - Ensure `webpack-dev-server` is updated and not exposed publicly
- Acceptance: `npm audit` shows no dev-time high vulnerabilities or acceptable mitigations documented.

### 14) 404 & Error pages + UX polish (S)
- Tasks:
  - Implement a friendly `404` page (`frontend/src/pages/404.js`) and global `ErrorBoundary`
  - Improve mobile responsiveness and run an accessibility pass (contrast, labels)
- Acceptance: Good mobile layout and accessible basics.

---

## Low Priority (Stretch & Nice-to-have) ✨

- Quizzes with auto-grading (future)
- Payments/checkout integration (Stripe)
- Discussion forums per course
- Certificate generation & download
- Advanced analytics dashboards for teachers

---

## Formatting & Process Notes
- Break each High item into smaller GitHub issues (1 UI piece or 1 backend endpoint per issue).
- Keep PRs small (single feature or bug fix). Add unit tests for each change when possible.
- Use `npm ci` in CI for deterministic installs and add `npm audit` to pipeline.