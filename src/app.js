import mongoose from "mongoose";
import express from 'express'
import cors from 'cors'
import router from "./routers";

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api', router)

mongoose.connect("mongodb://127.0.0.1:27017/dbNodeJs")

export const viteNodeApp = app
