import IStoredProvider from '../models/IStoredProvider'
import UploadConfig from '@config/upload'

export default class DiskStoredProvider implements IStoredProvider {
    private storage:string[]=[];
     public async saveFile(file:string): Promise<string>{
         this.storage.push(file)

         return file;
     }

     public async deleteFile(file:string):Promise<void>{
         const findIndex = this.storage.findIndex(findStorage => findStorage ==file)

         this.storage.splice(findIndex,1)

         
     }

  

}