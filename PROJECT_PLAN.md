# Truck Repair Mechanic iOS App (React Native) – Project Plan

## Tech Stack

### Frontend
- React Native: Main framework for cross-platform mobile development
- TypeScript: For type safety and maintainability
- React Navigation: For screen and tab navigation
- Formik + Yup: For form handling and validation
- Expo (optional): For easier development, testing, and access to device features

### State Management
- Context API: For simple state needs
- Redux Toolkit: For complex or shared state

### Local Storage
- AsyncStorage: For storing job entries locally
- SQLite (expo-sqlite or react-native-sqlite-storage): For robust local data management

### Device Features
- Expo Camera / react-native-image-picker: For photo capture
- Expo FileSystem: For file handling

### Testing
- Jest: For unit testing
- React Native Testing Library: For component testing

### Deployment
- Xcode: For building and deploying to iOS devices
- App Store Connect: For app submission

## Stage 1: Requirements & Design
- Define required data fields:
  - Truck license plate
  - Mileage
  - Job description
  - Time spent
  - Parts used
- Sketch wireframes for main screens
- Decide navigation flow (home → new job → job details → submit)

## Stage 2: Project Setup
- Initialize React Native project
- Set up iOS build environment (Xcode, simulator)
- Configure basic navigation (React Navigation)

## Stage 3: UI Development
- Create screens:
  - Home screen (job list, add new job)
  - Job entry form (all required fields)
  - Job summary/confirmation
- Implement form validation

## Stage 4: Data Management
- Choose state management (Context API or Redux)
- Store job entries locally (AsyncStorage or SQLite)
- Enable editing/deleting job entries

## Stage 5: Optional Features
- Photo capture for truck/license plate
- Parts selection from a predefined list
- Export/share job reports (PDF, email)

## Stage 6: Testing & Deployment
- Test on iOS devices/simulators
- Fix bugs and polish UI
- Prepare for App Store submission (icons, splash screen, privacy policy)
