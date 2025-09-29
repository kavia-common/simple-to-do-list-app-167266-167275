# Candy Pop To-Do App – Product Requirements Document (PRD)

## Introduction

### Background
Candy Pop To-Do is a playful, single-page to-do list application themed with lively colors and soft rounded corners. The app focuses on fast, frictionless task capture and basic task management in a delightful UI. The current codebase implements a client-only React application with no persistence, optimized for a simple and joyful user experience.

### Goals
- Provide a lightweight and delightful interface to add, view, update, filter, and delete tasks.
- Keep the experience instant and responsive with minimal navigation and a single-page layout.
- Embrace the “Candy Pop” theme to create a fun, engaging, and accessible experience.

### Non-Goals
- Multi-user support or authentication.
- Server-side rendering or complex state management libraries.
- Backend synchronization or real-time collaboration in the current scope.

## Scope

### In Scope
- Single-page React app.
- Core CRUD functionality for tasks.
- Filters for All, Active, and Done tasks.
- Light/Dark theme toggle.
- Playful UI enhancements consistent with the Candy Pop theme.

### Out of Scope
- Persistent storage (e.g., backend or local database). A future enhancement could add SQLite via a lightweight backend or local persistence.
- Notifications, reminders, or scheduling integrations.

## Users and Personas

### Primary User
- A casual user who wants a quick way to capture and manage a small list of tasks in a visually appealing interface. They value speed, clarity, and playful design.

### Secondary User
- A design-conscious user who appreciates harmonious colors, gradients, and rounded shapes without sacrificing usability.

## User Stories

### Core Stories
- As a user, I can create a task so that I can capture something I need to do.
- As a user, I can view my tasks so that I can see what needs to be done.
- As a user, I can mark a task as done or active so that I can track progress.
- As a user, I can edit a task so that I can correct or refine it.
- As a user, I can delete a task so that I can remove tasks I no longer need.
- As a user, I can filter tasks by All, Active, or Done so that I can focus on relevant tasks.
- As a user, I can clear all completed tasks so that I can keep my list tidy.
- As a user, I can toggle light/dark mode so that I can use the app comfortably in different lighting conditions.

### Error and Feedback
- As a user, I should get a gentle hint when I try to add an empty task so that I know why the action failed.

## Functional Requirements

### Task Management (CRUD)
- Create: User can input text and press “Add” to create a task at the top of the list.
- Read: Task list displays existing tasks with completion status.
- Update: User can double-click a task to edit it; pressing Enter or blurring the input saves; Escape cancels.
- Delete: User can delete a task via a Delete button.
- Toggle: A custom-styled checkbox toggles task completion.

### Filtering
- Pills in the header allow switching between All, Active, and Done views; the active pill is visually highlighted.

### Clear Completed
- A Clear Completed button removes all tasks marked as done.

### Theming
- A button toggles data-theme attribute between light and dark, adjusting CSS variables accordingly.

### Accessibility
- Use aria-labels for controls, aria-live on the list for dynamic updates, and semantic controls for checkboxes and buttons.
- Ensure color contrast meets accessibility expectations within the Candy Pop palette.

## UX Requirements

### Layout
- Single-page layout with:
  - Sticky header containing the logo, filter pills, and theme toggle.
  - Main card containing the task input, list, and footer with the items-left counter and Clear Completed.
  - Subtle decorative gradient background with soft “blobs” to add depth and playfulness.

### Behavior and Feedback
- Buttons and pills have small lift-on-hover transitions.
- Input focus uses a soft, colorful focus ring derived from palette.
- Empty state shows a cheerful message with an emoji and dashed rounded bubble.
- Double-click on task text activates inline edit.
- Hint is shown if attempting to add an empty task (“Type something sweet…”).

### Content and Microcopy
- App title: “Candy Pop Todos.”
- Gentle and playful microcopy (e.g., empty state message).
- Avoid jargon; keep text short, friendly, and clear.

## Visual Style and Theme

### Candy Pop Theme
- Style: Playful, vibrant, energetic, with bright colors and soft rounded corners; lively gradients.
- Colors (from styleThemeData):
  - Primary: #F472B6
  - Secondary: #A78BFA
  - Success: #10B981
  - Error: #EF4444
  - Gradient: from-pink-300 via-purple-300 to-blue-300 (expressed in CSS via custom linear-gradient)
  - Background: #FEF7FF
  - Surface: #FFFFFF
  - Text: #374151

### Components and Treatments
- Pills, buttons, and cards use rounded radii; primary and secondary gradients emphasize interactions.
- Custom checkbox with gradient when checked.
- Shadows are soft and slightly colored for a playful elevation effect.

## Non-Functional Requirements

### Performance
- Instant interaction; no network calls in current scope.
- Minimal bundle size; components are colocated for simplicity.

### Reliability
- Client-only state; no persistence guarantees across sessions.

### Security
- No authentication or data transmission in current scope.

### Compatibility
- Modern evergreen browsers per React scripts defaults.

## Analytics and Telemetry
- Not in scope.

## Success Metrics
- Users can perform CRUD operations quickly without confusion.
- Visual appeal and consistency with the Candy Pop theme.
- No console errors; basic unit tests pass for core rendering.

## Release Plan
- Initial release: Client-only SPA with Candy Pop styling and core task features.
- Future: Optional persistence via a backend and SQLite, or IndexedDB/localStorage for offline-first.

## Open Questions
- Should we add local persistence (e.g., localStorage) to preserve tasks across refreshes?
- Should filters persist across sessions?
- Are keyboard shortcuts desired for power users?

## Appendices

### Current Implementation Alignment
- The implemented features in the codebase at src/App.js and src/App.css match the PRD scope: single-page app, CRUD, filters, clear completed, theme toggle, and Candy Pop styles.
