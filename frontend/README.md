
🚀 GigFlow – Mini Freelance Marketplace

GigFlow is a full-stack freelance marketplace where users can post gigs (jobs) and apply by submitting bids.
It demonstrates secure authentication, relational data modeling, and real-world hiring logic commonly used in production systems.

⸻

📌 Project Overview
	•	Users can register, log in, and log out securely.
	•	Any logged-in user can post gigs with a title, description, and budget.
	•	Users can browse open gigs and search them by title.
	•	Freelancers can submit bids with a message and proposed price.
	•	The gig owner can review all bids and hire one freelancer.
	•	Hiring updates gig and bid statuses consistently.

⸻

🛠️ Tech Stack

Frontend
	•	React.js (Vite)
	•	Tailwind CSS
	•	Axios

Backend
	•	Node.js
	•	Express.js
	•	MongoDB (Mongoose)

Authentication
	•	JWT (JSON Web Tokens)
	•	Stored securely using HttpOnly cookies

⸻

✨ Features

🔐 Authentication
	•	User registration
	•	User login & logout
	•	JWT-based authentication using HttpOnly cookies
	•	Protected routes via middleware

📄 Gig Management
	•	View all open gigs
	•	Backend-powered search by title
	•	Create new gigs (authenticated users)
	•	View gigs posted by the logged-in user (My Gigs)

💬 Bidding System
	•	Submit bids with message and price
	•	View all bids for a gig
	•	Bid count visible per gig

✅ Hiring Logic
	•	Gig owner can hire only one freelancer
	•	On hiring:
	•	Gig status → assigned
	•	Selected bid → hired
	•	Remaining bids → rejected
	•	Assigned gigs disappear from the public feed and appear under My Gigs

⸻

🔁 API Endpoints

Auth

Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login user
POST	/api/auth/logout	Logout user
GET	/api/auth/me	Get logged-in user

Gigs

Method	Endpoint	Description
GET	/api/gigs	Fetch all open gigs
GET	/api/gigs?search=	Search gigs by title
POST	/api/gigs	Create a new gig

Bids

Method	Endpoint	Description
POST	/api/bids	Submit a bid
GET	/api/bids/:gigId	Get bids for a gig
PATCH	/api/bids/:bidId/hire	Hire a freelancer


⸻

🧠 Database Models

User

{
  name,
  email,
  password
}

Gig

{
  title,
  description,
  budget,
  ownerId,
  status: "open" | "assigned"
}

Bid

{
  gigId,
  freelancerId,
  message,
  price,
  status: "pending" | "hired" | "rejected"
}


⸻

⚙️ Environment Setup

1️⃣ Clone Repository

git clone https://github.com/YOUR_USERNAME/GigFlow.git
cd GigFlow

2️⃣ Install Dependencies

# backend
cd backend
npm install

# frontend
cd ../frontend
npm install

3️⃣ Environment Variables

Create a .env file inside backend/:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


⸻

4️⃣ Run the Project

Backend

cd backend
node server.js

Frontend

cd frontend
npm run dev


⸻

🌟 Notes & Design Decisions
	•	Search functionality is implemented using backend query parameters (/api/gigs?search=).
	•	Authentication uses HttpOnly cookies for improved security.
	•	Hiring logic ensures data consistency by updating gig and bid statuses sequentially.
	•	MongoDB transactions and real-time notifications were not implemented but can be added as future enhancements.
	•	Clear separation of frontend and backend responsibilities.

⸻

🚀 Future Improvements
	•	MongoDB transactions to handle race conditions during hiring
	•	Role-based access control for bid visibility
	•	Real-time notifications using Socket.io
	•	Pagination and sorting for gigs and bids

⸻

👩‍💻 Author

Leena Ghuge

