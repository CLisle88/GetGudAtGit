# Contributing to GetGud@Git

Thank you for considering contributing to GetGud@Git! This document outlines the guidelines for contributing to this project.

## Cursor AI Rules

To ensure consistent and safe development, please adhere to these rules when using AI coding assistants:

### AI Constraints

1. **Technology Stack Preservation**:
   - Do not change the core technology stack (React, Node.js, Express)
   - Do not introduce additional frameworks without clear justification
   - Do not replace existing libraries with alternatives unless there is a critical reason

2. **Code Structure**:
   - Maintain the established component structure
   - Keep components modular and focused on a single responsibility
   - Do not reorganize the entire project structure without discussion

3. **Features and Scope**:
   - Keep the app focused on Git training objectives
   - Prioritize educational functionality over fancy UI
   - Maintain the localhost/offline-first approach

4. **Code Style**:
   - Follow existing naming conventions
   - Maintain consistent formatting
   - Use functional components with hooks for React code

5. **Performance**:
   - Keep the application lightweight and fast-loading
   - Avoid unnecessarily complex calculations or animations
   - Consider low-spec devices when adding features

### AI Allowed Changes

AI tools MAY suggest or implement:

1. Bug fixes and error corrections
2. Performance optimizations
3. Accessibility improvements
4. Additional Git tutorials and examples
5. Enhanced visualizations of Git concepts
6. Minor UI/UX improvements
7. Better error handling and user feedback

## Human Contributor Guidelines

### Setting Up Development Environment

1. Fork and clone the repository
2. Install dependencies: `npm install` and `cd client && npm install`
3. Start development servers:
   - Backend: `npm run dev`
   - Frontend: `cd client && npm start`

### Pull Request Process

1. Create a feature branch with a descriptive name
2. Make focused, related changes that address a specific issue or feature
3. Ensure the code passes all existing tests
4. Update documentation to reflect any changes
5. Submit a pull request with a clear description of the changes
6. Be responsive to feedback and review comments

### Commit Message Guidelines

Follow the conventional commits format:
- `feat: add new feature X`
- `fix: resolve issue with Y`
- `docs: update README with new instructions`
- `style: format code according to style guide`
- `refactor: simplify logic in component Z`
- `test: add tests for feature X`
- `chore: update dependencies`

## Code of Conduct

- Be respectful and inclusive in all interactions
- Provide constructive feedback
- Focus on the ideas, not the person
- Welcome newcomers and help guide them

## Questions?

If you have questions about contributing, please open an issue for discussion.

Thank you for helping improve GetGud@Git! 