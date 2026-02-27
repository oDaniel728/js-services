# CookieService

Gerencia cookies do navegador de forma simplificada, com suporte a serialização JSON automática.

Como importar:
```js
import { CookieService } from "./toolkit/services.js";
```

---

## Métodos

### `CookieService.setCookie(name, obj, days?)`

Define um cookie com o nome `name`, valor `obj` e duração de `days` dias.

- `name: string` — nome do cookie
- `obj: any` — valor do cookie (será serializado como JSON)
- `days?: number` — duração em dias (padrão: `7`)

```js
CookieService.setCookie("usuario", { nome: "Daniel", nivel: 3 });
// Define o cookie "usuario" por 7 dias

CookieService.setCookie("tema", "escuro", 30);
// Define o cookie "tema" por 30 dias
```

---

### `CookieService.getCookie(name, def)`

Lê um cookie pelo nome. Retorna `def` caso o cookie não exista.

- `name: string` — nome do cookie
- `def: T` — valor padrão, caso o cookie não seja encontrado
- **retorna:** `T`

```js
const usuario = CookieService.getCookie("usuario", null);
// { nome: "Daniel", nivel: 3 } ou null

const tema = CookieService.getCookie("tema", "claro");
// "escuro" ou "claro" (padrão)
```

---
[LocalStorageService ▶](./localStorageService.md)