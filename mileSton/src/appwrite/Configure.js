import conf from '../config/config'
import {Client , ID , Database , Storage ,Query} from 'appwrite'

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){

        this.client
         .setEndpoint(conf.appWriteUrl)
         .setProject(conf.appWriteProjectId)
        this.databases = new Database(this.client)
        this.bucket = new Storage(this.client)
    }
async createPost({title, slug , content , featuredImage , status , userId}){
    try {
        return await this.databases.createDocument(
            conf.appWriteDatabaseId,
            conf.appWriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId,
            }
        )
    } catch (error) {
        console.log("the error is in database : ", error)
    }
}

async updatePost( slug , {title, content , featuredImage , status }){
    try {
        return await this.databases.updateDocument(
            conf.appWriteDatabaseId,
            conf.appWriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
            }
        )
    } catch (error) {
        console.log("error in database Update service",error)
    }
}

async deletePost(slug){
    try {
         await this.databases.deleteDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,    ) 
        return true 
    } catch (error) {
       console.log("the error in the database delete service",error)
        return false
    }
}

async getpost(slug){
    try {
        return await this.databases.getDocument(
            conf.appWriteDatabaseId,
            conf.appWriteCollectionId,
            slug,
        )
    } catch (error) {
        console.log("the error is in getpost feature which is :",error)
    }
}

async getposts(queries = [Query.equal("status","active")]){
    try {
        return await this.databases.listDocuments(
            conf.appWriteDatabaseId,
            conf.appWriteCollectionId,
            queries,
        )
    } catch (error) {
        
    }
}

//file upload services
async uploadFile(file){
    try {
        await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        )
    } catch (error) {
        console.log("appwrite :: upload file :: error",error)
        return false
    }
}

async deleteFile(fileId){
    try {
        await this.bucket.deleteFile(
            conf.appwriteBucketId,
            fileId
        )
    } catch (error) {
        console.log("Appwritev:: deleteFile::error",error)
        return false
    }
}

getFilePreview(fileId){
    return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId
    )
}

}
 const service = new Service()
export default service