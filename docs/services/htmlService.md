# HtmlService

Conjunto de utilitários para manipulação do DOM, do documento, animações, console visual e leitura de arquivos.

Como importar:
```js
import * as HtmlService from "./toolkit/services.js";
// ou individualmente:
import { Element, Document, Console, File } from "./toolkit/services.js";
```

---

## Element

Utilitários para criar, buscar e manipular elementos HTML.

### Criação e busca

#### `Element.new(tag, parent?)`

Cria um elemento HTML e, opcionalmente, o adiciona a um `parent`.

```js
const btn = Element.new("button", document.body);
```

#### `Element.getById(tag, id)`

Retorna um elemento pelo `id`, com tipagem inferida pela `tag`.

```js
const titulo = Element.getById("h1", "titulo");
```

#### `Element.getByClass(tag, className)`

Retorna todos os elementos com a `className` fornecida.

```js
const cards = Element.getByClass("div", "card");
```

#### `Element.getByQuery(query)`

Equivalente a `document.querySelector`, com tipo inferido pelo seletor.

```js
const input = Element.getByQuery("input#nome");
```

#### `Element.getAllByQuery(query)`

Equivalente a `document.querySelectorAll`, retorna `NodeList`.

```js
const botoes = Element.getAllByQuery("button.ativo");
```

#### `Element.getByQueryForce(query)`

Igual ao `getByQuery`, mas lança um erro se o elemento não for encontrado (nunca retorna `null`).

```js
const menu = Element.getByQueryForce("nav#menu");
```

#### `Element.exists(query)`

Verifica se existe algum elemento que satisfaça o seletor.

```js
Element.exists(".modal"); // true ou false
```

#### `Element.fragment()`

Retorna um `DocumentFragment` vazio.

```js
const frag = Element.fragment();
```

---

### Modificação

Todos os métodos abaixo aceitam um único elemento **ou** um iterável de elementos (`OneOrMany<T>`).

#### `Element.setAttrs(element, attrs)`

Define atributos HTML.

```js
Element.setAttrs(img, { src: "foto.png", alt: "Foto" });
```

#### `Element.setCSS(element, styles)`

Aplica estilos inline.

```js
Element.setCSS(div, { color: "red", display: "none" });
```

#### `Element.setText(element, value)`

Define `textContent`.

```js
Element.setText(span, "Olá, mundo!");
```

#### `Element.setHtml(element, value)`

Define `innerHTML`.

```js
Element.setHtml(div, "<strong>Destaque</strong>");
```

#### `Element.setId(element, id)`

Define o `id`.

```js
Element.setId(section, "principal");
```

#### `Element.setClass(element, className)`

Define as classes CSS. Aceita `string` ou `string[]`.

```js
Element.setClass(btn, ["btn", "btn-primary"]);
```

#### `Element.toggleClass(element, className, force?)`

Alterna uma classe. O parâmetro `force` força adição (`true`) ou remoção (`false`).

```js
Element.toggleClass(menu, "aberto");
Element.toggleClass(menu, "ativo", true); // força adicionar
```

#### `Element.remove(element)`

Remove o elemento do DOM.

```js
Element.remove(modal);
```

#### `Element.clear(element)`

Remove todos os filhos do elemento.

```js
Element.clear(lista);
```

---

### Eventos

#### `Element.on(element, type, listener)`

Adiciona um listener de evento a um único elemento.

```js
Element.on(btn, "click", (e) => console.log("clicou!"));
```

#### `Element.onAll(query, type, listener)`

Adiciona o mesmo listener a todos os elementos que satisfaçam o seletor. O callback recebe `(self, ev)`.

```js
Element.onAll("button.fechar", "click", (self, ev) => {
    self.closest(".modal")?.remove();
});
```

---

### Animação

#### `Element.animate(element, animation)`

Executa uma animação no elemento. Aceita dois formatos:

- **string** — nome de uma animação CSS já definida:
    ```js
    Element.animate(caixa, "fadeIn");
    // equivale a: element.style.animation = "fadeIn"
    ```

- **objeto** — usa a Web Animations API:
    ```js
    Element.animate(caixa, {
        keyframes: [
            { opacity: 0 },
            { opacity: 1 }
        ],
        options: { duration: 400, easing: "ease-out", fill: "forwards" }
    });
    ```

> Ao usar string, a animação anterior é removida e um reflow é forçado para garantir o reinício.

---

## Document

Utilitários para manipular o documento HTML: título, ícone, navegação, alertas e estilos.

### `Document.setTitle(title)`

Define o título da página.

```js
Document.setTitle("Minha Página");
```

### `Document.setIcon(icon)`

Define (ou substitui) o favicon.

```js
Document.setIcon("assets/icone.png");
```

### `Document.sendTo(href)`

Redireciona para outra URL.

```js
Document.sendTo("https://exemplo.com");
```

### `Document.windowAlert(message)`

Exibe um alerta nativo do navegador.

```js
Document.windowAlert("Operação concluída!");
```

### `Document.windowPrompt(message)`

Exibe um prompt nativo e retorna o texto digitado (ou `null`).

```js
const nome = Document.windowPrompt("Qual é o seu nome?");
```

### `Document.windowConfirm(message)`

Exibe um diálogo OK / Cancelar. Retorna `true` (OK) ou `false` (Cancelar).

```js
const confirma = Document.windowConfirm("Tem certeza?");
```

### `Document.addLinkStyleSheet(filename)`

Adiciona um `<link rel="stylesheet">` no `<head>`. O caminho será `styles/{filename}.css`. Se o link já existir, retorna o elemento existente.

```js
Document.addLinkStyleSheet("tema-escuro");
// <link rel="stylesheet" href="styles/tema-escuro.css">
```

### `Document.removeLinkStyleSheet(filename)`

Remove um `<link rel="stylesheet">`. Aceita o nome do arquivo (string) ou o próprio `HTMLLinkElement`. Retorna `true` se removeu com sucesso.

```js
Document.removeLinkStyleSheet("tema-escuro");
```

### `Document.loadCSS(name, content)`

Injeta CSS dinamicamente via `<style>` (string) ou `adoptedStyleSheets` (CSSStyleSheet). O parâmetro `name` funciona como identificador.

```js
Document.loadCSS("meu-estilo", "body { background: black; }");
```

### `Document.unloadCSS(name)`

Remove um CSS injetado pelo `loadCSS`. Retorna `true` se removeu.

```js
Document.unloadCSS("meu-estilo");
```

### `Document.loadHTML(code, as, where)`

Cria um elemento a partir de HTML inline e o insere em `where`. O parâmetro `as` pode ser uma tag (`string`) ou um `HTMLElement`.

```js
Document.loadHTML("<li>Item</li>", "ul", document.body);
```

---

## Console

Console visual que redireciona mensagens para elementos HTML ou para o console padrão.

### `Console.new(output, tag?)`

Cria um console. O parâmetro `output` pode ser:

- Um `HTMLElement` — as mensagens são adicionadas como filhos desse elemento
- Uma `string` (seletor CSS) — seleciona o elemento pelo seletor
- `"console"` — usa o console padrão do navegador

O parâmetro `tag` define a tag usada para cada mensagem (padrão: `"p"`).

```js
const meuConsole = Console.new("#saida", "p");
meuConsole.log("Tudo certo");     // <p class="log">Tudo certo</p>
meuConsole.warn("Atenção!");      // <p class="warn">Atenção!</p>
meuConsole.error("Falha grave");  // <p class="error">Falha grave</p>
```

### `Console.log(message)` / `Console.warn(message)` / `Console.error(message)`

Atalhos estáticos para o console padrão do navegador.

```js
Console.log("iniciando...");
Console.warn("valor inesperado");
Console.error("erro crítico");
```

---

## File

Utilitário para leitura de arquivos.

### `File.read(source)`

Lê o conteúdo de um arquivo. Aceita:

- `string` — URL ou caminho acessível via `fetch`
- `File` — objeto `File` do navegador (ex: `input[type=file]`)

Retorna uma `Promise<string>` com o conteúdo do arquivo.

```js
// Lendo via URL
const texto = await File.read("dados/config.json");

// Lendo via input
const input = document.querySelector("input[type=file]");
input.addEventListener("change", async () => {
    const conteudo = await File.read(input.files[0]);
    console.log(conteudo);
});
```

> Lança um erro HTTP se a requisição via `fetch` falhar.

---
[FactoryService ▶](./factoryService.md)