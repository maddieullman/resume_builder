# My Resume Builder
## Project Setup
To get started with the project, follow these steps:
1. **Clone the Repository:**
   ```sh
   git clone <https://github.com/maddieullman/resume_builder>
   cd resume_builder
   ```

2. To run the application, use the following commands:
   Install dependencies:
      ```sh
      npm install
      ```
   Start the front-end and back-end servers:
      ```sh
      npm run start:both
      ```
   The application will run with the front-end on http://localhost:3000 and the back-end on http://localhost:3001.

3. API Documentation - Endpoints
   <br>
   Create a Resume
   <br>
   URL: POST /api/resumes
   <br>
   Request Body:
   ```sh
   {
   "name": "Jane Doe",
   "address": "123 Main St",
   "email": "janedoe@gmail.com",
   "phone": "111-111-1111",
   "college": "University of Blank",
   "major": "Computer Science",
   "gpa": "3.5",
   "gradDate": "May 2026",
   "experience": "Example job 1, Example job 2",
   "skills": "Skill 1, Skill 2",
   "projects": "Project 1, Project 2"
   }
   ```
  Response:
```sh
{
  "ok": true,
  "id": "some-document-id",
  "rev": "1-some-revision-id"
}
```

  Read Resumes
  <br>
  URL: GET /api/resumes
  <br>
  Response: 
  ```sh 
  {
    "_id": "some-id",
    "name": "Jane Doe",
    "address": "123 Main St",
    "email": "janedoe@gmail.com",
    "phone": "111-111-1111",
    "college": "University of Blank",
    "major": "Computer Science",
    "gpa": "3.5",
    "gradDate": "May 2026",
    "experience": "Example job 1, Example job 2",
    "skills": "Skill 1, Skill 2",
    "projects": "Project 1, Project 2"
  }
  ```

  Update a Resume
  <br>
  URL: PUT /api/resumes/:id
  <br>
  Request Body:
```sh
{
  "name": "Jane Doe",
  "address": "123 Main St",
  "email": "janedoe@gmail.com",
  "phone": "111-111-1111",
  "college": "University of Blank",
  "major": "Computer Science",
  "gpa": "3.5",
  "gradDate": "May 2026",
  "experience": "Example job 1, Example job 2",
  "skills": "Skill 1, Skill 2",
  "projects": "Project 1, Project 2"
}
```
  Response:
```sh
{
  "ok": true,
  "id": "some-document-id",
  "rev": "2-some-revision-id"
}
```
  Delete a Resume
  <br>
  URL: DELETE /api/resumes/:id
  <br>
  Response:
```sh
{
  "ok": true,
  "id": "some-document-id",
  "rev": "2-some-revision-id"
}
```
