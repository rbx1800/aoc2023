import { readFileSync } from "node:fs";
import { deflate } from "node:zlib";


function count(str: string) : [number,string] {
    let count = 0;
    let ch = "";
    str.split("").forEach((char) => {
        let occ = str.split(char).length - 1;
        [count,ch] = occ > count ? [occ,char]: [count,ch];
    });
    return [count,ch];
} 

function isFiveOfKind(h: string) : boolean {
    let [c,_] = count(h)
    return c === 5;
}

function isFourOfKind(h: string) : boolean {
    let [c,_] = count(h)
    return c === 4;
}

function isThreeOfKind(h: string) : boolean {
    let [c,char] = count(h)
    if (c !== 3) {
        return false;
    }
    [c,char] = count(h.replaceAll(char,""));
    if (c === 1) {
        return true;
    }
    return false;
}

function isFullHouse(h: string) : boolean {
    let [c,char] = count(h)
    if (c !== 3) {
        return false;
    }
    [c,char] = count(h.replaceAll(char,""));
    if (c === 2) {
        return true;
    }
    return false;
}

function isTwoPair(h: string) : boolean {
    let [c,char] = count(h)
    if (c !== 2) {
        return false;
    }
    let [c2,_] = count(h.replaceAll(char,""))
    if (c2 !== 2) {
        return false;
    }
    return true;
}

function isOnePair(h: string) : boolean {
    let [c,char] = count(h)
    if (c !== 2) {
        return false;
    }
    let [c2,_] = count(h.replaceAll(char,""))
    if (c2 !== 1) {
        return false;
    }
    return true;
}


function compareWithCards(h1:string,h2:string,withJoker: boolean): number {
    if (withJoker) {
        cards["J"] = 1;
    }
    let s1 = 0;
    let s2 = 0;
    for (let i = 0 ; i < h1.length ; i++) {
        s1 = cards[h1[i]] 
        s2 = cards[h2[i]] 
        if (s1 === s2) {
            continue
        }
        return s1 - s2;
    }
    cards["J"] = 10;
    return s1 - s2;
}

enum Type {
    HighCard,
    OnePair,
    TwoPair,
    ThreeOfKind,
    FullHouse,
    FourOfKind,
    FiveOfKind,
}

function scoreWithJoker(score: Type, jokers: number) : Type {
    switch(score) {
        case Type.FiveOfKind:
        case Type.FourOfKind:
        case Type.FullHouse: return Type.FiveOfKind;
        case Type.ThreeOfKind: return Type.FourOfKind;
        case Type.TwoPair : return jokers === 2 ? Type.FourOfKind : Type.FullHouse;
        case Type.OnePair : return Type.ThreeOfKind;
        default: return Type.OnePair;
    }
}

function handScore(h1:string, withJoker: boolean) : Type {
    let score = 0;
    if (isFiveOfKind(h1)) score = Type.FiveOfKind
    else if (isFourOfKind(h1)) score = Type.FourOfKind;
    else if (isFullHouse(h1)) score = Type.FullHouse;
    else if (isThreeOfKind(h1)) score = Type.ThreeOfKind;
    else if (isTwoPair(h1)) score = Type.TwoPair;
    else if (isOnePair(h1)) score = Type.OnePair;
    else  score = Type.HighCard;
    let jokers = h1.split("J").length - 1;
    return withJoker && jokers > 0 ? scoreWithJoker(score,jokers) : score;
}

type Cards = {
    [index:string] : number,
}

function compareHands(h1:string, h2: string,withJoker: boolean): number {
    let score1 = handScore(h1,withJoker);
    let score2 = handScore(h2,withJoker);
    if (score1 === score2) {
        return compareWithCards(h1,h2,withJoker);
    }
    return score1-score2;
}

const cards : Cards = {
    "2" : 2,
    "3" : 3,
    "4" : 4,
    "5" : 5,
    "6" : 6,
    "7" : 7,
    "8" : 8,
    "9" : 9,
    "T" : 10,
    "J" : 11,
    "Q" : 12,
    "K" : 13,
    "A" : 14,
}

const hands = readFileSync("./src/day7/input.txt").toString().
    trim().
    split("\n").
    map((n) => n.split(" "));

let part1 = hands.sort((a,b) => {
    return compareHands(a[0],b[0],false);
}).reduce((acc, [hand,bid], idx) => {
    return acc + (idx + 1) * parseInt(bid);
}, 0)

let part2 = hands.sort((a,b) => {
    return compareHands(a[0],b[0],true);
}).reduce((acc, [hand,bid], idx) => {
    return acc + (idx + 1) * parseInt(bid);
}, 0)

console.log(part1,part2);


