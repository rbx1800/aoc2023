import { count } from "node:console";
import { readFileSync } from "node:fs"

const data = readFileSync("./src/day4/input.txt").
    toString().
    trim().
    split("\n");

function countMatch(card: string) : number {
    const [winingNumbers, numbersYouHave ]= card.
        split(":")[1].
        split("|").
        map((n) => n.trim().split(" "))
    let match = 0;
    numbersYouHave.forEach((n) => {
        if (isNaN(parseInt(n))) {
            return;
        }
        const idx = winingNumbers.indexOf(n)
        if (idx === -1) {
            return;
        }
        match++
    })
    return match;
}

function findScore(card: string) : number {
    const [winingNumbers, numbersYouHave ]= card.
        split(":")[1].
        split("|").
        map((n) => n.trim().split(" "))
    let score = 0;
    numbersYouHave.forEach((n) => {
        if (isNaN(parseInt(n))) {
            return;
        }
        const idx = winingNumbers.indexOf(n)
        if (idx === -1) {
            return;
        }
        if (score === 0) {
            score = 1; 
            return;
        }
        score *= 2
    })
    return score;
}


function part2(): number {
    let cards = new Map<number,number[]>();
    data.forEach((card,index) => {
        const match = countMatch(card)
        const cardsProduced = [];
        for (let i = index+1; i <= index+match; i++) cardsProduced.push(i+1)
        cards.set(index+1,cardsProduced)
    })
    let doCount = (idx:number):number => {
        let prize = cards.get(idx);
        if (prize === undefined || prize.length === 0) {
            return 1;
        }
        let c = 1;
        prize.forEach((v) => {
            c += doCount(v)
        })
        return c;
    }
    let count = 0;
    cards.forEach((_,key) => {
        count += doCount(key)
    }) 
    return count;
}

function part1() : number {
    let sum = 0
    for (const card of data) {
        sum += findScore(card); 
    }
    return sum
}


console.log(`part1=${part1()}`);
console.log(`part2=${part2()}`);

