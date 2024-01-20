import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/shared/services/general.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AzureBlobStorageService } from 'src/app/shared/azureServices/azure-blob-storage.service';
import { DialogLogadoComponent } from '../../dialogLogado/dialogLogado.component';

@Component({
  selector: 'app-confirmarbox',
  templateUrl: './confirmarbox.component.html',
  styleUrls: ['./confirmarbox.component.scss']
})
export class ConfirmarboxComponent implements OnInit {
  public pets: any[];
  public id: number;

  constructor(
    public generalService: GeneralService,
    public api: ApiService,
    private router: Router,
    private toast: NgToastService,
    public azureBlob: AzureBlobStorageService,
    public dialogLogado: DialogLogadoComponent,

  ) {}

  ngOnInit(): void {

  }

  onDelete(){
    console.log(this.generalService.getPetId)
    this.dialogLogado.deleteImage(this.generalService.blobPetId);
    this.id = this.generalService.getPetId;
    this.api.deletePet(this.id)
    .subscribe({next: res =>
      {
        this.router.navigate(['/login'])
  .then(() => {
    this.router.navigate(['user/dashboard'])
  });
        this.toast.success({detail:"Doação cancelada!"});
        this.generalService.confirmarDialog=(false);
      }}
    );
  }

}
