import { throws } from "node:assert";
import { readFileSync } from "node:fs";


let [dirPart, mapPart] = readFileSync("./src/day8/input.txt").toString().
    trim().
    split("\n\n")

let dirs = dirPart.split("");
let maps = new Map<string,string[]>();
mapPart.split("\n").forEach((m) => {
    let parts =  m.split("=")
    let src = parts[0].trim();
    let destinations = parts[1].trim().replace("(","").replace(")","").split(",").map((m) => m.trim())
    maps.set(src,destinations);
})

function part1(directions: string[]): number {
    let nextSrc = "AAA";
    let count = 0;
    for (; nextSrc !== "ZZZ" ; count++) {
        let d = maps.get(nextSrc); 
        if (d === undefined) {
            throw new Error("unknown src");
        }
        let dir = directions.shift();
        if (dir !== undefined) directions.push(dir);
        nextSrc = dir === "L" ? d[0] : d[1];
    }
    return count
}

function part2(directions: string[]): number {
    let count = 1;
    let allStartingPoints : (string|null)[]= Array.from(maps.keys()).filter(m => m[2] === "A")
    let steps : number[]= [];
    for (;;count++) {
        let dir = directions.shift();
        if (dir !== undefined) directions.push(dir);
        allStartingPoints.forEach((start,idx) => {
            let d = maps.get(start as string); 
            if (d === undefined) {
                throw new Error("unknown src");
            }
            let next = dir === "L" ? d[0] : d[1];
            if (next[2] === "Z") {
                steps.push(count);
                allStartingPoints[idx] = null;
                return;
            }
            allStartingPoints[idx] = next;
        });
        allStartingPoints = allStartingPoints.filter(m => m !== null);
        if (allStartingPoints.length === 0) break;
    }
    return lcm(steps);
}

const lcm = (arr: number[]) => {
  const gcd : (x:number,y:number) => number  = (x:number, y:number) => (!y ? x : gcd(y, x % y));
  const _lcm = (x:number, y:number) => (x * y) / gcd(x, y);
  return [...arr].reduce((a, b) => _lcm(a, b));
};

console.log(part1([...dirs]))
console.log(part2([...dirs]))

