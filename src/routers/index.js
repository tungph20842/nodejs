import express from 'express'
import routerproduct from './product'
import routerUser from './auth'

const router = express.Router()

router.use('/products', routerproduct)
router.use('/auth', routerUser)

export default router