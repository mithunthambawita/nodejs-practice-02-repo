const express = require("express");
const app = express();
const path = require("path");
//create the port
const PORT = process.env.PORT || 3500;

app.get("/", (req, res) => {
  res.sendFile("./views/index.html", { root: __dirname });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.....`);
});
