# Premium Profile Builder App

A modern, responsive full-stack profile card builder application. This project features a React/Vite frontend with sleek glassmorphism styling, and an Express/Node.js/MongoDB backend that supports direct profile image uploads and dynamic profile card rendering.
Render Link : https://profile-card-main-1-3.onrender.com/
---

## 🚀 Key Features

1. **Direct Image Uploads**: Upload profile images directly from your computer (replacing standard URL strings) with a premium drag-and-drop/clickable upload container and live preview.
2. **Comprehensive Profile Fields**:
   - Full Name & Job Title
   - Short Bio
   - Phone Number
   - Email Address
   - Blood Group (with clean select dropdown options)
   - Address
3. **One-Click Deletion**: Delete the profile card instantly. Clicking the delete icon (🗑️) removes the database record and cleans up the uploaded image from the server's disk storage.
4. **Premium Aesthetics**: Features custom Outfit fonts, soft transitions, hover card rotation effects, and glassmorphic translucent elements.

---

## 🛠️ Tech Stack

- **Frontend**: React (v19), Vite, Axios, Vanilla CSS (Outfit Font)
- **Backend**: Node.js, Express, MongoDB (Mongoose), Multer (Image file uploads)

---

## 📂 Project Structure

```
Profile-Card-main/
├── client/              # React Frontend
│   ├── src/
│   │   ├── components/  # ProfileForm.jsx, ProfileCard.jsx
│   │   ├── App.jsx      # Main state container & API handlers
│   │   ├── index.css    # Premium CSS design system
│   │   └── main.jsx
│   ├── .env             # Client environment variables
│   └── package.json
└── server/              # Express Backend
    ├── config/          # DB connection configuration
    ├── controllers/     # Profile controllers (creation, deletion)
    ├── middleware/      # Multer file upload setup
    ├── models/          # Mongoose database models
    ├── routes/          # API route definitions
    ├── uploads/         # Local directory for uploaded photos (auto-created)
    ├── server.js        # Server entry point
    ├── .env             # Server environment variables
    └── package.json
```

---

## ⚙️ Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed and a running MongoDB instance (or connection string).

---

### Step 1: Backend Setup

1. Open a terminal and navigate to the `server/` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server/` directory and configure your MongoDB connection string and server port:
   ```env
   MONGODB_URI = your_mongodb_connection_string
   PORT = 5000
   ```
4. Start the server (runs on `http://localhost:5000` by default):
   ```bash
   npm run dev
   ```
   *(Note: The server will automatically create an `uploads/` directory on startup if it doesn't already exist).*

---

### Step 2: Frontend Setup

1. Open another terminal and navigate to the `client/` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `client/` directory and point it to your backend's API endpoint:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the Vite development server (usually runs on `http://localhost:5173/` or `http://localhost:5174/`):
   ```bash
   npm run dev
   ```

---

## 🧪 Testing

1. Open your browser and navigate to the local address displayed by Vite (e.g. `http://localhost:5174`).
2. Fill out the form, upload a profile photo, and click **Generate Profile Card**.
3. View the generated premium profile card side-by-side with the form.
4. Hover over the card to see the rotation animations.
5. Click the trash can icon (🗑️) in the card's header to immediately delete the card and clean up files.
