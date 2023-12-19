import { readFileSync } from "fs";

function calculatePath(g1: number[],g2:number[]): number {
    return Math.abs(g1[0] - g2[0]) + Math.abs(g1[1] - g2[1])
}

function part1(data: string[][],n : number) {
    let allGalaxies: number[][] = [];
    for (let row =0 ; row < data.length; row++) {
        data[row].forEach((col,idx) => {
            if (col === '#') allGalaxies.push([row,idx])
        })
    }
    let all = 0
    for (let i = 0 ;  i < allGalaxies.length ; i++) {
        for (let j = i+1 ;  j < allGalaxies.length ; j++) {
            let shortestPath = calculatePath(allGalaxies[i],allGalaxies[j]);
            let ec = emptyColumnBetween(allGalaxies[i] as [number,number],allGalaxies[j] as [number,number]);
            let er = emptyRowBetween(allGalaxies[i] as [number,number],allGalaxies[j] as [number,number]);
            all+=shortestPath + ((ec*n)-ec) + ((er*n)-er);
        }
    }
    return all;
}

function emptyRowBetween([y1,x1]: [number,number], [y2,x2] : [number,number]) : number {
    let startY = (y1 > y2 ? y2 : y1)+1;
    let endY = y1 > y2 ? y1 : y2
    let c = 0;
    for (;startY < endY ; startY++) {
        let empty = true;
        for (let x = 0 ; x < COL ; x++) {
            if (data[startY][x] === '#') {
                empty = false;
                break;
            } 
        }
        if (empty) c++
    }
    return c;
}

function emptyColumnBetween([y1,x1]: [number,number], [y2,x2] : [number,number]) : number {
    let startX = (x1 > x2 ? x2 : x1)+1;
    let endX = x1 > x2 ? x1 : x2
    let c = 0;
    for (;startX < endX ; startX++) {
        let empty = true;
        for (let y = 0 ; y < ROW ; y++) {
            if (data[y][startX] === '#') {
                empty = false;
                break;
            } 
        }
        if (empty) c++
    }
    return c;
}

const data = readFileSync("./src/day11/input.txt").toString().trim().
    split("\n").
    map(m=> m.split(""))

const ROW = data.length;
const COL = data[0].length;

console.log(part1(data,1000000))
