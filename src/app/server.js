import cors from 'cors'
import express, { json } from 'express'
import indexRouter from '../routes/index-routes.js'
import helmet from 'helmet'
import morgan from 'morgan'

//SETTINGS
const app = express()
app.set("port", 3001)

//MIDDLEWARES
app.use(morgan("dev"))
app.use(json())
app.use(
    cors({
        "origin" : "*"
    })
)
app.use(helmet())

//ROUTES
app.get("/",(req,res) => {
    res.status(200).send({
        msg: "Server running :)"
    })
})

app.use("/api", indexRouter)

export default app