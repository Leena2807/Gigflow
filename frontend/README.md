

🚀 GigFlow – Mini Freelance Marketplace

GigFlow is a full-stack freelance marketplace where users can post gigs (jobs) and apply to them by submitting bids.
It demonstrates secure authentication, relational data modeling, and real-world hiring logic.

⸻

📌 Project Overview
	•	Users can post gigs with a title, description, and budget.
	•	Other users can browse open gigs and submit bids.
	•	The gig owner can review all bids and hire one freelancer.
	•	Hiring updates the gig and bid statuses correctly and consistently.

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
	•	Secure JWT authentication with HttpOnly cookies

📄 Gig Management
	•	View all open gigs
	•	Search gigs by title (backend-powered)
	•	Create new gigs
	•	View gigs posted by the logged-in user

💬 Bidding System
	•	Submit bids with price and message
	•	View all bids for a gig (gig owner only)
	•	Bid count displayed per gig

✅ Hiring Logic
	•	Gig owner can hire one freelancer
	•	On hiring:
	•	Gig status → assigned
	•	Selected bid → hired
	•	Remaining bids → rejected

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
GET	/api/gigs	Fetch open gigs
GET	/api/gigs?search=	Search gigs by title
POST	/api/gigs	Create a new gig

Bids

Method	Endpoint	Description
POST	/api/bids	Submit a bid
GET	/api/bids/:gigId	Get bids for a gig
PATCH	/api/bids/:bidId/hire	Hire freelancer


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

Create a .env file inside backend/

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

🌟 Notes
	•	Search functionality is implemented using backend query parameters.
	•	Authentication uses secure HttpOnly cookies.
	•	Clean separation between frontend and backend.
	•	UI styled using Tailwind CSS.

⸻

👩‍💻 Author

Leena Ghuge
