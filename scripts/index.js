// @ts-check
import * as typing from "./toolkit/typing.js";
import * as services from "./toolkit/services.js";
const FactoryService = services.GetService("FactoryService");

const tPessoa = FactoryService.Struct.new(
    ["nome", "idade"],
    {
        nome: typing.string,
        idade: typing.number,

        dizerOla() {
            console.log(`Olá, eu sou ${this.nome}`);
        }
    }
)
const tContaBancaria = FactoryService.Struct.new(
    ["saldo"],
    {
        saldo: typing.optional(typing.number),

        verSaldo() {
            console.log(`Eu tenho ${this.saldo ?? 0} reais!`);
        }
    }
)

const tPessoaFisica = FactoryService.Struct.inherits(tContaBancaria, tPessoa);
const PessoaFisica = FactoryService.Factory.new(tPessoaFisica);

const pedro = PessoaFisica.new("Pedro", 16)
pedro.saldo = 100;
pedro.dizerOla();
pedro.verSaldo();