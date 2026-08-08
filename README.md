<div align="center">

# 📊 Poll & Survey Builder 

### A Modern Real-Time Voting & Polling Single Page Application

[![Vue.js](https://img.shields.io/badge/Vue.js-3.0-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Alpine_Nginx-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

[API Integration](#-api-integration-mapping) • [Architecture](#️-architecture) • [Docker Setup](#-docker-deployment)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🚀 Tech Stack](#-tech-stack)
- [⚡ Quick Start](#-quick-start)
- [🐳 Docker Deployment](#-docker-deployment)
- [📡 API Integration Mapping](#-api-integration-mapping)
- [🔐 State & Authorization](#-state--authorization)
- [🌐 Real-time Updates](#-real-time-updates-signalr)

---

## ✨ Features

<div align="center">

| Feature | Description |
|---------|-------------|
| ⚡ **Instant Setup** | Create polls instantly with zero registration |
| 📊 **Real-Time Analytics** | Watch votes come in live via SignalR WebSockets |
| 🛡️ **Admin Panel** | Manage, edit, and close polls using secure creator tokens |
| 🔗 **Easy Sharing** | One-click copy for shareable voting links |
| 🎨 **Modern UI/UX** | Smooth animations, toast notifications, and responsive design |
| 🐳 **Containerized** | Production-ready multi-stage Docker setup with Nginx |

</div>

---

## 🏗️ Architecture

### Frontend Component Breakdown

```
┌─────────────────────────────────────────────────────────────┐
│                    🌐 Vue 3 + Vite SPA                       │
└───────────────┬─────────────────────────┬───────────────────┘
                │                         │
        ┌───────▼────────┐        ┌───────▼────────┐
        │  🏠 Views      │        │  🧩 Components │
        │  (Page Level)  │        │  (Reusables)   │
        └───────┬────────┘        └───────┬────────┘
                │                         │
      ┌─────────┼─────────┐     ┌─────────┼──────────┐
      │ HomeView          │     │ BaseInput        │
      │ CreatePollView    │     │ BaseButton       │
      │ EditPollView      │     │ PollVoteHero     │
      │ PollVote          │     │ EditPollHero     │
      │ PollResultsView   │     │ ...              │
      └───────────────────┘     └──────────────────┘
```

**Component Responsibilities:**
- **`HomeView`**: Landing page, feature highlights, and navigation.
- **`CreatePollView`**: Form to submit new poll questions and options.
- **`EditPollView`**: Admin panel for poll creators (Edit/Close/Delete).
- **`PollVote`**: Voting interface for standard users.
- **`PollResultsView`**: Result visualization updating in real-time.
- **`helps/api.js`**: Centralized Axios instance & SignalR config.

---

## 🚀 Tech Stack

### Frontend & Build Tools

<div align="center">

| Technology | Purpose |
|------------|---------|
| ![Vue.js](https://img.shields.io/badge/Vue.js-3.0-4FC08D?style=flat-square&logo=vue.js&logoColor=white) | Frontend Reactive Framework |
| ![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?style=flat-square&logo=vite&logoColor=white) | Next-Generation Build Tool |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) | Utility-first CSS framework |
| ![Axios](https://img.shields.io/badge/Axios-HTTP-5A29E4?style=flat-square) | HTTP Client for API communication |
| ![SignalR](https://img.shields.io/badge/SignalR-WebSockets-008AD7?style=flat-square) | Real-time WebSocket integration |

</div>

### Infrastructure

<div align="center">

| Technology | Purpose |
|------------|---------|
| ![Docker](https://img.shields.io/badge/Docker-Latest-2496ED?style=flat-square&logo=docker&logoColor=white) | Containerization |
| ![Nginx](https://img.shields.io/badge/Nginx-Alpine-009639?style=flat-square&logo=nginx&logoColor=white) | Production Static File Server |

</div>

---

## ⚡ Quick Start

### Prerequisites
- Node.js 18 or newer
- npm (Node Package Manager)

### Local Development

```bash
# Clone the repository
git clone https://github.com/Neuyngudcal/poll-survey-frontend.git
cd poll-survey-frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev

# Access the application
# Frontend: http://localhost:5173
```

### Environment Configuration
The backend API Gateway endpoints are currently configured in `src/helps/api.js`:
```javascript
export const API_BASE_URL = 'https://poorpollsurvey.up.railway.app/polls';
export const HUB_BASE_URL = 'https://poorpollsurvey.up.railway.app/hubs/polls';
```

---

## 🐳 Docker Deployment

### Multi-Stage Build

The application uses an optimized two-stage Docker build to ensure the production image is extremely lightweight.

```dockerfile
# Stage 1: Build (Node.js)
FROM node:20-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production (Nginx)
FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Run with Docker

```bash
# Build the image
docker build -t pollco-frontend .

# Run the container on port 8080
docker run -d -p 8080:80 pollco-frontend
```

*(Note: The included `nginx.conf` ensures Vue Router's History mode functions correctly by falling back to `index.html` on deep links).*

---

## 📡 API Integration Mapping

The frontend communicates with the .NET Backend API Gateway via the centralized `apiClient`. 

| Operation | Target API Route | HTTP Method | Frontend Action |
|-----------|------------------|-------------|-----------------|
| **Create Poll** | `/` | `POST` | Stores returned `creatorToken` in `localStorage` |
| **Get Poll** | `/{code}` | `GET` | Renders the Voting interface (`PollVote.vue`) |
| **Update Poll** | `/{code}` | `PUT` | Sends updated question/options + `creatorToken` |
| **Delete Poll** | `/{code}` | `DELETE` | Passes token in `X-Creator-Token` header |
| **Close Poll** | `/{code}/close` | `PATCH` | Locks poll from further voting |
| **Submit Vote** | `/{code}/vote` | `POST` | Submits selected `optionId` |
| **Get Results** | `/{code}/results` | `GET` | Fetches initial vote aggregation |

---

## 🔐 State & Authorization

Because there is currently no global user login system, authorization is handled via **Capability-Based Tokens**.

1. **Token Generation:** When a poll is created, the backend returns a `creatorToken`.
2. **Local Storage:** The frontend saves this token as `poll_token_{code}`.
3. **Admin Access:** The `EditPollView.vue` checks `localStorage` for this token to prove ownership.
4. **Warning:** If a user clears their browser cache or switches devices, the poll becomes "orphaned" and they lose admin access.

---

## 🌐 Real-time Updates (SignalR)

The `PollResultsView.vue` is fully integrated with **Microsoft SignalR WebSockets**. 

Instead of traditional HTTP Short Polling, the frontend maintains a persistent WebSocket connection to the backend (`/hubs/polls`). 
- **Join Room:** It invokes the `WatchPoll(code)` method upon connection.
- **Listen:** It listens for the `ResultsUpdated` event broadcasted by RabbitMQ.
- **React:** Upon receiving the event, it instantly triggers a silent refresh to update the Vue reactive state without user interruption.

---

<div align="center">

**Developed for AMD201**

[![GitHub](https://img.shields.io/badge/GitHub-Neuyngudcal-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Neuyngudcal/poll-survey-frontend)

</div>
