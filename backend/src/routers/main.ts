import { Router } from 'express'

import * as pingController from '../controllers/ping'

export const mainRouter = Router()

// Testando Servidor
mainRouter.get('/ping', pingController.ping)