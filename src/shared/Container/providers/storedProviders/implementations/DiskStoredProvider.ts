import IStoredProvider from '../models/IStoredProvider'
import UploadConfig from '@config/upload'
import fs from 'fs';
import path from 'path'

export default class DiskStoredProvider implements IStoredProvider {
     public async saveFile(file:string): Promise<string>{
         await fs.promises.rename(
             path.resolve(UploadConfig.local,file),
             path.resolve(UploadConfig.uploadsFolder,'file')
         )

         return file;
     }

     public async deleteFile(file:string):Promise<void>{
         const filePath = path.resolve(UploadConfig.uploadsFolder,file)

         try{
             await fs.promises.stat(filePath)
         }catch{
             return;
         }

       await fs.promises.unlink(filePath)

     }

  

}