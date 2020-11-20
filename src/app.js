const express = require("express");

app = express();

app.get("/", (req, res) => {
  res.send("Hello world!");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`[+] Ano.js CDN server listening on port ${PORT}...`);
});
