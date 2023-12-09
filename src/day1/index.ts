import {readFileSync} from "node:fs"

const data = readFileSync("./src/day1/input2.txt").
    toString().
    trim().
    split("\n");

let wordDigits = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

function part1(lines: string[]): number {
    let numbers: number[] = [];
    lines.forEach((line) => {
        let digits = [];
        for (let i = 0 ; i < line.length ; i++) {
            if (line[i] >= '0' && line[i] <= '9') {
                digits.push(parseInt(line[i]));
                continue;
            } 
        } 
        let twoDigit = digits.length === 1 ? digits[0] * 10 + digits[0] : digits[0] * 10 + digits[digits.length-1];
        numbers.push(twoDigit);
    })
    return numbers.reduce((accumulator, currentValue) => accumulator + currentValue,0)
}


function part2(lines: string[]): number {
    let numbers: number[] = [];
    lines.forEach((line) => {
        let digits = [];
        for (let i = 0 ; i < line.length ; i++) {
            if (line[i] >= '0' && line[i] <= '9') {
                digits.push(parseInt(line[i]));
                continue;
            } 
            for (let d = 0 ; d < wordDigits.length ; d++ ) {
                if (line.slice(i,i+wordDigits[d].length) === wordDigits[d]) {
                    digits.push(d+1);
                }
            }
        } 
        let twoDigit = digits.length === 1 ? digits[0] * 10 + digits[0] : digits[0] * 10 + digits[digits.length-1];
        numbers.push(twoDigit);
    })
    return numbers.reduce((accumulator, currentValue) => accumulator + currentValue,0)
}

console.log(`part1=${part1(data)}`)
console.log(`part2=${part2(data)}`)
