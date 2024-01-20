import { Component, OnInit, ɵɵqueryRefresh, Injectable } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { ApiService } from 'src/app/services/api.service';
import { AzureBlobStorageService } from '../../azureServices/azure-blob-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-dialog-logado',
  templateUrl: './dialogLogado.component.html',
  styleUrls: ['./dialogLogado.component.scss']
})
export class DialogLogadoComponent implements OnInit {
  
  sas = "?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2028-04-26T00:34:51Z&st=2023-11-27T16:34:51Z&spr=https&sig=mAMQPvDTUvT%2BKIWSUUIpF9B6bzBDjVfBUH8H7G3jzKs%3D";
  picturesList: string[] = [];
  picturesDownloaded: string[] = [];
  picturesAccount = "mateusnakamoto";
  picturesContainer = "fotospets";
  criarUrl: string = "";

  public urlPet: string ="";
  public fotoId: string="";
  
  public pets: any[];

  constructor(
    public generalService: GeneralService,
    public api: ApiService,
    public blobService: AzureBlobStorageService,
    ) { }

  ngOnInit(): void {
        this.api.getPets().subscribe((data) => {
        this.pets = data.filter((pets) => pets.id == this.generalService.getPetId);
        this.fotoId = this.generalService.getPetId;
        this.blobService.setFotoId(this.generalService.getPetId);
        this.downloadImage(this.blobService.fotoIdFormado);
      });
  }
 
  public imageSelected(file: File) {

      this.blobService.uploadImage(this.sas, file, file.name, () => {
        
      })
     this.downloadImage(this.blobService.fotoIdFormado);
  }


  //   private carregarImagens() {
  //   this.blobService.listImages(this.sas).then(list => {
  //   this.picturesList = list

  // private reloadImages() {
  //   this.blobService.listImages(this.sas).then(list => {
  //     this.picturesList = list
  //     const array = []
  //     this.picturesDownloaded = array
      
  //     for (let name of this.picturesList) {
  //       this.blobService.downloadImage(this.sas, name, blob => {
  //         var reader = new FileReader();
  //         reader.readAsDataURL(blob);
  //         reader.onloadend = function () {
  //           array.push(reader.result as string)
  //         }
  //       })
  //       if (this.picturesList.length!= 0)
  //       {
  //           this.downloadImage(name);
  //       }
  //     }
  //   })
  // }

  public setSas(event) {
    this.sas = event.target.value
  }
  
  public deleteImage (name: string) {
    this.blobService.deleteImage(this.sas, name, () => {
      console.log(name)
    })
  }

  public downloadImage (name: string) {
    this.blobService.downloadImage(this.sas, name, blob => {
      let url = window.URL.createObjectURL(blob);
      this.urlPet = url;
    })
  }
  
}
