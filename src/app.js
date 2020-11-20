const express = require("express");
const fetch = require("node-fetch");

app = express();

// VARIABLES
const baseCdnLink = "https://cdn.jsdelivr.net/gh/ano-js/anojs@latest/animation-files/";

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/files/:animationFileName", (req, res) => {
  // Setting matching object
  const matcher = req.query;

  // Gets filename passed in
  const animationFileName = req.params.animationFileName;

  // Grabbing file contents from jsDelivr
  fetch(baseCdnLink + animationFileName, {
    method: "GET"
  }).then((response) => {
    return response.text();
  }).then((animationFileContent) => {
    // Replacing file contents with query parameters
    for (match of Object.entries(matcher)) {
      animationFileContent = animationFileContent.replace(match[0], match[1])
    }

    // ADDING USE TO ANIMATION
    // FORMATTING FILENAME INTO IDNAME
    let animationIdName = animationFileName.split(".")[0];
    animationIdName = animationIdName.split("-");
    animationIdName.shift();
    animationIdName = animationIdName.join("-");

    // MAKING POST REQUEST TO ADD USE TO ANIMATION
    fetch(`http://anojs.com/app/add-use-to-animation?animationIdName=${animationIdName}`, {
      method: "POST"
    });

    res.send(animationFileContent);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`[+] Ano.js CDN server listening on port ${PORT}...`);
});
