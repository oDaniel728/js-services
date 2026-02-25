import * as services from "./toolkit/services.js";
import * as typing from "./toolkit/typing.js";

const HtmlService = services.HtmlService;
const Element = HtmlService.Element;
const Document = HtmlService.Document;

const cssCode = /* css */ `
div.shape {
    position: absolute;
    width: 200px;
    height: 200px;
    background-color: red;
}

@keyframes rotate {
    100% {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}
`
Document.loadCSS("main", cssCode)

const div = Element.new("div", document.body)
Element.setClass( div, [ "shape" ] )
Element.setCSS(div, {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
})

const inner = Element.new("div", div);

Element.setCSS(inner, {
    position: "absolute",
    width: "30px",
    height: "30px",
    backgroundColor: "white",

    // centralizado dentro do vermelho
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
});

Element.animate(div, "rotate 2s cubic-bezier(.85,.12,.18,.87) infinite")