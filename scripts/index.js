import * as services from "./toolkit/services.js";

// Carrega serviços
const HtmlService = services.HtmlService;
const LocalStorageService = services.LocalStorageService;
const Element = HtmlService.Element;
const DocProvider = HtmlService.Document;

// Carrega elementos
const textAreaText = Element.getByQueryForce("textarea#text");

// Cria a sessão
const Session = {
    notepadContent: ""
};
const SessionStorage = LocalStorageService.new("SessionStorage", Session);
SessionStorage.hook(); // Carrega os eventos ( load e unload )
// - Quando entrar no site: carrega o Storage;
// - Quando sair do site: salva o Storage.

// Carrega o texto no textAreaText
window.addEventListener("load", () => { textAreaText.value = Session.notepadContent })

// Quando digitar em textAreaText: Salva no session
textAreaText.addEventListener("input", /** @param { InputEvent & { target: HTMLTextAreaElement } } e */
function(e) {
    Session.notepadContent = e.target.value
});
