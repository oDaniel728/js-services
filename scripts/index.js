// @ts-check
import * as services from "./toolkit/services.js";
import * as typing from "./toolkit/typing.js";
const FactoryService = services.getService("FactoryService");

const tCor = typing.literal("verde", "amarelo", "vermelho")
const mapaDeCor = typing.as(typing.dict(tCor, tCor), {
    "verde": "amarelo",
    "amarelo": "vermelho",
    "vermelho": "verde"
})
const tSinal = typing.object({
    cor: tCor,
    
    /**
     * @param { typeof tCor? } cor 
     */
    mudarCor(cor = null) {
        this.cor = cor ?? mapaDeCor[this.cor];
    }
})

const sSinal = FactoryService.Struct.new(["cor"], tSinal);
const Sinal = FactoryService.Factory.new(sSinal);

const sinal = Sinal.new("verde");
sinal.mudarCor();
sinal.mudarCor();
sinal.mudarCor();