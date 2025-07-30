# Backend Feature Plan (Firebase)

This document details the feature set for the Firebase backend, broken down by user roles.

### Core & Authentication

1.  **User Registration & Login:**
    -   Mechanics and Managers can create accounts and log in using Firebase Authentication (email/password).
    -   The system will use JWTs provided by Firebase for secure API access.
2.  **Role-Based Access Control (RBAC):**
    -   A `role` field (`mechanic` or `manager`) will be stored with each user's profile in Firestore.
    -   Firestore Security Rules will be used to protect data and enforce access based on this role.

---

### Mechanic-Specific Features

1.  **Create a Service Job:**
    -   A logged-in Mechanic can create a new job document in the `jobs` collection in Firestore.
    -   The backend will automatically associate the job with the mechanic's user ID.
2.  **View Their Jobs:**
    -   A mechanic can only read job documents where their user ID matches the `mechanicId` field.
3.  **Update a Job:**
    -   A mechanic can edit the details of a job they created.

---

### Manager/Dispatch-Specific Features

1.  **Central Dashboard:**
    -   A Manager can view a list of *all* jobs from *all* mechanics.
2.  **Advanced Job Filtering & Search:**
    -   The app will support Firestore queries to filter jobs by date range, mechanic, or license plate.
3.  **Job Status Management:**
    -   Managers can change a `status` field on a job document (e.g., from `Open` to `Completed` to `Billed`).
4.  **Billing & Cost Calculation (Future Scope):**
    -   Introduce a `parts` collection with costs.
    -   A Cloud Function could trigger on a job status change to `Billed` to calculate the total cost based on time and parts used.
