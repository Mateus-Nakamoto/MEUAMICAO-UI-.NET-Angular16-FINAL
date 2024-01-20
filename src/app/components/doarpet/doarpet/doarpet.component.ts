import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, ControlContainer } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validationform';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { map, tap, distinctUntilChanged, switchMap} from 'rxjs/operators';
import { empty } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-doarpet',
  templateUrl: './doarpet.component.html',
  styleUrls: ['./doarpet.component.scss']
})
export class DoarpetComponent implements OnInit {

  public nameid : string = "";
  public signUpForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon:string = "fa-eye-slash"

  public estados:any = [];
  public cidades:any = [];
  public idades:any = [];

  constructor(private api : ApiService,
    private fb : FormBuilder,
    private auth:AuthService,
    private router: Router,
    private userStore: UserStoreService,
    private toast: NgToastService
    ) { }

  ngOnInit() {

    this.api.setCidades();
    
    this.userStore.getIdFromStore()
    .subscribe(val=>{
      const nameidFromToken = this.auth.getidFromToken();
      this.nameid = val || nameidFromToken
    });

    this.signUpForm = this.fb.group({
      UserId: [this.nameid],
      petNome:['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      petIdade: ['', Validators.required],
      petContato: ['', Validators.required],
      }),
    

      this.api.getEstadosBr()
    .subscribe(res=>{
    this.estados = res;
    });

    this.api.getIdades()
    .subscribe(res=>{
    this.idades = res;
    });

    this.signUpForm.get('estado').valueChanges
    .pipe(
      tap(estado => console.log('Novo estado: ', estado)),
      map(estado => this.estados.filter(e => e.sigla === estado)),
      map(estados => estados && estados.length > 0 ? estados[0].id : empty()),
      switchMap((estadoId: number) => this.api.getCidades(estadoId)),
      tap(console.log)
    )
    .subscribe(cidades => this.cidades = cidades); 
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      let signUpObj = {
        ...this.signUpForm.value,
      }
      this.auth.signUpPet(signUpObj)
      .subscribe({
        next:(res=>{
          console.log(res.message);
          this.signUpForm.reset();
          this.router.navigate(['user/dashboard']);
          this.toast.success({detail:"Pet Cadastrado com Sucesso!", duration: 5000});
        }),
        error:(err=>{
          alert(err?.error.message)
        })
      })
    } else {
      ValidateForm.validateAllFormFields(this.signUpForm); //{7}
    }
  }

  verificaValidTouched(campo) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }
}
