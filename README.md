# Pollco - Instant Polling Platform (Frontend)

![Vue.js](https://img.shields.io/badge/vue-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

Pollco is a modern, frictionless polling application built with Vue 3 and Vite. It allows users to create, share, and vote on polls instantly without registering, entering a password, or verifying an email.

## 🚀 Features

- **Zero Friction:** No sign-ups required. Open the app, type your question, and publish instantly.
- **Creator Admin Panel:** Secure creator tokens are automatically generated and stored locally, allowing the poll creator to edit options, close voting, or delete the poll at any time.
- **Shareable Links:** Easily copy and share poll links with your community.
- **Modern UI/UX:** Built with Tailwind CSS v4 for a highly responsive, beautiful, and interactive user experience.
- **Real-time Notifications:** Toast notifications powered by `vue-sonner` for seamless user feedback.

## 🛠️ Technology Stack

- **Framework:** Vue 3 (Composition API)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4
- **Routing:** Vue Router
- **HTTP Client:** Axios
- **Deployment:** Docker & Nginx (Multi-stage build)

## 📂 Project Structure

```text
src/
├── assets/        # Static assets (images, global CSS)
├── components/    # Reusable UI components (Buttons, Inputs, Modals, Sections)
│   ├── detail/
│   ├── edit/
│   ├── home/
│   ├── qa/
│   ├── ui/
│   └── vote/
├── helps/         # Helper functions and API configurations (api.js)
├── router/        # Vue Router configuration
├── views/         # Page-level components (Home, Create, Edit, Vote, Results, etc.)
├── App.vue        # Root component
└── main.js        # Application entry point
```

## ⚙️ Getting Started (Local Development)

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Neuyngudcal/poll-survey-frontend.git
   cd poll-survey-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure API Endpoint:**
   By default, the API base URL is configured in `src/helps/api.js`. Ensure it points to your running backend instance:
   ```javascript
   const API_BASE_URL = 'https://poorpollsurvey.up.railway.app/polls'; // Change for local backend if needed
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## 🐳 Docker Deployment

This project includes a multi-stage `Dockerfile` optimized for production using **Nginx**.

1. **Build the Docker Image:**
   ```bash
   docker build -t pollco-frontend .
   ```

2. **Run the Docker Container:**
   ```bash
   docker run -d -p 8080:80 pollco-frontend
   ```
   The application will be accessible at `http://localhost:8080`.

*(Note: If you are deploying to Render.com, simply connect your GitHub repository and Render will automatically detect the Dockerfile and deploy the application for you.)*

## 📜 Available Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Compiles and minifies the application for production.
- `npm run preview`: Locally previews the production build.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Neuyngudcal/poll-survey-frontend/issues).
