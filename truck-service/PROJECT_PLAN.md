# Project Plan

This document outlines the major development stages for the Truck Service application.

## Stage 1: Frontend & Local State (Completed)

- **Objective:** Build the core user interface and functionality using local, in-memory state management.
- **Key Activities:**
  - Develop screens for creating, viewing, and editing jobs.
  - Implement a local context to manage job data during an app session.
  - Write a comprehensive suite of unit and component tests for all screens and components.
  - **Status:** ✅ Completed

## Stage 2: Firebase Backend Integration

- **Objective:** Replace local state management with a robust Firebase backend to enable data persistence, user authentication, and role-based features.
- **Key Activities:**
  - Set up a new Firebase project.
  - Integrate Firebase Authentication for user registration and login. **(Implemented - Basic Profile Storage)**
  - Implement role-based access control for three distinct user roles:
    - Mechanic App
    - Fleet Customer App
    - Admin Panel (Web or App)
  - Migrate job data storage to Firestore. **(Implemented)**
  - Refactor the application to interact with the Firebase backend for all data operations.
- **Status:** ⏳ In Progress
