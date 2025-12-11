# Contributing to Sapienza Schedule

Thank you for your interest in contributing to the Sapienza Schedule project! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and inclusive in all interactions. We welcome contributions from everyone regardless of experience level.

## How to Contribute

### Reporting Bugs

Found a bug? Please create an issue on GitHub with:
- Description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Your environment (OS, Node version, browser)

### Suggesting Features

Have an idea? Create an issue with:
- Clear description of the feature
- Use cases and benefits
- Possible implementation approaches

### Submitting Code

1. **Fork the repository**
```bash
# Click "Fork" on GitHub
```

2. **Clone your fork**
```bash
git clone https://github.com/YOUR_USERNAME/sapienza-schedule.git
cd sapienza-schedule
```

3. **Create a feature branch**
```bash
git checkout -b feature/your-feature-name
```

4. **Make your changes**
- Follow the code style used in the project
- Write clear, descriptive commit messages
- Add comments for complex logic
- Test your changes locally

5. **Commit your changes**
```bash
git add .
git commit -m "feat: add your feature description"
```

**Commit message format:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation change
- `style:` Code style change (no logic change)
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Build/dependency changes

6. **Push to your fork**
```bash
git push origin feature/your-feature-name
```

7. **Create a Pull Request**
- Go to GitHub and create a PR
- Describe what your changes do
- Link any related issues
- Wait for review

## Development Setup

```bash
# Install dependencies
npm install

# Configure environment variables
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# Start development server
npm run dev

# Visit http://localhost:3000
```

## Code Style Guidelines

### TypeScript
- Use proper type annotations
- Avoid `any` types when possible
- Use interfaces for object types

```typescript
// Good
interface Class {
  id: string
  title: string
  professor: string
}

// Avoid
const classData: any = { ... }
```

### React Components
- Use functional components with hooks
- One component per file (unless related)
- Use descriptive prop names

```typescript
// Good
interface ClassCardProps {
  classData: Class
  onEdit?: (id: string) => void
}

export default function ClassCard({ classData, onEdit }: ClassCardProps) {
  // ...
}

// Avoid
function Card(props: any) {
  // ...
}
```

### File Organization
```
src/
├── components/    # React components
├── lib/          # Utility functions and services
├── types/        # TypeScript type definitions
├── styles/       # CSS files
└── app/          # Next.js pages
```

### Naming Conventions
- **Components**: PascalCase (e.g., `ClassCard.tsx`)
- **Files**: Match component name
- **Variables/Functions**: camelCase (e.g., `fetchClasses()`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_CLASSES = 50`)

## Testing

Before submitting:

```bash
# Build the project
npm run build

# Run linter
npm run lint

# Manual testing checklist:
# - [ ] Add a new class
# - [ ] Edit a class
# - [ ] Delete a class
# - [ ] Schedule an exam
# - [ ] View the schedule
# - [ ] Test on mobile view
```

## Documentation

If you add new features:
- Update relevant documentation files
- Add inline code comments for complex logic
- Update the README if needed

## Pull Request Process

1. **Before submitting:**
   - Ensure code builds without errors
   - Test your changes locally
   - Update documentation

2. **In your PR:**
   - Clear title and description
   - Link related issues
   - Mention any breaking changes
   - Add screenshots for UI changes

3. **During review:**
   - Respond to feedback
   - Make requested changes
   - Be patient - reviews take time

4. **After approval:**
   - Maintainer will merge your PR
   - Your changes will be deployed automatically

## Project Structure

- **`src/app/`**: Next.js pages and layouts
- **`src/components/`**: React components
- **`src/lib/`**: Utility functions, services, API clients
- **`src/types/`**: TypeScript interfaces and types
- **`docs/`**: Documentation files
- **`public/`**: Static assets

## Common Tasks

### Adding a New Component

1. Create file: `src/components/MyComponent.tsx`
2. Add types to `src/types/index.ts` if needed
3. Use in `src/app/page.tsx` or other components
4. Document in README if it's a major feature

### Adding Database Fields

1. Update database schema in Supabase
2. Update `src/types/index.ts`
3. Update `src/lib/scheduleService.ts` if needed
4. Update forms/components that use the field
5. Update documentation in `docs/DATABASE_SCHEMA.md`

### Adding a New Page

1. Create file: `src/app/new-page/page.tsx`
2. Add navigation link in `src/app/layout.tsx`
3. Update documentation

## Resources

- **Nextjs Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **React Docs**: [react.dev](https://react.dev)
- **TypeScript Docs**: [typescriptlang.org/docs](https://typescriptlang.org/docs)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)

## Getting Help

- **Questions?** Create a discussion on GitHub
- **Need help?** Comment on the issue
- **Found a problem?** Report a bug

## Recognition

Contributors will be recognized in:
- README.md contributors section
- GitHub contributor graph
- Release notes

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Sapienza Schedule! 🎉
