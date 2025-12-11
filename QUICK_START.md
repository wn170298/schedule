# 🚀 Quick Start Guide - Sapienza Schedule

Get your schedule app up and running in **30 minutes**!

## 5-Minute Overview

**What is this?** An online class schedule app for Sapienza University students built with Next.js and Supabase.

**What can you do?**
- ✅ Add and manage your classes
- ✅ Schedule exams
- ✅ View your weekly schedule
- ✅ Track academic credits

**Tech Stack:**
- Next.js 14 + React (Frontend)
- Supabase + PostgreSQL (Database)
- Vercel (Hosting)
- GitHub (Version Control)

---

## Step 1: Set Up Supabase (5 minutes)

### 1.1 Create Account
1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"**
3. Sign up with GitHub or email

### 1.2 Create Project
1. Click **"New Project"**
2. Fill in:
   - Name: `sapienza-schedule`
   - Password: Create a strong one (save it!)
   - Region: Choose closest to you (Europe - Frankfurt recommended)
3. Click **"Create new project"** and wait 2-5 minutes

### 1.3 Get Your Credentials
1. Once ready, go to **Settings** (bottom left) → **API**
2. Copy these two values:
   ```
   Project URL (NEXT_PUBLIC_SUPABASE_URL)
   Anon Key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
   ```
3. **Save them somewhere safe** - you'll need them soon!

### 1.4 Create Database Tables

1. In Supabase, click **"SQL Editor"** (left sidebar)
2. Click **"New Query"**
3. Copy and paste this SQL:

```sql
-- Create Classes Table
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

-- Create Exams Table
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

4. Click **"Run"**
5. Wait for success message ✅

✅ **Supabase is ready!**

---

## Step 2: Set Up Your Computer (5 minutes)

### 2.1 Check Node.js
Open terminal and run:
```bash
node --version
```

Should show v18 or higher. If not, download from [nodejs.org](https://nodejs.org)

### 2.2 Install Dependencies
```bash
cd /workspaces/schedule
npm install
```

Wait for all packages to install (3-5 minutes)

### 2.3 Configure Environment Variables
```bash
cp .env.local.example .env.local
```

Now edit `.env.local` and paste your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

✅ **Your computer is ready!**

---

## Step 3: Run Locally (2 minutes)

```bash
npm run dev
```

You should see:
```
> sapienza-schedule@1.0.0 dev
> next dev

  ▲ Next.js 14.0.4
  - Local:        http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser

🎉 **Your app is running!**

---

## Step 4: Test the App (5 minutes)

### Test 1: Add a Class
1. Click **"➕ Add Class"**
2. Fill in:
   - Title: "Test Class"
   - Professor: "Dr. Test"
   - Day: "Monday"
   - Start Time: "09:00"
   - End Time: "11:00"
   - Credits: "6"
3. Click **"Add Class"**
4. Should see "Class added successfully!"
5. Go back to schedule and verify it appears

### Test 2: Edit a Class
1. Click the class card
2. Click **"Edit"**
3. Change the title to "Test Class - Updated"
4. Click **"Update Class"**
5. Verify changes in schedule

### Test 3: Schedule an Exam
1. Click on a class
2. Click **"Schedule Exam"**
3. Fill in:
   - Date: Any future date
   - Time: "10:00"
   - Type: "written"
4. Click **"Schedule Exam"**
5. Should see the exam details

### Test 4: Delete a Class
1. Click on a class
2. Click **"Delete"**
3. Confirm deletion
4. Should disappear from schedule

✅ **All features working!**

---

## Step 5: Deploy to Vercel (8 minutes)

### 5.1 Push to GitHub
```bash
git add .
git commit -m "Initial project setup"
git push origin main
```

### 5.2 Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click **"Import Project"**
4. Select your `sapienza-schedule` repository
5. Click **"Import"**
6. In **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your key
7. Click **"Deploy"**
8. Wait 2-3 minutes
9. Click the live URL when ready!

🎉 **Your app is live on the internet!**

Visit your live app at: `https://your-project.vercel.app`

---

## Step 6: Use Your App!

Your schedule app is now ready to use!

### Add All Your Classes
1. Go to your live URL
2. Click **"➕ Add Class"**
3. Add each of your classes for the semester
4. View them organized by day

### Schedule Your Exams
1. Click on each class
2. Click **"Schedule Exam"**
3. Enter exam details
4. Track all your exams in one place

### Share with Friends
- Copy your live URL and share it
- They can see your schedule
- *(Future: add user accounts for privacy)*

---

## Troubleshooting

### "Classes not appearing?"
- Check `.env.local` has correct credentials
- Verify Supabase tables were created
- Check browser console (F12 → Console) for errors

### "Database connection error?"
- Verify Supabase project is running
- Check credentials in `.env.local`
- Make sure you created the tables in Supabase

### "Vercel deployment failed?"
- Check environment variables are set
- Verify code was pushed to main branch
- Check Vercel dashboard for build logs

### "Stuck?"
See these guides:
- Setup help: [docs/SETUP_INSTRUCTIONS.md](./docs/SETUP_INSTRUCTIONS.md)
- Troubleshooting: [docs/MAINTENANCE_GUIDE.md](./docs/MAINTENANCE_GUIDE.md)
- Database help: [docs/DATABASE_SCHEMA.md](./docs/DATABASE_SCHEMA.md)

---

## What's Next?

Once your app is working:

### Customize It
- Change colors in `tailwind.config.ts`
- Change university name in `src/app/layout.tsx`
- Add your university logo

### Invite Friends
- Share your Vercel URL
- They can see your schedule
- (Add user accounts later for privacy)

### Future Features
- Add user authentication (multi-user support)
- Calendar export (Google Calendar, Outlook)
- Mobile app
- Email reminders for exams
- Dark mode

See [docs/PROJECT_PLAN.md](./docs/PROJECT_PLAN.md) for full roadmap.

---

## File Guide

### Most Important Files

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Main schedule page |
| `src/components/` | UI components |
| `src/lib/scheduleService.ts` | Database operations |
| `.env.local` | Your secret credentials |
| `docs/SETUP_INSTRUCTIONS.md` | Detailed setup |

### Documentation

| Document | When to Read |
|----------|-------------|
| [README.md](./README.md) | Project overview |
| [SETUP_INSTRUCTIONS.md](./docs/SETUP_INSTRUCTIONS.md) | Got stuck during setup? |
| [DATABASE_SCHEMA.md](./docs/DATABASE_SCHEMA.md) | Want to add new fields? |
| [MAINTENANCE_GUIDE.md](./docs/MAINTENANCE_GUIDE.md) | How to maintain it? |
| [PROJECT_PLAN.md](./docs/PROJECT_PLAN.md) | Full project details |

---

## Useful Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check for errors
npm run lint
```

---

## Quick Reference

### Environment Variables (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=paste_your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=paste_your_supabase_key
```

### Default Days (for adding classes)
- 0 = Monday
- 1 = Tuesday
- 2 = Wednesday
- 3 = Thursday
- 4 = Friday
- 5 = Saturday
- 6 = Sunday

### Exam Types
- Written (traditional exam)
- Oral (professor asks questions)
- Mixed (written + oral)

---

## Summary Checklist

- [ ] Create Supabase project
- [ ] Get Supabase credentials
- [ ] Create database tables
- [ ] Run `npm install`
- [ ] Create `.env.local` with credentials
- [ ] Run `npm run dev`
- [ ] Test locally (add/edit/delete classes)
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Verify live deployment
- [ ] Add your classes
- [ ] Schedule your exams
- [ ] Share with friends!

---

## Support

**Need help?**
1. Check the troubleshooting section above
2. Read the full setup guide: [SETUP_INSTRUCTIONS.md](./docs/SETUP_INSTRUCTIONS.md)
3. Check maintenance guide: [MAINTENANCE_GUIDE.md](./docs/MAINTENANCE_GUIDE.md)
4. Create an issue on GitHub

**Want to contribute?**
See [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## You're All Set! 🎉

You now have your own class schedule app!

**Next:** Add your classes and start organizing your semester.

**Questions?** Check the documentation or open an issue on GitHub.

Made with ❤️ for Sapienza University students
