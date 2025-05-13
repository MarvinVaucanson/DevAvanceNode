const fs = require("fs")
const express = require('express')

const app = express()
app.use(express.json())

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))
console.log(tours)

const port = process.env.port || 3000

const middleware = ((data, res)=>{

    console.log("toto",data)

    const { name, duration, description, difficulty, maxGroupSize } = data;

    if (!name || !duration || !description || !difficulty || !maxGroupSize) {
        return res.status(400).json({
            status: 'fail',
            message: 'Tous les champs requis doivent être remplis : name, duration, description, difficulty, maxGroupSize'
        });
    }
    return true
}) 

app.get('/', (req, res) => {
    res.send("Hello from the server tutel")
})

const getAllTours = (req, res) => {
    res.status(200).json({
        status: "success",
        results: tours.length,
        data: { tours }
    })
}

const getById = (req,res) => {
    const id = parseInt(req.params.id)
    const tourI = tours.findIndex(tour => tour.id === id)

    res.status(200).json({
        status: 'success (oupi goupi)',
        data: {
            tour: tours[tourI]
        }
    })
}

const createTour = (req, res) => {
    console.log(req.body)

    const newTour = req.body

    if(middleware(newTour,res)){
        tours.push(newTour)
        console.log(tours)

        fs.writeFileSync(
            `${__dirname}/dev-data/data/tours-simple.json`,
            JSON.stringify(tours, null, 2),
            (err) => {
                if (err) {
                    return res.status(500).json({
                        status: 'fail',
                        message: 'Erreur lors du write'
                    })
                }
            }
        )
                res.status(201).json({
                    status: 'success (youpi)',
                    data: {
                        tour: newTour
                    }
                })
    }
}

const getEditById = (req,res) => {
    const id = parseInt(req.params.id)

    const editedTour = req.body
    const tourI = tours.findIndex(tour => tour.id === id)

    tours[tourI] = {...tours[tourI],...editedTour}

    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours, null, 2),
        (err) => {
            if (err) {
                return res.status(500).json({
                    status: 'fail (oupsi)',
                    message: 'Erreur lors du write dans le put'
                })
            }
        }
    )
    res.status(200).json({
        status: 'success (oupi goupi)',
        data: {
            tour: tours[tourI]
        }
    })
}

const deleteByID = (req,res) => {
    const id = parseInt(req.params.id)

    const tourI = tours.findIndex(tour => tour.id === id)

    tours.splice(tourI,1)

    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours, null, 2),
        (err) => {
            if (err) {
                return res.status(500).json({
                    status: 'fail (oupsi)',
                    message: 'Erreur lors du write dans le put'
                })
            }
        }
    )
    res.status(200).json({
        status: 'success (oupi goupi)',
        data: {
            tours
        }
    })
}

app.get('/api/v1/tours/', getAllTours)

app.get('/api/v1/tours/:id', getById)

app.post('/api/v1/tours/', createTour)

app.put('/api/v1/tours/:id', getEditById)

app.delete('/api/v1/tours/:id', deleteByID)

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})
