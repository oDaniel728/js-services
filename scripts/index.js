import * as types from "./toolkit/types.js";

const Pessoa = types.object({
    nome: types.string,
    idade: types.number
});

const novaPessoa = types.generator(types.createDefault(Pessoa, {"string": "desconhecido", "number": 18}));

let Pedro = novaPessoa();

console.log(Pessoa);
console.log(Pedro);