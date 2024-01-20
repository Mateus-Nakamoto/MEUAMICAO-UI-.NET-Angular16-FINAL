import { ErrorHandler, Injectable } from '@angular/core';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import { BlobsInContainer, TransferBlobProgress } from './models/azure-file-storage.model';

@Injectable({
  providedIn: 'root'
})
export class AzureBlobStorageService {

  // Enter your storage account name
  picturesAccount = "mateusnakamoto";
  // container name
  picturesContainer = "fotospets";

  private containerClient2!: ContainerClient;

  fotoId: string="";
  fotoIdFormado: any="";
  criarUrl: string = "";

  // +IMAGES
  
  public setFotoId(fotoId){
    this.fotoId = fotoId;
    this.fotoIdFormado = "pet." + this.fotoId;
    console.log(this.fotoIdFormado);
    this.criarUrl = `https://${this.picturesAccount}.blob.core.windows.net/${this.picturesContainer}/${this.fotoIdFormado}`;
  }

  public uploadImage(sas: string, content: Blob, name: string, handler: () => void) {
    this.uploadBlob(content, name, this.containerClient(sas), handler)
  }

  public listImages(sas: string): Promise<string[]> {
    return this.listBlobs(this.containerClient(sas))
  }

  public downloadImage(sas: string, name: string, handler: (blob: Blob) => void) {
    this.downloadBlob(name, this.containerClient(sas), handler)
  }

  public deleteImage(sas: string, name: string, handler: () => void) {
    this.deleteBlob(name, this.containerClient(sas), handler)
  }
  // -IMAGES

  private uploadBlob(content: Blob, name: string, client: ContainerClient, handler: () => void) {
    let blockBlobClient = client.getBlockBlobClient('pet.' + this.fotoId);
    blockBlobClient.uploadData(content, { blobHTTPHeaders: { blobContentType: content.type } })
      .then(() => handler())
      alert('Foto adicionada/atualizada com sucesso!')
      setTimeout(() => location.reload(), 1000);
  }

  private async listBlobs(client: ContainerClient): Promise<string[]> {
    let result: string[] = []

    let blobs = client.listBlobsFlat();
    for await (const blob of blobs) {
      result.push(blob.name)
    }

    return result;
  }

  private downloadBlob(name: string, client: ContainerClient, handler: (blob: Blob) => void) {   
    const blobClient = client.getBlobClient(name);
    blobClient.download().then(resp => {
      resp.blobBody.then(blob => {
        console.log(blob)
        handler(blob)
      })
    })
  }

  // private downloadAll(name: string, client: ContainerClient, handler: (blob: Blob) => void) {
  //   const blobClient = client.getBlobClient(name);
  //   blobClient.download().then(resp => {
  //     resp.blobBody.then(blob => {
  //       handler(blob)
  //     })
  //   })
  // }

  private deleteBlob(name: string, client: ContainerClient, handler: () => void) {
    client.deleteBlob(name).then(() => {
      handler()
    })
  }

  private containerClient(sas: string): ContainerClient {
    return new BlobServiceClient(`https://${this.picturesAccount}.blob.core.windows.net?${sas}`)
            .getContainerClient(this.picturesContainer)
  }


    // não testei:
//   public async getBlobsFromStorageContainer() {
//     const returnedBlobs: BlobsInContainer[] = [];
//     for await (const blob of this.containerClient2.listBlobsFlat()) {
//         returnedBlobs.push({
//             blobUrls: `https://${this.picturesAccount}.blob.core.windows.net/${this.picturesContainer}/${this.fotoIdFormado}`,
//             sizeInBytes: blob?.properties?.contentLength ? blob?.properties?.contentLength : 0
//         })
//     }
//     console.log(returnedBlobs);
//     return returnedBlobs;
// }
}
