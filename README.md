# 🎓 Acadify - A Learning Platform

**Acadify** is a full-stack web application built using the **MERN** stack (MongoDB, Express, React, Node.js) that connects teachers and students through an interactive learning environment.

Teachers can create and manage courses, assignments, and content. Students can browse public course previews, enroll in courses, submit assignments, and track their academic progress.

---

## 🚀 Features

### 🌐 Public Pages (No Login Required)
- **Landing Page**: Hero section with CTA buttons (Login/Register)
- **Course Catalog**: Browse courses with search and filter functionality
- **Course Preview**: View course title, summary, duration, topics, and instructor
- **Login / Register Pages**: Separate flows for students and teachers
- **About / Contact Page**
- **404 Not Found Page**

### 🔐 Private Pages (Require Login)

#### 🧑‍🎓 For Students
- **Student Dashboard**: View enrolled courses, upcoming classes or assessments
- **My Courses**: Access course content and announcements
- **Assignments Page**: Submit assignments via file upload or text
- **Grades / Feedback**: View marks and feedback from teachers
- **Profile Page**: Edit profile and change password

#### 👩‍🏫 For Teachers
- **Teacher Dashboard**: Overview of classes and quick actions
- **Class Management**: Manage student enrollments
- **Create Assignment Page**: Upload materials and set deadlines
- **Submissions Page**: View, grade, and provide feedback on student submissions
- **Profile Page**: Edit profile and change password

### 🛠️ Shared / Optional Pages
- **Settings Page**
- **Terms & Conditions / Privacy Policy**
- **Logout Logic / Button**

---

## 🧭 Suggested User Flow
1. Visitor opens site → sees **Landing Page**
2. Clicks “Browse Courses” → goes to **Course Catalog**
3. Clicks a course → sees **Public Preview Page**
4. Clicks “Enroll” → redirected to **Login/Register**
5. After login:
   - Student → goes to **Student Dashboard**
   - Teacher → goes to **Teacher Dashboard**

---

## 🧰 Tech Stack

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **File Uploads**: (Optional) Multer / Cloudinary

---

## 💻 Getting Started

### 📦 Prerequisites
Ensure you have the following installed:
- Node.js
- npm or yarn
- MongoDB

---

### 🖥️ Backend Setup

```bash
cd backend
npm install
