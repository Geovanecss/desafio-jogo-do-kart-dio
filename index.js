const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
};

async function getRandomBlock() {
    let random = Math.random();
    let result

    switch (true) {
        case random < 0.33:
            result = "Reta"
            break;
        case random < 0.66:
            result = "Curva"
            break;
        default:
            result = "Confronto"
    }

    return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

        //sortear bloco
        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`)


        //Rolar os dados 
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // Teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "Reta") {
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(character1.NOME,
                "Velocidade",
                diceResult1,
                character1.VELOCIDADE);

            await logRollResult(character2.NOME,
                "Velocidade",
                diceResult2,
                character2.VELOCIDADE);
        }

        if (block === "Curva") {
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            await logRollResult(character1.NOME,
                "Manobrabilidade",
                diceResult1,
                character1.MANOBRABILIDADE);

            await logRollResult(character2.NOME,
                "Manobrabilidade",
                diceResult2,
                character2.MANOBRABILIDADE);
        }

        if (block === "Confronto") {
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;

            console.log(`${character1.NOME} Confrontou ${character2.NOME}!! 🥊🥊`);

            await logRollResult(character1.NOME,
                "Poder",
                diceResult1,
                character1.PODER);

            await logRollResult(character2.NOME,
                "Poder",
                diceResult2,
                character2.PODER);

            if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
                console.log(`${character1.NOME} venceu essa luta!! e ${character2.NOME} foi para a lona e perdeu 1 ponto `);
                character2.PONTOS--;
            }

            if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
                console.log(`${character2.NOME} venceu essa luta!! e ${character1.NOME} foi para a lona e perdeu 1 ponto `);
                character1.PONTOS--;
            }

            console.log(powerResult1 === powerResult2 ? "Deu empate, ninguém perdeu ponto!!" : "");
        }

        //Verificando o vencedor

        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${character1.NOME} Marcou 1 ponto!!!`);
            character1.PONTOS++;
        }
        else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`${character2.NOME} Marcou 1 ponto!!!`);
            character2.PONTOS++;
        }

        console.log("-------------------------");

    }
}

async function declareWinner(character1, character2) {
    console.log("Resultado final:");
    console.log(`${character1.NOME}: ${character1.PONTOS} Ponto(s)`);
    console.log(`${character2.NOME}: ${character2.PONTOS} Ponto(s)`);

    if (character1.PONTOS > character2.PONTOS) 
        console.log(`\n ${character1.NOME} venceu a corrida! Parabéns!! 🏆🏆`);
    
    else if (character2.PONTOS > character1.PONTOS) 
        console.log(`\n ${character2.NOME} venceu a corrida! Parabéns!! 🏆🏆`);
    
    else 
        console.log("A corrida empatou!");
    
}

(async function main() {
    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando... \n`);

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();