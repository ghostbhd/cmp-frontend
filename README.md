# 🎯 Account Preferences Page - Flex Group Assignment

A React application implementing an Account Preferences page with profile picture hover-flip, user info editing, password change, and two-factor authentication features.

## Quick Setup / Run Instructions

### Prerequisites
- Node.js 18+
- npm

### Installation & Running
```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm start

# Open browser to http://localhost:5173
```

### 🚀 GitHub Repository Setup (for Reviewers)
This project is ready to be pushed to GitHub for easier review:

```bash
# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

##  Assumptions and Decisions Made

### Design Decisions
- **No Backend Integration**: Implemented with local state management as specified
- **Modern UI Library**: Used Radix UI + Tailwind CSS for professional appearance and accessibility
- **TypeScript**: Added for better development experience and type safety
- **Component Structure**: Organized components by feature for better maintainability

### Technical Assumptions
- **Browser Support**: Modern browsers with ES6+ support
- **Screen Sizes**: Responsive design for mobile (320px+), tablet (768px+), and desktop (1024px+)
- **Accessibility**: WCAG 2.1 AA compliance target for screen readers and keyboard navigation
- **Performance**: Implemented lazy loading for better initial load times

### Implementation Choices
- **State Management**: Used React hooks (useState) for local component state
- **Validation**: Real-time form validation with user-friendly error messages
- **Icons**: Lucide React for consistent iconography
- **Testing**: Vitest + React Testing Library for component testing
- **Code Quality**: ESLint + Prettier for consistent code formatting

## Development Time

**Total Time Spent: ~3-5 hours**

Breakdown:
- Initial setup and planning: ~1 hour
- Component development: ~2-3 hours
- Styling and responsive design: ~30 minutes
- Testing and bug fixes: ~30 minutes
- Documentation and cleanup: ~40 minutes

## Features Implemented

✅ **Profile Picture Hover-Flip**
- Circular avatar with 3D flip animation on hover
- Edit icon reveal with keyboard accessibility

✅ **User Info Card**
- Read-only/edit mode toggle with form validation
- Save/Cancel functionality with real-time feedback

✅ **Change Password Card**
- Three password fields with show/hide toggles
- Real-time password matching validation

✅ **Two-Factor Authentication (OTP)**
- Enable/Disable 2FA with modal QR code setup
- 6-digit auto-submitting OTP input

## Optional Features Included

- **Unit Tests**: Vitest + React Testing Library with 12 passing tests
- **TypeScript**: Full type safety with strict mode
- **Accessibility**: WCAG 2.1 AA compliance
- **Responsive Design**: Mobile-first responsive layout
- **Code Quality**: ESLint + Prettier configuration

---

_Built for Flex Group take-home assignment_
