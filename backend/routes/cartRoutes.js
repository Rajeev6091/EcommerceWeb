import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { addtoCart, getUserCart, updateCart } from '../controller/cartController.js'

const cartRoutes = express.Router()

cartRoutes.post('/get', isAuth, getUserCart)
cartRoutes.post('/add', isAuth, addtoCart)
cartRoutes.post('/update', isAuth, updateCart)

export default cartRoutes