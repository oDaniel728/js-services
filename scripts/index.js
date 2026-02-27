import * as services from "./toolkit/services.js";

const HtmlService = services.HtmlService;
const LocalStorageService = services.LocalStorageService;
const Element = HtmlService.Element;
const DocProvider = HtmlService.Document;

const textAreaText = Element.getByQueryForce("textarea#text");

const Session = {
    notepadContent: ""
};
const SessionStorage = LocalStorageService.new("SessionStorage", Session);
SessionStorage.hook();

window.addEventListener("load", () => { textAreaText.value = Session.notepadContent })

textAreaText.addEventListener("input", /** @param { InputEvent & { target: HTMLTextAreaElement } } e */
function(e) {
    Session.notepadContent = e.target.value
});
