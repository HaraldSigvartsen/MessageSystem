const express = require("express");
const path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer);

io.on("connection", (socket) => {
  socket.on("message", ({ name, message }) => {
    io.emit("message", { name, message });
  });
});

app.use(cors());
app.use(
  session({
    secret: "uniqepassword",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/api/profile", (req, res) => {
  const { username } = req.session;
  if (!username) {
    return res.status(401).send();
  }
  res.json({ username });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin") {
    req.session.username = username;
    res.end();
  } else {
    res.sendStatus(401);
  }
});

app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
  } else {
    next();
  }
});

app.listen(3000, () => {
  console.log(`servers started on http://localhost:3000`);
});
