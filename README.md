# Mini Udemy

A premium online learning platform with a rich user interface and robust backend.

## Tech Stack
- **Frontend**: React (Vite), Vanilla CSS (Custom Design System), Lucide Icons, Framer Motion
- **Backend**: Java Spring Boot 3, Spring Security, Spring Data JPA
- **Database**: MySQL

## Prerequisites
- Node.js (v18+)
- Java (JDK 17+)
- Maven (Since it's not in the path, instructions below assume you have it or use an IDE like IntelliJ IDEA)
- MySQL Database

## Setup & Running

### 1. Database Setup
Ensure you have a MySQL server running on port 3306.
The application is configured to user `root` with password `password`.
It will automatically create the database `miniudemy` if it doesn't exist.
Update `backend/src/main/resources/application.properties` with your credentials if they differ.

### 2. Backend
Navigate to the `backend` directory.
If you have Maven installed globally:
```bash
mvn spring-boot:run
```
Alternatively, open the `backend` folder in IntelliJ IDEA or Eclipse and run `BackendApplication.java`.

### 3. Frontend
Navigate to the `frontend` directory:
```bash
cd frontend
npm install  # (Already done)
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

## Features Implemented
- **Rich Aesthetic UI**: Glassmorphism design, smooth dark mode, gradients.
- **Responsive Navigation**: Mobile-friendly navbar.
- **Home Page**: Hero section, featured courses.
- **Login UI**: Styled login page.
- **Routing**: React Router setup for navigation.

## Pending Implementation (Backend Logic)
- Authentication API (JWT)
- Course Management API
- Payment Gateway Integration
- Progress Tracking Logic
