# Deployment Guide for Mini Udemy

This project consists of a **Spring Boot Backend** and a **React Frontend**. To deploy it live, you will need to host both parts and a MySQL database.

## 1. Push Code to GitHub

First, ensure your project is pushed to a GitHub repository.

```bash
git init
git add .
git commit -m "Ready for deployment"
# Create a new repo on GitHub and follow instructions to push:
# git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
# git push -u origin main
```

## 2. Deploy Backend (and Database)

We recommend using **Railway** (railway.app) or **Render** (render.com) because they support Java and MySQL easily.

### Option A: Using Railway (Recommended)

1.  Sign up at [railway.app](https://railway.app/).
2.  Click **New Project** -> **GitHub Repo** -> Select your repo.
3.  Calculated Variables: Railway might auto-detect the Dockerfile in `backend/`. If not, configure the **Root Directory** to `backend`.
4.  **Add a Database**:
    *   Right-click the empty canvas -> New -> Database -> MySQL.
5.  **Connect Backend to Database**:
    *   Click on your Backend service -> **Variables**.
    *   Add the variables matching `application.properties`:
        *   `DB_URL`: Use the MySQL URL provided by Railway (usually `jdbc:mysql://...`).
        *   `DB_USERNAME`: Use the variable `${MYSQLUSER}`.
        *   `DB_PASSWORD`: Use the variable `${MYSQLPASSWORD}`.
        *   `PORT`: `8080`.
6.  Railway will build and deploy. Once done, it will give you a public URL (e.g., `https://mini-udemy-production.up.railway.app`).

## 3. Deploy Frontend

We recommend **Vercel** or **Netlify**.

### Using Vercel

1.  Sign up at [vercel.com](https://vercel.com/).
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository.
4.  **Configure Project**:
    *   **Root Directory**: Click "Edit" and select `frontend`.
    *   **Build Command**: `npm run build`.
    *   **Output Directory**: `dist`.
    *   **Environment Variables**:
        *   Key: `VITE_API_URL`
        *   Value: The URL of your deployed Backend (e.g., `https://mini-udemy-production.up.railway.app/api`).
5.  Click **Deploy**.

## 4. Final Configuration

Once Frontend is live (e.g., `https://mini-udemy.vercel.app`), go back to your Backend environment variables.

*   If you have strict CORS settings in `SecurityConfig.java`, update the allowed origins to include your new Vercel URL.
*   (Currently, valid CORS is hardcoded to localhost. PRO TIP: You might want to update `Backend/src/.../config/SecurityConfig.java` to allow `*` or the env var before verifying).

## Troubleshooting

*   **Images**: The project uses local assets (`/assets/devops.png`). These will work on the live site automatically as long as the `public/assets` folder is deployed with the frontend.
*   **Database**: When you deploy, the database is fresh. The `DataInitializer` will run and seed the initial courses automatically.
