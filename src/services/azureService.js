const azure = require('azure-storage')
const config = require('../utils/config')
const uuid = require('uuid/v1')
const blobService = azure.createBlobService(config.azureBlobsKey)
const defaultContainer='files';

module.exports = class AzureService {
  
  async uploadImage(image64Base) 
  {
    
    var matches = image64Base.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    var type = matches[1];
    
    var imageExtension = type.split('/')[1];
    var fileName = uuid().toString() + '.' + imageExtension

    var image = new Buffer.from(matches[2], 'base64');

    await blobService
          .createBlockBlobFromText(defaultContainer, fileName, image,  { contentType: type }, 
          function (error, result, response) {
            if (error) {
                console.error(error)        
                return null        
            }          
        });

        return fileName;
  } 
} 


/*const azure = require('azure-storage');
var fs = require('fs');

class Blob{
    constructor(){
        this.Config = "DefaultEndpointsProtocol=https;AccountName=empodera;AccountKey=h74KfbR9iMTtQREcr/YIONy85mzrVoRM5+OGedlMsmlggveVR0lfqZHYhENvE/3c+3cVB/QrYMhgaObtGaazow==;EndpointSuffix=core.windows.net";
        this.container = "empodera";
        this.blobService = this.getBlobService(); 
    }
    getBlobService(){
        return azure.createBlobService(this.Config);
    }
    async upload(filePath, fileName, container, keep, safe){
        if(!container){
            container=this.container;
        }
        
        createContainer(this.blobService, container, safe);
        
        let res = await uploadFile(this.blobService, container, fileName, filePath, keep);

        if(res.response.isSuccessful){
            return `https://empodera.blob.core.windows.net/${res.result.container}/${res.result.name}`;
        }else{
            return '';
        }   
    }
    getBlobLink(file, container){
        if(!container){
            container=this.container;
        }
        return `https://empodera.blob.core.windows.net/${container}/${file}`;
    }
    async list(container, limit){
        if(!container){
            container=this.container;
        }
        return (await listAllBlobs(this.blobService, container, limit)).map(e=>{return e.name});
    }
    async delete(blobname, container){
        if(!container){
            container=this.container;
        }
        await deleteBlob(this.blobService, container, blobname);
    }
    async deleteContainer(container){
        if(!container){
            container=this.container;
        }
        await deleteContainer(this.blobService, container);
    }
}

module.exports = new Blob();

let createContainer = (blobService, container, safe) => {
    let accessLevel = { publicAccessLevel: 'blob' }

    if(safe){
        accessLevel = {};
    }

    return new Promise((resolve, reject) => {
        blobService.createContainerIfNotExists(container, accessLevel, async (error, result, response) => {
            if (!error) {
                resolve({ result, response });
            }
            else {
                reject(error);
            }
        })
    })
}

let deleteContainer = (blobService, container)=>{
    return new Promise((resolve, reject)=>{
        blobService.deleteContainerIfExists(container, (err, res)=>{
            if(!err){
                resolve(res);
            }else{
                reject(err);
            }
        })
    })
}

let uploadFile = (blobService, container, fileName, filePath, keep) => {
    return new Promise((resolve, reject) => {
        blobService.createBlockBlobFromLocalFile(container, fileName, filePath, function (error, result, response) {
            if (!error) {
                if(!keep){
                    fs.unlinkSync(filePath)
                }
                
                resolve({ result, response })
            } else {
                reject(error)
            }
        });
    })
}

let listBlobs = (blobService, container, continuationToken) => {
    return new Promise((resolve, reject) => {
        blobService.listBlobsSegmented(container, continuationToken, (err, result) => {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        })
    })
}

let listAllBlobs = async (blobService, container, limit) => {
    let continuationToken = null;
    let results = [];
    do {
        let response = await listBlobs(blobService, container, continuationToken);
        continuationToken = response.continuationToken;

        response.entries.forEach(BlobResult => {
            results.push(BlobResult);    
        });

        if(limit && limit != 0 && results.length > limit){
            break;
        }

    } while (continuationToken != null);
    return results;
}

let deleteBlob = (blobService, container, blobname)=>{
    return new Promise((resolve, reject)=>{
        blobService.deleteBlobIfExists(container, blobname, (err, res)=>{
            if(!err){
                resolve(res);
            }else{
                reject(err);
            }
        })
    })
}*/