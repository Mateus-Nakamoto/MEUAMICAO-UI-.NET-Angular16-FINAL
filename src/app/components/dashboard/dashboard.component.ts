import { AuthService } from './../../services/auth.service';
import { ApiService } from './../../services/api.service';
import { Component, ErrorHandler, OnInit } from '@angular/core';
import { UserStoreService } from 'src/app/services/user-store.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { of, tap,catchError, Subject, takeUntil, Observable, bindNodeCallback, EmptyError, EMPTY } from 'rxjs';
import { GeneralService } from 'src/app/shared/services/general.service';
import { AzureBlobStorageService } from 'src/app/shared/azureServices/azure-blob-storage.service';
import { BlobServiceClient, BlockBlobTier, RestError } from '@azure/storage-blob';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public pets:any = [];
  public pets2:any = [];
  public users:any = [];
  public role!:string;
  public productList: any [] = [];
  public unique_name : string = "";
  public nameid : string = "";
  public cancelarDoacao:any = [];
  list: ApiService[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  criarUrl: string = "";

  picturesAccount = "mateusnakamoto";
  picturesContainer = "fotospets";

  constructor(private api : ApiService,
    private auth: AuthService,
    private userStore: UserStoreService,
    private router: Router,
    private toast: NgToastService,
    public generalService: GeneralService,
    public blobService: AzureBlobStorageService,
    ) { }

    sas = "?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2028-04-26T00:34:51Z&st=2023-11-27T16:34:51Z&spr=https&sig=mAMQPvDTUvT%2BKIWSUUIpF9B6bzBDjVfBUH8H7G3jzKs%3D";
    public urlPet: string;
    petId: any;
    image: File;
    idComplete: any;
    picturesList: string[] = [];
    picturesDownloaded: string[] = [];


  ngOnInit() {

    this.meusPets();
    // this.reloadImages();


    this.userStore.getFullNameFromStore()
    .subscribe(val=>{
      const unique_nameFromToken = this.auth.getfullNameFromToken();
      this.unique_name = val || unique_nameFromToken
    });

    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    });

    //pet
    
    this.userStore.getIdFromStore()
    .subscribe(val=>{
      const nameidFromToken = this.auth.getidFromToken();
      this.nameid = val || nameidFromToken
    });
  }


  logout(){
    this.auth.signOut();
  }
  

  meusPets(){
  this.api.getPets().subscribe((data) => {
    const NameId = this.nameid;
    const array = []
    console.log(NameId);
    this.pets = data.filter((pets) => pets.userId == NameId);
    console.log(this.pets);

    for (let p of this.pets){
      this.petId = p.id;
      this.idComplete = ("pet." + this.petId);
      this.blobService.downloadImage(this.sas, this.idComplete, blob => {
        
        let url = window.URL.createObjectURL(blob);
        console.log(url)
        this.urlPet = url;
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
        array.push(reader.result as string)
        }

        
        data.filter((pets) => p.petLinkUrl = this.urlPet);
        console.log(p.petLinkUrl)
      })
    }
  });
}

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
//         array.push(reader.result as string)
//         }
//       })
//     }
//   })
// }

public downloadImage (name: string){
    this.blobService.downloadImage(this.sas, name, blob => {
    let url = window.URL.createObjectURL(blob);
    this.urlPet = url;
  })

}


// public setPetId(id){
//     this.petId = id;
//     this.idComplete = "pet." + id;
//     console.log(this.idComplete);
// }

}
