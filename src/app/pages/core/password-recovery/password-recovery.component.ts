import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { map } from 'rxjs/operators';
import { User } from 'src/app/core/models/entities/users/user.model';
import { ApiStoreService } from 'src/app/core/services/api-store-service';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css'],

})


export class PasswordRecoveryComponent implements OnInit {

   rePassword: any 
   password: any 
   guidKey:any;
  environment = environment;
  isRequesting = false;
  pwType = 'password';

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpService,
    private apiStoreService:ApiStoreService
  ) { }



  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async prm => {
      // this.guidKey = prm.key;
    })
  }

  recovery(){

       this.password = (<HTMLInputElement>document.getElementById('password')).value.toString();
    this.rePassword =   (<HTMLInputElement>document.getElementById('rePassword')).value.toString();

     
    if(this.password == "" || this.rePassword == ""){
      notify("Boş alan bırakmayınız");
    }else{
      if(this.password != this.rePassword){
        notify("Parolalarınız eşleşmiyor");
      }else{
        this.apiStoreService.generateODataStore('User/PasswordRecovery').insert({
          password: this.password,
          rePassword:this.rePassword,
          guidKey:this.guidKey
        }).then(res => {

          if(res.success == true){
          setTimeout(() => {
            this.router.navigate(['/giris']);
          }, 2000);
          }
        })
      }
    }
  }
 
}
