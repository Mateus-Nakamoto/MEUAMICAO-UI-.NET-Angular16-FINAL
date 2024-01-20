import { Component, Input, OnInit } from '@angular/core';
import { AppModule } from 'src/app/app.module';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  role = 'User';
  unique_name : string = "";

  constructor(
    private userStore: UserStoreService,
    private auth: AuthService,
    public account: AppModule,
  ) { }

  ngOnInit() {
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
  }

  logout(){
    this.auth.signOut();
  }
}
