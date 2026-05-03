import express from 'express'
import controller from './juegos.controller.js'

const router = express.Router()
console.log('CONTROLLER', controller)
router.get('/', controller.getJuegosPorNombre)
router.get('/:id', controller.getJuegosPorID)
router.post('/', controller.addJuego)
router.put('/:id', controller.updateJuego)
router.delete('/:id', controller.deleteJuego)

export default router
