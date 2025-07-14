# Stage 1: Requirements & Design

## User Stories

- As a mechanic, I want to add a new job, so I can record details of the truck repair I performed.
- As a mechanic, I want to enter the truck’s license plate, so I can identify the vehicle serviced.
- As a mechanic, I want to enter the truck’s mileage, so I can track usage and maintenance intervals.
- As a mechanic, I want to describe the job performed, so I can keep a record of the work done.
- As a mechanic, I want to record the time spent on the job, so I can track labor and efficiency.
- As a mechanic, I want to add parts used, so I can keep inventory and billing accurate.
- As a mechanic, I want to review a summary of the job before saving, so I can confirm all details are correct.
- As a mechanic, I want to view a list of previous jobs, so I can reference past repairs.
- As a mechanic, I want to edit or delete job entries, so I can correct mistakes or remove old records.

## Data Fields
- Truck license plate
- Mileage
- Job description
- Time spent
- Parts used

## Wireframe Sketches

**Home Screen**
----------------
+-------------------------------+
|   Truck Service Jobs           |
+-------------------------------+
| [Add New Job]                 |
+-------------------------------+
| Job #1 | License Plate | Date |
| Job #2 | License Plate | Date |
| ...                             |
+-------------------------------+

**Job Entry Form**
------------------
+-------------------------------+
|   New Job Entry                |
+-------------------------------+
| License Plate: [__________]    |
| Mileage:      [__________]     |
| Description:  [__________]     |
| Time Spent:   [__________]     |
| Parts Used:   [Add Part]       |
|   [List of added parts]        |
+-------------------------------+
| [Submit]                       |
+-------------------------------+

**Job Summary/Confirmation**
---------------------------
+-------------------------------+
|   Job Summary                  |
+-------------------------------+
| License Plate: ABC123          |
| Mileage: 120,000               |
| Description: Brake repair      |
| Time Spent: 2 hours            |
| Parts Used:                    |
|  - Brake pads (2)              |
|  - Rotor (1)                   |
+-------------------------------+
| [Confirm & Save]               |
+-------------------------------+

- Decide navigation flow (home → new job → job details → submit)
