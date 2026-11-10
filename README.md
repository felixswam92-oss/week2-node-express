# Week 2 Node.js and Express API

A simple Express application built for the **Build & Deploy Your API** assignment.

## Features

- `GET /` — responds with `My Week 2 API!` to API clients and serves the static HTML page to browsers.
- `POST /user` — accepts `{ "name": "...", "email": "..." }` and responds with a greeting.
- `GET /user/:id` — responds with `User [id] profile`.
- JSON request-body parsing with `express.json()`.
- HTTP 400 error response when `name` or `email` is missing or invalid.
- Environment-based port using `.env`.
- Static HTML page served at `/` from the `public` folder.
- Bonus request-logging middleware.

## Requirements

- Node.js and npm

## Setup

1. Open a terminal in this project folder.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and keep `PORT=3000` (or choose another port).
4. Start the server:

   ```bash
   npm start
   ```

5. Open `http://localhost:3000` in your browser to view the static page.

## Test the API

### GET /

```bash
curl -H "Accept: text/plain" http://localhost:3000/
```

Expected response:

```text
My Week 2 API!
```

### POST /user

```bash
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name":"Felix","email":"felix@example.com"}'
```

Expected response:

```json
{
  "message": "Hello, Felix!",
  "user": {
    "name": "Felix",
    "email": "felix@example.com"
  }
}
```

If either field is missing, the API returns HTTP `400`.

### GET /user/:id

```bash
curl http://localhost:3000/user/123
```

Expected response:

```text
User 123 profile
```

## Project structure

```text
week2-node-express/
├── public/
│   └── index.html
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## GitHub submission

Create a GitHub repository named `week2-node-express`, then upload the contents of this folder. Do not upload the `.env` file or `node_modules` folder.
