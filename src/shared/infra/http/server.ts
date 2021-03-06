import 'reflect-metadata'
import express, { Request, Response,NextFunction } from 'express';
import routes from './routes';
import '@shared/infra/database';
import upload from '@config/upload';
import AppError from '@shared/errors/AppError';
import 'express-async-errors'
import cors from 'cors'
import '@shared/Container/index'


const app = express()
app.use(cors())
app.use(routes)
app.use('/files',express.static(upload.uploadsFolder))

app.use((err:Error,request:Request,response:Response,next:NextFunction)=>{
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            status:'error',
            message: err.message
        })
    }

    return response.status(500).json({
        status:'error',
        message: 'Internal Server Error'
    })

})

app.listen(3333,()=>{
    console.log('Server has started on 3333🚀')
})
