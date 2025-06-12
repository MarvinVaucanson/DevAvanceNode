import { tourRouter } from "./dev-data/routes/tour.route.js"
import express from 'express'

const app = express()
app.use(express.json())

const port = process.env.port || 3000

// Route
app.use('/api/v1/tours', tourRouter)

app.get('/', (req, res) => {
    res.send("Hello from the server tutel")
})

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})
