# 🧠 AI Story Generator

An AI-powered storytelling web application built with the **MERN stack** (MongoDB, Express, React, Node.js), integrated with a **free GPT API** to generate creative stories based on user input.

---

## 🚀 Features

- ✍️ Generate short stories using AI based on user prompt and selected genre
- 🔐 Secure authentication using JWT
- 🗂 Save and retrieve stories by logged-in users
- ❌ Delete stories
- 🌍 Free and open-source AI integration (ChatAnywhere GPT API)

---

## 🛠 Tech Stack

**Frontend:** React  
**Backend:** Node.js, Express  
**Database:** MongoDB Atlas  
**Auth:** JWT (JSON Web Tokens)  
**AI Model:** Free GPT API ([ChatAnywhere GPT Proxy](https://github.com/chatanywhere/GPT_API_free))  

---

---

## ⚙️ Installation & Setup

### 1. Clone the Repo
git clone https://github.com/yourusername/AI-Story-Generator.git
cd AI-Story-Generator

### 2. Setup Backend
cd backend
npm install

### Create a .env file inside backend/ and add:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPENAI_API_BASE=https://api.chatanywhere.com.cn/v1
OPENAI_API_KEY=your_dummy_api_key (anything, since it’s open)
### 3. Run Backend
nodemon server.js
Make sure MongoDB Atlas is connected.

📬 API Endpoints
Auth
POST /api/auth/signup
POST /api/auth/login

Story
POST /api/stories/generate → Requires JWT
GET /api/stories → Get all user stories
DELETE /api/stories/:id → Delete a story

🔐 Use Authorization: Bearer <token> in headers

🌟 Credits
ChatAnywhere GPT API Free
OpenAI
Chatgpt of course
And Me💐


