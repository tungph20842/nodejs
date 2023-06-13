import express from 'express'
import { create, getAll, getOne, remove, update } from '../controllsers/product'

const routerproduct = express.Router()

routerproduct.get('/', getAll)
routerproduct.get('/:id', getOne)
routerproduct.post('/', create)
routerproduct.put('/:id', update)
routerproduct.delete('/:id', remove)

export default routerproduct