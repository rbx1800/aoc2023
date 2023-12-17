import { readFileSync } from "node:fs";

type Pipe = "|" | "-" | "J" | "L" | "7" | "F"

type Coord = [number,number]

function nextPipe(pipe:Pipe,currentDirection:[number,number]): [number,number] {
    switch(pipe){
    case "|": 
    case "-": return currentDirection;
    case "J": return currentDirection[0] === +1 ? [0,-1] : [-1,0];
    case "L": return currentDirection[0] === +1 ? [0,+1] : [-1,0];
    case "7": return currentDirection[0] === -1 ? [0,-1] : [+1,0];
    case "F": return currentDirection[0] === -1 ? [0,+1] : [+1,0];
    default: throw new Error("invalid pipe");
    }

}

function parseGraph([y,x] : [number,number]): Coord[]{
    let steps = 0;
    let currentDirection: [number,number] = [0,0];
    let t = data[y][x+1];
    if (t === '-' || t === '7' || t === "J") currentDirection = [0,1];
    t = data[y][x-1]
    if (t === '-' || t === 'L' || t === "F") currentDirection = [0,-1];
    t = data[y+1][x]
    if (t === '|' || t === 'J' || t === "L") currentDirection = [+1,0];
    t = data[y-1][x]
    if (t === '|' || t === '7' || t === "F") currentDirection = [-1,0];
    let i = y + currentDirection[0];
    let j = x + currentDirection[1];
    const graph : Coord[]= []
    graph.push([y,x])
    for (;!(i === y && j === x);) {
        const pipe = data[i][j];
        graph.push([i,j])
        currentDirection = nextPipe(pipe as Pipe, currentDirection);
        steps++;
        i += currentDirection[0];
        j += currentDirection[1];
    }
    return graph;
}

function isInLoop([y,x] : [number,number], graph: []): boolean {
    return true;
}

const data = readFileSync("./src/day10/input.txt").toString().trim().
    split("\n").
    map((m) => m.split(""));

let startingPoint: [number,number] = [-1,-1];

data.forEach((row,i) => {
    row.forEach((p,j) => {
        if ( p === 'S') {
            startingPoint = [i,j]
        }
    })
})

console.log(`part1=${Math.ceil(parseGraph(startingPoint).length / 2)}`);
