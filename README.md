# Sapienza Schedule 📚

An elegant online class schedule application for Sapienza University of Rome. Built with Next.js, React, Supabase, and Vercel.

**[Live Demo](https://sapienza-schedule.vercel.app)** | **[GitHub](https://github.com/YOUR_USERNAME/sapienza-schedule)**

## Features ✨

- 📅 **Weekly Schedule View**: Organized by day with all classes displayed clearly
- ➕ **Easy Class Management**: Add, edit, and delete classes with intuitive forms
- 📝 **Exam Scheduling**: Track exam dates, times, and locations per class
- 🎯 **Academic Credits Tracking**: Monitor total credits across all classes
- 💾 **Persistent Storage**: All data saved securely in Supabase
- 🚀 **Fast & Responsive**: Built with Next.js and optimized for performance
- 🎨 **Modern UI**: Clean interface using Tailwind CSS
- 📱 **Mobile Friendly**: Responsive design works on all devices

## Tech Stack 🛠️

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Hosting**: GitHub

## Quick Start 🚀

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn
- A Supabase account
- A Vercel account
- A GitHub account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/sapienza-schedule.git
cd sapienza-schedule
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Supabase** (see [SETUP_INSTRUCTIONS.md](./docs/SETUP_INSTRUCTIONS.md) for details)
   - Create a Supabase project
   - Get your API credentials
   - Create database tables using SQL

4. **Configure environment variables**
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

5. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app!

## Project Structure 📁

```
sapienza-schedule/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── layout.tsx    # Root layout with navigation
│   │   └── page.tsx      # Main schedule page
│   ├── components/       # React components
│   │   ├── ClassCard.tsx
│   │   ├── ClassForm.tsx
│   │   ├── ExamForm.tsx
│   │   └── WeeklyView.tsx
│   ├── lib/
│   │   ├── supabaseClient.ts  # Supabase initialization
│   │   ├── scheduleService.ts # Database operations
│   │   └── timeUtils.ts       # Time formatting utilities
│   ├── styles/           # Global styles
│   └── types/            # TypeScript type definitions
├── docs/                 # Documentation
│   ├── DATABASE_SCHEMA.md
│   ├── SETUP_INSTRUCTIONS.md
│   └── MAINTENANCE_GUIDE.md
├── public/               # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Database Schema 🗄️

### Classes Table
Stores information about all classes with:
- Title, professor, building, room
- Day of week (0=Monday, 6=Sunday)
- Start and end times
- Academic credits

### Exams Table
Stores exam information linked to classes:
- Exam date and time
- Location
- Exam type (written, oral, mixed)

See [DATABASE_SCHEMA.md](./docs/DATABASE_SCHEMA.md) for complete details.

## Usage 💡

### Adding a Class
1. Click **"➕ Add Class"** button
2. Fill in class details:
   - Title (e.g., "Data Structures")
   - Professor name
   - Day of week
   - Start and end times
   - Building and room
   - Credits
3. Click **"Add Class"**

### Scheduling an Exam
1. Click on a class in the schedule
2. Click **"Schedule Exam"**
3. Fill in:
   - Exam date
   - Exam time
   - Location
   - Exam type
4. Click **"Schedule Exam"**

### Editing or Deleting
- Click **"Edit"** button on any class card to modify
- Click **"Delete"** button to remove a class

## Deployment 🌐

The app is automatically deployed to Vercel when you push to the `main` branch on GitHub.

### Manual Deployment

```bash
# Deploy via Vercel CLI
npm i -g vercel
vercel
```

See [SETUP_INSTRUCTIONS.md](./docs/SETUP_INSTRUCTIONS.md#vercel-deployment) for complete deployment guide.

## Advanced Features 🔮

Planned enhancements:
- [ ] User authentication (multi-user support)
- [ ] Calendar view (month/day view)
- [ ] Export to Google Calendar / iCal
- [ ] Push notifications for exams
- [ ] Dark mode
- [ ] Schedule sharing with friends
- [ ] Analytics and study time tracking
- [ ] Mobile app (React Native)

## Troubleshooting 🔧

**Classes not appearing?**
- Check Supabase credentials in `.env.local`
- Verify database tables were created
- Check browser console (F12) for errors

**Changes not showing on Vercel?**
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Check deployment completed in Vercel dashboard

**Database connection error?**
- Verify Supabase project is running
- Check network connectivity
- Review Supabase status page

See [MAINTENANCE_GUIDE.md](./docs/MAINTENANCE_GUIDE.md#troubleshooting) for more solutions.

## File Structure Guide

### Key Files Explained

- **`src/app/page.tsx`**: Main application component - handles all schedule logic
- **`src/lib/scheduleService.ts`**: Database operations (CRUD for classes and exams)
- **`src/lib/supabaseClient.ts`**: Supabase client initialization
- **`src/components/ClassForm.tsx`**: Form for adding/editing classes
- **`src/components/ExamForm.tsx`**: Form for scheduling exams
- **`src/components/WeeklyView.tsx`**: Main schedule display component

## Configuration 🔧

### Customize Colors

Edit `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      primary: '#1e40af',    // Change blue color
      secondary: '#0891b2',  // Change cyan color
    },
  },
},
```

### Change University Name

Edit `src/app/layout.tsx`:
```typescript
<h1 className="text-2xl font-bold">📚 Your University Name</h1>
```

## Development Commands 🖥️

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Contributing 🤝

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit (`git commit -m 'Add amazing feature'`)
5. Push to branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## Documentation 📖

- [**SETUP_INSTRUCTIONS.md**](./docs/SETUP_INSTRUCTIONS.md) - Complete setup guide for Supabase, GitHub, and Vercel
- [**DATABASE_SCHEMA.md**](./docs/DATABASE_SCHEMA.md) - Database structure and SQL schemas
- [**MAINTENANCE_GUIDE.md**](./docs/MAINTENANCE_GUIDE.md) - Maintenance, monitoring, troubleshooting, and scaling

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.

## Support 💬

For issues or questions:
- Check the [Troubleshooting](./docs/MAINTENANCE_GUIDE.md#troubleshooting) section
- Review [SETUP_INSTRUCTIONS.md](./docs/SETUP_INSTRUCTIONS.md)
- Create an issue on GitHub

## Roadmap 🗺️

- [x] Basic schedule display
- [x] Class management (add/edit/delete)
- [x] Exam scheduling
- [ ] User authentication
- [ ] Multi-user support
- [ ] Calendar export
- [ ] Mobile app
- [ ] Dark mode

## Credits 🙏

Built with:
- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)

## Quick Links 🔗

- **Live App**: [sapienza-schedule.vercel.app](https://sapienza-schedule.vercel.app)
- **GitHub**: [github.com/YOUR_USERNAME/sapienza-schedule](https://github.com/YOUR_USERNAME/sapienza-schedule)
- **Supabase**: [supabase.com](https://supabase.com/)
- **Vercel**: [vercel.com](https://vercel.com/)

---

Made with ❤️ for Sapienza University students
