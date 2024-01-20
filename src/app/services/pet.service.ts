import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private baseUrl: string = 'https://localhost:7058/api/Animal/';
  constructor(private http : HttpClient, private router: Router) { }

  signUpPet(petObj: any) {
    return this.http.post<any>(`${this.baseUrl}registerPet`, petObj)
  }

}
