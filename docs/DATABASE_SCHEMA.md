# Sapienza Schedule - Database Schema

This document describes the Supabase database schema for the Sapienza Schedule application.

## Tables

### 1. Classes Table

Stores information about all classes in the schedule.

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
```

**Columns:**
- `id`: Unique identifier (UUID)
- `title`: Class name (e.g., "Data Structures")
- `professor`: Professor name
- `building`: Building name/code
- `room`: Room number
- `day_of_week`: Day number (0=Monday, 6=Sunday)
- `start_time`: Class start time (HH:MM format)
- `end_time`: Class end time (HH:MM format)
- `credits`: Academic credits (typically 3-12)
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

**Indexes:**
```sql
CREATE INDEX idx_classes_day_of_week ON classes(day_of_week);
CREATE INDEX idx_classes_start_time ON classes(start_time);
```

### 2. Exams Table

Stores exam information linked to classes.

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
```

**Columns:**
- `id`: Unique identifier (UUID)
- `class_id`: Foreign key to classes table
- `exam_date`: Date of the exam (YYYY-MM-DD)
- `exam_time`: Time of the exam (HH:MM)
- `location`: Exam location
- `exam_type`: Type of exam (written, oral, or mixed)
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

**Indexes:**
```sql
CREATE INDEX idx_exams_class_id ON exams(class_id);
CREATE INDEX idx_exams_exam_date ON exams(exam_date);
CREATE UNIQUE INDEX idx_exams_one_per_class ON exams(class_id);
```

## Data Types Reference

- `UUID`: Unique identifier
- `TEXT`: Variable-length text
- `INTEGER`: Whole numbers
- `TIME`: Time without date (HH:MM:SS)
- `DATE`: Date without time (YYYY-MM-DD)
- `TIMESTAMP WITH TIME ZONE`: Full date and time with timezone
- `VARCHAR(20)`: Fixed-length text (max 20 characters)

## Constraints

- `CHECK` constraints ensure data validity:
  - `day_of_week` must be 0-6
  - `credits` must be positive
  - `exam_type` must be one of the allowed values

- `ON DELETE CASCADE` ensures exams are deleted when associated class is deleted

- `UNIQUE` constraint on `exams(class_id)` ensures only one exam per class

## Views (Optional)

You can create views for common queries:

```sql
-- View for classes ordered by day and time
CREATE VIEW classes_ordered AS
SELECT * FROM classes
ORDER BY day_of_week, start_time;

-- View for exams ordered by date
CREATE VIEW exams_upcoming AS
SELECT e.*, c.title as class_title
FROM exams e
JOIN classes c ON e.class_id = c.id
WHERE e.exam_date >= CURRENT_DATE
ORDER BY e.exam_date, e.exam_time;
```

## Sample Data

```sql
INSERT INTO classes (title, professor, building, room, day_of_week, start_time, end_time, credits)
VALUES
  ('Data Structures', 'Dr. Rossi', 'Building A', '101', 0, '09:00', '11:00', 6),
  ('Database Systems', 'Dr. Bianchi', 'Building B', '205', 1, '10:00', '12:00', 6),
  ('Web Development', 'Prof. Verdi', 'Building A', '102', 2, '14:00', '16:00', 3),
  ('Algorithms', 'Dr. Rossi', 'Building A', '101', 3, '09:00', '11:00', 6),
  ('Operating Systems', 'Prof. Ferrari', 'Building C', '301', 4, '11:00', '13:00', 6);

INSERT INTO exams (class_id, exam_date, exam_time, location, exam_type)
SELECT id, '2024-06-15', '10:00', 'Room 101', 'written' FROM classes WHERE title = 'Data Structures'
LIMIT 1;
```

## Maintenance and Updates

- Always use timestamps for tracking changes
- Consider adding soft-delete columns if you need to preserve data
- Regular backups are automatically handled by Supabase
- Monitor growth of tables and consider archiving old exam records
