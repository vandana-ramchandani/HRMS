# hr-portal-managemnt-system

HR Management Trainee Project

# Employee Functionality

The **Employee Functionality** in the HR Management Trainee Project allows users to manage and interact with employee-related data. Below are the key features and endpoints provided for employees.

---

## Features

1. **View All Employees**

   - Retrieve a list of all employees with their details, including name, employee ID, date of joining, title, email, and description (if available).

2. **View Own Profile**

   - Employees can view their own profile, including personal details and their description.

3. **Edit Own Profile**

   - Employees can update their own profile details, such as name, title, email, and password.

4. **Add or Update Description**

   - Employees can add or update a description for their profile.

5. **View All Admins**
   - Retrieve a list of all admins with their details.

---

## Authentication

All endpoints require authentication using a valid JWT token. Include the token in the `Authorization` header as follows:
Authorization: Bearer <your_token>

---

## Notes

- Only employees can view and edit their own profiles.
- Admins and employees are retrieved separately for better role-based management.
- Descriptions are optional but can be added or updated by the user.

---

This functionality ensures secure and efficient management of employee data while maintaining role-based access control.

# Employee Functionality

The **Employee Functionality** in the HR Management Trainee Project allows users to manage and interact with employee-related data. Below are the key features and endpoints provided for employees.

---

## Features

1. **View All Employees**

   - Retrieve a list of all employees with their details, including name, employee ID, date of joining, title, email, and description (if available).

2. **View Own Profile**

   - Employees can view their own profile, including personal details and their description.

3. **Edit Own Profile**

   - Employees can update their own profile details, such as name, title, email, and password.

4. **Add or Update Description**

   - Employees can add or update a description for their profile.

5. **View All Admins**
   - Retrieve a list of all admins with their details.

---

## Authentication

All endpoints require authentication using a valid JWT token. Include the token in the `Authorization` header as follows:
Authorization: Bearer <your_token>

---

## Notes

- Only employees can view and edit their own profiles.
- Admins and employees are retrieved separately for better role-based management.
- Descriptions are optional but can be added or updated by the user.

---

This functionality ensures secure and efficient management of employee data while maintaining role-based access control.
