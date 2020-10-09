import multer from 'multer'
import path from 'path'
import crypto from 'crypto'


const local= path.resolve(__dirname,'..','..','tmp')


export default {
    local,
    uploadsFolder: path.resolve(local,'uploads') ,

    storage: multer.diskStorage({
        destination: local,
        filename(request,file,callback){
            const fileHash =crypto.randomBytes(10).toString("hex")
            const filename = `${fileHash}-${file.originalname}`

            return callback(null,filename);

        }
    })
}