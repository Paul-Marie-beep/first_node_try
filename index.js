const fs = require("fs");
const http = require("http");
const url = require("url");

const replaceTemplate = require("./modules/replaceTemplate");
//////////////////////////////////////////////////////////////////////

const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const templatePlane = fs.readFileSync(
  `${__dirname}/templates/template-plane.html`,
  "utf-8"
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const dataObject = JSON.parse(data);

const server = http.createServer((request, response) => {
  const route = request.url;

  console.log("server trig");

  if (route === "/" || route === "/overview") {
    console.log("route trig");
    response.writeHead(200, { "content-type": "text/html" });

    const cardsHtml = dataObject
      .map((el) => replaceTemplate(templateCard, el))
      .join("");
    const output = templateOverview.replace("{%PLANES__CARDS%}", cardsHtml);

    response.end(output);
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening to request at 127.0.0.1:8000");
});
