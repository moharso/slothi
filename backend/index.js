const express = require("express");
const app = express();
const port = 3000;
const axios = require("axios");

// Middleware to parse JSON bodies
app.use(express.json());

// Define API routes
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Fetch public timelines from Mastodon
app.get("/api/public-timelines", async (req, res) => {
  try {
    const response = await axios.get(
      "https://mastodon.example/api/v1/timelines/public"
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// Fetch public accounts and statuses from Mastodon
app.get("/api/public-accounts/:accountId", async (req, res) => {
  const { accountId } = req.params;
  try {
    const response = await axios.get(
      `https://mastodon.example/api/v1/accounts/${accountId}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// Fetch public instance data from Mastodon
app.get("/api/instance-data", async (req, res) => {
  try {
    const response = await axios.get(
      "https://mastodon.example/api/v1/instance"
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

/*
//Here I just tried to connect to server to make sure APIs work
app.get("/api/users", (req, res) => {
  // Logic to fetch users from the database
  res.json({
    users: [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
    ],
  });
});

app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  // Logic to create a new user in the database
  res.status(201).json({ message: "User created successfully" });
});
*/
