const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const taskRoute = require("./routes/taskRoute");
const errorHandler = require("./middleWare/errorHandler");
const cookieParser = require("cookie-parser");
const http = require("http");
const socketIo = require("socket.io");

mongoose.set("strictQuery", true);

const app = express();
const server = http.createServer(app); // Create an HTTP Server

// Initialize Socket.IO and attach it to the HTTP server
const io = socketIo(server);

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//Route Middleware
app.use("/api/users", userRoute);
app.use("/api/tasks", taskRoute);

// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Error Middleware
app.use(errorHandler);

// Socket.IO event handlers
io.on("connection", (socket) => {
  console.log("Client connected");

  // Example: Emit a message to the client on connection
  socket.emit("message", "Welcome to the server!");

  // Example: Handle a client disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

//connect to DB and start Server
const PORT = process.env.PORT || 6000;
// mongoose.set('debug', true);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running on Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
