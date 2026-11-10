require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Parse incoming JSON request bodies.
app.use(express.json());

// Bonus: custom middleware to log each request.
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// GET / - return the API message to API clients, and the static page to browsers.
app.get("/", (req, res, next) => {
  if (req.accepts("html")) {
    return res.sendFile(path.join(__dirname, "public", "index.html"));
  }
  return res.type("text").send("My Week 2 API!");
});

// Serve other static files from the public folder.
app.use(express.static(path.join(__dirname, "public")));

// POST /user - create/receive a user and greet them.
app.post("/user", (req, res) => {
  const { name, email } = req.body || {};

  if (
    typeof name !== "string" || !name.trim() ||
    typeof email !== "string" || !email.trim()
  ) {
    return res.status(400).json({
      error: "Both name and email are required."
    });
  }

  return res.status(200).json({
    message: `Hello, ${name.trim()}!`,
    user: {
      name: name.trim(),
      email: email.trim()
    }
  });
});

// GET /user/:id - return a simple user profile response.
app.get("/user/:id", (req, res) => {
  res.send(`User ${req.params.id} profile`);
});

// Return a clear response for invalid JSON.
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON request body." });
  }
  return next(err);
});

// General fallback error handler.
app.use((err, req, res, next) => {
  console.error(err.stack || err);
  res.status(500).json({ error: "Internal server error." });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
