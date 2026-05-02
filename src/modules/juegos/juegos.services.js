const juegosService = {}

let juegos = [
    {
        id: 1,
        nombre: 'Uno',
        minJugadores: 2,
        maxJugadores: 10,
        duracionPartida: 60,
        fechaCompra: '19-08-2010',
        estado: 'Deteriorado'
    },
    {
        id: 2,
        nombre: "Clue",
        minJugadores: 2,
        maxJugadores: 6,
        duracionPartida: 60,
        fechaCompra: '30-04-2026',
        estado: 'En perfectas condiciones'
    }
]

const ESTADOS = [
    'En perfectas condiciones',
    'Ligeramente usado',
    'Deteriorado',
    'Dañado'
]

juegosService.getJuegosPorNombre = (filtroNombre) => {
    if (filtroNombre){
        const filtro = filtroNombre.toLowerCase()
        return juegos.filter(i => i.nombre.toLowerCase().includes(filtro))
    }
    return juegos
}

juegosService.getJuegosPorID = (id) => {
    for (let juego of juegos){
        if (juego.id === id) 
            return juego
    }
    return null
}

let nextID = 3
juegosService.addJuego = (name, minJugadores, maxJugadores, duracionPartida,fechaCompra, estado) => {
    if (!ESTADOS.includes(estado)){
        throw {status: 400, message: `Estado inválido. Debe ser uno de: ${ESTADOS.join(', ')}`}
    }
    const nuevoJuego = {
        id: nextID,
        nombre: name,
        minJugadores: minJugadores,
        maxJugadores: maxJugadores,
        duracionPartida: duracionPartida,
        fechaCompra: fechaCompra,
        estado: estado
    }
    nextID++
    juegos.push(nuevoJuego)
    return nuevoJuego
}

juegosService.deleteJuego = (id) => {
    const longitudAntes = juegos.length
    juegos = juegos.filter(j => j.id !== id)
    return juegos.length < longitudAntes
}

juegosService.updateJuego = (id, datosActualizados) => {
    const juego = juegos.find(j => j.id === id)
    if (!juego) return null

    if (datosActualizados.estado && !ESTADOS.includes(datosActualizados.estado)) {
        throw { status: 400, message: `Estado inválido. Debe ser uno de: ${ESTADOS.join(', ')}` }
    }

    if (datosActualizados.nombre !== undefined) juego.nombre = datosActualizados.nombre;
    if (datosActualizados.minJugadores !== undefined) juego.minJugadores = Number(datosActualizados.minJugadores)
    if (datosActualizados.maxJugadores !== undefined) juego.maxJugadores = Number(datosActualizados.maxJugadores)
    if (datosActualizados.duracionPartida !== undefined) juego.duracionPartida = Number(datosActualizados.duracionPartida)
    if (datosActualizados.fechaCompra !== undefined) juego.fechaCompra = datosActualizados.fechaCompra
    if (datosActualizados.estado !== undefined) juego.estado = datosActualizados.estado

    return juego
};

export default juegosService







