<div align="center">

# 📊 Poll & Survey Builder

### A Modern Microservices-Based Real-Time Voting Platform

[![.NET](https://img.shields.io/badge/.NET-10.0-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.0-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![PostgreSQL](https://img.shields.io/badge/Neon_PostgreSQL-15-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech/)
[![RabbitMQ](https://img.shields.io/badge/RabbitMQ-Message_Broker-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)](https://www.rabbitmq.com/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

[API Docs](#-api-documentation) • [Architecture](#️-architecture) • [Docker Deployment](#-docker-deployment)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🚀 Tech Stack](#-tech-stack)
- [⚡ Quick Start](#-quick-start)
- [🐳 Docker Deployment](#-docker-deployment)
- [📡 API Documentation](#-api-documentation)
- [🔐 Authentication & Boundaries](#-authentication--boundaries)
- [🌐 Real-Time SignalR](#-real-time-signalr)

---

## ✨ Features

<div align="center">

| Feature | Description |
|---------|-------------|
| ⚡ **Instant Setup** | Create polls instantly with zero registration |
| 📊 **Real-Time Analytics** | Watch votes come in live via SignalR & RabbitMQ |
| 🛡️ **Capability Security** | Manage, edit, and close polls using secure creator tokens |
| 🔗 **Microservices** | Fully decoupled backend with Ocelot API Gateway |
| 💾 **Neon Postgres** | Cloud-native serverless PostgreSQL isolation |
| 🐳 **Containerized** | Full Docker Compose support for easy deployment |

</div>

---

## 🏗️ Architecture

### Microservices Design

```text
┌─────────────────────────────────────────────────────────────┐
│                    💻 Vue 3 Frontend                         │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTP / WebSockets
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                    🌐 API Gateway (Ocelot)                   │
│                         Port 8080                            │
└───────────────┬─────────────────────────┬───────────┬───────┘
                │                         │           │
        ┌───────▼────────┐        ┌───────▼────────┐  │
        │  📊 Poll        │        │  🗳️ Voting      │  │
        │  Service        │        │   Service      │  │
        │  Port 8081      │        │   Port 8082    │  │
        └───────┬─────────┘        └──────┬─────────┘  │
                │                         │            │
        ┌───────▼─────────┐      ┌────────▼────────┐   │
        │  💾 Poll DB     │      │  💾 Vote DB     │   │
        │  (Neon Cloud)   │      │  (Neon Cloud)   │   │
        └─────────────────┘      └────────┬────────┘   │
                                          │            │
                                 ┌────────▼────────┐   │
                                 │  🐇 RabbitMQ    │◄──┘
                                 │  Port 5672      │
                                 └────────┬────────┘
                                          │
                                 ┌────────▼────────┐
                                 │ ⚡ Realtime Hub  │
                                 │  Port 8083      │
                                 └─────────────────┘
```

### Service Breakdown

**🌐 API Gateway** (Port 8080)
- Built with Ocelot
- Single entry point for all REST and WebSocket routes

**📊 Poll Service** (Port 8081)
- Poll CRUD operations and creator authorization
- Uses isolated Neon PostgreSQL project (`polls`, `poll_options` tables)

**🗳️ Voting Service** (Port 8082)
- Vote submission and result aggregation
- Uses isolated Neon PostgreSQL project (`votes` table)
- Calls Poll Service to validate polls and publishes events to RabbitMQ

**⚡ Realtime Service** (Port 8083)
- Subscribes to RabbitMQ vote events
- Broadcasts real-time SignalR updates to connected frontends

---

## 🚀 Tech Stack

### Backend

<div align="center">

| Technology | Purpose |
|------------|---------|
| ![.NET 10](https://img.shields.io/badge/.NET-10.0-512BD4?style=flat-square&logo=dotnet&logoColor=white) | Web API microservices framework |
| ![Entity Framework](https://img.shields.io/badge/Entity_Framework-Core-512BD4?style=flat-square&logo=dotnet&logoColor=white) | ORM for database access |
| ![Ocelot](https://img.shields.io/badge/Ocelot-Latest-FF6B6B?style=flat-square) | API Gateway routing |
| ![SignalR](https://img.shields.io/badge/SignalR-WebSockets-008AD7?style=flat-square) | Real-time WebSocket broadcasting |

</div>

### Frontend

<div align="center">

| Technology | Purpose |
|------------|---------|
| ![Vue.js](https://img.shields.io/badge/Vue.js-3.0-4FC08D?style=flat-square&logo=vue.js&logoColor=white) | Frontend Reactive Framework |
| ![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?style=flat-square&logo=vite&logoColor=white) | Next-Generation Build Tool |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) | Utility-first CSS styling |

</div>

### Infrastructure

<div align="center">

| Technology | Purpose |
|------------|---------|
| ![PostgreSQL](https://img.shields.io/badge/Neon_PostgreSQL-Serverless-4169E1?style=flat-square&logo=postgresql&logoColor=white) | Primary cloud database |
| ![RabbitMQ](https://img.shields.io/badge/RabbitMQ-Message_Queue-FF6600?style=flat-square&logo=rabbitmq&logoColor=white) | Asynchronous event messaging |
| ![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white) | Local orchestration & containerization |

</div>

---

## ⚡ Quick Start

### Backend Prerequisites
- Docker Desktop with Docker Compose
- Two configured Neon PostgreSQL projects
- Ports 5672, 15672 and 8080–8083 available

### 1. Configure Neon Databases
1. Create a Neon project for **PollService**.
2. Create a second Neon project for **VotingService**.
3. Copy the environment template:
   ```powershell
   Copy-Item .env.example .env
   ```
4. Replace values in `.env` with your direct Neon connection strings:
   ```env
   POLL_DB_CONNECTION_STRING=Host=...;Database=neondb;Username=...;Password=...;SSL Mode=Require;
   VOTE_DB_CONNECTION_STRING=Host=...;Database=neondb;Username=...;Password=...;SSL Mode=Require;
   ```
   *(Note: The services will automatically create their schemas `EnsureCreated` during startup).*

### 2. Run the System

From the backend solution directory:
```powershell
docker compose up -d --build
docker compose ps
docker compose logs poll-service voting-service --tail 100
```

To stop the backend:
```powershell
docker compose down
```

---

## 🐳 Docker Deployment

The local PostgreSQL Docker container has been removed. Docker now strictly runs the backend `.NET` services and `RabbitMQ`, while both PostgreSQL databases are hosted entirely in the Neon Cloud.

The Frontend utilizes a multi-stage `Node.js` + `Nginx Alpine` Dockerfile for production-ready static serving on port 80.

---

## 📡 API Documentation

Use `PollSurvey.http` in Visual Studio or Postman to test the gateway flow.
- PollService OpenAPI: `http://localhost:8081/openapi/v1.json`
- VotingService OpenAPI: `http://localhost:8082/openapi/v1.json`

### Poll Management (Poll Service)

#### Create a Poll (Public)
```http
POST http://localhost:8080/polls
Content-Type: application/json

{
  "question": "Which option do you prefer?",
  "options": ["Option A", "Option B"]
}

// 201 Created
{
  "code": "7fGh2Ab",
  "creatorToken": "private-token-returned-once",
  "sharePath": "/poll/7fGh2Ab",
  "createdAt": "2026-07-28T08:00:00+00:00"
}
```

#### Read a Poll (Public)
```http
GET http://localhost:8080/polls/7fGh2Ab
```

#### Update a Poll (Creator Only)
```http
PUT http://localhost:8080/polls/7fGh2Ab
Content-Type: application/json

{
  "creatorToken": "private-token-returned-by-create",
  "question": "Updated question?",
  "options": ["Updated Option A", "Updated Option B"]
}
// 200 OK | 403 Forbidden | 409 Conflict
```

#### Delete a Poll (Creator Only)
```http
DELETE http://localhost:8080/polls/7fGh2Ab
X-Creator-Token: private-token-returned-by-create

// 204 No Content
```
*(Implemented as a soft delete to prevent short-code reuse).*

#### Close a Poll (Creator Only)
```http
PATCH http://localhost:8080/polls/7fGh2Ab/close
Content-Type: application/json

{
  "creatorToken": "private-token-returned-by-create"
}
// 204 No Content
```

### Voting & Results (Voting Service)

#### Submit a Vote
```http
POST http://localhost:8080/polls/7fGh2Ab/vote
Content-Type: application/json

{
  "optionId": "69fd6ef0-f5c9-4831-94fb-d4307fb6289c"
}
```

#### Get Results
```http
GET http://localhost:8080/polls/7fGh2Ab/results
```

---

## 🔐 Authentication & Boundaries

- **Capability-Based Tokens:** The `creatorToken` is capability-based authorization, not account authentication. The frontend saves this strictly in `localStorage`. Anyone who obtains the token can manage that poll.
- **Vote Validation:** The frontend must use `credentials: "include"` for vote requests so the `HttpOnly` voter cookie is retained. A unique database constraint on `pollCode + voterTokenHash` enforces one vote per browser.
- **Service Dependency:** `VotingService` calls `PollService` to validate votes, meaning it is not fully independent during a `PollService` outage.
- **Production Secrets:** Ensure `EnsureCreated` is replaced with EF Core migrations in production, and use Deployment Secrets instead of `.env` files.

---

## 🌐 Real-Time SignalR

The Frontend fully integrates with the Backend's Realtime Service.

**Gateway Hub URL:**
```text
http://localhost:8080/hubs/polls
```

- **Client Method Invocation:** `WatchPoll(code)`
- **Server Event Listener:** `ResultsUpdated`

When `VotingService` registers a new vote, it publishes to `RabbitMQ`. The `RealtimeService` consumes this message and broadcasts `ResultsUpdated` via SignalR to all clients currently watching that poll, allowing the Vue frontend to update instantly without HTTP polling.
