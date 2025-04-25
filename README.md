# Acadify - Modern Learning Platform
# Acadify - Modern Learning Platform

Acadify is a comprehensive learning platform built on the MERN stack (MongoDB, Express.js, React.js, Node.js) that connects teachers and students. Teachers can create and publish courses while students can browse, enroll, and engage with course content.

## Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [User Roles & Capabilities](#user-roles--capabilities)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

### Public Features
- Browse courses without login
- View course previews, descriptions, and instructor information
- User registration (as student or teacher)
- User authentication

### Student Features
- Personalized dashboard with progress tracking
- Course enrollment system
- Access to course materials, lessons, and quizzes
- Assignment submission
- View grades and feedback
- Profile management

### Teacher Features
- Course creation and management
- Upload and organize course materials
- Create assignments and quizzes
- Review and grade student submissions
- Track student progress
- Profile management

## Demo

[Live Demo](https://acadify-learning.example.com) (Coming Soon)

## Technologies Used

### Frontend
- React.js
- Redux for state management
- React Router for navigation
- Axios for API requests
- Tailwind CSS for styling

### Backend
- Node.js
- Express.js
- MongoDB for database
- Mongoose for data modeling
- JWT for authentication
- Bcrypt for password hashing

### Testing
- Jest
- React Testing Library

### Deployment
- Docker
- CI/CD with GitHub Actions

## Getting Started

### Prerequisites
- Node.js (v14.0.0 or later)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/acadify.git
cd acadify
```

2. Install dependencies for both frontend and backend
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

3. Set up environment variables
Create a `.env` file in the root directory and add:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
NODE_ENV=development
```

4. Start the development server
```bash
# Run both frontend and backend concurrently
npm run dev

# Run only the backend
npm run server

# Run only the frontend
npm run client
```

### Available Scripts

In the project directory, you can run:

#### `npm start`
Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.  
You may also see any lint errors in the console.

#### `npm test`
Launches the test runner in the interactive watch mode.  
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`
Builds the app for production to the `build` folder.

#### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## Project Structure

```
acadify/
│
├── client/                  # Frontend React application
│   ├── public/              # Public assets
│   ├── src/
│   │   ├── assets/          # Images, fonts, etc.
│   │   ├── components/      # Reusable components
│   │   ├── context/         # React context
│   │   ├── hooks/           # Custom hooks
│   │   ├── pages/           # Page components
│   │   ├── redux/           # Redux store setup
│   │   ├── services/        # API services
│   │   ├── utils/           # Utility functions
│   │   ├── App.js           # Main application component
│   │   └── index.js         # Entry point
│   └── package.json         # Frontend dependencies
│
├── server/                  # Backend Node.js/Express application
│   ├── config/              # Configuration files
│   ├── controllers/         # Request controllers
│   ├── middlewares/         # Express middlewares
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   └── server.js            # Server entry point
│
├── .env                     # Environment variables
├── .gitignore               # Git ignore file
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation
```

## User Roles & Capabilities

### Public Users
- Browse course catalog
- View course previews
- Register as student or teacher
- Log in to existing account

### Students
- Dashboard with enrolled courses
- Access full course content
- Submit assignments
- Take quizzes
- View grades and feedback
- Edit profile settings

### Teachers
- Create and publish courses
- Organize course materials
- Create assignments and quizzes
- Review student submissions
- Provide grades and feedback
- Track student progress

## API Documentation

API documentation is available at `/api/docs` when running the development server.

### Main API Endpoints:

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

#### Courses
- `GET /api/courses` - Get all courses (public)
- `GET /api/courses/:id` - Get course details (public/private based on enrollment)
- `POST /api/courses` - Create a new course (teachers only)
- `PUT /api/courses/:id` - Update course (owner teacher only)
- `DELETE /api/courses/:id` - Delete course (owner teacher only)

#### Enrollments
- `POST /api/courses/:id/enroll` - Enroll in a course
- `GET /api/enrollments` - Get user enrollments

#### Assignments
- `GET /api/courses/:id/assignments` - Get course assignments
- `POST /api/courses/:id/assignments` - Create assignment (teachers only)
- `POST /api/assignments/:id/submit` - Submit assignment (students only)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ by [Your Name]

Acadify is a comprehensive learning platform built on the MERN stack (MongoDB, Express.js, React.js, Node.js) that connects teachers and students. Teachers can create and publish courses while students can browse, enroll, and engage with course content.

## Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [User Roles & Capabilities](#user-roles--capabilities)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

### Public Features
- Browse courses without login
- View course previews, descriptions, and instructor information
- User registration (as student or teacher)
- User authentication

### Student Features
- Personalized dashboard with progress tracking
- Course enrollment system
- Access to course materials, lessons, and quizzes
- Assignment submission
- View grades and feedback
- Profile management

### Teacher Features
- Course creation and management
- Upload and organize course materials
- Create assignments and quizzes
- Review and grade student submissions
- Track student progress
- Profile management

## Demo

[Live Demo](https://acadify-learning.example.com) (Coming Soon)

## Technologies Used

### Frontend
- React.js
- Redux for state management
- React Router for navigation
- Axios for API requests
- Tailwind CSS for styling

### Backend
- Node.js
- Express.js
- MongoDB for database
- Mongoose for data modeling
- JWT for authentication
- Bcrypt for password hashing

### Testing
- Jest
- React Testing Library

### Deployment
- Docker
- CI/CD with GitHub Actions

## Getting Started

### Prerequisites
- Node.js (v14.0.0 or later)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/acadify.git
cd acadify
```

2. Install dependencies for both frontend and backend
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

3. Set up environment variables
Create a `.env` file in the root directory and add:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
NODE_ENV=development
```

4. Start the development server
```bash
# Run both frontend and backend concurrently
npm run dev

# Run only the backend
npm run server

# Run only the frontend
npm run client
```

### Available Scripts

In the project directory, you can run:

#### `npm start`
Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.  
You may also see any lint errors in the console.

#### `npm test`
Launches the test runner in the interactive watch mode.  
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`
Builds the app for production to the `build` folder.

#### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## Project Structure

```
acadify/
│
├── client/                  # Frontend React application
│   ├── public/              # Public assets
│   ├── src/
│   │   ├── assets/          # Images, fonts, etc.
│   │   ├── components/      # Reusable components
│   │   ├── context/         # React context
│   │   ├── hooks/           # Custom hooks
│   │   ├── pages/           # Page components
│   │   ├── redux/           # Redux store setup
│   │   ├── services/        # API services
│   │   ├── utils/           # Utility functions
│   │   ├── App.js           # Main application component
│   │   └── index.js         # Entry point
│   └── package.json         # Frontend dependencies
│
├── server/                  # Backend Node.js/Express application
│   ├── config/              # Configuration files
│   ├── controllers/         # Request controllers
│   ├── middlewares/         # Express middlewares
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   └── server.js            # Server entry point
│
├── .env                     # Environment variables
├── .gitignore               # Git ignore file
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation
```

## User Roles & Capabilities

### Public Users
- Browse course catalog
- View course previews
- Register as student or teacher
- Log in to existing account

### Students
- Dashboard with enrolled courses
- Access full course content
- Submit assignments
- Take quizzes
- View grades and feedback
- Edit profile settings

### Teachers
- Create and publish courses
- Organize course materials
- Create assignments and quizzes
- Review student submissions
- Provide grades and feedback
- Track student progress

## API Documentation

API documentation is available at `/api/docs` when running the development server.

### Main API Endpoints:

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

#### Courses
- `GET /api/courses` - Get all courses (public)
- `GET /api/courses/:id` - Get course details (public/private based on enrollment)
- `POST /api/courses` - Create a new course (teachers only)
- `PUT /api/courses/:id` - Update course (owner teacher only)
- `DELETE /api/courses/:id` - Delete course (owner teacher only)

#### Enrollments
- `POST /api/courses/:id/enroll` - Enroll in a course
- `GET /api/enrollments` - Get user enrollments

#### Assignments
- `GET /api/courses/:id/assignments` - Get course assignments
- `POST /api/courses/:id/assignments` - Create assignment (teachers only)
- `POST /api/assignments/:id/submit` - Submit assignment (students only)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ by [Your Name]
