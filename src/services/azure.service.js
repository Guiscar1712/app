const azure = require('azure-storage')
const config = require('../utils/config')
const uuid = require('uuid')
const md5 = require('md5')
const blobService = azure.createBlobService(config.azureBlobsConnection)

module.exports = class AzureService {
  static async uploadBuffer (container, fileBuffer, fileName, contentType) {
    await blobService.createBlockBlobFromText(
      container,
      fileName,
      fileBuffer,
      { contentType },
      function (error, result, response) {
        if (error) {
          console.error(error)
          return null
        }
      }
    )

    return this.blobLink(container, fileName)
  }

  static blobLink (container, fileName) {
    return `https://kroton00vitrine.blob.core.windows.net/${container}/${fileName}`
  }

  static async uploadBase64 (container, base64) {
    const matches = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
    const type = matches[1]

    const imageExtension = type.split('/')[1]
    const fileName = 'f' + md5(uuid.v1()) + '.' + imageExtension

    const fileBuffer = new Buffer.from(matches[2], 'base64')

    return await this.uploadBuffer(container, fileBuffer, fileName, type)
  }

  static async copy (sourceUri, targetContainer, targetBlob) {
    await copyBlob(sourceUri, targetContainer, targetBlob)
    return this.blobLink(targetContainer, targetBlob)
  }

  static async move (sourceContainer, targetContainer, fileName) {
    const sourceUri = this.blobLink(sourceContainer, fileName)
    await copyBlob(sourceUri, targetContainer, fileName)
    await deleteBlob(sourceContainer, fileName)
    return this.blobLink(targetContainer, fileName)
  }
}

const createContainer = (container, safe) => {
  let accessLevel = { publicAccessLevel: 'blob' }

  if (safe) {
    accessLevel = {}
  }

  return new Promise((resolve, reject) => {
    blobService.createContainerIfNotExists(
      container,
      accessLevel,
      async (error, result, response) => {
        if (!error) {
          resolve({ result, response })
        } else {
          reject(error)
        }
      }
    )
  })
}

const deleteContainer = container => {
  return new Promise((resolve, reject) => {
    blobService.deleteContainerIfExists(container, (err, res) => {
      if (!err) {
        resolve(res)
      } else {
        reject(err)
      }
    })
  })
}

const uploadFile = (container, fileName, filePath, keep) => {
  return new Promise((resolve, reject) => {
    blobService.createBlockBlobFromLocalFile(
      container,
      fileName,
      filePath,
      function (error, result, response) {
        if (!error) {
          if (!keep) {
            fs.unlinkSync(filePath)
          }

          resolve({ result, response })
        } else {
          reject(error)
        }
      }
    )
  })
}

const listBlobs = (container, continuationToken) => {
  return new Promise((resolve, reject) => {
    blobService.listBlobsSegmented(
      container,
      continuationToken,
      (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      }
    )
  })
}

const listAllBlobs = async (container, limit) => {
  let continuationToken = null
  const results = []
  do {
    const response = await listBlobs(blobService, container, continuationToken)
    continuationToken = response.continuationToken

    response.entries.forEach(BlobResult => {
      results.push(BlobResult)
    })

    if (limit && limit != 0 && results.length > limit) {
      break
    }
  } while (continuationToken != null)
  return results
}

const copyBlob = (sourceUri, targetContainer, targetBlob) => {
  return new Promise((resolve, reject) => {
    blobService.startCopyBlob(
      sourceUri,
      targetContainer,
      targetBlob,
      (err, res) => {
        if (!err) {
          resolve(res)
        } else {
          reject(err)
        }
      }
    )
  })
}

const deleteBlob = (container, blobname) => {
  return new Promise((resolve, reject) => {
    blobService.deleteBlobIfExists(container, blobname, (err, res) => {
      if (!err) {
        resolve(res)
      } else {
        reject(err)
      }
    })
  })
}
