import { readFileSync } from "node:fs";

let [seeds, ...maps]= readFileSync("./src/day5/input.txt").toString().trim().split("\n\n")
const seedNumbers = seeds.split(":")[1].trim().split(" ").map(n => parseInt(n));


type Range = {
    dest: number,
    src: number,
    range: number,
}

type MyMap = Range[];


function parseMaps() : MyMap[] { 
    let parsedMaps: MyMap[] = [];
    maps.forEach((map)=>{
        let parsedMap: MyMap = [];
        const [_ ,rangePart] = map.split(":\n")
        const range = rangePart.split("\n").map((r) => r.split(" "));
        for (const r of range) {
            let rr : Range = {
                dest: parseInt(r[0]),
                src : parseInt(r[1]),
                range : parseInt(r[2]),
            }
            parsedMap.push(rr);
        }
        parsedMaps.push(parsedMap)
    })
    return parsedMaps;
}

function findLoc(source : number, parsedMaps: MyMap[] ): number {
    for (const map of parsedMaps) {
        for (const r of map) {
            if (source >= r.src && source < r.src + r.range ) {
                source = r.dest + (source - r.src);
                break;
            }  
        }
    }
    return source;
}

function findLocWithRange(source : number,range:number, parsedMaps: MyMap[] ): [number,number] {
    for (const map of parsedMaps) {
        for (const r of map) {
            if (source >= r.src && source < r.src + r.range ) {
                if (source + range > r.src + r.range) {
                    range = (r.src+r.range) - source ;
                }
                source = r.dest + (source - r.src);
                break;
            }  
        }
    }
    return [source,range];
}


function part2() {
    let min = Infinity;
    let parsedMaps = parseMaps();
    for (let i = 0 ; i < seedNumbers.length ; i+=2) {
        let source = seedNumbers[i];
        let range = seedNumbers[i+1] 
        for (;range > 0;) {
            let [loc,r]= findLocWithRange(source,range,parsedMaps);
            if (loc < min) {
                min = loc
            } 
            source += r;
            range  -= r;
        }

    }
    return min
}


function part1() {
    let min = Infinity;
    let parsedMaps = parseMaps();
    seedNumbers.forEach((seed)=> {
        let loc = findLoc(seed,parsedMaps);
        if (loc < min) {
            min = loc
        }
    }) 
    return min;
}

console.log(`part1=${part1()}`);
console.log(`part2=${part2()}`);

