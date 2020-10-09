export default interface IStoredProvider {
    saveFile(file:String): Promise<string>
    deleteFile(file:string):Promise<void>
}