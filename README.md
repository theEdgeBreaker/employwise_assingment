Employwise Assingment
A simple React + Redux Toolkit project implementing user authentication and CRUD operations using the Reqres API.

🚀 Getting Started
1️⃣ Clone the Repository
bash
Copy
Edit
git clone https://github.com/theEdgeBreaker/employwise_assingment.git
cd reqres-task-management
2️⃣ Install Dependencies
bash
Copy
Edit
npm install
3️⃣ Run the Project
bash
Copy
Edit
npm run dev
The app will be available at: http://localhost:5173

📌 Features
✅ User Login (Email & Password)
✅ Navigate to User List after successful login
✅ Fetch and display users using Reqres API
✅ Edit and delete user functionality
✅ State management using Redux Toolkit
✅ Responsive UI with Tailwind CSS

🛠 API Endpoints Used
Login: POST https://reqres.in/api/login

Fetch Users (Paginated): GET https://reqres.in/api/users?page=1

Edit User: PUT https://reqres.in/api/users/{id}

Delete User: DELETE https://reqres.in/api/users/{id}

📌 Assumptions & Considerations
Users must enter both email and password to enable the login button.

No actual backend is implemented; it simulates authentication using Reqres API.

Users are fetched and displayed in a paginated list.

Edit functionality updates only first name, last name, and email.

Pagination is used instead.
