import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, delayWhen, map } from 'rxjs';
import { of } from 'rxjs';
import { EstadoBr } from '../models/estado-br.model';
import { Cidade } from '../models/cidade';
import { Idade } from '../models/idade';
import { BlobServiceClient } from '@azure/storage-blob';



@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'https://localhost:7058/api/Usuario/';
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any>(this.baseUrl);
  }

  getPets() {
    return this.http.get<any>(`${this.baseUrl}getPets/`);
  }

  deletePet(Id: number) {
    return this.http.delete(`${this.baseUrl}deletePet?Id=` + Id)
  }

  getIdades() {
    return this.http.get<Idade[]>('assets/dados/idades.json')
    .pipe(
      // tslint:disable-next-line:triple-equals
      map((idades: Idade[]) => idades.filter(i => i.id == 1))
    );
  }

  getEstadosBr() {
    return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json');
  }

  setCidades(){
    return this.http.get<Cidade[]>('assets/dados/cidades.json')
    .pipe(
      map((cidades: Cidade[]) => cidades.filter(c => c.id == 5565))
    );
  }

  getCidades(estadoId: number) {
    return this.http.get<Cidade[]>('assets/dados/cidades.json')
    .pipe(
      // tslint:disable-next-line:triple-equals
      map((cidades: Cidade[]) => cidades.filter(c => c.estado == estadoId))
    );
    }

    filtrarEstado(estado: any) {
      return this.http.get<any>(`${this.baseUrl}getPets/`)
      .pipe(
        map((pets: any[]) => pets.filter(p => p.estado == estado))
      );

    }

    consultaCEP(cep: string) {

      console.log(cep);
  
      // Nova variável "cep" somente com dígitos.
      cep = cep.replace(/\D/g, '');
  
      // Verifica se campo cep possui valor informado.
      if (cep !== '') {
        // Expressão regular para validar o CEP.
        const validacep = /^[0-9]{8}$/;
  
        // Valida o formato do CEP.
        if (validacep.test(cep)) {
          return this.http.get(`//viacep.com.br/ws/${cep}/json`);
        }
      }
      return of({});
    }

}
