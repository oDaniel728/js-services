import * as services from "./toolkit/services.js";

/* 
# RESUMO DO SCRIPT
- Carrega serviços(helpers, ajudam a fazer tarefas complicadas)
- Pega a caixa de texto
- Cria uma sessão(memória persistente), depois injeta no sistema
- Quando a janela carregar: muda o valor da caixa de texto pro valor da sessão passada
- Quando digitar na caixa de texto: muda o valor da sessão

~ Session: { notepadContent: conteúdo do bloco de texto, string }
*/ 

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
