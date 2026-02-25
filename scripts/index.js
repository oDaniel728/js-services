import * as services from "./toolkit/services.js";
import * as typing from "./toolkit/typing.js";

const HtmlService = services.HtmlService;
const Element = HtmlService.Element;

let h1 = typing.nullbut(HTMLHeadingElement);

if (!h1) {
    h1 = Element.new("h1", document.body);
    Element.setId(h1, "texto");
}

Element.setText(Element.getAllByQuery("h1#texto"), "Hello, World!");