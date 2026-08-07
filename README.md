# Poll & Survey Builder — Frontend

Vue 3 + Vite frontend for the AMD201 Poll & Survey Builder. It uses Tailwind CSS v4, Vue Router, Axios, and Vue Sonner. Account authentication remains future development; poll management is protected by a creator token that is securely saved in the browser's local storage upon poll creation.

## Architecture

All API requests are routed through the backend API Gateway. By default, the application connects to the production backend hosted at `https://poorpollsurvey.up.railway.app/polls`.

### Component Responsibilities

| View / Component | Responsibility |
| :--- | :--- |
| **HomeView** | Landing page, feature highlights, and navigation to poll creation. |
| **CreatePollView** | Poll submission form. Sends questions and options to the API. |
| **EditPollView** | Admin panel. Loads poll data and uses the local `creatorToken` to authorize PUT, DELETE, and PATCH (close) requests. |
| **PollVote** | Voting interface. Fetches poll details and submits the user's selected option. |
| **PollResultsView** | Real-time result visualization. Displays aggregated vote data for a specific poll. |
| **api.js** (`helps/`) | Centralized Axios instance. Handles request formatting, base URL configuration, and API error interception. |

### State & Authorization Ownership

- **Creator Tokens:** When a poll is created, the backend returns a unique `creatorToken`. The frontend immediately stores this in `localStorage` under the key `poll_token_{code}`.
- **Admin Panel Access:** The `EditPollView` requires this local token to prove ownership. If the user clears their browser data or switches devices, they lose admin access to the poll.
- **Voter Tracking:** The frontend relies on the backend to enforce the "one vote per user" rule (typically via HttpOnly cookies and IP/Browser hashing). The frontend's Axios instance must be configured to pass credentials if cookies are used.

## Configure & Run

**Requirements:**
- Node.js 18+ and npm
- Backend API running locally (Port 8080) or a hosted instance.

**1. Clone and Install:**
From the frontend directory:
```bash
npm install
```

**2. Configure API Endpoint:**
Open `src/helps/api.js` and ensure the `API_BASE_URL` points to your active backend gateway.
```javascript
// For local backend:
// const API_BASE_URL = 'http://localhost:8080/polls';

// For production backend:
const API_BASE_URL = 'https://poorpollsurvey.up.railway.app/polls';
```

**3. Run Development Server:**
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## Docker & Production Deployment

The local `node_modules` are not used in production. Docker runs a multi-stage build that compiles the Vite application into static files and serves them using an Alpine Nginx container.

**Run with Docker:**
```bash
docker build -t pollco-frontend .
docker run -d -p 8080:80 pollco-frontend
```
The application will be accessible at `http://localhost:8080`.

**Nginx Configuration:**
The included `nginx.conf` is optimized for Vue Router's History mode. It falls back to `index.html` for any unknown routes to prevent 404 errors when users refresh the page on routes like `/poll/7fGh2Ab`.

## API Integration Mapping

The frontend consumes the backend CRUD API via `src/helps/api.js`.

| Operation | Frontend Method | Target API Route | Authorization |
| :--- | :--- | :--- | :--- |
| **Create** | `addNewPoll(data)` | `POST /` | Public |
| **Read** | `viewPollByCode(code)` | `GET /{code}` | Public |
| **Update** | `editPollByCode(code, data)` | `PUT /{code}` | Creator token (in body) |
| **Delete** | `deletePollByCode(code, token)` | `DELETE /{code}` | Creator token (in `X-Creator-Token` header) |
| **Close** | `closePoll(code, token)` | `PATCH /{code}/close` | Creator token (in body) |
| **Vote** | `votePoll(code, optionId)` | `POST /{code}/vote` | Public |
| **Results** | `getPollResults(code)` | `GET /{code}/results` | Public |

## Real-time Updates (Future integration)

Currently, results are fetched via HTTP GET. To fully utilize the backend's Realtime Service (`8083`) and RabbitMQ setup:
- The frontend will need to integrate the `@microsoft/signalr` package.
- Connect to the gateway hub URL: `http://localhost:8080/hubs/polls`.
- Invoke the `WatchPoll(code)` method and listen for `ResultsUpdated` events to update the DOM reactively without polling.

## Current Boundaries

- The creator token acts as capability-based authorization. Since there is no user login system, `localStorage` is the sole source of truth for poll ownership.
- If a user loses their `localStorage` data, the poll becomes orphaned and can no longer be edited or closed.
- The frontend assumes the backend will handle duplicate voting prevention gracefully and return appropriate HTTP status codes (e.g., `409 Conflict`), which the Axios interceptor catches to display a UI Toast message.
