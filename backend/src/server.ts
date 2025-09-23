import express, { urlencoded } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { mainRouter } from './routers/main'

const server = express()
server.use(helmet())
server.use(cors())
server.use(urlencoded({ extended: true }))
server.use(express.json())

// Routes
server.use(mainRouter)

// Inicializa
server.listen(process.env.POT || 3000, () => {
    console.log(`Servidor rodando em ${process.env.BASE_URL}`)
})