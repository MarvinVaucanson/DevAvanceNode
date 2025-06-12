import fs from "fs"
import { readTour, readTourById } from "../services/tour.service.js"

// const fs = require("fs")

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

//ok
const getAllTours = (req, res) => {
    const tours = readTour()
    res.status(200).json({
        status: "success",
        results: tours.length,
        data: { tours }
    })
}

//ok
const getTourByIdController = (req, res) => {
    const theTour = readTourById(req.params.id)
if(theTour){
    res.status(200).json({
        status: 'success (oupi goupi)',
        data: {
            tour: theTour
        }
    })}
    else {
        res.status(500).json({
        status: 'success (oupi goupi)'
    })}
}

const createTour = (req, res) => {
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

export {getAllTours, getTourByIdController, createTour, getEditById, deleteByID}