# Task Management API with PostgreSQL

## Overview
This project provides a Task Management API built with Node.js and PostgreSQL. It includes features like task searching, server-side pagination, and task management (add, update, delete). The API is designed to handle database queries efficiently and adhere to RESTful API principles.

## Features
### Core Functionalities
- **Search Tasks by Title**:  
  - Case-insensitive search using PostgreSQL's `ILIKE` operator.  
  - Returns only active tasks (`isActive = true`).
- **Server-Side Pagination**:  
  - Supports pagination using SQL `LIMIT` and `OFFSET`.  
  - Clients can specify:
    - `page`: The page number (default: 1).
    - `limit`: The number of tasks per page (default: 10).
  - Returns total tasks, current page, and tasks for the requested page.
- **Combine Search and Pagination**:  
  - Search and paginate in a single API call (e.g., `/tasks?search=title&page=1&limit=10`).

### Additional Endpoints
- **Add Task**:  
  - Endpoint: `POST /tasks`  
  - Request Body:
    ```json
    {
      "name": "Task Name",
      "description": "Task Description"
    }
    ```
- **Update Task**:  
  - Endpoint: `PUT /tasks/:id`  
  - Updates task status (`Not Started`, `In Progress`, `Completed`).
  - If status is `Completed`, `isActive` is automatically set to `false`.
  - Request Body:
    ```json
    {
      "status": "In Progress"
    }
    ```
- **Delete Task**:  
  - Endpoint: `DELETE /tasks/:id`  
  - Soft-deletes a task by setting `isActive` to `false`.

## API Endpoints
### Search and Paginate Tasks
**Endpoint**: `GET /tasks`  
**Query Parameters**:
- `search` (optional): String to search in task titles.
- `page` (optional): Page number (default: 1).
- `limit` (optional): Number of tasks per page (default: 10).

**Example Response**:
```json
{
  "totalTasks": 50,
  "currentPage": 1,
  "tasks": [
    {
      "id": "task-id-1",
      "name": "Task Name 1",
      "description": "Task Description",
      "status": "Not Started",
      "isActive": true
    }
  ]
}
```

## Database Schema
### `tasks` Table
| Column       | Type         | Constraints                                                      |
|--------------|--------------|------------------------------------------------------------------|
| id           | UUID         | Primary Key, auto-generated.                                     |
| name         | VARCHAR(255) | Required.                                                       |
| description  | TEXT         | Required.                                                       |
| status       | VARCHAR(50)  | Default: `Not Started`. Allowed values: `Not Started`, `In Progress`, `Completed`. |
| isActive     | BOOLEAN      | Default: `true`.                                                |

## Getting Started
### Prerequisites
- Node.js installed.
- PostgreSQL database set up.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/soudeepghosh/Task-Management-API.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Task-Management-API
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up the PostgreSQL database and update connection details in the project.
5. Run the application:
   ```bash
   npm start
   ```

### Usage
- Access the API endpoints as documented above using tools like Postman or cURL.

## Contributing
Contributions are welcome! To contribute:
1. Fork this repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

## Contact
For questions or suggestions, reach out to [soudeepghosh7@gmail.com](mailto:soudeepghosh7@gmail.com).

