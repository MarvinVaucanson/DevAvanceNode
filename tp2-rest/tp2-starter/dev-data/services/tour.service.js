import fs from "fs"
const tours = JSON.parse(fs.readFileSync(`${process.cwd()}/dev-data/data/tours-simple.json`))

function readTour(){
    return tours
}

function readTourById(param_id){
    const id = parseInt(param_id)
    console.log(id)
    const tourI = tours.findIndex(tour => tour.id === id)

    return tours[tourI]
}

const writeTour = (tours, newTour) => {
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
}

export {readTour,readTourById}