import { Router } from 'express'

import * as pingController from '../controllers/ping'
import * as authController from '../controllers/auth'
import { verifyJWT } from '../utils/jwt'

export const mainRouter = Router()

// Testando Servidor
mainRouter.get('/ping', pingController.ping)

// Só roda com Usario Logado
mainRouter.get('/privateping', verifyJWT, pingController.privatePing)

// Register
mainRouter.post('/auth/signup', authController.signup)
// Login
mainRouter.post('/auth/signin', authController.signin)


// TOKEN NECESSARIO - JWT = JSON WEB TOKEN  
// Create Tweet
// mainRouter.post('./tweet')
// Pegar um Tweet
// mainRouter.get('/tweet/:id')
// Repostas do Tweet
// mainRouter.get('/tweet/:id/answers')
// Likes Tweet
// mainRouter.post('/tweet/:id/like')

// Infos do Usuarios
// mainRouter.get('/user/:slug')
// Tweet dos Usuarios
// mainRouter.get('/user/:slug/tweets')
// Seguir / Deixar de Seguir
// mainRouter.post('/user/:slug/follow')

// Alterar Dados do Usuario
// mainRouter.put('/user')
// Alterar Avatar
// mainRouter.put('/user/avatar')
// Alterar Capa
// mainRouter.put('/user/cover')

// Feeds
// mainRouter.get('/feed')
// Pesquisar
// mainRouter.get('/search')
// Trending #
// mainRouter.get('/trending')

// Sugestões para seguir
// mainRouter.get('/seggestions')