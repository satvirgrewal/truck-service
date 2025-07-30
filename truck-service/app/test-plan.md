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
- Submitting the form with an empty license plate should display a validation error.
- Submitting the form with an empty description should display a validation error.

### Functionality
- When creating a new job, submitting the form should call the `addJob` function with the correct data.
- When editing an existing job, the form fields should be pre-filled with the job's data.
- Submitting the form in edit mode should call the `updateJob` function with the correct job ID and updated data.

## `edit-job/[id].tsx`

### Data Loading
- It should correctly find and display the form for the job ID passed in the URL.
- It should handle cases where the job ID from the URL does not exist (e.g., show a "Not Found" message or redirect).

## `job-list.tsx`

- It should display a list of jobs created within the last 7 days.
- It should display "No jobs in the last 7 days" when the jobs list is empty.
- It should **not** display jobs older than 7 days.
- Clicking the "Edit" button on a job item should navigate to `/edit-job/[id]` with the correct job ID.