import juegosService from "./juegos.service.js";

const juegosController = {}

juegosController.getJuegosPorNombre = (req,res) => {
    try {
    const {nombre} = req.query
    const resultado = juegosService.getJuegosPorNombre(nombre)
    res.json(resultado)
    }
    catch (error) {
        res.status(500).json({error: 'Error interno del servidor.'})
    }
}

juegosController.getJuegosPorID = (req,res) =>{
    try{
        const id = parseInt(req.params.id)
        const juego = juegosService.getJuegosPorID(id)
        if (!juego){
            return res.status(404).json({error: 'Juego no encontrado.'})
        }
        res.json(juego)

    }
    catch (error){
        res.status(500).json({error: 'Error interno del servidor.'})
    }
}

juegosController.addJuego = (req,res) =>{
    try{
        const {nombre, minJugadores, maxJugadores, duracionPartida, fechaCompra, estado} = req.body
        if (!nombre || minJugadores == null || maxJugadores == null || duracionPartida == null || !fechaCompra || !estado) {
            return res.status(400).json({ error: `Todos los campos son obligatorios: nombre, minJugadores, 
                maxJugadores, duracionPartida, fechaCompra, estado`})
        }
        const nuevoJuego = juegosService.addJuego(nombre, minJugadores, maxJugadores, duracionPartida, fechaCompra, estado)
        res.status(201).json(nuevoJuego)
    }

    catch (error) {
        if (error.status) {
            return res.status(error.status).json({ error: error.message })
        }
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

juegosController.updateJuego = (req,res) =>{
    try {
        const id = parseInt(req.params.id)
        const juego = juegosService.updateJuego(id, req.body)
        if (!juego) {
            return res.status(404).json({ error: 'Juego no encontrado' })
        }
        res.json(juego)
    } 
    catch (error) {
        if (error.status) {
            return res.status(error.status).json({ error: error.message })
        }
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

juegosController.deleteJuego = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const eliminado = juegosService.deleteJuego(id);
        if (!eliminado) {
            return res.status(404).json({ error: 'Juego no encontrado' })
        }
        res.json({ mensaje: `Juego con id ${id} retirado del catálogo` })
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' })
    }
}

export default juegosController