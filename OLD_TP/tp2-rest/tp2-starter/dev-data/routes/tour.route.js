import express from 'express'
import {getAllTours,getTourByIdController, createTour, getEditById, deleteByID} from '../controllers/tour.controller.js'

const tourRouter = express.Router()

tourRouter
    .route('/')
    .get(getAllTours)
    .post(createTour)

tourRouter
    .route('/:id')
    .get(getTourByIdController)
    .put(getEditById)
    .delete(deleteByID)

export {tourRouter}