const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvent");
const { errorHandler } = require("./middleware/errorHandler");
const { error } = require("console");
//create the port
const PORT = process.env.PORT || 3500;

//custom middleware logger
app.use(logger);

const whiteList = [
  "https://www.yoursite.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
];
const crosOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new error("Not allowed by CROS"));
    }
  },
  optionsSuccessStatus: 200,
};
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
app.use("/subdir", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
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
