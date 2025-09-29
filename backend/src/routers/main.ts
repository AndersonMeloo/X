import { Router } from 'express'

import * as pingController from '../controllers/ping'
import * as authController from '../controllers/auth'
import * as tweetController from '../controllers/tweet'
import * as userController from '../controllers/user'
import * as feedController from '../controllers/feed'
import * as seartchController from '../controllers/search'
import * as trendController from '../controllers/trend'
import * as suggestionController from '../controllers/suggestion'
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
mainRouter.post('/tweet', verifyJWT, tweetController.addTweet)

// Pegar um Tweet
mainRouter.get('/tweet/:id', verifyJWT, tweetController.getTweet)

// Repostas do Tweet
mainRouter.get('/tweet/:id/answers', verifyJWT, tweetController.getAnswers)

// Likes Tweet
mainRouter.post('/tweet/:id/like', verifyJWT, tweetController.likeToggle)

// Infos do Usuarios
mainRouter.get('/user/:slug', verifyJWT, userController.getUser)
// Tweet dos Usuarios
mainRouter.get('/user/:slug/tweets', verifyJWT, userController.getUserTweets)
// Seguir / Deixar de Seguir
mainRouter.post('/user/:slug/follow', verifyJWT, userController.followToggle)

// Alterar Dados do Usuario
mainRouter.put('/user', verifyJWT, userController.updateUser)
// Alterar Avatar
// mainRouter.put('/user/avatar')
// Alterar Capa
// mainRouter.put('/user/cover')

// Feeds
mainRouter.get('/feed', verifyJWT, feedController.getFeed)
// Pesquisar
mainRouter.get('/search', verifyJWT, seartchController.searchTweets)
// Trending #
mainRouter.get('/trending', verifyJWT, trendController.getTrends)

// Sugestões para seguir
mainRouter.get('/suggestions', verifyJWT, suggestionController.getSuggestions)