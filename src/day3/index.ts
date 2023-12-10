import { readFileSync } from "fs"

const data = readFileSync("./src/day3/input.txt").
    toString().
    trim().
    split("\n").
    map((m) => m.split(""))

const width = data[0].length
const height = data.length
const dirs = [
    [1,0],[0,1],[-1,0],[0,-1],
    [1,1],[-1,1],[1,-1],[-1,-1]
]


function isNumber(char: string): boolean {
    return ( char >= '0' && char <= '9')
}

function isDot(char: string): boolean {
    return char === '.';
}

function get(y:number,x:number,[dy,dx]: [number,number]) : string | undefined {
    const row = data[y+dy];
    if (row === undefined) {
        return undefined 
    }
    return row[x+dx]
}

let sum = 0;
let m = new Map<string,number[]>()

for (let r = 0 ; r < height; r++) {
    const row = data[r]; 
    let currNumber = "";
    let checkForAdjacency = true;
    let isCharNumber = false;
    let isAdjacentToAsterisk = false;
    let lastAsterisk = "";
    for (let c = 0 ; c < width ; c++) {
        isCharNumber = isNumber(row[c]);
        if (!isCharNumber && !checkForAdjacency) {
            sum += parseInt(currNumber)
            if (isAdjacentToAsterisk) {
                let ast = m.get(lastAsterisk)
                if (ast !== undefined) {
                    ast.push(parseInt(currNumber)) 
                }else{
                    m.set(lastAsterisk,[parseInt(currNumber)])
                }
            }
        }
        if (!isCharNumber) {
            currNumber = "";
            checkForAdjacency = true;
            isAdjacentToAsterisk = false;
            lastAsterisk = "";
        }
        if(isCharNumber && checkForAdjacency) {
            const isAdjacent = dirs.reduce((acc,[dy,dx])=>{
                const char = get(r,c,[dy,dx]) as string;
                if (char === '*') {
                    isAdjacentToAsterisk = true;
                    lastAsterisk = `${r+dy},${c+dx}`
                }
                return (!isDot(char) && !isNumber(char) && char !== undefined) || acc
            },false) 
            if (isAdjacent) {
                checkForAdjacency = false;
            }
        }
        if (isCharNumber) {
            currNumber += get(r,c,[0,0])
        }
    }
    if (isCharNumber && !checkForAdjacency) {
        sum += parseInt(currNumber)
        if (isAdjacentToAsterisk) {
            let ast = m.get(lastAsterisk)
            if (ast !== undefined) {
                ast.push(parseInt(currNumber)) 
            }else{
                m.set(lastAsterisk,[parseInt(currNumber)])
            }
        }
    }
}

let part2 = 0
m.forEach((value,key) => {
    if (value.length === 2) {
        part2 += value[0] * value[1];
    }
})
console.log(`part1=${sum}`);
console.log(`part2=${part2}`);
