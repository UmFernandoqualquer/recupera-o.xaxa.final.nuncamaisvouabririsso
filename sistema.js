
/*
 * PROJETO: Sistema de Orientação a Objetos
 *
 * Integrantes:
 * Fernando - Chamada 11
 * Kaique
 * Diana
 * Robert
 * Bruno
 *
 * Regra personalizada:
 * Último dígito: 1
 * Desconto: 15%
 * Limite: valores menores que R$ 50,00
 */

// ======================================
// 1. PROTÓTIPOS
// ======================================

function ItemBase(nome, valor, chamada) {
    this.nome = nome;
    this.valor = valor;
    this.chamada = chamada;
}

ItemBase.prototype.gerarEtiqueta = function () {
    return `Item: ${this.nome} | Valor: R$ ${this.valor.toFixed(2)} | Chamada: ${this.chamada}`;
};

// ======================================
// 2. CLASSE CONTA ALUNO
// ======================================

class ContaAluno {
    #saldo;

    constructor(nome, saldoInicial = 0) {
        this.nome = nome;

        if (saldoInicial < 0) {
            throw new Error("O saldo inicial não pode ser negativo.");
        }

        this.#saldo = saldoInicial;
    }

    get saldo() {
        return this.#saldo;
    }

    set saldo(valor) {
        if (typeof valor !== "number" || !Number.isFinite(valor) || valor < 0) {
            console.log("Bloqueio: saldo inválido ou negativo.");
            return;
        }

        this.#saldo = valor;
    }

    calcularTaxa(valor) {
        if (valor < 0 || !Number.isFinite(valor)) {
            throw new Error("Valor inválido.");
        }

        return valor < 50 ? valor * 0.15 : 0;
    }
}

// ======================================
// 3. HERANÇA E POLIMORFISMO
// ======================================

class ContaProfessor extends ContaAluno {
    calcularTaxa(valor) {
        if (valor < 0 || !Number.isFinite(valor)) {
            throw new Error("Valor inválido.");
        }

        return valor * 0.05;
    }
}

// ======================================
// 4. REGRA DE NEGÓCIO
// ======================================

function aplicarDesconto(valor) {
    if (typeof valor !== "number" || !Number.isFinite(valor) || valor < 0) {
        throw new Error("Informe um valor válido.");
    }

    const desconto = valor < 50 ? valor * 0.15 : 0;

    return {
        valorOriginal: valor,
        desconto: desconto,
        valorFinal: valor - desconto
    };
}

// ======================================
// 5. TESTES DO SISTEMA
// ======================================

console.log("\n===== SISTEMA DE ORIENTAÇÃO A OBJETOS =====");

// Protótipo
console.log("\n--- PROTÓTIPO ---");

const item = new ItemBase("Caderno", 40, 11);

console.log(item.gerarEtiqueta());

// Instâncias reais dos integrantes
console.log("\n--- CONTAS DOS ALUNOS ---");

const fernando = new ContaAluno("Fernando", 200);
const kaique = new ContaAluno("Kaique", 150);
const diana = new ContaAluno("Diana", 100);
const robert = new ContaAluno("Robert", 120);
const bruno = new ContaAluno("Bruno", 180);

const alunos = [fernando, kaique, diana, robert, bruno];

alunos.forEach(aluno => {
    console.log(`${aluno.nome}: R$ ${aluno.saldo.toFixed(2)}`);
});

// Encapsulamento
console.log("\n--- TESTE DE ENCAPSULAMENTO ---");

fernando.saldo = -50;

console.log("Saldo de Fernando:", fernando.saldo);

// A linha abaixo gera SyntaxError porque #saldo é privado.
// console.log(fernando.#saldo);

// Herança e polimorfismo
console.log("\n--- POLIMORFISMO ---");

const professor = new ContaProfessor("Professor", 500);
const valorTeste = 40;

console.log(
    "Taxa do aluno Fernando:",
    fernando.calcularTaxa(valorTeste).toFixed(2)
);

console.log(
    "Taxa do professor:",
    professor.calcularTaxa(valorTeste).toFixed(2)
);

// Regra personalizada
console.log("\n--- DESCONTO PERSONALIZADO ---");

const resultado = aplicarDesconto(40);

console.log("Número da chamada: 11");
console.log("Desconto: 15%");
console.log("Limite: R$ 50,00");
console.log("Valor original: R$", resultado.valorOriginal.toFixed(2));
console.log("Desconto aplicado: R$", resultado.desconto.toFixed(2));
console.log("Valor final: R$", resultado.valorFinal.toFixed(2));

console.log("\n===== FIM DOS TESTES =====");
