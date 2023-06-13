import express from 'express'
import { signIn, signUp } from '../controllsers/auth'

const routerUser = express.Router()

routerUser.post('/signup', signUp)
routerUser.post('/signin', signIn)

export default routerUser