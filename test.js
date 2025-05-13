const fs = require("fs")

console.log("START")

setTimeout(() => console.log("A"), 0)

setImmediate(() => console.log("B")) 

fs.readFile("./txt/input.txt", () => {
    setTimeout(() => console.log("D"), 0)     
    setImmediate(() => console.log("E"))    
    process.nextTick(() => console.log("F"))    
})

Promise.resolve().then(() => {
    console.log("G")
    process.nextTick(() => {
        console.log("H")
    })
})

process.nextTick(() => {
    console.log("I")
})

setTimeout(() => console.log("J"), 0)

console.log("END")