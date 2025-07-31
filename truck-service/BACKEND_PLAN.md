# Backend Feature Plan (Firebase)

This document details the feature set for the Firebase backend, broken down by user roles.

### Core & Authentication

1.  **User Registration & Login:**
    -   Mechanics, Fleet Customers, and Admins can create accounts and log in using Firebase Authentication (email/password). **(Implemented - Basic Profile Storage)**
    -   The system will use JWTs provided by Firebase for secure API access.
2.  **Role-Based Access Control (RBAC):**
    -   A `role` field (`mechanic`, `customer`, `admin`) will be stored with each user's profile in Firestore.
    -   Firestore Security Rules will be used to protect data and enforce access based on this role.

---

### Mechanic App Features

1.  **View Assigned Jobs:**
    -   Mechanics can view a list of jobs specifically assigned to them.
2.  **Job Details:**
    -   Access detailed information for each job (customer, unit info, service request).
3.  **Clock In/Out per Job:**
    -   Record start and end times for work on a specific job.
4.  **Upload Photos:**
    -   Upload before/after photos related to the job (using Firebase Storage).
5.  **Add Service Notes & Parts Used:**
    -   Update job details with notes and a list of parts consumed.
6.  **Complete Job and Submit:**
    -   Mark a job as complete, triggering any necessary backend processes.

---

### Fleet Customer App Features

1.  **View Service History:**
    -   Customers can view a history of all service jobs for their fleet.
2.  **View Open/Closed Jobs:**
    -   Distinguish between ongoing and completed jobs.
3.  **Download Invoice PDFs (Future Scope):**
    -   Access and download generated invoices.
4.  **Request New Service:**
    -   Submit new service requests, which will create new job entries.

---

### Admin Panel Features

1.  **Add/Manage Mechanics & Customers:**
    -   Create, update, and deactivate user accounts for both mechanics and customers.
2.  **Manually Assign Jobs:**
    -   Assign specific jobs to available mechanics.
3.  **Monitor Mechanic Locations in Real-time (Future Scope):**
    -   Track the live location of mechanics (requires integration with location services).
4.  **Sync Invoices to QuickBooks (Future Scope):**
    -   Integrate with QuickBooks API for automated invoice synchronization.
5.  **View Reports and Service History:**
    -   Access comprehensive reports and the full service history across all jobs and mechanics.

---

### Foundational Backend Components

*   **Firestore Database:** To store all user, job, and related data.
*   **Firebase Authentication:** For secure user management.
*   **Firebase Storage:** For storing uploaded photos.
*   **Cloud Functions:** For server-side logic (e.g., processing job completion, generating invoices, real-time location updates, QuickBooks sync).