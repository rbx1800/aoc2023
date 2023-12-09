import { readFileSync } from "node:fs";

type Config = {
    [index:string] : number;
    red: number,
    green: number,
    blue : number,
}

const games = readFileSync("./src/day2/input.txt").
    toString().
    trim().
    split("\n");

function part1() : number {
    let result = 0;
    let config: Config = {
        "red": 12,
        "green": 13,
        "blue": 14,
    }
    games.forEach((e,i) => {
        let gameInfo = e.split(":") 
        let id = parseInt(gameInfo[0].split(" ")[1]);
        let sets = gameInfo[1].trim().split(";")
        let possible = true ;
        sets.forEach((set)=>{
            let cubes = set.trim().split(",")
            for (const cube of cubes) {
                let [n ,color] = cube.trim().split(" ")
                let number = parseInt(n); 
                if (config[color] < number ) {
                    possible = false; 
                }
            } 
        })
        if (possible) {
            result+= id
        }
    })
    return result;
}


function part2() : number {
    let res = 0;
    games.forEach((e,i) => {
        let gameInfo = e.split(":") 
        let id = parseInt(gameInfo[0].split(" ")[1]);
        let sets = gameInfo[1].trim().split(";")
        let fewest : Config = {
            red:0,
            blue:0,
            green:0,
        }
        sets.forEach((set)=>{
            let cubes = set.trim().split(",")
            for (const cube of cubes) {
                let [n ,color] = cube.trim().split(" ")
                let number = parseInt(n); 
                if (fewest[color] < number ) {
                    fewest[color] = number;
                }
            } 
        })
        res += fewest.red * fewest.green * fewest.blue;
    })
    return res; 
}

console.log(`part1=${part1()}`);
console.log(`part2=${part2()}`);

