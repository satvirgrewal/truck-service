# Application Test Plan

This document outlines potential test cases for the Truck Service application.

## `HomeScreen.tsx`

### Rendering
- **(Implemented)** It should display the app title, logo, and "Create New Job" button.

### Job List
- **(Implemented)** It should display "No jobs in the last 7 days" when the jobs list is empty.
- **(Implemented)** It should display a list of jobs created within the last 7 days.
- **(Implemented)** It should **not** display jobs older than 7 days.

### Navigation
- **(Implemented)** Clicking the "Create New Job" button should navigate to the `/job-form` screen.
- **(Implemented)** Clicking the "Edit" button on a job item should navigate to `/edit-job/[id]` with the correct job ID.

## `job-form.tsx` (Component)

### Validation
- **(Implemented)** Submitting the form with an empty license plate should display a validation error.
- **(Implemented)** Submitting the form with an empty description should display a validation error.

### Functionality
- **(Implemented)** When creating a new job, submitting the form should call the `addJob` function with the correct data.
- **(Implemented)** When editing an existing job, the form fields should be pre-filled with the job's data.
- **(Implemented)** Submitting the form in edit mode should call the `updateJob` function with the correct job ID and updated data.

## `edit-job/[id].tsx`

### Data Loading
- **(Implemented)** It should correctly find and display the form for the job ID passed in the URL.
- **(Implemented)** It should handle cases where the job ID from the URL does not exist (e.g., show a "Not Found" message or redirect).

## `job-list.tsx`

- **(Implemented)** It should display a list of jobs created within the last 7 days.
- **(Implemented)** It should display "No jobs in the last 7 days" when the jobs list is empty.
- **(Implemented)** It should **not** display jobs older than 7 days.
- **(Implemented)** Clicking the "Edit" button on a job item should navigate to `/edit-job/[id]` with the correct job ID.

## Backend Integration Testing

### Firebase Authentication (`AuthScreen`, `AuthContext`)
- **User Registration:**
  - Should successfully register a new user with valid credentials.
  - Should display an error for invalid email format.
  - Should display an error for weak passwords.
  - Should display an error if the email is already in use.
  - Should store a user profile document in Firestore with a default role upon successful registration. **(Implemented)**
- **User Login:**
  - Should successfully log in an existing user with correct credentials.
  - Should display an error for incorrect password.
  - Should display an error for user not found.
- **Logout Functionality:**
  - Should successfully log out the current user.
  - Should redirect to the authentication screen after logout.
- **Authentication State Persistence:**
  - User should remain logged in after app restart (if not explicitly logged out).
- **Routing:**
  - Unauthenticated users should be redirected to the authentication screen.
  - Authenticated users on the authentication screen should be redirected to the home screen.

### Job Management with Firestore (`JobsContext`)
- **Creating Jobs:**
  - Should successfully save a new job to the Firestore `jobs` collection. **(Implemented)**
  - The created job should be associated with the authenticated user's `mechanicId`. **(Implemented)**
- **Viewing Jobs:**
  - Only jobs belonging to the authenticated user should be displayed on the HomeScreen and JobListScreen. **(Implemented)**
  - The job list should update in real-time when new jobs are added or existing jobs are modified in Firestore.
- **Updating Jobs:**
  - Should successfully update an existing job's details in Firestore. **(Implemented)**
- **Firestore Security Rules:**
  - Verify that users can only create, read, update, and delete their own jobs (via manual testing or dedicated rule tests). **(Implemented)**
  - Verify that unauthorized access to job data is denied.
