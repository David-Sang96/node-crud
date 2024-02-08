import fs from "fs";
import http, { IncomingMessage, ServerResponse } from "http";
import nanoid from "nanoid";
import { Menu, MenuCategory } from "./types";
const port = 4000;

let menus: Menu[] = [];
const menuCategory: MenuCategory[] = [];

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;
    if (url === "/") {
      switch (method) {
        case "GET":
          const data = fs.readFileSync("index.html");
          res.write(data);
          // res.writeHead(200, { "content-type": "application/json" });
          // res.setHeader("content-type","application/json")
          // res.statusCode = 200
          res.end();
          break;
        case "POST":
          break;
        case "PUT":
          break;
        case "DELETE":
          break;
      }
    } else if (url === "/script.js") {
      const data = fs.readFileSync("script.js");
      res.write(data);
      res.end();
    } else if (url.includes("/menu")) {
      switch (method) {
        case "GET":
          res.write(JSON.stringify(menus));
          res.end();
          break;
        case "POST":
          let data = "";
          req.on("data", (chunk) => {
            data += chunk;
          });
          req.on("end", () => {
            const menu = JSON.parse(data);
            menu.id = nanoid.nanoid();
            menus.push(menu);
            res.write(JSON.stringify(menus));
            res.end();
          });
          break;
        case "PUT":
          break;
        case "DELETE":
          const id = url.split("=")[1];
          menus = menus.filter((item) => item.id !== id);
          res.write(JSON.stringify(menus));
          res.end();
          break;
      }
    }
  }
);

server.listen(port, () => console.log(`server is listening on port ${port}`));
