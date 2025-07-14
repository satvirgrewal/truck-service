# Supreme Truck Service App

## Project Overview
This is a React Native mobile app (built with Expo) for truck repair mechanics to record, manage, and review repair jobs. The app helps mechanics track work performed, time spent, parts used, and maintain a history of jobs for reference and billing.

## Current Features
- Home screen displays a list of jobs from the last 7 days
- Add new job with all required details (license plate, mileage, description, time spent, parts used)
- Edit existing jobs using the same job form
- Navigation between screens using Expo Router
- Demo data is used for job list; persistent storage is planned

## Upcoming Features
- Persistent storage for jobs (AsyncStorage/SQLite)
- Job summary/confirmation screen
- Form validation
- Ability to delete jobs
- Improved UI and error handling

## How to Run
1. Install dependencies: `npm install`
2. Start the app: `npx expo start`
3. Use the Expo Go app or simulator to view the app

## Folder Structure
- `app/` - Main screens and navigation
- `components/` - Reusable form and UI components
- `assets/` - Fonts and images
- `constants/` - Colors and other constants

---
This README documents the current features, upcoming features, and usage of the Supreme Truck Service App.
