# FactoryService

Conjunto de utilitários para criação e recriação de Instâncias(ou Structs)

Como importar:
```js
import * as services from "./toolkit/services.js";
const FactoryService = services.getService("FactoryService");
```

Conteúdos:
1. [Struct](#struct)  
    1.1. [Objetos](#objetos)  
    1.2. [Structs](#struct-1)  
    1.3. [Factory](#factory)

## Struct
### Objetos
Uma estrutura, assim como uma classe, temos atributos e métodos.

Dado a estrutura básica `Pessoa`:
```js
const Pessoa=
{
    nome: "Daniel",
    idade: 16,

    dizerOla() 
    {
        console.log("Olá, meu nome é " + this.nome);
    }
}
```
`Pessoa` possui:
- atributos:
  - nome: string,
  - idade: number
- métodos:
  - dizerOla(): void

> mas não podemos criar uma outra pessoa naturalmente, temos que escrever manualmente.

Mas podemos resolver isso com um *Factory*(criador da estrutura)
```js
/** 
 * @param {string} nome
 * @param {number} idade
*/
function criarPessoa(nome, idade)
{
    return
    {
        nome: nome,
        idade: idade,

        dizerOla() 
        {
            console.log("Olá, meu nome é " + this.nome);
        }
    }
}
```
e depois:
```js
const Daniel = criarPessoa("Daniel", 16);
const Pedro = criarPessoa("Pedro", 21);

Daniel.dizerOla(); // Olá, meu nome é Daniel
Pedro.dizerOla(); // Olá, meu nome é Pedro
```

esse é o conceito de **objetos** e **factories** em javascript.

### Struct
Agora vamos começar com os structs no FactoryService.

pra criar um struct, primeiro precisamos da base, que será
```js
import * as typing from "./toolkit/typing.js";

const tPessoa=
{
    nome: typing.string,
    idade: typing.number,

    dizerOla()
    {
        console.log("Olá, meu nome é " + this.nome);
    }
}
```

agora vamos fazer o struct, que será a estrutura.
```js
import * as services from "./toolkit/services.js";
const FactoryService = services.getService("FactoryService");

const sPessoa = FactoryService.Struct.new(
    ["nome", "idade"], // atributos que irão mudar
    tPessoa            // tipo base
);
```

### Factory

agora que temos o struct, vamos fazer o *factory*:
```javascript
const Pessoa = FactoryService.Factory.new(sPessoa);
```

com o factory em mãos, podemos criar instâncias:
```javascript
const Daniel = Pessoa.new("Daniel", 17);
const Pedro = Pessoa.new("Pedro", 21);

Daniel.dizerOla(); // Olá, meu nome é Daniel
Pedro.dizerOla(); // Olá, meu nome é Pedro
```

temos o mesmo resultado, mas dessa vez mais modular.

## Variáveis
### `FactoryService.Struct`
#### `FactoryService.Struct.new( atributos, base )`
- Cria um struct

```js
import * as typing from "./toolkit/typing.js";
import * as services from "./toolkit/services.js";
const FactoryService = services.getService("FactoryService");

const tCaixa=
{
    valor: typing.any,

    print()
    {
        console.log(this.valor);
    }
};

const sCaixa = FactoryService.Struct.new(
    ["valor"], // atributos que irão mudar
    tCaixa     // tipo base
);
```

#### `Factory.Struct.inherit( structA, structB )`
- Sistema de herança

### Factory
#### `Factory.new( struct )`
- Cria um factory a partir de uma struct.

```js
import * as typing from "./toolkit/typing.js";
import * as services from "./toolkit/services.js";
const FactoryService = services.getService("FactoryService");

const tCaixa=
{
    valor: typing.any,

    print()
    {
        console.log(this.valor);
    }
};

const sCaixa = FactoryService.Struct.new(
    ["valor"], // atributos que irão mudar
    tCaixa     // tipo base
);

const Caixa = FactoryService.Factory.new( sCaixa );

const str = Caixa.new("foo")
str.print() // foo
```
