import{readFile} from "fs/promises"
import http from 'node:http';

const readJson = async () => {
    const file = await readFile('dev-data/data.json', 'utf-8');
    console.log(file)
    return file
}

const info = readJson()

const server = http.createServer()
server.on('request', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text / plain' });
    res.end('Hello from the server')
})
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000')
})

//
// else if (pathname === '/product'){
//     res.writeHead(200,
//         'Content-type': {'text/html'}
//     );
// }