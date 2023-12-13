import { readFileSync } from "node:fs";

function predict(seq: number[], last: number, findFirst : boolean =false): number {
    const l = seq.reduce((acc,curr) => {
        return curr === 0 && acc;
    },true)
    if (l) return last;
    let next : number[] = []
    seq.forEach((_,idx)=> {
        if (idx === seq.length -1) return;
        next.push(seq[idx+1]-seq[idx]);
    })
    let ll = findFirst ? next[0] :next[next.length-1];
    if (findFirst) {
        return last - predict(next,ll,findFirst);
    }
    return predict(next,ll,findFirst) + last;
}


const s = readFileSync("./src/day9/input.txt").toString().trim().
    split("\n").
    map((m) => {
        return m.split(" ").map(x => parseInt(x.trim()));
    });

const part1 = s.reduce((acc,curr) => {
        return acc + predict(curr,curr[curr.length-1]);
    },0)
const part2 = s.reduce((acc,curr) => {
        return acc + predict(curr,curr[0],true);
    },0)


console.log(part1,part2);




