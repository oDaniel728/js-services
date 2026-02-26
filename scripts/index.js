import * as services from "./toolkit/services.js";
const HtmlService = services.HtmlService;
const LocalStorageService = services.LocalStorageService;


const Session = {
    notepadContent: ""
};
const SessionStorage = LocalStorageService.new("SessionStorage", Session);

HtmlService.Element.getByQueryForce("textarea#text").addEventListener("input", /** @param { InputEvent & { target: HTMLTextAreaElement } } e */
function(e) {
    Session.notepadContent = e.target.value
});

window.addEventListener("load", (e) => {
    SessionStorage.load();
    HtmlService.Element.getByQueryForce("textarea#text").value = Session.notepadContent;
})
window.addEventListener("beforeunload", (e) => {
    SessionStorage.save();
})
