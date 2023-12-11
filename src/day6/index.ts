import { readFileSync } from "node:fs";

const [timePart,recordPart] = readFileSync("./src/day6/input.txt").
    toString().
    split("\n");


function part1() {
    const times = timePart.split(":")[1].
        trim().
        split(" ").
        map(m => m.trim()).
        map(m => parseInt(m)).
        filter(m => !isNaN(m))

    const records = recordPart.split(":")[1].
        trim().
        split(" ").
        map(m => m.trim()).
        map(m => parseInt(m)).
        filter(m => !isNaN(m))

    let total = 1;
    times.forEach((v,idx) => {
        let c = 0;
        for (let t = 0 ; t <= v ; t++) {
            const dist = t * (v - t);
            if (dist > records[idx]) {
                c++
            }
        }
        if (c !== 0) {
            total *= c;
        }
    })
    return total;
}

function part2() {
    const time = parseInt(timePart.split(":")[1].
        trim().
        split(" ").
        map(m => m.trim()).
        reduce((acc,curr) => {
            return acc + curr  
        },""))

    const record = parseInt(recordPart.split(":")[1].
        trim().
        split(" ").
        map(m => m.trim()).
        reduce((acc,curr) => {
            return acc + curr  
        },""))


    let total = 0;
    for (let t = 0 ; t <= time ; t++) {
        const dist = t * (time - t);
        if (dist > record) {
            total++
        }
    }
    return total;
}


console.log(part2());

