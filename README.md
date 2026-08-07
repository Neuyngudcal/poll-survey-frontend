# Poll & Survey Builder — Frontend

Vue 3 + Vite frontend for the AMD201 Poll & Survey Builder. It uses Tailwind CSS v4 for utility-first styling, Vue Router for Single Page Application (SPA) navigation, Axios for API communication, and Vue Sonner for toast notifications.

Account authentication remains future development; poll management is protected by a creator token returned by the backend when a poll is created. This token is securely saved in the browser's local storage.

## Architecture

All browser requests from this frontend application are routed through the backend API Gateway (typically `http://localhost:8080` in local development). The frontend service itself is a static bundle served by Nginx in production, or via Vite's development server.

### Component Responsibility

| Directory / Component | Responsibility |
| :--- | :--- |
| **`views/`** | Page-level components acting as route destinations. |
| ↳ `HomeView.vue` | Landing page, feature highlights, and navigation to poll creation. |
| ↳ `CreatePollView.vue` | Poll submission form. Sends questions and options to the API. |
| ↳ `EditPollView.vue` | Admin panel. Loads poll data and uses the local `creatorToken` to authorize PUT, DELETE, and PATCH (close) requests. |
| ↳ `PollVote.vue` | Voting interface. Fetches poll details and submits the user's selected option. |
| ↳ `PollResultsView.vue` | Result visualization. Displays aggregated vote data dynamically. |
| **`components/`** | Reusable UI building blocks, divided by domain (vote, ui, qa, home, edit, detail). |
| ↳ `BaseInput.vue` & `BaseButton.vue` | Standardized, themed UI elements ensuring design consistency. |
| **`helps/api.js`** | Centralized Axios instance. Handles request formatting, base URL configuration, and global API error interception. |
| **`router/index.js`** | Vue Router configuration mapping URLs to the respective View components, utilizing WebHistory for clean URLs without hashes. |

## Configure Environment

Unlike the backend which relies heavily on `.env` files for Neon database connections, the frontend primarily needs to know the location of the API Gateway.

Currently, the API endpoint is statically configured in `src/helps/api.js`.

Open `src/helps/api.js` and update the `API_BASE_URL`:

```javascript
// Local Development Gateway
// const API_BASE_URL = 'http://localhost:8080/polls';

// Production / Cloud Gateway
const API_BASE_URL = 'https://poorpollsurvey.up.railway.app/polls';
```

When building for production, ensure this points to your deployed API Gateway.

## Run Locally

**Requirements:**
- Node.js 18 or newer
- npm (Node Package Manager)

From the `frontend` solution directory, install dependencies:

```bash
npm install
```

Start the Vite development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The terminal will output the local network addresses:
```text
  VITE v8.1.0  ready in 300 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

To build for production locally and test the compiled assets:
```bash
npm run build
npm run preview
```

## Docker & Production Deployment

The application does not run a Node server in production. Docker runs a multi-stage build:
1. **Build Stage:** Uses `node:20-alpine` to install dependencies and run `npm run build`, producing a static `dist` folder.
2. **Production Stage:** Uses `nginx:alpine` to serve the static files, running extremely fast with minimal memory overhead.

**Build and Run the Docker Container:**

```bash
docker build -t pollco-frontend .
docker run -d -p 8080:80 pollco-frontend
docker ps
```

### Nginx Configuration

Because this is a Single Page Application (SPA), the Nginx server must route all unknown requests to `index.html`. This is handled by the included `nginx.conf` file:

```nginx
server {
    listen 80;
    server_name localhost;
    location / {
        root /usr/share/nginx/html;
        index index.html;
        # Fallback to index.html for Vue Router History mode
        try_files $uri $uri/ /index.html;
    }
}
```
Without this fallback, navigating directly to a poll link like `http://localhost:8080/poll/7fGh2Ab` and refreshing the page would result in a 404 Not Found from Nginx.

## API Integration Mapping & Axios Interceptors

The frontend communicates exclusively with the backend via the centralized `apiClient` in `src/helps/api.js`.

The interceptor automatically catches `204 No Content` responses (returning `true`) and extracts `response.data` for `200 OK` responses, simplifying component logic.

### 1. Create a Poll
**Method:** `addNewPoll(pollData)`
**Target:** `POST /` (API Gateway)
**Payload:**
```json
{
  "question": "Which option do you prefer?",
  "options": ["Option A", "Option B"]
}
```
**Frontend Action:** Upon a `201 Created` response, the frontend extracts `response.creatorToken` and saves it strictly to the browser's `localStorage` as `poll_token_{code}`. It then redirects the user to the poll detail view.

### 2. Read a Poll (Voting View)
**Method:** `viewPollByCode(code)`
**Target:** `GET /{code}` (API Gateway)
**Frontend Action:** Populates the `PollVote.vue` component. The frontend checks `localStorage` to see if a token exists for this code. If it does, an "Admin Panel" button is revealed to the user.

### 3. Update a Poll (Creator Only)
**Method:** `editPollByCode(code, pollData)`
**Target:** `PUT /{code}` (API Gateway)
**Payload:**
```json
{
  "creatorToken": "private-token-retrieved-from-localStorage",
  "question": "Updated question?",
  "options": ["Updated Option A", "Updated Option B"]
}
```
**Frontend Action:** Executed in `EditPollView.vue`. If the token is missing from `localStorage`, the frontend blocks the request entirely. If the backend returns `403 Forbidden` (invalid token) or `409 Conflict` (poll closed), a toast notification displays the error.

### 4. Delete a Poll (Creator Only)
**Method:** `deletePollByCode(code, creatorToken)`
**Target:** `DELETE /{code}` (API Gateway)
**Headers:** `X-Creator-Token: private-token-retrieved-from-localStorage`
**Frontend Action:** Triggers a permanent soft-delete. The user is redirected to the home page upon success.

### 5. Close a Poll (Creator Only)
**Method:** `closePoll(code, creatorToken)`
**Target:** `PATCH /{code}/close` (API Gateway)
**Payload:**
```json
{
  "creatorToken": "private-token-retrieved-from-localStorage"
}
```
**Frontend Action:** Marks the poll as closed. The UI updates to block further voting attempts.

### 6. Submit a Vote
**Method:** `votePoll(code, optionId)`
**Target:** `POST /{code}/vote` (API Gateway)
**Payload:**
```json
{
  "optionId": "69fd6ef0-f5c9-4831-94fb-d4307fb6289c"
}
```
**Frontend Action:** When the user selects a radio button and submits, this API is called. The frontend relies on the backend to enforce the "one vote per user" rule (via Voter Cookies or IP tracking) and redirect upon success.

## Real-time SignalR (Future Implementation)

While the backend currently broadcasts `ResultsUpdated` events to the `http://localhost:8080/hubs/polls` endpoint via SignalR and RabbitMQ, the frontend currently relies on HTTP GET fetching for results.

Future development roadmap for the frontend includes:
1. Installing `@microsoft/signalr`.
2. Initializing a `HubConnectionBuilder` in `PollResultsView.vue`.
3. Invoking the server method `WatchPoll(code)` upon mount.
4. Listening to `connection.on("ResultsUpdated", (data) => { ... })` to surgically update the Vue reactive state (`pollData.options`) without triggering a full HTTP request.

## Current Boundaries

- **State Persistence:** The creator token acts as capability-based authorization. Because there is no user login system (Identity), `localStorage` is the absolute sole source of truth for poll ownership. If a user clears their browser cache or switches to a different browser/mobile device, the poll becomes "orphaned" and they can no longer access the `EditPollView.vue` for that poll.
- **Vote Validation:** The frontend assumes the backend will handle duplicate voting prevention gracefully. The frontend UI does not track "has voted" state locally beyond current session variables; it defers to the API Gateway to return appropriate HTTP status codes (e.g., `409 Conflict` for duplicate votes), which the Axios interceptor catches to display a UI warning via `vue-sonner`.
- **Environment Management:** The `API_BASE_URL` is hardcoded in the `api.js` file for coursework simplicity rather than using Vite's `.env.production` / `.env.development` modes. Production systems should inject this via `.env` variables.
