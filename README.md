# 📰 EchoTimes

EchoTimes is a full-stack news website that delivers the latest headlines from around the world using the **NewsAPI**. This project was my **first complete web development project**, where I learned how to build a dynamic web application by integrating a frontend, backend, database, and a third-party API.

Rather than focusing only on the user interface, this project helped me understand how different parts of a web application communicate with each other—from handling user requests on the server to fetching live news and storing user information in a database.

Although it was built early in my web development journey, EchoTimes laid the foundation for my understanding of full-stack development.

---

## 🚀 Features

- 📰 Displays the latest news articles fetched from NewsAPI
- 👤 User Registration
- 🔐 User Login System
- 📄 Dynamic web pages using EJS
- 🗂️ News categorized and displayed in a clean layout
- 🗄️ User information stored using MySQL
- ⚡ Express.js backend for handling routes and server logic
- 📱 Responsive interface for different screen sizes

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript
- EJS (Embedded JavaScript Templates)

### Backend
- Node.js
- Express.js

### Database
- MySQL

### APIs
- NewsAPI (for fetching live news)

### Other Packages
- dotenv
- mysql
- node-fetch

---

## 📂 Project Structure

```
EchoTimes/
│
├── backend/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   ├── public/
│   └── views/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/EchoTimes.git
```

### 2. Navigate into the project

```bash
cd EchoTimes
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the backend directory.

Example:

```env
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name

API_KEY=your_newsapi_key
```

---

### 5. Start the server

```bash
npm start
```

or

```bash
node server.js
```

---

## 🗄️ Database

The project uses **MySQL** for storing user information.

A typical users table contains fields such as:

- User ID
- Username
- Email
- Password

---

## 📚 What I Learned

This project was an important milestone in my web development journey.
