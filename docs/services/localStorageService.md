# LocalStorageService

Gerencia múltiplos `localStorage` nomeados, tipados e com persistência automática.

Como importar:
```js
import { LocalStorageService } from "./toolkit/services.js";
```

---

## Criando um storage

### `LocalStorageService.new(name, defaultValue)`

Cria (ou recupera, se já existir) um storage com nome `name` e valor padrão `defaultValue`.

- `name: string` — identificador único do storage
- `defaultValue: object` — objeto com os valores iniciais
- **retorna:** `LocalStorage<T, U>`

```js
const config = LocalStorageService.new("config", {
    tema: "claro",
    idioma: "pt-BR"
});
```

> Se um storage com o mesmo `name` já foi criado, ele é retornado sem sobrescrever os dados.

---

## Obtendo e removendo storages

### `LocalStorageService.get(name)`

Retorna um storage existente pelo nome, ou `undefined` se não existir.

```js
const config = LocalStorageService.get("config");
```

### `LocalStorageService.delete(name)`

Remove o storage completamente (da memória e do `localStorage`).

```js
LocalStorageService.delete("config");
```

---

## Métodos do storage (`LocalStorage`)

Todos os métodos abaixo estão disponíveis no objeto retornado por `LocalStorageService.new(...)`.

### `.setItem(key, value)`

Define o valor de uma chave.

```js
config.setItem("tema", "escuro");
```

### `.getItem(key)`

Retorna o valor de uma chave, ou `undefined`.

```js
const tema = config.getItem("tema"); // "escuro"
```

### `.removeItem(key)`

Remove uma chave do storage (somente na memória).

```js
config.removeItem("tema");
```

### `.save()`

Persiste os dados atuais no `localStorage` do navegador.

```js
config.save();
```

### `.load()`

Carrega os dados do `localStorage` para a memória. Se não houver dados salvos, mantém o `defaultValue`.

```js
config.load();
```

### `.getAll()`

Retorna todos os dados do storage como objeto.

```js
const todos = config.getAll();
// { tema: "escuro", idioma: "pt-BR" }
```

### `.setAll(values)`

Atualiza múltiplas chaves de uma vez.

```js
config.setAll({ tema: "claro", idioma: "en-US" });
```

### `.removeAll()`

Limpa todos os dados da memória e remove a entrada do `localStorage`.

```js
config.removeAll();
```

### `.hasKey(key)`

Verifica se uma chave existe.

```js
config.hasKey("tema"); // true ou false
```

### `.size()`

Retorna o número de chaves no storage.

```js
config.size(); // 2
```

### `.hook()`

Registra listeners automáticos: carrega os dados ao abrir a página (`load`) e salva ao fechar (`beforeunload`). Só é registrado uma vez por storage.

```js
config.hook();
// agora o storage persiste automaticamente entre sessões
```

### `.evaluateKey(key, cb)`

Lê uma chave, aplica a função `cb` sobre ela e salva o resultado. Se `cb` retornar `null` ou `undefined`, mantém o valor original.

```js
config.evaluateKey("pontos", (v) => v + 10);
// soma 10 aos pontos
```

---

## Exemplo completo

```js
const save = LocalStorageService.new("save", {
    pontos: 0,
    fase: 1
});

save.hook(); // carrega/salva automaticamente

save.evaluateKey("pontos", (p) => p + 100);
save.setItem("fase", 2);

console.log(save.getAll());
// { pontos: 100, fase: 2 }
```

---
[HtmlService ▶](./htmlService.md)