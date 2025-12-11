# Setup Instructions - Sapienza Schedule

Complete step-by-step guide to set up the Sapienza Schedule application with Supabase, GitHub, and Vercel.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Supabase Setup](#supabase-setup)
3. [GitHub Repository](#github-repository)
4. [Local Development](#local-development)
5. [Vercel Deployment](#vercel-deployment)
6. [Maintenance](#maintenance)

---

## Prerequisites

Before starting, ensure you have:

- **Node.js** (v18.0 or higher) - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)
- **npm** or **yarn** package manager
- A **GitHub** account - [Create one](https://github.com/signup)
- A **Supabase** account - [Create one](https://supabase.com/)
- A **Vercel** account - [Create one](https://vercel.com/signup)

---

## Supabase Setup

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **"New Project"**
3. Fill in the project details:
   - **Name**: `sapienza-schedule` (or your preferred name)
   - **Database Password**: Create a strong password (save it securely)
   - **Region**: Select the region closest to you (e.g., Europe - Frankfurt for Italy)
4. Click **"Create new project"** and wait for initialization (2-5 minutes)

### 2. Get Your Credentials

1. Once the project is created, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (appears as `NEXT_PUBLIC_SUPABASE_URL`)
   - **Anon Key** (appears as `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
3. Save these in a secure location (you'll need them later)

### 3. Create Database Tables

1. In Supabase, go to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Paste the following SQL to create the `classes` table:

```sql
CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  professor TEXT NOT NULL,
  building TEXT,
  room TEXT,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  credits INTEGER DEFAULT 6 CHECK (credits > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_classes_day_of_week ON classes(day_of_week);
CREATE INDEX idx_classes_start_time ON classes(start_time);
```

4. Click **"Run"** to execute the SQL

### 4. Create the Exams Table

1. Click **"New Query"** again
2. Paste the following SQL:

```sql
CREATE TABLE exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  exam_date DATE NOT NULL,
  exam_time TIME NOT NULL,
  location TEXT,
  exam_type VARCHAR(20) NOT NULL CHECK (exam_type IN ('written', 'oral', 'mixed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_exams_class_id ON exams(class_id);
CREATE INDEX idx_exams_exam_date ON exams(exam_date);
CREATE UNIQUE INDEX idx_exams_one_per_class ON exams(class_id);
```

3. Click **"Run"**

### 5. Enable Row Level Security (Optional but Recommended)

For future user authentication:

1. Go to **Authentication** → **Policies**
2. Click on the `classes` table
3. Click **"Enable RLS"** (Row Level Security)
4. Add a policy for authenticated users (you can do this later when adding auth)

---

## GitHub Repository

### 1. Initialize Git Repository

If you haven't already done so:

```bash
cd /path/to/schedule
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### 2. Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Fill in details:
   - **Repository name**: `sapienza-schedule`
   - **Description**: "Online class schedule application for Sapienza University"
   - **Public/Private**: Choose based on preference
   - **Initialize with README**: Skip (we already have one)
   - **Add .gitignore**: Already configured
3. Click **"Create repository"**

### 3. Push Code to GitHub

```bash
# Add all files
git add .

# Commit initial code
git commit -m "Initial project setup with Next.js, Supabase integration"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/sapienza-schedule.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Local Development

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Configure Environment Variables

1. Create a `.env.local` file in the project root:

```bash
cp .env.local.example .env.local
```

2. Edit `.env.local` and add your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

**Important**: Never commit `.env.local` to GitHub (it's in `.gitignore`)

### 3. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Test the Application

1. Click **"Add Class"**
2. Fill in a test class:
   - Title: "Test Class"
   - Professor: "Dr. Test"
   - Day: Monday
   - Start Time: 09:00
   - End Time: 11:00
   - Building: "Test Building"
   - Room: "101"
   - Credits: 6
3. Click **"Add Class"**
4. Verify the class appears in the schedule view

---

## Vercel Deployment

### 1. Connect GitHub to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Select **"Import Git Repository"**
4. Authorize Vercel to access GitHub
5. Select your `sapienza-schedule` repository
6. Click **"Import"**

### 2. Configure Environment Variables

1. In the Vercel dashboard, go to **Settings** → **Environment Variables**
2. Add the following variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key
3. Click **"Save"**

### 3. Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (typically 2-3 minutes)
3. Once complete, you'll get a live URL (e.g., `https://sapienza-schedule.vercel.app`)
4. Click the link to verify your application is live

### 4. Configure Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain (requires DNS configuration)
3. Follow Vercel's instructions for DNS setup

---

## Continuous Deployment

By default, Vercel automatically deploys when you push to the `main` branch:

```bash
# Make changes locally
git add .
git commit -m "Feature: Add class validation"
git push origin main

# Vercel automatically deploys to production
```

To see deployment logs:
1. Go to Vercel dashboard
2. Click on the project
3. Go to **Deployments** tab
4. Click on any deployment to see logs

---

## Maintenance

### Regular Backups

Supabase automatically backs up your database daily. To manually export:

1. Go to Supabase dashboard
2. Click **Settings** → **Backups**
3. Click **"Download"** to export current state

### Update Dependencies

Regularly update your dependencies to get security patches:

```bash
npm update
# or
yarn upgrade
```

### Monitor Application

1. **Vercel Analytics**: Monitor performance at Vercel dashboard
2. **Supabase Logs**: Check database logs for errors
3. **Error Tracking**: Supabase shows query errors in real-time

### Common Issues & Solutions

#### "NEXT_PUBLIC_SUPABASE_URL is undefined"
- **Solution**: Check `.env.local` has correct values
- Make sure environment variables are set in Vercel Settings

#### "Database connection error"
- **Solution**: Verify Supabase project is running
- Check Supabase URL is correct
- Ensure anon key is valid

#### "Classes not appearing in schedule"
- **Solution**: Check Supabase tables were created correctly
- Verify RLS policies allow reads
- Check browser console for errors (F12 → Console)

---

## Next Steps

1. Add more classes and exams
2. Customize styling (edit `tailwind.config.ts`)
3. Add authentication for multi-user support
4. Implement calendar view (see [Advanced Features](#advanced-features))
5. Share your schedule with friends

---

## Advanced Features (Future Enhancements)

- **User Authentication**: Add login with Supabase Auth
- **Shared Schedules**: Allow friends to view your schedule
- **Calendar Export**: Export to iCal/Google Calendar
- **Mobile App**: Convert to React Native
- **Notifications**: Get exam reminders via email/SMS
- **Dark Mode**: Add dark theme toggle
- **Analytics**: Track study time and credits

---

## Support & Resources

- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)

---

## License

This project is open source and available under the MIT License.
