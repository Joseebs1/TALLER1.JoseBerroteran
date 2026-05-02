import express from 'express'
import juegosRouter from '../modules/juegos/juegos.routes.js'

const indexRouter = express.Router()

indexRouter.use("/juegos", juegosRouter)

export default indexRouter

