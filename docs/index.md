# Documentação

1. [Typing](#typing)
2. [Services](./services.md)

## Typing
Typing é um módulo utilizado pra dar suporte a tipagem ao javascript, algo que não é possível nativamente.

Como importar:
```js
import * as typing from "./toolkit/typing.js";
```

### Tipos básicos

#### Tipos primitivos

##### `typing.string`
- Tipo primitivo de texto.

##### `typing.number`
- Tipo primitivo de número(inteiro ou decimal).

##### `typing.boolean`
- Tipo primitivo de booleano(`true` ou `false`)

##### `typing.null_`
- Tipo primitivo vazio, o que sobra pro beta.

##### `typing.void_`
- Tipo primitivo vazio para funções.

##### `typing.any`
- Qualquer coisa

> NOTA: Não é recomendado que você use essas variáveis, todas elas são vazias, mas o javascript acha que são os tipos. Elas são apenas para a experiência do programador.

#### Tipos derivados

##### `typing.list(tipo): tipo[]`
- Cria uma lista do determinado tipo.
    ```javascript
    typing.list(typing.string);
    // string[]
    ```
    > `T[]` diz que é uma lista do tipo T  
    > `string[]` - lista de strings  
    > `number[]` - lista de números  
    > `string[][]` - lista de lista de strings  
    > etc.

##### `typing.dict(chave, valor): {[chave]: valor}`
- Cria um dicionário, cujo as chaves são `chave` e os valores são `valor`.  
    ```js
    typing.dict(typing.string, typing.number);
    // {[string]: number}
    ```
    > Chaves são `string`  
    > Valores são `number`  

### Tipos avançados
#### `typing.literal(...valores)`
- Cria um tipo literal, que deve ser um dos `valores`  
    ```js
    const nome = typing.literal("josé", "maria");
    // "josé" | "maria"
    ```
    > O valor deve ser constante;  
    > Quando tiver ` A | B `, significa que deve ser A ou B(útil pra valores exatos).

#### `typing.keysof(objeto): chaves de objeto`
- Pega todas as chaves de objeto.  
    Dado objeto `Pessoa`:
    ```js
    const Pessoa = {
        nome: "Daniel",
        idade: 16
    };
    ```
    ```js
    const chavesDePessoa = typing.keysof(Pessoa);
    // "nome" | "idade"
    ```
    > Retorna um valor literal das chaves, o valor deve ser uma das chaves do objeto, nesse caso, o valor deve ser `"nome"` ou `"idade"`.

#### `typing.union(valores)`
- Cria uma união de um tipo, podendo ser um de seus itens.
    ```js
    typing.union([typing.string, typing.number])
    // string | number
    ```
    > `valores` deve ser uma lista;  
    > `string | number` significa que o valor deve ser uma string ou um número.

#### `typing.intersect(objeto1, objeto2): objeto1 + objeto2`
- Cria um objeto novo cujo as chaves e valores são a soma do `objeto1` e `objeto2`.
    Dado os objetos Pessoa e ContaBancaria
    ```js
    const Pessoa = typing.struct({
        nome: typing.string,
        idade: typing.number
    });
    const ContaBancaria = typing.struct({
        saldo: typing.number
    });
    ```
    Segue o código:
    ```js
    const PessoaFisica = typing.instersect(Pessoa, ContaBancaria);
    /* PessoaFisica será
    {
        // propriedades de Pessoa
        nome: string,
        idade: number,

        // propriedades de ContaBancaria
        saldo: number
    }
    */
    ```
    > NOTA: `PessoaFisica` é um **tipo**, não confunda com um valor real.  
    > Veja [`typing.struct`](#typingstructobjeto).  

#### `typing.tuple(...valores)`
- Cria uma lista, mas com tipos e tamanho fixos.
    ```js
    const Posicao = typing.tuple(typing.number, typing.number, typing.number);
    // Posicao: [number, number, number]
    // tem 3 itens, e todos são number
    ```

#### `typing.callable(args, ret)`
- Cria um tipo função, cujo argumentos e retornos são tipados.
    ```js
    const tSomar = typing.callable(
        typing.tuple(typing.number, typing.number),
        typing.number
    )
    // (a: number, b: number) => number
    // - pede 2 números, e retorna outro
    ```
    > NOTA: Como dito anteriormente, tudo isso são tipos, não são valores válidos.

#### `typing.method(tipo, callback)`
- Cria uma função, mas dessa vez uma função de usável.
    Dado o tipo tSomar
    ```js
    const tSomar = typing.callable(
        typing.tuple(typing.number, typing.number),
        typing.number
    ); // (a: number, b: number) => number
    ```
    Segue o código:
    ```js
    const Somar = typing.method(tSomar, (a, b) => {
        return a + b;
    });
    ```

#### `typing.struct(objeto)`
- Cria um dicionário, mas as chaves e valores são exatamente definidos.
    ```js
    const Pessoa = typing.struct({
        nome: typing.string,
        idade: typing.number
    });
    ```
    > NOTA: Ele cria no formato de classe, pra receber o formato de objeto use [`typing.object`](#typingobjectobjeto)

#### `typing.type(valor)`
- Pega o tipo do `valor`
    ```js
    const string = typing.type("")
    // string
    ```

#### `typing.as(tipo, objeto)`
- Auxilia a criação de uma variável, sendo `objeto` um valor válido em `tipo`.  
    Dado o objeto tDia:
    ```js
    const tDia = typing.literal(
        "segunda", "terça", "quarta",
        "quinta", "sexta", "sábado",
                  "domingo"
    );
    ```
    segue o código:
    ```js
    // Exemplo 1 - Válido
    const Dia = typing.as(tDia, "segunda")
    // Exemplo 2 - Válido
    const Dia = typing.as(tDia, "terça")
    // Exemplo 3 - Inválido, objeto deve ser um valor válido em `tDia`.
    const Dia = typing.as(tDia, "janeiro")
    ```

#### `typing.notnull(objeto)`
- Se `objeto` puder ser `null`, ele tira essa possibilidade.
    Antes:
    ```js
    const Titulo = document.getElementById("#titulo");
    // HtmlElement | null
    ```
    Depois:
    ```js
    const Titulo = typing.notnull(
        document.getElementById("#titulo")
    );
    // HtmlElement
    ```

#### `typing.optional(objeto)`
- Faz com que `objeto` possa ser `null`.
    Dado o struct `Pessoa`;
    ```js
    const Pessoa = typing.struct({
        nome: typing.string,
        idade: typing.number,

        saldo: typing.optional(
            typing.number
        )
    });
    ```
    `Pessoa`:
    ```ts
    const Pessoa: {
        nome: string,
        idade: number,

        saldo: number?
    }
    ```

#### `typing.lock(objeto)`
- Tranca um dicionário `objeto`.
    > Trancar: desativar a opção de mudar os valores.

#### `typing.exclude(union_, tipo_)`
- Tira o tipo `tipo_` da união de tipos `union_`
    ```js
    const tUnion1 = typing.union([
        typing.string,
        typing.number
    ]); // tUnion1: string | number
    const tUnion2 = typing.exclude(tUnion1, typing.string); // tUnion2: number
    ```

#### `typing.extract(union_, tipo_)`
- Tira todos os tipos de uma união `union_`, exceto `tipo_`.
    ```js
    // tCores: "vermelho" | "amarelo" | "azul" | "verde"
    const tCores = typing.literal("vermelho", "amarelo", "azul", "verde")
    // tAzul: "azul"
    const tAzul = typing.extract(tUnion1, "azul")
    ```

#### `typing.parameters(func)`
- Retorna os parâmetros da função `func`.

#### `typing.object(objeto)`
- Retorna o tipo do struct `objeto`.
- Transforma `objeto` em um dicionário totalmente tipado.

#### `typing.cast(tipo, objeto)`
- Força o tipo em um objeto.
    Antes:
    ```js
    const Botao = document.getElementById("botao");
    // Botao: HTMLElement | null
    // não fala que é um botão
    ```
    Depois:
    ```js
    const Botao = typing.cast(
        HTMLButtonElement,
        document.getElementById("botao")
    );
    // Botao: HTMLButtonElement
    // fala explicitamente que é um botão
    ```
    > NOTA: O valor do objeto não muda, apenas o tipo no editor.

#### `typing.createDefault(objeto, mapa)`
- Cria um objeto a partir de um mapa
- Sendo:
    - objeto: `{[string]: any}`
    - mapa: `{[string]: any}`

#### `typing.nullbut(tipo)`
- Cria um valor nulo temporário, que um dia vai ser do tipo `tipo`.

[Serviços ▶](services.md)