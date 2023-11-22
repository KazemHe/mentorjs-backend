const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
const http = require("http").createServer(app);
app.use(express.static("public"));

// Express App Config
app.use(cookieParser());
app.use(express.json());
// let corsOptions;

const io = require("socket.io")(http, {
    cors: {
    origin: "*",
  },
});
require("./services/socketService")(io);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname,'public')))
 } else {
  const corsOptions = {
  origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
  credentials: true
  }
  app.use(cors(corsOptions))
 }

const codeblockRoutes = require("./api/codeblock/codeBlock.routes");

app.use("/api/codeblock", codeblockRoutes);

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/photo/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
const port = process.env.PORT || 3030;
app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
app.listen(port, () => {
 console.log(`App listening on port ${port}!`)
});
