# Sapienza Schedule - Maintenance Guide

Complete guide for maintaining, updating, and extending the Sapienza Schedule application.

## Table of Contents

1. [Regular Maintenance](#regular-maintenance)
2. [Database Management](#database-management)
3. [Monitoring & Analytics](#monitoring--analytics)
4. [Troubleshooting](#troubleshooting)
5. [Scaling & Performance](#scaling--performance)
6. [Security Considerations](#security-considerations)

---

## Regular Maintenance

### Weekly Tasks

**1. Review Logs**
- Check Vercel deployment logs for any errors
- Review Supabase query performance logs
- Monitor application error tracking

```bash
# View local logs
npm run dev 2>&1 | grep -i error
```

**2. Database Health Check**
- Verify all classes and exams are stored correctly
- Check for orphaned exam records (referencing deleted classes)

### Monthly Tasks

**1. Update Dependencies**
```bash
# Check for outdated packages
npm outdated

# Update all packages
npm update

# Test after updates
npm run dev
```

**2. Review & Clean Data**
- Remove classes from previous semesters
- Archive old exam records
- Check for duplicate entries

**3. Backup Verification**
- Verify Supabase backups are working
- Test restore process in staging environment

### Quarterly Tasks

**1. Security Audit**
- Update all major dependencies
- Review security advisories
- Test HTTPS connectivity

```bash
# Check for security vulnerabilities
npm audit
npm audit fix
```

**2. Performance Review**
- Analyze page load times
- Review Supabase query performance
- Optimize slow queries

---

## Database Management

### Archiving Old Data

When starting a new semester, archive old data:

```sql
-- Create archive tables
CREATE TABLE classes_archive AS
SELECT * FROM classes WHERE day_of_week IS NOT NULL;

CREATE TABLE exams_archive AS
SELECT * FROM exams WHERE exam_date < '2024-01-01';

-- Delete old records
DELETE FROM classes WHERE day_of_week IS NOT NULL;
DELETE FROM exams WHERE exam_date < '2024-01-01';
```

### Data Export

Export your schedule data for backup or analysis:

1. **Via Supabase Dashboard**:
   - Go to **SQL Editor**
   - Click **Download**
   - Select `classes` and `exams` tables

2. **Via API**:
```bash
curl -H "apikey: YOUR_ANON_KEY" \
  "https://YOUR_PROJECT.supabase.co/rest/v1/classes?select=*" \
  > classes.json
```

### Adding New Columns

If you need to add new fields:

```sql
-- Add a new column
ALTER TABLE classes ADD COLUMN capacity INTEGER DEFAULT 30;

-- Update existing rows
UPDATE classes SET capacity = 30;

-- Make it required
ALTER TABLE classes ALTER COLUMN capacity SET NOT NULL;
```

Then update the TypeScript types in `src/types/index.ts`:

```typescript
export interface Class {
  // ... existing fields
  capacity: number
}
```

---

## Monitoring & Analytics

### Vercel Monitoring

1. **Deployment Status**:
   - Go to Vercel dashboard
   - Check deployment health
   - Monitor build times

2. **Analytics**:
   - View Core Web Vitals
   - Monitor page performance
   - Track user interactions

### Supabase Monitoring

1. **Database Performance**:
   - Go to **Supabase Dashboard** → **Reports**
   - Check query execution time
   - Monitor storage usage

2. **API Stats**:
   - Monitor API response times
   - Check error rates
   - Track database connections

### Setting Up Alerts

#### Vercel Alerts
1. Go to **Settings** → **Notifications**
2. Enable email alerts for:
   - Failed deployments
   - Performance issues
   - High error rates

#### Supabase Alerts
1. Go to **Settings** → **Email Preferences**
2. Enable alerts for:
   - High database usage
   - Connection limits
   - Backup failures

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Classes Not Appearing in Schedule

**Symptoms**: Schedule view is empty or shows "No classes scheduled"

**Diagnosis**:
```bash
# Check browser console (F12 → Console)
# Look for network errors when loading classes

# Check Supabase logs
# Go to Supabase → Settings → Logs
```

**Solutions**:
- Verify Supabase credentials in `.env.local`
- Check that classes table has data
- Ensure RLS policies are not blocking reads
- Clear browser cache and reload

#### 2. Changes Not Appearing on Vercel

**Symptoms**: Website still shows old version after deployment

**Solutions**:
- Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Check Vercel deployment completed successfully
- Verify code was pushed to main branch

#### 3. Database Connection Errors

**Symptoms**: "Failed to fetch classes" error message

**Diagnosis**:
```javascript
// Test connection in browser console
const { data, error } = await supabase.from('classes').select('*');
console.log(error);
```

**Solutions**:
- Check Supabase project is running
- Verify network connectivity
- Check if Supabase has reached rate limits
- Review Supabase status page

#### 4. Slow Performance

**Symptoms**: Page takes >3 seconds to load

**Solutions**:
```sql
-- Add missing indexes
CREATE INDEX idx_exams_class_id ON exams(class_id);
CREATE INDEX idx_classes_day_of_week ON classes(day_of_week);

-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM classes WHERE day_of_week = 0;
```

- Reduce number of records per query
- Implement pagination for large datasets
- Use database indexes effectively

---

## Scaling & Performance

### Optimize Database Queries

#### Current Query Pattern
```typescript
// Fetches all classes and exams (works for <500 records)
const schedule = await fetchWeeklySchedule();
```

#### For Large Schedules
Implement pagination:

```typescript
async function fetchClassesPaginated(dayOfWeek: number, limit = 20, offset = 0) {
  const { data, error } = await supabase
    .from('classes')
    .select('*')
    .eq('day_of_week', dayOfWeek)
    .range(offset, offset + limit - 1)
    .order('start_time')

  return data || []
}
```

### Caching Strategy

Implement React Query for better caching:

```bash
npm install @tanstack/react-query
```

```typescript
import { useQuery } from '@tanstack/react-query'

export default function Home() {
  const { data: schedule, isLoading } = useQuery({
    queryKey: ['schedule'],
    queryFn: fetchWeeklySchedule,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // ... rest of component
}
```

### Image Optimization

If adding images/logos in future:

```tsx
import Image from 'next/image'

<Image
  src="/sapienza-logo.png"
  alt="Sapienza University"
  width={200}
  height={100}
  priority
/>
```

---

## Security Considerations

### Environment Variables

**DO:**
```bash
# Store in .env.local (never commit)
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

**DON'T:**
```javascript
// Don't hardcode secrets
const SUPABASE_KEY = "eyJhbGc..." // WRONG!
```

### API Security

#### Row Level Security (RLS)

When adding authentication, implement RLS policies:

```sql
-- Example: Users can only see their own classes
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own classes"
ON classes FOR SELECT
USING (auth.uid() = user_id);
```

#### API Rate Limiting

Supabase applies rate limits automatically:
- 1,000 requests/hour for free tier
- Higher limits for paid plans

### Data Validation

Always validate on frontend and backend:

```typescript
// Example: Validate class time
if (startTime >= endTime) {
  throw new Error('End time must be after start time')
}

if (!/^\d{2}:\d{2}$/.test(startTime)) {
  throw new Error('Invalid time format')
}
```

### HTTPS & SSL

- Vercel automatically provides HTTPS
- Supabase enforces HTTPS for all APIs
- Always use HTTPS URLs in production

### Dependency Security

```bash
# Regular security audits
npm audit

# Fix vulnerabilities
npm audit fix

# Check for outdated packages
npm outdated
```

---

## Backup Strategy

### Automatic Backups

Supabase automatically backs up your database:
- **Free tier**: Daily backups (7-day retention)
- **Pro tier**: Hourly backups (30-day retention)

### Manual Backups

```bash
# Export data using Supabase CLI
supabase db pull

# Or via SQL
SELECT * FROM classes;
SELECT * FROM exams;
```

### Restoration

1. Go to Supabase Dashboard → **Settings** → **Backups**
2. Click **Restore** next to desired backup
3. Confirm restoration
4. Database will be restored to that point in time

---

## Documentation Updates

Keep documentation in sync with code changes:

1. **Update DATABASE_SCHEMA.md** when:
   - Adding new tables
   - Adding new columns
   - Changing data types

2. **Update SETUP_INSTRUCTIONS.md** when:
   - Changing setup procedure
   - Adding new dependencies
   - Modifying configuration

3. **Update this file** when:
   - Adding new features
   - Discovering new common issues
   - Implementing new best practices

---

## Staying Updated

### Version Management

Check current versions:
```bash
npm list next react @supabase/supabase-js
```

### Update Schedule

- **Minor/patch updates**: Weekly
- **Major updates**: Quarterly (after testing)

Example update process:
```bash
# Update one package and test
npm install next@latest
npm run dev

# If all good, commit and push
git add package*.json
git commit -m "chore: update Next.js to v14"
git push
```

---

## Resources

- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel Status**: [vercel.com/status](https://vercel.com/status)
- **Security Updates**: [npmjs.com/advisories](https://www.npmjs.com/advisories)

---

## Version History

- **v1.0.0** (Dec 2024): Initial release with class and exam management
