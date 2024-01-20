import { Component, OnInit } from '@angular/core';
import { UserStoreService } from 'src/app/services/user-store.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { empty, map, switchMap, tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validationform';
import { GeneralService } from 'src/app/shared/services/general.service';


@Component({
  selector: 'app-encontrarpet',
  templateUrl: './encontrarpet.component.html',
  styleUrls: ['./encontrarpet.component.scss']
})
export class EncontrarpetComponent implements OnInit {

  public pets:any = [];
  public users:any = [];
  public role!:string;
  public productList: any [] = [];
  public unique_name : string = "";
  public nameid : string = "";
  public cancelarDoacao:any = [];
  public procurarCidade:string = "";
  public procurarEstado:string = "";
  public procurarIdade:string = "";
  public IdIdade:number;
  list: ApiService[] = [];
  public estados:any = [];
  public cidades:any = [];
  public idades:any = [];
  public listar!: FormGroup;
  public Cidade:string = "";
  public Estado:string = "";
  public encontrarPets: string = "Z";
  public numberOfPets: number;
  public CidadeOuEstado: string = "";
  public NomearLocal: string = "";

  constructor( private fb : FormBuilder,
    private api : ApiService,
    private auth: AuthService,
    private userStore: UserStoreService,
    private router: Router,
    public generalService: GeneralService,
    ) { }

  ngOnInit() {

    this.listar = this.fb.group({
      estado: ['', Validators.required],
      cidade: ['', Validators.required],
      idade: ['', Validators.required],
      }),

      this.api.getEstadosBr()
      .subscribe(campo=>{
      this.estados = campo;
      });
      
      this.listar.get('estado').valueChanges
      .pipe(
        tap(estado => console.log(estado)),
        map(estado => this.procurarEstado = estado),
        tap(estado=> console.log(this.procurarEstado)),
        map(estado => this.estados.filter(e => e.sigla === estado)),
        map(estados => estados && estados.length > 0 ? estados[0].id : empty()),
        switchMap((estadoId: number) => this.api.getCidades(estadoId)),
        tap(filtrar => this.filtrarEstado()),
        tap(console.log),

      )
      .subscribe
      (cidades => this.cidades = cidades);

      


      this.listar.get('cidade').valueChanges
      .pipe(
        tap(cidade => console.log('Nova cidade: ', cidade)),
        map(cidade => this.cidades.filter(c => c.nome === cidade)),
        map(cidades => cidades && cidades.length > 0 ? cidades[0].nome : empty()),
        tap(cidades => this.procurarCidade = cidades),
        tap(filtrar => this.meusPets()),

        switchMap(() => this.api.getIdades()),
        tap(console.log),        
      )
      .subscribe
      (idades => this.idades = idades);
''
      this.listar.get('idade').valueChanges

      .pipe(

        map(idade => this.idades.filter(i => i.idade === idade)),
        map(idades => idades && idades.length > 0 ? idades[0].idade : empty()),
        tap(idades => this.procurarIdade = idades),
        tap(filtrar => this.filtrarIdade()),     
      )
      .subscribe
      (console.log);
      
      
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
      this.nameid = val || nameidFromToken;
    });
  }


  logout(){
    this.auth.signOut();
  }

  aplicaCssErro(campo) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }

  verificaValidTouched(campo) {
    return !campo.valid && campo.touched;
  }

  onSubmit() {
    if (this.listar.valid) {
      console.log(this.listar.value);
      let signUpObj = {
        ...this.listar.value,
      }
      this.auth.signUpPet(signUpObj)
      .subscribe({
        next:(res=>{
          console.log(res.message);
          this.listar.reset();
          this.router.navigate(['user/dashboard']);
          alert(res.message);
        }),
        error:(err=>{
          alert(err?.error.message);
        })
      })
    } else {
      ValidateForm.validateAllFormFields(this.listar); //{7}
    }
  }

  meusPets(){
    if (this.procurarCidade.length >> 0) {
      this.NomearLocal = this.procurarCidade;
      this.CidadeOuEstado = " na cidade de ";
      this.api.getPets().subscribe((campo) => {
      console.log(this.Cidade);
      this.pets = campo.filter((pets) => pets.cidade == this.procurarCidade);
      this.numberOfPets = this.pets.length;
      console.log(this.numberOfPets);
      if(this.pets.length == 0){
        this.encontrarPets = "N";
        console.log(this.encontrarPets);
      }else{
        this.encontrarPets = "S";
        console.log('encontrado');
      }
      });
  }
}

filtrarEstado(){
  this.CidadeOuEstado = " no estado "
  this.NomearLocal = this.procurarEstado;
  if (this.procurarEstado != "") {
  this.api.getPets().subscribe((campo) => {
    this.pets = campo.filter((pets) => pets.estado == this.procurarEstado);
    this.numberOfPets = this.pets.length;
    console.log(this.numberOfPets);
    if(this.pets.length == 0){
      this.encontrarPets = "N";
      console.log(this.encontrarPets);
    }else{
      this.encontrarPets = "S";
      console.log('encontrado');
    }
    });
    }
}

filtrarIdade(){
  if (this.procurarCidade != "") {
    this.api.getPets().subscribe((campo) => {
    this.pets = campo.filter((pets) => pets.estado == this.procurarEstado)
    .filter ((pets) => pets.cidade == this.procurarCidade)
    .filter((pets) => pets.petIdade == this.procurarIdade);

    this.numberOfPets = this.pets.length;
    console.log(this.numberOfPets);
    if(this.pets.length == 0){
      this.encontrarPets = "N";
    }else{
      this.encontrarPets = "S";
      console.log('encontrado');
    }
    })

  }else{
    this.api.getPets().subscribe((campo) => {
    this.pets = campo.filter((pets) => pets.estado == this.procurarEstado)
    .filter((pets) => pets.petIdade == this.procurarIdade);
    this.numberOfPets = this.pets.length;
    console.log(this.numberOfPets);
    if(this.pets.length == 0){
      this.encontrarPets = "N";
      console.log(this.encontrarPets)
    }else{
      this.encontrarPets = "S";
      console.log('encontrado');
    }
    })
  }
}
  


infoPet(){
  console.log(this.pets.petNome);
}



limparFiltros()
{
  this.listar.reset();
  this.procurarEstado = "";
  this.procurarCidade = "";
};
}
