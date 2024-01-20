import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  showDialog = false;
  showDialogLogado = false;
  confirmarDialog = false;
  public getPetId: any;
  public blobPetId: string;
  isLoggedIn = false;
  constructor() {}
  }
    

