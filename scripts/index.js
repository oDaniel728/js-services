
//   ┌────────────────────────────────────────────────────────────────────────────┐
//   │ Arquivo de testes eu acho (lmao)                                           │
//   └────────────────────────────────────────────────────────────────────────────┘

import * as services from "./toolkit/services.js";
import * as typing from "./toolkit/typing.js";

const HtmlService = services.HtmlService;
const Element = HtmlService.Element;
const Document = HtmlService.Document;

const htmlCode = /* html */`<ul id="console"></ul>`;
Document.loadHTML(htmlCode, 'div', document.body);

const console = HtmlService.Console.new("#console", "li");
// styles em "/styles/index.css"

console.log("Hello, World!");

for (let i = 0; i < 10; i++) {
    const n = i + 1;
    if (n % 5 == 0)
        console.error(n);
    else if (n % 3 == 0)
        console.log(n);
    else
        console.warn(n);
}