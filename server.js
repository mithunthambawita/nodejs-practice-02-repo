const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const crosOptions = require('./config/corsOptions');
const { logger } = require("./middleware/logEvent");
const { errorHandler } = require("./middleware/errorHandler");
const { error } = require("console");
//create the port
const PORT = process.env.PORT || 3500;
//custom middleware logger
app.use(logger);
//cross origin resource sharing
app.use(cors(crosOptions));
// build-in middleware to handle urlencoded data
//in other words, form dat a
// 'content-type application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));
//build in middleware for json
app.use(express.json());
//serve static files
app.use(express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));


app.use("/employees", require("./routes/api/employees"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.....`);
});
