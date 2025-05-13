import { readFileSync, writeFileSync, createWriteStream } from "fs"
import{readFile,writeFile,readdir,lstat } from "fs/promises"

import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { pipeline } from "stream/promises"
import { createReadStream } from "node:fs"
//import { } from "node:fs"

const textIn = readFileSync("./txt/input.txt","utf-8")
console.log(textIn)

const textOut = `This is what we know about ${textIn}. Created on ${new Date().toLocaleDateString()} \n`;
writeFileSync("./txt/output.txt",textOut)

readFile("./txt/start.txt","utf-8",(e,data) =>{
 console.log(data)
})

//Q4 : comme cela le temps de lecture de fichier ne bloque pas les autres instructions

const writeAsync = async () => {
    const fileName = await readFile('txt/start.txt', 'utf-8');

    const textIn = await readFile(`./txt/${fileName}.txt`, { encoding: 'utf-8' })
    
    const textOut = `Toto This is what we know about ${textIn}. Created on ${new Date().toLocaleDateString()} \n`
    
    writeFileSync('./txt/output.txt', textOut)
}

writeAsync()

console.log(import.meta.url)
console.log(fileURLToPath(import.meta.url))
console.log(dirname(fileURLToPath(import.meta.url)))
console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\")

const listFile = async () => {
    const topDir = dirname(fileURLToPath(import.meta.url))

    const files = await readdir(topDir)
        for (const fil of files){
            const filePath = join(topDir, fil)
            const stats = await lstat(filePath)

            if (stats.isDirectory()) {
                console.log(`D- ${fil}`)
            } else {
                console.log(`F- ${fil}`)
            }
        }
}
listFile()

async function calcData(output) {
    try{
        const data = await fetch("https://www.gutenberg.org/files/2701/2701-0.txt")

        if(!data.ok){
            throw new Error("erreur")
        }

        const writeStream = createWriteStream(output)

        await pipeline(data.body,writeStream)

        console.log('fichier dl')
    } catch (e) {
        console.log(e)
    }
}
async function printChunk(input) {
    const chunkSize = 1024;
    try{
        const readStream = createReadStream(input,{encoding:"utf-8",highWaterMark: chunkSize})
        readStream.on('data', chunk => {
            console.log(`Chunk reçu (${chunk.length} caractères) :`, chunk);
        })
    }catch (e) {
        console.log(e)
    }
}

calcData("./txt/moby-dick.txt")
printChunk("./txt/moby-dick.txt")