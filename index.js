const fs = require("fs");
const http = require("http");
const url = require("url");

const slugify = require("slugify");

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

const slugs = dataObject.map((el) => slugify(el.name, { lower: true }));

const server = http.createServer((request, response) => {
  const { query, pathname } = url.parse(request.url, true);

  if (pathname === "/" || pathname === "/overview") {
    response.writeHead(200, { "content-type": "text/html" });

    const cardsHtml = dataObject
      .map((el) => replaceTemplate(templateCard, el))
      .join("");
    const output = templateOverview.replace("{%PLANES__CARDS%}", cardsHtml);

    response.end(output);
  } else if (pathname === "/plane") {
    response.writeHead(200, { "content-type": "text/html" });
    const planeIndex = slugs.findIndex((el) => el === query.slug);
    const plane = dataObject[planeIndex];
    const output = replaceTemplate(templatePlane, plane);
    response.end(output);
  } else {
    response.writeHead(404, { "content-type": "text/html" });
    response.end("<h1>Page not found !!!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening to request at 127.0.0.1:8000");
});
