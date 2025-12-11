-- ============================================================================
-- SAPIENZA SCHEDULE - Supabase Database Setup
-- ============================================================================
-- Copy and paste this entire file into your Supabase SQL Editor
-- to create the database tables and indexes
-- ============================================================================

-- ============================================================================
-- 1. CREATE CLASSES TABLE
-- ============================================================================

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

-- Create indexes for better performance
CREATE INDEX idx_classes_day_of_week ON classes(day_of_week);
CREATE INDEX idx_classes_start_time ON classes(start_time);

-- ============================================================================
-- 2. CREATE EXAMS TABLE
-- ============================================================================

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

-- Create indexes for better performance
CREATE INDEX idx_exams_class_id ON exams(class_id);
CREATE INDEX idx_exams_exam_date ON exams(exam_date);
CREATE UNIQUE INDEX idx_exams_one_per_class ON exams(class_id);

-- ============================================================================
-- 3. OPTIONAL: Add Sample Data (for testing)
-- ============================================================================
-- Uncomment the lines below if you want to add sample data for testing

-- INSERT INTO classes (title, professor, building, room, day_of_week, start_time, end_time, credits)
-- VALUES
--   ('Data Structures', 'Dr. Rossi', 'Building A', '101', 0, '09:00', '11:00', 6),
--   ('Database Systems', 'Dr. Bianchi', 'Building B', '205', 1, '10:00', '12:00', 6),
--   ('Web Development', 'Prof. Verdi', 'Building A', '102', 2, '14:00', '16:00', 3),
--   ('Algorithms', 'Dr. Rossi', 'Building A', '101', 3, '09:00', '11:00', 6),
--   ('Operating Systems', 'Prof. Ferrari', 'Building C', '301', 4, '11:00', '13:00', 6);

-- ============================================================================
-- SETUP COMPLETE!
-- ============================================================================
-- Your tables are now ready to use.
-- You should see:
--   - classes table
--   - exams table
--   - All indexes created
--   - All constraints in place
--
-- Next steps:
-- 1. Get your Supabase credentials (Project URL and Anon Key)
-- 2. Add them to .env.local in your project
-- 3. Run: npm install
-- 4. Run: npm run dev
-- 5. Your app is ready!
--
-- For more information, see: docs/DATABASE_SCHEMA.md
-- ============================================================================
