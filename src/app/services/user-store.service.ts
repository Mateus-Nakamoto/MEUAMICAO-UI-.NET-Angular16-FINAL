import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
private unique_name$ = new BehaviorSubject<string>("");
private role$ = new BehaviorSubject<string>("");
private nameid$ = new BehaviorSubject<string>("");

constructor() { }

  public getRoleFromStore(){
    return this.role$.asObservable();
  }

  public setRoleForStore(role:string){
    this.role$.next(role);
  }

  public getFullNameFromStore(){
    return this.unique_name$.asObservable();
  }

  public setFullNameForStore(unique_name:string){
    this.unique_name$.next(unique_name)
  }

  //Cadastro pet:

  public getIdFromStore(){
    return this.nameid$.asObservable();
  }

  public setIdForStore(nameid:string){
    this.nameid$.next(nameid)
  }

}
