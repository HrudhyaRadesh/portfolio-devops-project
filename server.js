const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    message: "Backend server is running successfully",
  });
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      status: "error",
      message: "All fields are required",
    });
  }

  const newMessage = {
    name,
    email,
    message,
    time: new Date().toLocaleString(),
  };

  let messages = [];

  if (fs.existsSync("messages.json")) {
    const data = fs.readFileSync("messages.json");
    messages = JSON.parse(data);
  }

  messages.push(newMessage);

  fs.writeFileSync("messages.json", JSON.stringify(messages, null, 2));

  console.log("New Message Saved");

  res.json({
    status: "success",
    message: "Message saved successfully",
  });
});

app.get("/api/messages", (req, res) => {
  if (!fs.existsSync("messages.json")) {
    return res.json([]);
  }

  const data = fs.readFileSync("messages.json");

  res.json(JSON.parse(data));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
